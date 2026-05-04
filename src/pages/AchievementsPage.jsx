import { useMemo } from 'react';
import { achievements, rarityConfig } from '../data/achievements';

export default function AchievementsPage({ user, onBack, theme, toggleTheme }) {
  const unlocked = useMemo(
    () => JSON.parse(localStorage.getItem(`gym_achievements_${user.id}`) || '{}'),
    [user.id]
  );

  const history = useMemo(() => JSON.parse(localStorage.getItem(`gym_history_${user.id}`) || '[]'), [user.id]);
  const plans   = useMemo(() => JSON.parse(localStorage.getItem(`gym_plans_${user.id}`)   || '[]'), [user.id]);
  const prs     = useMemo(() => JSON.parse(localStorage.getItem(`gym_prs_${user.id}`)     || '{}'), [user.id]);

  const streak = useMemo(() => {
    if (!history.length) return 0;
    const dates = [...new Set(history.map(h => h.date))].sort().reverse();
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (dates[0] !== today && dates[0] !== yesterday) return 0;
    let count = 0;
    for (let i = 0; i < dates.length; i++) {
      const d = new Date(dates[i]);
      const expected = new Date(Date.now() - i * 86400000);
      if (d.toDateString() === expected.toDateString()) count++;
      else break;
    }
    return count;
  }, [history]);

  const context = { history, plans, prs, streak };

  const unlockedList = achievements
    .filter(a => unlocked[a.id])
    .map(a => ({ ...a, unlockedAt: unlocked[a.id].unlockedAt }))
    .sort((a, b) => new Date(b.unlockedAt) - new Date(a.unlockedAt));

  const lockedList = achievements
    .filter(a => !unlocked[a.id])
    .map(a => {
      let progress = null;
      if (a.id === 'strong-start')    progress = { cur: history.length, max: 5 };
      if (a.id === 'dedicated')       progress = { cur: history.length, max: 30 };
      if (a.id === 'centurion')       progress = { cur: history.length, max: 100 };
      if (a.id === 'streak-3')        progress = { cur: streak, max: 3 };
      if (a.id === 'streak-7')        progress = { cur: streak, max: 7 };
      if (a.id === 'streak-30')       progress = { cur: streak, max: 30 };
      if (a.id === 'pr-machine')      progress = { cur: Object.keys(prs).length, max: 10 };
      return { ...a, progress };
    });

  const totalPct = Math.round((unlockedList.length / achievements.length) * 100);

  return (
    <div className="achievements-page">
      <header className="profile-header">
        <button className="btn-icon" onClick={onBack}>←</button>
        <h2>Conquistas</h2>
        <button className="theme-toggle" onClick={toggleTheme} title="Alternar tema">
          {theme === 'dark' ? '○' : '●'}
        </button>
      </header>

      {/* Progresso geral */}
      <div className="ach-overview">
        <div className="ach-overview-numbers">
          <span className="ach-count">{unlockedList.length}</span>
          <span className="ach-total">/ {achievements.length} conquistas</span>
        </div>
        <div className="ach-bar-wrap">
          <div className="ach-bar-fill" style={{ width: `${totalPct}%` }} />
        </div>
        <span className="ach-pct">{totalPct}% completo</span>
      </div>

      {/* Desbloqueadas */}
      {unlockedList.length > 0 && (
        <section className="ach-section">
          <h3 className="ach-section-title">Desbloqueadas <span className="ach-section-count">{unlockedList.length}</span></h3>
          <div className="ach-grid">
            {unlockedList.map(ach => {
              const r = rarityConfig[ach.rarity];
              return (
                <div key={ach.id} className="ach-card ach-unlocked"
                  style={{ borderColor: r.color + '55', background: r.bg }}>
                  {/* Rarity badge — CSS only, no emoji */}
                  <div className="ach-badge" style={{ borderColor: r.color, color: r.color }}>
                    {ach.title.charAt(0).toUpperCase()}
                  </div>
                  <div className="ach-info">
                    <p className="ach-title">{ach.title}</p>
                    <p className="ach-desc">{ach.desc}</p>
                    <span className="ach-rarity" style={{ color: r.color }}>{r.label}</span>
                  </div>
                  <span className="ach-check" style={{ borderColor: r.color, color: r.color }}>✓</span>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Bloqueadas */}
      <section className="ach-section">
        <h3 className="ach-section-title">Bloqueadas <span className="ach-section-count">{lockedList.length}</span></h3>
        <div className="ach-grid">
          {lockedList.map(ach => {
            const r = rarityConfig[ach.rarity];
            return (
              <div key={ach.id} className="ach-card ach-locked">
                <div className="ach-badge ach-badge-locked">
                  —
                </div>
                <div className="ach-info">
                  <p className="ach-title">{ach.title}</p>
                  <p className="ach-desc">{ach.desc}</p>
                  <span className="ach-rarity" style={{ color: r.color }}>{r.label}</span>
                  {ach.progress && (
                    <div className="ach-progress-wrap">
                      <div className="ach-progress-bar">
                        <div className="ach-progress-fill"
                          style={{ width: `${Math.min(100, (ach.progress.cur / ach.progress.max) * 100)}%`, background: r.color }} />
                      </div>
                      <span className="ach-progress-label">
                        {Math.min(ach.progress.cur, ach.progress.max)}/{ach.progress.max}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
