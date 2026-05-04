import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { matchTrackToExercise, getBpmMatchLabel, musicGenres, formatDuration } from '../data/music';
import { exerciseLibrary, healthConditions } from '../data/exercises';
import { checkNewAchievements } from '../data/achievements';
import { getSpotifyEmbedUrl } from '../data/spotify';
import ExerciseDetailModal from '../components/ExerciseDetailModal';
import { CATEGORY_LABELS } from '../data/categories';

const PHASES = { WARMUP: 'warmup', EXERCISE: 'exercise', REST: 'rest', SETREST: 'setrest', COMPLETE: 'complete' };

// ── Vibração (Vibration API) ───────────────────────────────────────────────
function vibrate(pattern) {
  try { if ('vibrate' in navigator) navigator.vibrate(pattern); } catch (e) {}
}

// ── Web Audio API — beeps ──────────────────────────────────────────────────
function createBeep(freq, dur, delay, ctx) {
  const osc  = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.frequency.value = freq;
  osc.type = 'sine';
  gain.gain.setValueAtTime(0.35, ctx.currentTime + delay);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + dur);
  osc.start(ctx.currentTime + delay);
  osc.stop(ctx.currentTime + delay + dur);
}

// ── Componente principal ────────────────────────────────────────────────────
export default function WorkoutSession({ workout, userProfile, userId, onFinish }) {
  const genre     = (userProfile?.musicGenres || ['pop'])[0];
  const genreInfo = musicGenres.find(g => g.id === genre) || musicGenres[4];
  const sets      = workout.sets || 3;

  const activeHealthIds  = userProfile?.healthConditions || ['nenhum'];
  const activeConditions = healthConditions.filter(h => activeHealthIds.includes(h.id) && h.id !== 'nenhum');
  const allRestricted    = new Set(activeConditions.flatMap(h => h.restrictedExercises));
  const planWarnings     = workout.warnings || activeConditions.map(h => h.warning).filter(Boolean);

  // ── Estado principal ────────────────────────────────────────────────────
  const [exercises,    setExercises]    = useState(workout.exercises || []);
  const [currentSet,   setCurrentSet]   = useState(1);
  const [currentExIdx, setCurrentExIdx] = useState(0);
  const [phase,        setPhase]        = useState(PHASES.WARMUP);
  const [timeLeft,     setTimeLeft]     = useState(10);
  const [totalElapsed, setTotalElapsed] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [musicProgress,setMusicProgress]= useState(0);
  const [isPlaying,    setIsPlaying]    = useState(true);
  const [completedExs, setCompletedExs] = useState([]);
  const [totalCalories,setTotalCalories]= useState(0);
  const [pulseBeat,    setPulseBeat]    = useState(false);
  const [showWarnings, setShowWarnings] = useState(planWarnings.length > 0);
  const [showPicker,   setShowPicker]   = useState(false);
  const [showPanel,    setShowPanel]    = useState(false);
  const [confirmSkip,  setConfirmSkip]  = useState(false);
  const [showSpotify,  setShowSpotify]  = useState(false);

  // Playlists customizadas do usuário (do localStorage do perfil)
  const customPlaylists = useMemo(() =>
    JSON.parse(localStorage.getItem(`gym_spotify_${userId}`) || '{}'), [userId]);
  const spotifyUrl = useMemo(() =>
    getSpotifyEmbedUrl(genre, customPlaylists), [genre, customPlaylists]);

  // ── Registro de carga ──────────────────────────────────────────────────
  const [setLogs,    setSetLogs]   = useState([]); // [{exId, exName, set, weight, reps}]
  const [logWeight,  setLogWeight] = useState('');
  const [logReps,    setLogReps]   = useState('');
  const [logSaved,   setLogSaved]  = useState(false);
  const [showPrAlert, setShowPrAlert] = useState(false); // novo recorde!

  const intervalRef      = useRef(null);
  const beatRef          = useRef(null);
  const musicIntervalRef = useRef(null);
  const audioCtxRef      = useRef(null);
  const currentEx = exercises[currentExIdx];

  // ── Web Audio beep ─────────────────────────────────────────────────────
  const playBeep = useCallback((pattern = 'rest-end') => {
    try {
      if (!audioCtxRef.current)
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();
      if (pattern === 'ex-end') {
        // 2 tons descendentes — exercício terminou
        createBeep(660, 0.18, 0,    ctx);
        createBeep(520, 0.22, 0.22, ctx);
      } else if (pattern === 'rest-end') {
        // 3 tons ascendentes — hora de treinar!
        createBeep(660, 0.13, 0,    ctx);
        createBeep(780, 0.13, 0.18, ctx);
        createBeep(920, 0.25, 0.36, ctx);
      } else if (pattern === 'set-done') {
        // 4 tons vitória — série concluída
        createBeep(880,  0.10, 0,    ctx);
        createBeep(990,  0.10, 0.14, ctx);
        createBeep(1100, 0.10, 0.28, ctx);
        createBeep(1320, 0.30, 0.42, ctx);
      } else if (pattern === 'warning') {
        // 1 tom curto — aviso (3s restantes)
        createBeep(440, 0.12, 0, ctx);
      }
    } catch (e) { /* silencia erro se áudio não disponível */ }
  }, []);

  // ── Track ideal por exercício ──────────────────────────────────────────
  const getTrackFor = useCallback((ex) => {
    if (!ex) return null;
    return matchTrackToExercise(genre, ex.bpmMin || 100, ex.bpmMax || 140);
  }, [genre]);

  useEffect(() => { setCurrentTrack(getTrackFor(exercises[0])); }, []);

  // ── Progresso geral do treino ──────────────────────────────────────────
  const totalExSets    = exercises.length * sets;
  const overallProgress = Math.min(100, Math.round((completedExs.length / totalExSets) * 100));

  // ── Avança fase ────────────────────────────────────────────────────────
  const advancePhase = useCallback((skipCurrent = false) => {
    clearInterval(intervalRef.current);

    if (phase === PHASES.WARMUP) {
      playBeep('rest-end'); vibrate([100, 50, 100]);
      setPhase(PHASES.EXERCISE);
      setTimeLeft(exercises[0]?.duration || 45);
      setCurrentTrack(getTrackFor(exercises[0]));
      return;
    }
    if (phase === PHASES.EXERCISE || skipCurrent) {
      playBeep('ex-end'); vibrate([200, 100, 200]);
      setCompletedExs(prev => [...prev, { ...currentEx, set: currentSet }]);
      setTotalCalories(prev => prev + (currentEx?.calories || 5));
      setPhase(PHASES.REST);
      setTimeLeft(currentEx?.rest || 15);
      setLogSaved(false);
      return;
    }
    if (phase === PHASES.REST) {
      const nextIdx = currentExIdx + 1;
      if (nextIdx < exercises.length) {
        playBeep('rest-end'); vibrate([80, 40, 80, 40, 120]);
        setCurrentExIdx(nextIdx);
        setPhase(PHASES.EXERCISE);
        setTimeLeft(exercises[nextIdx]?.duration || 45);
        setCurrentTrack(getTrackFor(exercises[nextIdx]));
        setLogWeight(''); setLogReps(''); setLogSaved(false);
      } else if (currentSet < sets) {
        playBeep('set-done'); vibrate([200, 100, 200, 100, 400]);
        setCurrentSet(s => s + 1);
        setCurrentExIdx(0);
        setPhase(PHASES.SETREST);
        setTimeLeft(workout.restBetweenSets || 60);
      } else {
        playBeep('set-done'); vibrate([300, 100, 300, 100, 600]);
        setPhase(PHASES.COMPLETE);
        saveHistory();
      }
      return;
    }
    if (phase === PHASES.SETREST) {
      playBeep('rest-end');
      setCurrentExIdx(0);
      setPhase(PHASES.EXERCISE);
      setTimeLeft(exercises[0]?.duration || 45);
      setCurrentTrack(getTrackFor(exercises[0]));
      setLogWeight(''); setLogReps(''); setLogSaved(false);
    }
  }, [phase, currentExIdx, currentSet, exercises, sets, currentEx, workout, getTrackFor, playBeep]);

  function saveHistory() {
    const history = JSON.parse(localStorage.getItem(`gym_history_${userId}`) || '[]');
    const entry = {
      date: new Date().toISOString(),
      workoutName: `${workout.day || 'Treino'} — ${workout.category || ''}`,
      category: workout.category || '',
      duration: Math.round(totalElapsed / 60),
      calories: totalCalories,
      exercises: completedExs.length,
      logs: setLogs,
      isFree: !!workout.isFree,
    };
    history.unshift(entry);
    localStorage.setItem(`gym_history_${userId}`, JSON.stringify(history));

    // Verificar conquistas
    const plans = JSON.parse(localStorage.getItem(`gym_plans_${userId}`) || '[]');
    const prs   = JSON.parse(localStorage.getItem(`gym_prs_${userId}`)   || '{}');
    // Calcular streak com o histórico atualizado
    const dates = [...new Set(history.map(h => h.date))].sort().reverse();
    let streak = 0;
    for (let i = 0; i < dates.length; i++) {
      const d = new Date(dates[i]);
      const expected = new Date(Date.now() - i * 86400000);
      if (d.toDateString() === expected.toDateString()) streak++;
      else break;
    }
    const newAchs = checkNewAchievements(userId, { history, plans, prs, streak });
    if (newAchs.length > 0) {
      // Vibrar celebração e guardar para mostrar na tela de conclusão
      try { navigator.vibrate?.([100, 80, 100, 80, 100, 80, 500]); } catch {}
      sessionStorage.setItem('gym_new_achievements', JSON.stringify(newAchs));
    } else {
      sessionStorage.removeItem('gym_new_achievements');
    }
  }

  // ── Finalizar exercício agora (skip) ───────────────────────────────────
  const handleSkip = () => {
    if (phase !== PHASES.EXERCISE) { advancePhase(); return; }
    setConfirmSkip(true);
  };
  const confirmSkipNow = () => { setConfirmSkip(false); advancePhase(true); };

  // ── Trocar exercício ───────────────────────────────────────────────────
  const handleSwapExercise = (newEx) => {
    const updated = exercises.map((ex, i) => i === currentExIdx ? newEx : ex);
    setExercises(updated);
    setCurrentTrack(getTrackFor(newEx));
    setTimeLeft(newEx.duration || 45);
    setShowPicker(false);
    setIsPlaying(true);
  };

  // ── Registrar carga ────────────────────────────────────────────────────
  const handleLogLoad = () => {
    if (!logWeight && !logReps) return;
    const entry = {
      exId: currentEx?.id,
      exName: currentEx?.name,
      set: currentSet,
      weight: parseFloat(logWeight) || 0,
      reps: parseInt(logReps) || 0,
    };
    setSetLogs(prev => {
      const idx = prev.findIndex(l => l.exId === entry.exId && l.set === entry.set);
      if (idx !== -1) { const cp = [...prev]; cp[idx] = entry; return cp; }
      return [...prev, entry];
    });

    // ── Detecta PR ─────────────────────────────────────────────────────
    try {
      const prs = JSON.parse(localStorage.getItem(`gym_prs_${userId}`) || '{}');
      const prev = prs[entry.exId];
      const isNewPr =
        !prev ||
        (entry.weight > 0 && entry.weight > (prev.weight || 0)) ||
        (entry.weight === (prev.weight || 0) && entry.reps > (prev.reps || 0));
      if (isNewPr && (entry.weight > 0 || entry.reps > 0)) {
        prs[entry.exId] = {
          exName: entry.exName,
          weight: entry.weight,
          reps: entry.reps,
          date: new Date().toISOString(),
        };
        localStorage.setItem(`gym_prs_${userId}`, JSON.stringify(prs));
        setShowPrAlert(true);
        playBeep('set-done');
        vibrate([100, 80, 100, 80, 100, 80, 500]); // padrão especial para PR
        setTimeout(() => setShowPrAlert(false), 3500);
      }
    } catch (e) {}

    setLogSaved(true);
    setTimeout(() => setLogSaved(false), 2500);
  };

  // Busca último registro desse exercício em treinos anteriores
  const prevLog = useMemo(() => {
    if (!currentEx) return null;
    const history = JSON.parse(localStorage.getItem(`gym_history_${userId}`) || '[]');
    for (const session of history) {
      const found = (session.logs || []).find(l => l.exId === currentEx.id);
      if (found) return found;
    }
    return null;
  }, [currentEx, userId]);

  // Log atual desta sessão para este exercício
  const currentLog = setLogs.find(l => l.exId === currentEx?.id && l.set === currentSet);

  // ── Timers ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isPlaying || phase === PHASES.COMPLETE || showPicker) return;
    intervalRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t === 4) playBeep('warning');
        if (t <= 1) { advancePhase(); return 0; }
        return t - 1;
      });
      setTotalElapsed(e => e + 1);
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, phase, advancePhase, showPicker, playBeep]);

  useEffect(() => {
    if (!isPlaying || phase === PHASES.COMPLETE) return;
    musicIntervalRef.current = setInterval(() => {
      setMusicProgress(p => { const d = currentTrack?.duration || 200; return p >= d ? 0 : p + 1; });
    }, 1000);
    return () => clearInterval(musicIntervalRef.current);
  }, [isPlaying, currentTrack, phase]);

  useEffect(() => {
    if (!isPlaying || phase !== PHASES.EXERCISE || !currentTrack) return;
    const interval = Math.round(60000 / (currentTrack.bpm || 120));
    beatRef.current = setInterval(() => {
      setPulseBeat(true); setTimeout(() => setPulseBeat(false), 120);
    }, interval);
    return () => clearInterval(beatRef.current);
  }, [isPlaying, currentTrack, phase]);

  // ── Guards ─────────────────────────────────────────────────────────────
  if (showWarnings) return <HealthWarningScreen warnings={planWarnings} conditions={activeConditions} onContinue={() => setShowWarnings(false)} onBack={onFinish} />;
  if (phase === PHASES.COMPLETE) return (
    <CompletionScreen
      workout={workout} totalCalories={totalCalories} elapsed={totalElapsed}
      completedExs={completedExs} setLogs={setLogs} onFinish={onFinish} genreInfo={genreInfo}
    />
  );

  // ── Config visual da fase ──────────────────────────────────────────────
  const phaseConfig = {
    [PHASES.WARMUP]:  { label: 'AQUECIMENTO',       color: '#F59E0B', bg: '#F59E0B10' },
    [PHASES.EXERCISE]:{ label: 'EXERCÍCIO',          color: genreInfo.color, bg: genreInfo.color + '14' },
    [PHASES.REST]:    { label: 'DESCANSO',           color: '#06B6D4', bg: '#06B6D410' },
    [PHASES.SETREST]: { label: 'PAUSA ENTRE SÉRIES', color: '#8B5CF6', bg: '#8B5CF610' },
  };
  const pc = phaseConfig[phase];
  const totalDuration =
    phase === PHASES.WARMUP  ? 10 :
    phase === PHASES.EXERCISE ? (currentEx?.duration || 45) :
    phase === PHASES.REST     ? (currentEx?.rest || 15) :
    (workout.restBetweenSets || 60);
  const progressPct  = ((totalDuration - timeLeft) / totalDuration) * 100;
  const bpmMatchInfo = currentTrack?.bpmMatch ? getBpmMatchLabel(currentTrack.bpmMatch) : null;

  return (
    <div className="workout-session">
      {/* ── MODAL: Trocar Exercício ── */}
      {showPicker && (
        <ExercisePicker
          currentEx={currentEx} restricted={allRestricted}
          onSelect={handleSwapExercise} onClose={() => { setShowPicker(false); setIsPlaying(true); }}
          genreInfo={genreInfo}
        />
      )}

      {/* ── PAINEL: Lista de exercícios ── */}
      {showPanel && (
        <WorkoutPanel
          exercises={exercises} currentIdx={currentExIdx} completedExs={completedExs}
          currentSet={currentSet} sets={sets} setLogs={setLogs}
          onClose={() => setShowPanel(false)}
          onJump={(idx) => {
            setCurrentExIdx(idx);
            setPhase(PHASES.EXERCISE);
            setTimeLeft(exercises[idx]?.duration || 45);
            setCurrentTrack(getTrackFor(exercises[idx]));
            setShowPanel(false);
            setLogWeight(''); setLogReps(''); setLogSaved(false);
          }}
          phaseColor={genreInfo.color}
        />
      )}

      {/* ── CONFIRM SKIP ── */}
      {confirmSkip && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <p className="confirm-title">Finalizar exercício agora?</p>
            <p className="confirm-sub">O tempo restante será descartado e você irá para o descanso.</p>
            <div className="confirm-actions">
              <button className="btn-secondary" onClick={() => setConfirmSkip(false)}>Cancelar</button>
              <button className="btn-danger" onClick={confirmSkipNow}>Finalizar</button>
            </div>
          </div>
        </div>
      )}

      {/* ── HEADER ── */}
      <header className="session-header">
        <button className="btn-icon" onClick={() => { clearInterval(intervalRef.current); onFinish(); }} title="Sair">✕</button>
        <div className="session-title">
          <p className="session-day">{workout.day} — Série {currentSet}/{sets}</p>
          <p className="session-elapsed">{formatDuration(totalElapsed)} · {totalCalories} kcal</p>
        </div>
        <button className="btn-icon session-list-btn" onClick={() => setShowPanel(true)} title="Ver exercícios">☰</button>
      </header>

      {/* ── ALERTA DE NOVO RECORDE ── */}
      {showPrAlert && (
        <div className="pr-alert">
          <span className="pr-alert-icon" style={{ fontSize: 24, color: 'var(--gold)' }}>PR</span>
          <div>
            <p className="pr-alert-title">NOVO RECORDE PESSOAL!</p>
            <p className="pr-alert-sub">{currentEx?.name}</p>
          </div>
        </div>
      )}

      {/* ── BARRA DE PROGRESSO GERAL ── */}
      <div className="overall-progress-bar">
        <div
          className="overall-progress-fill"
          style={{ width: `${overallProgress}%`, backgroundColor: genreInfo.color }}
        />
        <span className="overall-progress-label">{overallProgress}%</span>
      </div>

      {/* ── FASE BANNER ── */}
      <div className="phase-banner" style={{ backgroundColor: pc.bg, borderColor: pc.color }}>
        <span className="phase-dot" style={{ background: pc.color }} />
        <span className="phase-label" style={{ color: pc.color }}>{pc.label}</span>
        {activeConditions.length > 0 && (
          <span className="adapted-badge">Adaptado</span>
        )}
      </div>

      {/* ── TIMER ── */}
      <div className="timer-section">
        <div className={`timer-ring ${pulseBeat && phase === PHASES.EXERCISE ? 'beat' : ''}`}>
          <svg viewBox="0 0 120 120" className="ring-svg">
            <circle cx="60" cy="60" r="54" fill="none" stroke="#2E2E50" strokeWidth="8" />
            <circle cx="60" cy="60" r="54" fill="none" stroke={pc.color} strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 54}`}
              strokeDashoffset={`${2 * Math.PI * 54 * (1 - progressPct / 100)}`}
              transform="rotate(-90 60 60)"
              style={{ transition: 'stroke-dashoffset 1s linear' }}
            />
          </svg>
          <div className="timer-center">
            <span className={`timer-time ${timeLeft <= 3 && timeLeft > 0 ? 'timer-urgent' : ''}`}>
              {formatDuration(timeLeft)}
            </span>
            <span className="timer-sub-label">{pc.label}</span>
          </div>
        </div>
      </div>

      {/* ── ACTION BAR (estilo Hevy) — só no EXERCÍCIO ── */}
      {phase === PHASES.EXERCISE && (
        <div className="action-bar">
          <button className="action-btn action-swap" onClick={() => { setIsPlaying(false); setShowPicker(true); }}>
            <span className="action-icon">↻</span>
            <span>Trocar</span>
          </button>
          <button className="action-btn action-pause" onClick={() => setIsPlaying(p => !p)}>
            <span className="action-icon">{isPlaying ? '⏸' : '▶'}</span>
            <span>{isPlaying ? 'Pausar' : 'Retomar'}</span>
          </button>
          <button className="action-btn action-skip" onClick={handleSkip}>
            <span className="action-icon">⏭</span>
            <span>Finalizar</span>
          </button>
        </div>
      )}

      {/* ── CARD DO EXERCÍCIO ── */}
      {phase === PHASES.EXERCISE && currentEx && (
        <>
          <div className="exercise-card" style={{ borderColor: pc.color }}>
            <div className="ex-card-top">
              <div className="ex-cat-dot" style={{ width: 4, height: 48, borderRadius: 2, background: pc.color, flexShrink: 0 }} />
              <div className="ex-info">
                <div className="ex-name-row">
                  <h3>{currentEx.name}</h3>
                  {currentEx.adapts && <span className="ex-adapted-tag">Adaptado</span>}
                </div>
                <p className="ex-desc">{currentEx.description}</p>
                <div className="ex-bpm-hint">
                  BPM ideal: <strong>{currentEx.bpmMin}–{currentEx.bpmMax}</strong>
                </div>
                <div className="ex-muscles">
                  {(currentEx.muscles || []).map((m, i) => <span key={i} className="muscle-tag">{m}</span>)}
                </div>
              </div>
            </div>
            <div className="ex-progress-row">
              <span className="ex-count">{currentExIdx + 1} de {exercises.length}</span>
              <div className="ex-mini-bar">
                {exercises.map((_, i) => (
                  <div key={i}
                    className={`ex-dot ${i < currentExIdx ? 'done' : i === currentExIdx ? 'current' : ''}`}
                    style={i === currentExIdx ? { backgroundColor: pc.color } : {}}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── REGISTRO DE CARGA ── */}
          <div className="load-logger">
            <div className="load-logger-title">
              <span>📊</span>
              <span>Registrar Carga — Série {currentSet}</span>
              {prevLog && (
                <span className="load-prev-badge">
                  Anterior: {prevLog.weight > 0 ? `${prevLog.weight}kg × ` : ''}{prevLog.reps > 0 ? `${prevLog.reps} reps` : '—'}
                </span>
              )}
            </div>
            <div className="load-inputs">
              <div className="load-input-group">
                <label>Peso (kg)</label>
                <input
                  type="number" min="0" step="0.5" placeholder="0"
                  value={logWeight}
                  onChange={e => { setLogWeight(e.target.value); setLogSaved(false); }}
                />
              </div>
              <div className="load-input-group">
                <label>Repetições</label>
                <input
                  type="number" min="1" placeholder="0"
                  value={logReps}
                  onChange={e => { setLogReps(e.target.value); setLogSaved(false); }}
                />
              </div>
              <button
                className={`log-btn ${logSaved ? 'log-saved' : ''}`}
                onClick={handleLogLoad}
                style={{ backgroundColor: logSaved ? '#10B981' : genreInfo.color }}
              >
                {logSaved ? '✓' : 'Log'}
              </button>
            </div>
            {currentLog && (
              <p className="load-current-note">
                ✓ Registrado: {currentLog.weight > 0 ? `${currentLog.weight}kg × ` : ''}{currentLog.reps > 0 ? `${currentLog.reps} reps` : 'sem peso'}
              </p>
            )}
          </div>
        </>
      )}

      {/* ── REST / SET REST ── */}
      {phase === PHASES.REST && (
        <div className="rest-card">
          <div className="rest-next">
            <span className="rest-next-label">A SEGUIR:</span>
            <p className="rest-next-name">
              {exercises[currentExIdx + 1]?.name || (currentSet < sets ? 'Nova Série' : 'Treino completo!')}
            </p>
            {exercises[currentExIdx + 1] && (
              <p className="rest-sub">{exercises[currentExIdx + 1]?.description}</p>
            )}
          </div>
          <button className="rest-skip-btn" onClick={() => advancePhase()}>Pular descanso ⏭</button>
        </div>
      )}
      {phase === PHASES.SETREST && (
        <div className="rest-card set-rest">
          <p className="set-done-label">Série {currentSet} concluída</p>
          <p className="rest-sub">Respire fundo — próxima série em breve</p>
          <button className="rest-skip-btn" onClick={() => advancePhase()}>Iniciar próxima série ⏭</button>
        </div>
      )}

      {/* ── SPOTIFY PLAYER ── */}
      {spotifyUrl && (
        <div className={`spotify-section ${showSpotify ? 'spotify-open' : ''}`}>
          <button
            className="spotify-toggle"
            onClick={() => setShowSpotify(v => !v)}
            style={{ borderColor: '#1DB954' }}
          >
            <span className="spotify-logo">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#1DB954">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
            </span>
            <span>{showSpotify ? 'Fechar Spotify' : `Tocar no Spotify — ${genreInfo.label}`}</span>
            <span className="spotify-arrow">{showSpotify ? '▲' : '▼'}</span>
          </button>
          {showSpotify && (
            <div className="spotify-embed-wrap">
              <iframe
                src={spotifyUrl}
                width="100%"
                height="352"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="spotify-iframe"
                title="Spotify Player"
              />
            </div>
          )}
        </div>
      )}

      {/* ── MUSIC PLAYER ── */}
      <div className="music-player">
        <div className="music-header">
          <span className="music-genre-badge" style={{ backgroundColor: 'var(--primary-dim)', color: 'var(--primary)' }}>
            {genreInfo.label}
          </span>
          {currentTrack && (
            <div className="music-bpm-group">
              <span className="music-bpm-value">{currentTrack.bpm} BPM</span>
              {bpmMatchInfo && phase === PHASES.EXERCISE && (
                <span className="music-bpm-match" style={{ color: bpmMatchInfo.color }}>{bpmMatchInfo.label}</span>
              )}
            </div>
          )}
        </div>
        {currentTrack && (
          <>
            <div className="music-track-info">
              <div className={`music-disc ${isPlaying ? 'spinning' : ''}`} style={{ borderColor: genreInfo.color, background: genreInfo.color + '22' }} />
              <div className="music-meta">
                <p className="music-title">{currentTrack.title}</p>
                <p className="music-artist">{currentTrack.artist}</p>
                {phase === PHASES.EXERCISE && currentEx && (
                  <p className="music-sync-label">Sincronizado com <em>{currentEx.name}</em></p>
                )}
              </div>
              <button className="music-play-btn" onClick={() => setIsPlaying(p => !p)} style={{ backgroundColor: genreInfo.color }}>
                {isPlaying ? '⏸' : '▶'}
              </button>
            </div>
            <div className="music-progress-bar">
              <span>{formatDuration(musicProgress)}</span>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${(musicProgress / currentTrack.duration) * 100}%`, backgroundColor: genreInfo.color }} />
              </div>
              <span>{formatDuration(currentTrack.duration)}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── Filtros de equipamento (shared) ───────────────────────────────────────
