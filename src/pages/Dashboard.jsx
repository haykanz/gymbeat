import { useState, useMemo } from 'react';
import { generateWorkoutPlan } from '../data/exercises';
import { musicGenres } from '../data/music';
import { CATEGORY_LABELS as CAT_INFO_MAP, CAT_PT } from '../data/categories';

const CAT_INFO = CAT_INFO_MAP;

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
            <p className="dash-greeting">Olá, {user.name?.split(' ')[0]}</p>
            <p className="dash-subtitle">
              {primaryGenre ? primaryGenre.label : 'Configure seu perfil'}
            </p>
          </div>
        </div>
        <button className="theme-toggle" onClick={toggleTheme} title="Alternar tema">
          {theme === 'dark' ? '○' : '●'}
        </button>
        <button className="btn-icon" onClick={onOpenProfile} title="Perfil">≡</button>
      </header>

      <nav className="dash-nav">
        {[
          { id: 'home',      label: 'Início'    },
          { id: 'planos',    label: 'Planos'    },
          { id: 'historico', label: 'Histórico' },
          { id: 'evolucao',  label: 'Evolução'  },
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
              <StatCard icon="—" value={streak} label="Sequência" color="var(--primary)" />
              <StatCard icon="—" value={Math.round(totalMinutes)} label="Minutos" color="var(--primary)" />
              <StatCard icon="—" value={history.length} label="Treinos" color="var(--primary)" />
              <StatCard icon="—" value={totalCalories} label="Calorias" color="var(--primary)" />
            </div>

            {todayWorkout ? (
              <div className="today-card">
                <div className="today-header">
                  <div>
                    <p className="today-label">TREINO DE HOJE</p>
                    <h3>{todayWorkout.day} — {CAT_PT[todayWorkout.category] || todayWorkout.category?.toUpperCase()}</h3>
                    <p>{todayWorkout.exercises?.length} exercícios · {todayWorkout.sets} séries · ~{Math.round(todayWorkout.totalTime / 60)} min</p>
                  </div>
                  <span className="today-emoji" style={{ display: 'none' }} />
                </div>
                <div className="exercise-preview">
                  {todayWorkout.exercises?.slice(0, 3).map((ex, i) => (
                    <span key={i} className="ex-chip">{ex.name}</span>
                  ))}
                  {todayWorkout.exercises?.length > 3 && (
                    <span className="ex-chip">+{todayWorkout.exercises.length - 3}</span>
                  )}
                </div>
                <button className="btn-primary btn-full" onClick={() => onStartWorkout(todayWorkout, profile)}>
                  Iniciar Treino
                </button>
              </div>
            ) : hasPlan ? (
              <div className="today-card rest-day-card">
                <div className="today-header">
                  <div>
                    <p className="today-label">HOJE</p>
                    <h3>Dia de Descanso</h3>
                    <p>Aproveite para recuperar a energia</p>
                  </div>
                  <span className="today-emoji" style={{ display: 'none' }} />
                </div>
                {nextWorkout && (
                  <div className="next-workout-preview">
                    <p className="next-label">PRÓXIMO TREINO</p>
                    <div className="next-workout-info">
                      <span className="next-day">{nextWorkout.day}</span>
                      <span className="next-cat">— {CAT_PT[nextWorkout.category] || nextWorkout.category?.toUpperCase()}</span>
                    </div>
                    <div className="exercise-preview" style={{ marginTop: '8px' }}>
                      {nextWorkout.exercises?.slice(0, 3).map((ex, i) => (
                        <span key={i} className="ex-chip">{ex.name}</span>
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
                  Criar Meu Plano Personalizado
                </button>
              </div>
            )}

            {/* Semana */}
            {hasPlan && (
              <WeeklyPlanView
                plan={plans[0]}
                userId={user.id}
                todayIdx={todayDayIdx}
                onStartWorkout={(day) => onStartWorkout(day, profile)}
              />
            )}

            {/* Conquistas */}
            <button className="free-workout-btn achievements-btn" onClick={onOpenAchievements}>
              <div className="fw-text">
                <span className="fw-title">Conquistas</span>
                <span className="fw-sub">Veja seus badges e progresso</span>
              </div>
              <span className="fw-arrow">›</span>
            </button>

            {/* Treino Livre */}
            <button className="free-workout-btn" onClick={onFreeWorkout}>
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
                    <span key={gId} className="genre-chip" style={{ backgroundColor: 'var(--primary-dim)', borderColor: 'var(--primary)' }}>
                      {g.label}
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
                <p className="empty-icon" style={{ fontSize: 32, color: 'var(--text3)' }}>—</p>
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
                <p className="empty-icon" style={{ fontSize: 32, color: 'var(--text3)' }}>—</p>
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
                        <div style={{ width: 4, height: 32, borderRadius: 2, background: 'var(--primary)', flexShrink: 0 }} />
                        <div>
                          <p className="hist-name">{h.workoutName || 'Treino'}</p>
                          <p className="hist-date">{new Date(h.date).toLocaleDateString('pt-BR')}</p>
                        </div>
                      </div>
                      <div className="hist-stats">
                        <span>{h.duration || 0} min</span>
                        <span>{h.calories || 0} cal</span>
                        {h.exercises > 0 && <span>{h.exercises} séries</span>}
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
        <h4>Últimos 7 Dias</h4>
        <div className="chart-summary">
          <span>{weekCal} cal</span>
          <span>{weekMin} min</span>
          <span>{weekCount} treino{weekCount !== 1 ? 's' : ''}</span>
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

function StatCard({ value, label, color }) {
  return (
    <div className="stat-card" style={{ borderTop: `2px solid ${color}` }}>
      <span className="stat-value" style={{ color }}>{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}


// ── Evolução de Cargas ────────────────────────────────────────────────────
function EvolutionTab({ userId }) {
  const [activeView, setActiveView] = useState('loads'); // 'loads' | 'muscles'
  const [period, setPeriod]         = useState(30);      // dias

  const history = useMemo(() =>
    JSON.parse(localStorage.getItem(`gym_history_${userId}`) || '[]'),
  [userId]);

  // ── Cargas por exercício ────────────────────────────────────────────────
  const exercises = useMemo(() => {
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
  }, [history]);

  // ── Frequência por grupo muscular ───────────────────────────────────────
  const muscleStats = useMemo(() => {
    const cutoff = new Date(Date.now() - period * 86400000);
    const recent = history.filter(h => new Date(h.date) >= cutoff);
    const counts = {};
    recent.forEach(h => {
      const cat = h.category;
      if (cat && CAT_INFO[cat]) {
        counts[cat] = (counts[cat] || 0) + 1;
      }
    });
    const total = recent.length || 1;
    return Object.entries(counts)
      .map(([cat, count]) => ({ cat, count, pct: Math.round((count / total) * 100), ...CAT_INFO[cat] }))
      .sort((a, b) => b.count - a.count);
  }, [history, period]);

  return (
    <div className="evolution-tab">
      {/* Toggle cargas / músculos */}
      <div className="evo-view-toggle">
        <button className={`evo-toggle-btn ${activeView === 'loads' ? 'active' : ''}`}
          onClick={() => setActiveView('loads')}>Cargas</button>
        <button className={`evo-toggle-btn ${activeView === 'muscles' ? 'active' : ''}`}
          onClick={() => setActiveView('muscles')}>Músculos</button>
      </div>

      {activeView === 'loads' ? (
        <>
          <p className="evo-subtitle">{exercises.length} exercício{exercises.length !== 1 ? 's' : ''} com histórico de carga</p>
          {exercises.length === 0 ? (
            <div className="empty-state" style={{ marginTop: 32 }}>
              <p className="empty-icon" style={{ fontSize: 32, color: 'var(--text3)' }}>—</p>
              <p>Nenhum registro de carga ainda</p>
              <p className="empty-sub">Registre peso e reps durante os treinos para ver sua evolução!</p>
            </div>
          ) : (
            <div className="evo-list">
              {exercises.map(ex => <ExerciseProgressCard key={ex.name} ex={ex} />)}
            </div>
          )}
        </>
      ) : (
        <MuscleStatsView stats={muscleStats} period={period} onPeriodChange={setPeriod} total={history.length} />
      )}
    </div>
  );
}

function MuscleStatsView({ stats, period, onPeriodChange, total }) {
  const maxCount = stats[0]?.count || 1;

  return (
    <div className="muscle-stats">
      {/* Seletor de período */}
      <div className="muscle-period-row">
        <span className="muscle-period-label">Período:</span>
        {[7, 30, 90].map(d => (
          <button key={d}
            className={`muscle-period-btn ${period === d ? 'active' : ''}`}
            onClick={() => onPeriodChange(d)}>
            {d}d
          </button>
        ))}
      </div>

      {stats.length === 0 ? (
        <div className="empty-state" style={{ marginTop: 32 }}>
          <p className="empty-icon" style={{ fontSize: 32, color: 'var(--text3)' }}>—</p>
          <p>Nenhum treino nos últimos {period} dias</p>
          <p className="empty-sub">Complete treinos para ver quais músculos você está focando!</p>
        </div>
      ) : (
        <>
          <p className="evo-subtitle">{stats.length} grupos musculares treinados</p>
          <div className="muscle-bars">
            {stats.map(s => (
              <div key={s.cat} className="muscle-bar-row">
                <div className="muscle-bar-label">
                  <span className="muscle-bar-name">{s.label}</span>
                </div>
                <div className="muscle-bar-track">
                  <div className="muscle-bar-fill"
                    style={{ width: `${(s.count / maxCount) * 100}%`, background: s.color }} />
                </div>
                <div className="muscle-bar-stats">
                  <span className="muscle-bar-count" style={{ color: s.color }}>{s.count}×</span>
                  <span className="muscle-bar-pct">{s.pct}%</span>
                </div>
              </div>
            ))}
          </div>

          {/* Insight: pontos fracos */}
          {(() => {
            const allCats = Object.keys(CAT_INFO);
            const trainedCats = new Set(stats.map(s => s.cat));
            const missing = allCats.filter(c => !trainedCats.has(c) && ['abs','chest','back','shoulders','arms','legs','glutes'].includes(c));
            if (missing.length === 0) return null;
            return (
              <div className="muscle-insight">
                <p className="muscle-insight-title">Grupos não treinados nos últimos {period} dias:</p>
                <div className="muscle-insight-tags">
                  {missing.slice(0, 4).map(c => (
                    <span key={c} className="muscle-missing-tag" style={{ color: 'var(--primary)', border: `1px solid var(--border)` }}>
                      {CAT_INFO[c].label}
                    </span>
                  ))}
                </div>
              </div>
            );
          })()}
        </>
      )}
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
          <span className="evo-max">{maxW}kg</span>
          {improvement > 0 && <span className="evo-improve">+{improvement}kg</span>}
        </div>
      </div>

      {n > 1 ? (
        <svg viewBox={`0 0 ${W} ${H}`} className="evo-svg" aria-hidden="true">
          <defs>
            <linearGradient id={`grad-${name}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00C27A" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#00C27A" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} stroke="var(--border)" strokeWidth="1" />
          <polygon points={areaPoints} fill={`url(#grad-${name})`} />
          <polyline points={polyline} fill="none" stroke="#00C27A" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round" />
          {pts.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="4" fill="#00C27A" stroke="var(--card)" strokeWidth="1.5" />
          ))}
          {/* Labels: first and last */}
          <text x={pts[0].x} y={H - 0} fontSize="8" fill="var(--text2)" textAnchor="middle">{logs[0].weight}kg</text>
          <text x={pts[n-1].x} y={H - 0} fontSize="8" fill="#00C27A" textAnchor="middle" fontWeight="bold">{logs[n-1].weight}kg</text>
        </svg>
      ) : (
        <div className="evo-single-note">Apenas 1 registro · complete mais treinos para ver a evolução</div>
      )}

      <div className="evo-card-footer">
        <span>{n} registro{n !== 1 ? 's' : ''}</span>
        <span>Último: {last.weight}kg × {last.reps}r · {new Date(last.date).toLocaleDateString('pt-BR')}</span>
      </div>
    </div>
  );
}

// ── Visualização semanal ──────────────────────────────────────────────────
function WeeklyPlanView({ plan, userId, todayIdx, onStartWorkout }) {
  const DAY_LABELS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

  const completedDays = useMemo(() => {
    const history = JSON.parse(localStorage.getItem(`gym_history_${userId}`) || '[]');
    const today   = new Date();
    const monday  = new Date(today);
    monday.setDate(today.getDate() - todayIdx);
    monday.setHours(0, 0, 0, 0);
    const set = new Set();
    history.forEach(h => {
      const d = new Date(h.date);
      if (d >= monday) set.add((d.getDay() + 6) % 7);
    });
    return set;
  }, [userId, todayIdx]);

  return (
    <div className="weekly-view">
      <h4 className="weekly-title">Esta Semana</h4>
      <div className="weekly-days">
        {DAY_LABELS.map((label, i) => {
          const planDay  = plan.days[i % plan.days.length];
          const catInfo  = CAT_INFO[planDay?.category] || { color: '#00C27A', label: '—' };
          const done     = completedDays.has(i);
          const isToday  = i === todayIdx;
          const isFuture = i > todayIdx;
          return (
            <button key={i}
              className={`weekly-day ${isToday ? 'today' : ''} ${done ? 'done' : ''} ${isFuture ? 'future' : ''}`}
              onClick={() => !isFuture && planDay && onStartWorkout(planDay)}
              title={`${label}: ${catInfo.label}`}
            >
              <span className="weekly-label">{label}</span>
              <span className="weekly-icon">
                {done
                  ? <span style={{ color: '#10B981', fontSize: 14 }}>✓</span>
                  : <span style={{ width: 8, height: 8, borderRadius: '50%', display: 'inline-block', background: planDay ? catInfo.color : 'var(--border)' }} />
                }
              </span>
              {isToday && <span className="weekly-today-dot" style={{ background: catInfo.color }} />}
            </button>
          );
        })}
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
                <strong>{day.day} — {CAT_PT[day.category] || day.category}</strong>
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
