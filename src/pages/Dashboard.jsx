import { useState, useMemo } from 'react';
import { generateWorkoutPlan } from '../data/exercises';
import { musicGenres } from '../data/music';

export default function Dashboard({ user, onStartWorkout, onCreatePlan, onLogout, onOpenProfile, onFreeWorkout, onOpenAchievements, theme, toggleTheme }) {
  const profile = user.profile || {};
  const [plans, setPlans] = useState(() => JSON.parse(localStorage.getItem(`gym_plans_${user.id}`) || '[]'));
  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem(`gym_history_${user.id}`) || '[]'));
  const [activeTab, setActiveTab] = useState('home');

  const primaryGenre = musicGenres.find(g => g.id === (profile.musicGenres || [])[0]);
  const totalMinutes = history.reduce((acc, h) => acc + (h.duration || 0), 0);
  const totalCalories = history.reduce((acc, h) => acc + (h.calories || 0), 0);
  const streak = calculateStreak(history);

  function calculateStreak(hist) {
    if (!hist.length) return 0;
    const dates = [...new Set(hist.map(h => h.date))].sort().reverse();
    let count = 0;
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (dates[0] !== today && dates[0] !== yesterday) return 0;
    for (let i = 0; i < dates.length; i++) {
      const d = new Date(dates[i]);
      const expected = new Date(Date.now() - i * 86400000);
      if (d.toDateString() === expected.toDateString()) count++;
      else break;
    }
    return count;
  }

  const handleCreatePlan = () => {
    const plan = generateWorkoutPlan(profile);
    plan.id = Date.now();
    const updated = [plan, ...plans];
    localStorage.setItem(`gym_plans_${user.id}`, JSON.stringify(updated));
    setPlans(updated);
    onCreatePlan(plan);
  };

  // Converte getDay() (0=Dom, 1=Seg...6=Sáb) para índice do plano (0=Seg, 1=Ter...6=Dom)
  const todayDayIdx = (new Date().getDay() + 6) % 7;
  const todayWorkout = plans[0]?.days?.[todayDayIdx];
  const hasPlan = plans.length > 0;
  // Próximo treino (para dias de descanso)
  const nextWorkout = hasPlan && !todayWorkout
    ? (() => {
        const days = plans[0].days || [];
        for (let i = 1; i <= 7; i++) {
          const candidate = days[(todayDayIdx + i) % 7];
          if (candidate) return candidate;
        }
        return days[0];
      })()
    : null;

  return (
    <div className="dashboard">
      <header className="dash-header">
        <div className="dash-user">
          <div className="avatar">{user.name?.[0]?.toUpperCase()}</div>
          <div>
            <p className="dash-greeting">Olá, {user.name?.split(' ')[0]}! 👋</p>
            <p className="dash-subtitle">
              {primaryGenre ? `${primaryGenre.emoji} ${primaryGenre.label}` : 'Configure seu perfil'}
            </p>
          </div>
        </div>
        <button className="theme-toggle" onClick={toggleTheme} title="Alternar tema">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <button className="btn-icon" onClick={onOpenProfile} title="Perfil">⚙️</button>
      </header>

      <nav className="dash-nav">
        {[
          { id: 'home',      label: '🏠 Início'   },
          { id: 'planos',    label: '📋 Planos'   },
          { id: 'historico', label: '📊 Histórico'},
          { id: 'evolucao',  label: '📈 Evolução' },
        ].map(({ id, label }) => (
          <button
            key={id}
            className={activeTab === id ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActiveTab(id)}
          >
            {label}
          </button>
        ))}
      </nav>

      <main className="dash-main">
        {activeTab === 'home' && (
          <>
            <div className="stats-row">
              <StatCard icon="🔥" value={streak} label="Dias seguidos" color="#FF6B35" />
              <StatCard icon="⏱️" value={Math.round(totalMinutes)} label="Minutos totais" color="#8B5CF6" />
              <StatCard icon="💪" value={history.length} label="Treinos feitos" color="#06B6D4" />
              <StatCard icon="🎵" value={totalCalories} label="Cal. queimadas" color="#EC4899" />
            </div>

            {todayWorkout ? (
              <div className="today-card">
                <div className="today-header">
                  <div>
                    <p className="today-label">TREINO DE HOJE</p>
                    <h3>{todayWorkout.day} — {todayWorkout.category?.toUpperCase()}</h3>
                    <p>{todayWorkout.exercises?.length} exercícios · {todayWorkout.sets} séries · ~{Math.round(todayWorkout.totalTime / 60)} min</p>
                  </div>
                  <span className="today-emoji">🏋️</span>
                </div>
                <div className="exercise-preview">
                  {todayWorkout.exercises?.slice(0, 3).map((ex, i) => (
                    <span key={i} className="ex-chip">{ex.gif} {ex.name}</span>
                  ))}
                  {todayWorkout.exercises?.length > 3 && (
                    <span className="ex-chip">+{todayWorkout.exercises.length - 3}</span>
                  )}
                </div>
                <button className="btn-primary btn-full" onClick={() => onStartWorkout(todayWorkout, profile)}>
                  🎵 Iniciar Treino com Música
                </button>
              </div>
            ) : hasPlan ? (
              <div className="today-card rest-day-card">
                <div className="today-header">
                  <div>
                    <p className="today-label">HOJE</p>
                    <h3>😴 Dia de Descanso</h3>
                    <p>Aproveite para recuperar a energia!</p>
                  </div>
                  <span className="today-emoji">🛌</span>
                </div>
                {nextWorkout && (
                  <div className="next-workout-preview">
                    <p className="next-label">PRÓXIMO TREINO</p>
                    <div className="next-workout-info">
                      <span className="next-day">{nextWorkout.day}</span>
                      <span className="next-cat">— {nextWorkout.category?.toUpperCase()}</span>
                    </div>
                    <div className="exercise-preview" style={{ marginTop: '8px' }}>
                      {nextWorkout.exercises?.slice(0, 3).map((ex, i) => (
                        <span key={i} className="ex-chip">{ex.gif} {ex.name}</span>
                      ))}
                      {nextWorkout.exercises?.length > 3 && (
                        <span className="ex-chip">+{nextWorkout.exercises.length - 3}</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="empty-today">
                <p>Nenhum plano criado ainda</p>
                <button className="btn-primary" onClick={handleCreatePlan}>
                  ✨ Criar Meu Plano Personalizado
                </button>
              </div>
            )}

            {/* Conquistas */}
            <button className="free-workout-btn achievements-btn" onClick={onOpenAchievements}>
              <span className="fw-icon">🏅</span>
              <div className="fw-text">
                <span className="fw-title">Conquistas</span>
                <span className="fw-sub">Veja seus badges e progresso</span>
              </div>
              <span className="fw-arrow">›</span>
            </button>

            {/* Treino Livre */}
            <button className="free-workout-btn" onClick={onFreeWorkout}>
              <span className="fw-icon">🎲</span>
              <div className="fw-text">
                <span className="fw-title">Treino Livre</span>
                <span className="fw-sub">Monte seu treino do zero, na hora</span>
              </div>
              <span className="fw-arrow">›</span>
            </button>

            <div className="genre-section">
              <h3>Seus Gêneros</h3>
              <div className="genre-chips">
                {(profile.musicGenres || []).map(gId => {
                  const g = musicGenres.find(x => x.id === gId);
                  return g ? (
                    <span key={gId} className="genre-chip" style={{ backgroundColor: g.color + '33', borderColor: g.color }}>
                      {g.emoji} {g.label}
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          </>
        )}

        {activeTab === 'planos' && (
          <div className="plans-tab">
            <div className="plans-header">
              <h3>Meus Planos de Treino</h3>
              <button className="btn-primary" onClick={handleCreatePlan}>+ Novo Plano</button>
            </div>
            {plans.length === 0 ? (
              <div className="empty-state">
                <p className="empty-icon">📋</p>
                <p>Nenhum plano criado</p>
                <button className="btn-primary" onClick={handleCreatePlan}>Criar Plano</button>
              </div>
            ) : (
              plans.map((plan, i) => (
                <PlanCard key={plan.id || i} plan={plan} onStart={(day) => onStartWorkout(day, profile)} />
              ))
            )}
          </div>
        )}

        {activeTab === 'evolucao' && (
          <EvolutionTab userId={user.id} />
        )}

        {activeTab === 'historico' && (
          <div className="history-tab">
            <h3>Histórico de Treinos</h3>
            {history.length === 0 ? (
              <div className="empty-state">
                <p className="empty-icon">📊</p>
                <p>Nenhum treino registrado ainda</p>
                <p className="empty-sub">Complete seu primeiro treino!</p>
              </div>
            ) : (
              <>
                <WeeklyChart history={history} />
                <div className="history-list">
                  {history.slice(0, 20).map((h, i) => (
                    <div key={i} className="history-item">
                      <div className="hist-left">
                        <span className="hist-icon">💪</span>
                        <div>
                          <p className="hist-name">{h.workoutName || 'Treino'}</p>
                          <p className="hist-date">{new Date(h.date).toLocaleDateString('pt-BR')}</p>
                        </div>
                      </div>
                      <div className="hist-stats">
                        <span>⏱ {h.duration || 0} min</span>
                        <span>🔥 {h.calories || 0} cal</span>
                        {h.exercises > 0 && <span>💪 {h.exercises} séries</span>}
                      </div>
                      {h.logs && h.logs.length > 0 && (
                        <div className="hist-logs">
                          {h.logs.map((log, j) => (
                            <span key={j} className="hist-log-chip">
                              {log.exName}: {log.weight > 0 ? `${log.weight}kg` : ''}{log.weight > 0 && log.reps > 0 ? '×' : ''}{log.reps > 0 ? `${log.reps}r` : ''}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

// ── Gráfico semanal de atividade ──────────────────────────────────────────
function WeeklyChart({ history }) {
  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const today = new Date();

  // Monta os últimos 7 dias
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (6 - i));
    return {
      label: i === 6 ? 'Hoje' : dayNames[d.getDay()],
      dateStr: d.toDateString(),
      isToday: i === 6,
    };
  });

  // Conta calorias e minutos por dia
  const byDay = {};
  history.forEach(h => {
    const ds = new Date(h.date).toDateString();
    if (!byDay[ds]) byDay[ds] = { cal: 0, min: 0, count: 0 };
    byDay[ds].cal   += h.calories || 0;
    byDay[ds].min   += h.duration || 0;
    byDay[ds].count += 1;
  });

  const maxCal = Math.max(...days.map(d => byDay[d.dateStr]?.cal || 0), 1);

  // Totais da semana
  const weekCal = days.reduce((acc, d) => acc + (byDay[d.dateStr]?.cal || 0), 0);
  const weekMin = days.reduce((acc, d) => acc + (byDay[d.dateStr]?.min || 0), 0);
  const weekCount = days.reduce((acc, d) => acc + (byDay[d.dateStr]?.count || 0), 0);

  return (
    <div className="weekly-chart">
      <div className="chart-header">
        <h4>📈 Últimos 7 Dias</h4>
        <div className="chart-summary">
          <span>🔥 {weekCal} cal</span>
          <span>⏱ {weekMin} min</span>
          <span>💪 {weekCount} treino{weekCount !== 1 ? 's' : ''}</span>
        </div>
      </div>
      <div className="chart-bars">
        {days.map((d, i) => {
          const data = byDay[d.dateStr];
          const pct  = data ? (data.cal / maxCal) * 100 : 0;
          return (
            <div key={i} className="chart-col">
              <div className="chart-bar-wrap">
                {data && <span className="chart-val">{data.cal}</span>}
                <div
                  className={`chart-bar ${d.isToday ? 'chart-bar-today' : ''}`}
                  style={{ height: `${Math.max(pct, data ? 8 : 0)}%` }}
                />
              </div>
              <span className={`chart-day-label ${d.isToday ? 'chart-today-label' : ''}`}>{d.label}</span>
              {data && <span className="chart-dot" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StatCard({ icon, value, label, color }) {
  return (
    <div className="stat-card" style={{ borderTop: `3px solid ${color}` }}>
      <span className="stat-icon">{icon}</span>
      <span className="stat-value" style={{ color }}>{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

// ── Evolução de Cargas ────────────────────────────────────────────────────
function EvolutionTab({ userId }) {
  const exercises = useMemo(() => {
    const history = JSON.parse(localStorage.getItem(`gym_history_${userId}`) || '[]');
    const byEx = {};
    history.forEach(h => {
      (h.logs || []).forEach(log => {
        if (log.weight > 0) {
          if (!byEx[log.exName]) byEx[log.exName] = [];
          byEx[log.exName].push({ ...log, date: h.date });
        }
      });
    });
    return Object.entries(byEx)
      .map(([name, logs]) => ({
        name,
        logs: logs.sort((a, b) => new Date(a.date) - new Date(b.date)),
        maxWeight: Math.max(...logs.map(l => l.weight)),
        lastDate: logs[logs.length - 1]?.date,
      }))
      .sort((a, b) => new Date(b.lastDate) - new Date(a.lastDate));
  }, [userId]);

  if (exercises.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-icon">📈</p>
        <p>Nenhum registro de carga ainda</p>
        <p className="empty-sub">Registre peso e reps durante os treinos para ver sua evolução!</p>
      </div>
    );
  }

  return (
    <div className="evolution-tab">
      <h3>📈 Evolução de Cargas</h3>
      <p className="evo-subtitle">{exercises.length} exercício{exercises.length !== 1 ? 's' : ''} com histórico de carga</p>
      <div className="evo-list">
        {exercises.map(ex => <ExerciseProgressCard key={ex.name} ex={ex} />)}
      </div>
    </div>
  );
}

function ExerciseProgressCard({ ex }) {
  const { name, logs, maxWeight } = ex;
  const minW = Math.min(...logs.map(l => l.weight));
  const maxW = maxWeight;
  const range = maxW - minW || 1;
  const n = logs.length;
  const W = 280, H = 72, PAD = 10;

  const pts = logs.map((l, i) => ({
    x: PAD + (n > 1 ? (i / (n - 1)) : 0.5) * (W - PAD * 2),
    y: H - PAD - ((l.weight - minW) / range) * (H - PAD * 2),
    weight: l.weight,
    reps: l.reps,
  }));

  const polyline = pts.map(p => `${p.x},${p.y}`).join(' ');
  const areaPoints = `${PAD},${H - PAD} ${polyline} ${W - PAD},${H - PAD}`;
  const first = logs[0];
  const last = logs[logs.length - 1];
  const improvement = +(last.weight - first.weight).toFixed(1);

  return (
    <div className="evo-card">
      <div className="evo-card-header">
        <span className="evo-ex-name">{name}</span>
        <div className="evo-badges">
          <span className="evo-max">🏆 {maxW}kg</span>
          {improvement > 0 && <span className="evo-improve">+{improvement}kg</span>}
        </div>
      </div>

      {n > 1 ? (
        <svg viewBox={`0 0 ${W} ${H}`} className="evo-svg" aria-hidden="true">
          <defs>
            <linearGradient id={`grad-${name}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6C3AFF" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#6C3AFF" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} stroke="var(--border)" strokeWidth="1" />
          <polygon points={areaPoints} fill={`url(#grad-${name})`} />
          <polyline points={polyline} fill="none" stroke="#6C3AFF" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round" />
          {pts.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="4" fill="#6C3AFF" stroke="var(--card)" strokeWidth="1.5" />
          ))}
          {/* Labels: first and last */}
          <text x={pts[0].x} y={H - 0} fontSize="8" fill="var(--text2)" textAnchor="middle">{logs[0].weight}kg</text>
          <text x={pts[n-1].x} y={H - 0} fontSize="8" fill="#6C3AFF" textAnchor="middle" fontWeight="bold">{logs[n-1].weight}kg</text>
        </svg>
      ) : (
        <div className="evo-single-note">Apenas 1 registro · complete mais treinos para ver a evolução 📊</div>
      )}

      <div className="evo-card-footer">
        <span>🔁 {n} registro{n !== 1 ? 's' : ''}</span>
        <span>Último: {last.weight}kg × {last.reps}r · {new Date(last.date).toLocaleDateString('pt-BR')}</span>
      </div>
    </div>
  );
}

function PlanCard({ plan, onStart }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="plan-card">
      <div className="plan-card-header" onClick={() => setExpanded(!expanded)}>
        <div>
          <h4>{plan.name}</h4>
          <p>{plan.days?.length} dias/semana · Nível {plan.level}</p>
        </div>
        <span>{expanded ? '▲' : '▼'}</span>
      </div>
      {expanded && (
        <div className="plan-days">
          {plan.days?.map((day, i) => (
            <div key={i} className="plan-day">
              <div className="plan-day-info">
                <strong>{day.day}</strong>
                <span>{day.exercises?.length} exerc. · {day.sets} séries · ~{Math.round(day.totalTime / 60)} min</span>
              </div>
              <button className="btn-sm-primary" onClick={() => onStart(day)}>
                ▶ Iniciar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