const EQUIPMENT_FILTERS = {
  all:     { label: 'Todos',    color: '#00C27A', match: null },
  free:    { label: 'Sem Peso', color: '#00C27A', match: ['peso_corporal','banco','paralelas','barra_fixa'] },
  dumbell: { label: 'Haltere',  color: '#00C27A', match: ['haltere','kettlebell'] },
  barbell: { label: 'Barra',    color: '#00C27A', match: ['barra','smith'] },
  machine: { label: 'Máquina',  color: '#00C27A', match: ['maquina'] },
  cable:   { label: 'Cabo',     color: '#00C27A', match: ['cabo'] },
  other:   { label: 'Outros',   color: '#00C27A', match: ['elastico','roda_abdominal','kettlebell','bola','faixa'] },
};

const EQ_BADGE = {
  peso_corporal:  { label: 'Corpo Livre' },
  banco:          { label: 'Banco'       },
  paralelas:      { label: 'Paralelas'   },
  barra_fixa:     { label: 'Barra Fixa'  },
  haltere:        { label: 'Haltere'     },
  kettlebell:     { label: 'Kettlebell'  },
  barra:          { label: 'Barra'       },
  smith:          { label: 'Smith'       },
  maquina:        { label: 'Máquina'     },
  cabo:           { label: 'Cabo'        },
  elastico:       { label: 'Elástico'    },
  roda_abdominal: { label: 'Roda Abd.'   },
};

// ── MODAL: Trocar Exercício (estilo Hevy) ──────────────────────────────────
function ExercisePicker({ currentEx, restricted, onSelect, onClose, genreInfo }) {
  const [search,    setSearch]    = useState('');
  const [catFilter, setCatFilter] = useState('all');
  const [eqFilter,  setEqFilter]  = useState('all');
  const [detailEx,  setDetailEx]  = useState(null);

  const allExercises = useMemo(() => {
    const list = [];
    Object.entries(exerciseLibrary).forEach(([cat, exs]) => {
      exs.forEach(ex => { if (!restricted.has(ex.id)) list.push({ ...ex, category: cat }); });
    });
    return list;
  }, [restricted]);

  const filtered = useMemo(() => {
    return allExercises.filter(ex => {
      const matchCat    = catFilter === 'all' || ex.category === catFilter;
      const eqConf      = EQUIPMENT_FILTERS[eqFilter];
      const matchEq     = eqFilter === 'all' || !eqConf.match || eqConf.match.includes(ex.equipment);
      const matchSearch = !search || ex.name.toLowerCase().includes(search.toLowerCase()) ||
        (ex.muscles || []).some(m => m.toLowerCase().includes(search.toLowerCase())) ||
        (EQ_BADGE[ex.equipment]?.label || '').toLowerCase().includes(search.toLowerCase());
      return matchCat && matchEq && matchSearch;
    });
  }, [allExercises, catFilter, eqFilter, search]);

  const categories  = ['all', 'abs', 'chest', 'back', 'shoulders', 'arms', 'legs', 'glutes', 'cardio', 'strength', 'hiit', 'flexibility', 'adapted'];
  const equipments  = Object.keys(EQUIPMENT_FILTERS);

  const eqCounts = useMemo(() => {
    const base = allExercises.filter(ex => catFilter === 'all' || ex.category === catFilter);
    return Object.fromEntries(equipments.map(key => {
      const conf = EQUIPMENT_FILTERS[key];
      const count = conf.match ? base.filter(ex => conf.match.includes(ex.equipment)).length : base.length;
      return [key, count];
    }));
  }, [allExercises, catFilter]);

  return (
    <>
    {detailEx && (
      <ExerciseDetailModal
        ex={detailEx}
        onClose={() => setDetailEx(null)}
        onAction={detailEx.id !== currentEx?.id ? (ex) => { onSelect(ex); onClose(); } : null}
        actionLabel="↔ Usar este exercício"
      />
    )}
    <div className="picker-overlay">
      <div className="picker-sheet">
        <div className="picker-header">
          <div>
            <h3>Trocar Exercício</h3>
            <p className="picker-sub">Substituindo: <strong>{currentEx?.name}</strong></p>
          </div>
          <button className="picker-close" onClick={onClose}>✕</button>
        </div>

        {/* Busca */}
        <div className="picker-search-bar">
          <span className="search-icon" style={{ color: 'var(--text3)', fontSize: 14 }}>⌕</span>
          <input type="text" placeholder="Nome, músculo ou equipamento..." value={search}
            onChange={e => setSearch(e.target.value)} autoFocus />
          {search && <button className="search-clear" onClick={() => setSearch('')}>✕</button>}
        </div>

        {/* Filtro: Categoria */}
        <p className="picker-filter-label">Grupo muscular</p>
        <div className="picker-cats">
          {categories.map(cat => {
            const info = cat === 'all'
              ? { label: 'Todos', color: '#00C27A' }
              : CATEGORY_LABELS[cat] || { label: cat, color: '#00C27A' };
            return (
              <button key={cat}
                className={`cat-chip ${catFilter === cat ? 'active' : ''}`}
                style={{}}
                onClick={() => setCatFilter(cat)}
              >
                {info.label}
              </button>
            );
          })}
        </div>

        {/* Filtro: Equipamento */}
        <p className="picker-filter-label">Equipamento</p>
        <div className="picker-eq-filters">
          {equipments.map(key => {
            const info  = EQUIPMENT_FILTERS[key];
            const count = eqCounts[key] || 0;
            const active = eqFilter === key;
            return (
              <button key={key}
                className={`eq-chip ${active ? 'active' : ''} ${count === 0 ? 'disabled' : ''}`}
                style={{}}
                onClick={() => count > 0 && setEqFilter(key)}
                disabled={count === 0}
              >
                <span>{info.label}</span>
                {count > 0 && <span className="eq-chip-count">{count}</span>}
              </button>
            );
          })}
        </div>

        {/* Contador + reset */}
        <div className="picker-count-row">
          <p className="picker-count">{filtered.length} exercício{filtered.length !== 1 ? 's' : ''}</p>
          {(catFilter !== 'all' || eqFilter !== 'all' || search) && (
            <button className="picker-reset" onClick={() => { setCatFilter('all'); setEqFilter('all'); setSearch(''); }}>
              ✕ Limpar filtros
            </button>
          )}
        </div>

        <div className="picker-list">
          {filtered.length === 0 ? (
            <div className="picker-empty"><p>Nenhum exercício encontrado</p><p>Tente outro termo ou filtro</p></div>
          ) : (
            filtered.map(ex => {
              const catInfo   = CATEGORY_LABELS[ex.category] || { color: '#00C27A', label: ex.category };
              const eqInfo    = EQ_BADGE[ex.equipment] || null;
              const isCurrent = ex.id === currentEx?.id;
              return (
                <div key={ex.id} className={`picker-item ${isCurrent ? 'picker-item-current' : ''}`}>
                  <div className="picker-item-dot" style={{ background: catInfo.color }} />
                  <div className="picker-item-info" onClick={() => setDetailEx(ex)} style={{ cursor: 'pointer', flex: 1 }}>
                    <div className="picker-item-name-row">
                      <span className="picker-item-name">{ex.name}</span>
                      {isCurrent && <span className="current-tag">Atual</span>}
                    </div>
                    <div className="picker-item-meta">
                      <span className="picker-cat-badge">{catInfo.label}</span>
                      {eqInfo && <span className="picker-eq-badge">{eqInfo.label}</span>}
                      <span className="picker-bpm">{ex.bpmMin}–{ex.bpmMax} BPM</span>
                    </div>
                    <div className="picker-muscles">
                      {(ex.muscles || []).slice(0, 3).map((m, i) => <span key={i} className="muscle-tag-sm">{m}</span>)}
                    </div>
                  </div>
                  <div className="picker-item-actions">
                    <button className="picker-info-btn" onClick={() => setDetailEx(ex)} title="Ver detalhes">i</button>
                    {!isCurrent && (
                      <button className="picker-swap-btn" onClick={() => { onSelect(ex); onClose(); }}
                        title="Usar este exercício">↔</button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
    </>
  );
}

// ── PAINEL: Lista de exercícios do treino ─────────────────────────────────
function WorkoutPanel({ exercises, currentIdx, completedExs, currentSet, sets, setLogs, onClose, onJump, phaseColor }) {
  return (
    <div className="picker-overlay">
      <div className="picker-sheet">
        <div className="picker-header">
          <div>
            <h3>Exercícios do Treino</h3>
            <p className="picker-sub">Série {currentSet} de {sets}</p>
          </div>
          <button className="picker-close" onClick={onClose}>✕</button>
        </div>
        <div className="panel-progress">
          <div className="panel-progress-fill" style={{ width: `${(currentIdx / exercises.length) * 100}%`, backgroundColor: phaseColor }} />
        </div>
        <div className="picker-list">
          {exercises.map((ex, i) => {
            const done    = i < currentIdx;
            const current = i === currentIdx;
            const log     = setLogs.find(l => l.exId === ex.id && l.set === currentSet);
            return (
              <button key={i}
                className={`panel-item ${done ? 'panel-done' : ''} ${current ? 'panel-current' : ''}`}
                style={current ? { borderColor: phaseColor, backgroundColor: phaseColor + '18' } : {}}
                onClick={() => i !== currentIdx && onJump(i)}
              >
                <div className="panel-item-status">
                  {done   ? <span className="status-done">✓</span>
                  : current ? <span className="status-current" style={{ backgroundColor: phaseColor }}>▶</span>
                  :           <span className="status-pending">{i + 1}</span>}
                </div>
                <div className="panel-item-info">
                  <p className="panel-item-name">{ex.name}</p>
                  <p className="panel-item-meta">{ex.duration}s · {ex.bpmMin}–{ex.bpmMax} BPM</p>
                  {log && (
                    <p className="panel-item-log">
                      📊 {log.weight > 0 ? `${log.weight}kg × ` : ''}{log.reps > 0 ? `${log.reps} reps` : 'registrado'}
                    </p>
                  )}
                </div>
                {current && <span className="panel-now-badge" style={{ backgroundColor: phaseColor }}>Agora</span>}
                {!done && !current && <span className="panel-jump-btn">Ir ›</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Aviso de saúde ────────────────────────────────────────────────────────
function HealthWarningScreen({ warnings, conditions, onContinue, onBack }) {
  return (
    <div className="health-warning-screen">
      <div className="hw-content">
        <div className="hw-icon-bar" />
        <h2>Treino Adaptado para Você</h2>
        <p className="hw-sub">Identificamos as seguintes condições no seu perfil:</p>
        <div className="hw-conditions">
          {conditions.map(c => (
            <span key={c.id} className="hw-condition-tag" style={{ borderColor: c.color, color: c.color }}>
              {c.label}
            </span>
          ))}
        </div>
        <div className="hw-warnings">
          {warnings.map((w, i) => <div key={i} className="hw-warning-item"><p>{w}</p></div>)}
        </div>
        <div className="hw-disclaimer">
          <p>Este app não substitui orientação médica. Em caso de dúvida, consulte um profissional de saúde antes de iniciar qualquer atividade física.</p>
        </div>
        <div className="hw-actions">
          <button className="btn-secondary" onClick={onBack}>← Voltar</button>
          <button className="btn-primary" onClick={onContinue}>Entendi — Iniciar Treino</button>
        </div>
      </div>
    </div>
  );
}

// ── Conclusão ─────────────────────────────────────────────────────────────
function CompletionScreen({ workout, totalCalories, elapsed, completedExs, setLogs, onFinish, genreInfo }) {
  const [copied, setCopied] = useState(false);
  const uniqueExs = [...new Set(completedExs.map(e => e.name))];

  // Conquistas desbloqueadas nessa sessão
  const newAchs = useMemo(() => {
    try { return JSON.parse(sessionStorage.getItem('gym_new_achievements') || '[]'); } catch { return []; }
  }, []);

  const handleShare = async () => {
    const lines = [
      `🏆 Treino concluído no GymBeat!`,
      ``,
      `${workout.day}${workout.category ? ` — ${workout.category.toUpperCase()}` : ''}`,
      `Duração: ${formatDuration(elapsed)}`,
      `Calorias: ${totalCalories} kcal`,
      `Séries: ${completedExs.length}`,
      `Ritmo: ${genreInfo.label}`,
    ];
    if (setLogs.length > 0) {
      lines.push(``, `Cargas:`);
      setLogs.forEach(l => {
        const val = [l.weight > 0 ? `${l.weight}kg` : '', l.reps > 0 ? `${l.reps} reps` : ''].filter(Boolean).join(' × ');
        lines.push(`  • ${l.exName}: ${val}`);
      });
    }
    lines.push(``, `💪 Treinou no ritmo certo com GymBeat!`);
    const text = lines.join('\n');

    try {
      if (navigator.share) {
        await navigator.share({ title: 'GymBeat — Treino Concluído', text });
      } else {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch (e) {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch {}
    }
  };

  return (
    <div className="completion-screen">
      <div className="completion-content">
        <div className="completion-emoji" style={{ fontSize: 48, fontWeight: 900, color: 'var(--gold)', letterSpacing: '-0.02em' }}>GG</div>
        <h2>Treino Concluído!</h2>
        <p className="comp-subtitle">Você arrasou no treino de {workout.day}!</p>

        <div className="completion-stats">
          <div className="comp-stat">
            <span className="cs-value">{formatDuration(elapsed)}</span>
            <span className="cs-label">Duração</span>
          </div>
          <div className="comp-stat">
            <span className="cs-value">{totalCalories}</span>
            <span className="cs-label">Calorias</span>
          </div>
          <div className="comp-stat">
            <span className="cs-value">{completedExs.length}</span>
            <span className="cs-label">Séries</span>
          </div>
        </div>

        {setLogs.length > 0 && (
          <div className="comp-logs">
            <h4>Cargas Registradas</h4>
            <div className="comp-logs-list">
              {setLogs.map((log, i) => (
                <div key={i} className="comp-log-item">
                  <span className="comp-log-name">{log.exName}</span>
                  <span className="comp-log-values">
                    {log.weight > 0 ? `${log.weight}kg` : ''}
                    {log.weight > 0 && log.reps > 0 ? ' × ' : ''}
                    {log.reps > 0 ? `${log.reps} reps` : ''}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="completion-genre">
          <p>Treinou no ritmo de</p>
          <span className="genre-badge" style={{ backgroundColor: 'var(--primary)' }}>{genreInfo.label}</span>
        </div>

        <div className="comp-exercises">
          {uniqueExs.map((name, i) => <span key={i} className="comp-ex-chip">✓ {name}</span>)}
        </div>

        {/* Conquistas desbloqueadas */}
        {newAchs.length > 0 && (
          <div className="comp-achievements">
            <p className="comp-ach-title">Conquista{newAchs.length > 1 ? 's' : ''} Desbloqueada{newAchs.length > 1 ? 's' : ''}!</p>
            {newAchs.map(a => (
              <div key={a.id} className="comp-ach-item">
                <span className="comp-ach-badge">{a.title.charAt(0)}</span>
                <div>
                  <p className="comp-ach-name">{a.title}</p>
                  <p className="comp-ach-desc">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Compartilhar */}
        <button className={`share-btn ${copied ? 'share-btn-copied' : ''}`} onClick={handleShare}>
          {copied ? '✓ Copiado!' : 'Compartilhar Treino'}
        </button>

        <button className="btn-primary btn-full" onClick={onFinish}>Voltar ao Início</button>
      </div>
    </div>
  );
}
