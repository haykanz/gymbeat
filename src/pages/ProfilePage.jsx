import { useState, useMemo } from 'react';
import { musicGenres } from '../data/music';
import { healthConditions } from '../data/exercises';
import { DEFAULT_PLAYLISTS, extractPlaylistId } from '../data/spotify';

export default function ProfilePage({ user, onBack, onLogout, onUpdateUser, onRedoQuestionnaire, theme, toggleTheme }) {
  const profile = user.profile || {};
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName]         = useState(user.name || '');
  const [nameSaved, setNameSaved]     = useState(false);

  // Notificações
  const [notifPerm, setNotifPerm]   = useState(() => 'Notification' in window ? Notification.permission : 'unsupported');
  const [notifOn,   setNotifOn]     = useState(() => JSON.parse(localStorage.getItem(`gym_notif_${user.id}`) || '{"enabled":false}').enabled);
  const [notifTime, setNotifTime]   = useState(() => JSON.parse(localStorage.getItem(`gym_notif_${user.id}`) || '{"time":"18:00"}').time || '18:00');
  const [notifSaved, setNotifSaved] = useState(false);

  const [importMsg, setImportMsg] = useState('');

  // Spotify playlists
  const [spotifyPlaylists, setSpotifyPlaylists] = useState(
    () => JSON.parse(localStorage.getItem(`gym_spotify_${user.id}`) || '{}')
  );
  const [spotifySaved, setSpotifySaved] = useState(false);

  // Peso corporal
  const [weightLog,   setWeightLog]   = useState(() => JSON.parse(localStorage.getItem(`gym_weight_${user.id}`) || '[]'));
  const [weightInput, setWeightInput] = useState('');
  const [weightSaved, setWeightSaved] = useState(false);

  // Macros
  const [macroHeight,   setMacroHeight]   = useState(() => localStorage.getItem(`gym_macro_height_${user.id}`) || '');
  const [macroAge,      setMacroAge]      = useState(() => localStorage.getItem(`gym_macro_age_${user.id}`) || '');
  const [macroGender,   setMacroGender]   = useState(() => localStorage.getItem(`gym_macro_gender_${user.id}`) || 'm');
  const [macroActivity, setMacroActivity] = useState(() => localStorage.getItem(`gym_macro_activity_${user.id}`) || '1.55');
  const [showMacros, setShowMacros] = useState(false);

  const handleSpotifyChange = (genreId, value) => {
    setSpotifyPlaylists(prev => ({ ...prev, [genreId]: value }));
  };

  const handleLogWeight = () => {
    const val = parseFloat(weightInput.replace(',', '.'));
    if (!val || val < 20 || val > 400) return;
    const entry = { date: new Date().toISOString(), weight: val };
    const updated = [entry, ...weightLog];
    localStorage.setItem(`gym_weight_${user.id}`, JSON.stringify(updated));
    setWeightLog(updated);
    setWeightInput('');
    setWeightSaved(true);
    setTimeout(() => setWeightSaved(false), 2000);
  };

  const handleDeleteWeight = (idx) => {
    const updated = weightLog.filter((_, i) => i !== idx);
    localStorage.setItem(`gym_weight_${user.id}`, JSON.stringify(updated));
    setWeightLog(updated);
  };

  const handleSaveMacroInputs = () => {
    localStorage.setItem(`gym_macro_height_${user.id}`, macroHeight);
    localStorage.setItem(`gym_macro_age_${user.id}`, macroAge);
    localStorage.setItem(`gym_macro_gender_${user.id}`, macroGender);
    localStorage.setItem(`gym_macro_activity_${user.id}`, macroActivity);
    setShowMacros(true);
  };

  const macros = useMemo(() => {
    const weight = weightLog[0]?.weight;
    const h = parseFloat(macroHeight);
    const a = parseInt(macroAge);
    if (!weight || !h || !a) return null;
    const act = parseFloat(macroActivity) || 1.55;
    const bmr = macroGender === 'm'
      ? 10 * weight + 6.25 * h - 5 * a + 5
      : 10 * weight + 6.25 * h - 5 * a - 161;
    const tdee = Math.round(bmr * act);
    const goal = profile.goal || 'saude-geral';
    const cal  = goal === 'ganhar-musculo' ? tdee + 300
              : goal === 'perder-peso'    ? tdee - 500
              : tdee;
    const prot = Math.round((goal === 'ganhar-musculo' ? 2.2 : goal === 'perder-peso' ? 2.0 : 1.8) * weight);
    const fat  = Math.round(weight * 0.9);
    const carb = Math.round((cal - prot * 4 - fat * 9) / 4);
    return { cal: Math.max(1200, cal), prot, fat, carb: Math.max(0, carb) };
  }, [weightLog, macroHeight, macroAge, macroGender, macroActivity, profile.goal]);

  const handleSaveSpotify = () => {
    const normalized = {};
    Object.entries(spotifyPlaylists).forEach(([k, v]) => {
      if (v.trim()) normalized[k] = extractPlaylistId(v.trim());
    });
    localStorage.setItem(`gym_spotify_${user.id}`, JSON.stringify(normalized));
    setSpotifyPlaylists(normalized);
    setSpotifySaved(true);
    setTimeout(() => setSpotifySaved(false), 2000);
  };

  const handleRequestPermission = async () => {
    const result = await Notification.requestPermission();
    setNotifPerm(result);
  };

  const handleSaveNotif = () => {
    const settings = { enabled: notifOn, time: notifTime };
    localStorage.setItem(`gym_notif_${user.id}`, JSON.stringify(settings));
    setNotifSaved(true);
    setTimeout(() => setNotifSaved(false), 2000);
  };

  const handleExport = () => {
    const data = {
      user: { id: user.id, name: user.name, email: user.email, profile: user.profile },
      history:  JSON.parse(localStorage.getItem(`gym_history_${user.id}`) || '[]'),
      plans:    JSON.parse(localStorage.getItem(`gym_plans_${user.id}`)   || '[]'),
      prs:      JSON.parse(localStorage.getItem(`gym_prs_${user.id}`)     || '{}'),
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url;
    a.download = `gymbeat_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (!data.user || !data.history) throw new Error('Formato inválido');
        localStorage.setItem(`gym_history_${user.id}`, JSON.stringify(data.history));
        if (data.plans) localStorage.setItem(`gym_plans_${user.id}`,   JSON.stringify(data.plans));
        if (data.prs)   localStorage.setItem(`gym_prs_${user.id}`,     JSON.stringify(data.prs));
        setImportMsg('Dados importados com sucesso. Recarregue o app.');
      } catch {
        setImportMsg('Arquivo inválido. Use um backup gerado pelo GymBeat.');
      }
    };
    reader.readAsText(file);
  };

  const history = JSON.parse(localStorage.getItem(`gym_history_${user.id}`) || '[]');
  const plans   = JSON.parse(localStorage.getItem(`gym_plans_${user.id}`) || '[]');
  const prs     = JSON.parse(localStorage.getItem(`gym_prs_${user.id}`) || '{}');

  const totalMin = history.reduce((a, h) => a + (h.duration || 0), 0);
  const totalCal = history.reduce((a, h) => a + (h.calories || 0), 0);
  const prList   = Object.values(prs).sort((a, b) => new Date(b.date) - new Date(a.date));

  const userGenres = (profile.musicGenres || []).map(id => musicGenres.find(g => g.id === id)).filter(Boolean);
  const userHealth = (profile.healthConditions || ['nenhum'])
    .filter(id => id !== 'nenhum')
    .map(id => healthConditions.find(h => h.id === id))
    .filter(Boolean);

  const goalLabels = {
    'perder-peso':    'Perder Peso',
    'ganhar-musculo': 'Ganhar Músculo',
    'resistencia':    'Resistência',
    'flexibilidade':  'Flexibilidade',
    'saude-geral':    'Saúde Geral',
  };
  const levelLabels = { beginner: 'Iniciante', intermediate: 'Intermediário', advanced: 'Avançado' };
  const goalLabel  = goalLabels[profile.goal] || profile.goal || '—';
  const levelLabel = levelLabels[profile.fitnessLevel] || profile.fitnessLevel || '—';

  const goalGoalText = {
    'perder-peso': 'Perder Peso', 'ganhar-musculo': 'Ganhar Músculo',
    'resistencia': 'Resistência', 'flexibilidade': 'Flexibilidade', 'saude-geral': 'Saúde Geral',
  };

  const handleSaveName = () => {
    if (!newName.trim()) return;
    const users = JSON.parse(localStorage.getItem('gym_users') || '[]');
    const idx = users.findIndex(u => u.id === user.id);
    const updated = { ...user, name: newName.trim() };
    if (idx !== -1) { users[idx].name = newName.trim(); localStorage.setItem('gym_users', JSON.stringify(users)); }
    localStorage.setItem('gym_current_user', JSON.stringify(updated));
    onUpdateUser(updated);
    setEditingName(false);
    setNameSaved(true);
    setTimeout(() => setNameSaved(false), 2000);
  };

  return (
    <div className="profile-page">
      <header className="profile-header">
        <button className="btn-icon" onClick={onBack}>←</button>
        <h2>Meu Perfil</h2>
        <button className="theme-toggle" onClick={toggleTheme} title="Alternar tema">
          {theme === 'dark' ? '○' : '●'}
        </button>
      </header>

      {/* Avatar + Nome */}
      <div className="profile-hero">
        <div className="profile-avatar-lg">
          {(user.name || 'U')[0].toUpperCase()}
        </div>
        {editingName ? (
          <div className="profile-name-edit">
            <input
              autoFocus
              value={newName}
              onChange={e => setNewName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSaveName()}
              className="profile-name-input"
              maxLength={32}
            />
            <div className="profile-name-actions">
              <button className="btn-secondary" onClick={() => { setEditingName(false); setNewName(user.name); }}>Cancelar</button>
              <button className="btn-primary" onClick={handleSaveName}>Salvar</button>
            </div>
          </div>
        ) : (
          <div className="profile-name-row">
            <h3 className="profile-name">{user.name}</h3>
            <button className="profile-edit-btn" onClick={() => setEditingName(true)}>editar</button>
          </div>
        )}
        {nameSaved && <p className="profile-saved-msg">✓ Nome atualizado</p>}
        <p className="profile-email">{user.email}</p>
      </div>

      {/* Stats rápidas */}
      <div className="profile-stats-row">
        <div className="profile-stat">
          <span className="ps-value">{history.length}</span>
          <span className="ps-label">Treinos</span>
        </div>
        <div className="profile-stat">
          <span className="ps-value">{totalMin}</span>
          <span className="ps-label">Minutos</span>
        </div>
        <div className="profile-stat">
          <span className="ps-value">{totalCal}</span>
          <span className="ps-label">Calorias</span>
        </div>
        <div className="profile-stat">
          <span className="ps-value">{prList.length}</span>
          <span className="ps-label">Recordes</span>
        </div>
      </div>

      <div className="profile-sections">

        {/* Objetivo e Nível */}
        <div className="profile-section">
          <h4 className="section-title">Objetivo & Nível</h4>
          <div className="profile-tags">
            <span className="profile-tag">{goalLabel}</span>
            <span className="profile-tag">{levelLabel}</span>
            {profile.daysPerWeek && <span className="profile-tag">{profile.daysPerWeek}× por semana</span>}
            {profile.sessionDuration && <span className="profile-tag">{profile.sessionDuration} min/sessão</span>}
          </div>
        </div>

        {/* Regiões de foco */}
        {(profile.focusAreas || []).length > 0 && (
          <div className="profile-section">
            <h4 className="section-title">Foco</h4>
            <div className="profile-tags">
              {profile.focusAreas.map(a => (
                <span key={a} className="profile-tag">{a}</span>
              ))}
            </div>
          </div>
        )}

        {/* Gêneros musicais */}
        <div className="profile-section">
          <h4 className="section-title">Gêneros Musicais</h4>
          <div className="profile-tags">
            {userGenres.length > 0
              ? userGenres.map(g => (
                  <span key={g.id} className="profile-genre-tag"
                    style={{ backgroundColor: g.color + '18', borderColor: g.color + '55', color: g.color }}>
                    {g.label}
                  </span>
                ))
              : <span className="profile-tag-empty">Não configurado</span>
            }
          </div>
        </div>

        {/* Saúde */}
        <div className="profile-section">
          <h4 className="section-title">Condições de Saúde</h4>
          <div className="profile-tags">
            {userHealth.length > 0
              ? userHealth.map(h => (
                  <span key={h.id} className="profile-health-tag"
                    style={{ backgroundColor: h.color + '18', borderColor: h.color + '55', color: h.color }}>
                    {h.label}
                  </span>
                ))
              : <span className="profile-tag profile-tag-green">Sem restrições</span>
            }
          </div>
        </div>

        {/* Recordes Pessoais */}
        <div className="profile-section">
          <h4 className="section-title">Recordes Pessoais</h4>
          {prList.length === 0 ? (
            <p className="profile-empty">Nenhum recorde ainda — complete um treino com registro de carga.</p>
          ) : (
            <div className="pr-list">
              {prList.map((pr, i) => (
                <div key={i} className="pr-item">
                  <div className="pr-left">
                    <span className="pr-rank">#{i + 1}</span>
                    <div>
                      <p className="pr-name">{pr.exName}</p>
                      <p className="pr-date">{new Date(pr.date).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                  <div className="pr-values">
                    {pr.weight > 0 && <span className="pr-weight">{pr.weight}kg</span>}
                    {pr.weight > 0 && pr.reps > 0 && <span className="pr-sep">×</span>}
                    {pr.reps > 0 && <span className="pr-reps">{pr.reps} reps</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Planos */}
        <div className="profile-section">
          <h4 className="section-title">Planos de Treino</h4>
          <p className="profile-info-text">{plans.length} plano{plans.length !== 1 ? 's' : ''} criado{plans.length !== 1 ? 's' : ''}</p>
        </div>

        {/* Notificações */}
        <div className="profile-section">
          <h4 className="section-title">Lembretes de Treino</h4>
          {notifPerm === 'unsupported' ? (
            <p className="profile-info-text">Seu navegador não suporta notificações.</p>
          ) : notifPerm === 'denied' ? (
            <p className="notif-denied">Permissão negada — habilite nas configurações do navegador.</p>
          ) : notifPerm === 'default' ? (
            <button className="btn-secondary notif-perm-btn" onClick={handleRequestPermission}>
              Permitir notificações
            </button>
          ) : (
            <div className="notif-settings">
              <label className="notif-toggle-row">
                <span>Lembrar de treinar</span>
                <div className={`toggle-switch ${notifOn ? 'on' : ''}`} onClick={() => setNotifOn(v => !v)}>
                  <div className="toggle-thumb" />
                </div>
              </label>
              {notifOn && (
                <label className="notif-time-row">
                  <span>Horário do lembrete</span>
                  <input
                    type="time"
                    value={notifTime}
                    onChange={e => setNotifTime(e.target.value)}
                    className="notif-time-input"
                  />
                </label>
              )}
              <button className="btn-primary notif-save-btn" onClick={handleSaveNotif}>
                {notifSaved ? '✓ Salvo' : 'Salvar'}
              </button>
            </div>
          )}
        </div>

        {/* Spotify Playlists */}
        <div className="profile-section">
          <h4 className="section-title">Playlists do Spotify</h4>
          <p className="profile-info-text">
            Cole o link ou ID de uma playlist do Spotify para cada gênero. Deixe em branco para usar o padrão.
          </p>
          <div className="spotify-settings">
            {(profile.musicGenres || []).map(gId => {
              const g = musicGenres.find(x => x.id === gId);
              if (!g) return null;
              const placeholder = DEFAULT_PLAYLISTS[gId] || 'ID ou URL da playlist';
              return (
                <div key={gId} className="spotify-genre-row">
                  <label className="spotify-genre-label" style={{ color: g.color }}>
                    {g.label}
                  </label>
                  <input
                    className="spotify-playlist-input"
                    type="text"
                    placeholder={`Padrão: ${placeholder}`}
                    value={spotifyPlaylists[gId] || ''}
                    onChange={e => handleSpotifyChange(gId, e.target.value)}
                  />
                </div>
              );
            })}
            {(profile.musicGenres || []).length === 0 && (
              <p className="profile-tag-empty">Configure gêneros musicais no questionário primeiro.</p>
            )}
            {(profile.musicGenres || []).length > 0 && (
              <button className="btn-primary notif-save-btn" onClick={handleSaveSpotify}>
                {spotifySaved ? '✓ Salvo' : 'Salvar Playlists'}
              </button>
            )}
          </div>
          <p className="spotify-hint">
            Abra o Spotify → clique numa playlist → compartilhar → copiar link
          </p>
        </div>

        {/* Macros */}
        <div className="profile-section">
          <h4 className="section-title">Macros Diários</h4>
          <p className="profile-info-text">Calculamos suas necessidades com base no seu objetivo e peso atual.</p>
          <div className="macro-inputs">
            <div className="macro-input-row">
              <label>Altura</label>
              <div className="macro-input-wrap">
                <input type="number" className="macro-input" placeholder="175" min="100" max="250"
                  value={macroHeight} onChange={e => setMacroHeight(e.target.value)} />
                <span className="macro-unit">cm</span>
              </div>
            </div>
            <div className="macro-input-row">
              <label>Idade</label>
              <div className="macro-input-wrap">
                <input type="number" className="macro-input" placeholder="25" min="10" max="100"
                  value={macroAge} onChange={e => setMacroAge(e.target.value)} />
                <span className="macro-unit">anos</span>
              </div>
            </div>
            <div className="macro-input-row">
              <label>Sexo</label>
              <div className="macro-gender-btns">
                <button className={`macro-gender-btn ${macroGender === 'm' ? 'active' : ''}`}
                  onClick={() => setMacroGender('m')}>Masc.</button>
                <button className={`macro-gender-btn ${macroGender === 'f' ? 'active' : ''}`}
                  onClick={() => setMacroGender('f')}>Fem.</button>
              </div>
            </div>
            <div className="macro-input-row">
              <label>Nível de atividade</label>
              <select className="macro-select" value={macroActivity} onChange={e => setMacroActivity(e.target.value)}>
                <option value="1.2">Sedentário (sem exercício)</option>
                <option value="1.375">Levemente ativo (1-3×/semana)</option>
                <option value="1.55">Moderado (3-5×/semana)</option>
                <option value="1.725">Muito ativo (6-7×/semana)</option>
                <option value="1.9">Atleta (2× por dia)</option>
              </select>
            </div>
          </div>
          {!weightLog[0] && (
            <p className="macro-weight-warn">Registre seu peso abaixo para calcular os macros.</p>
          )}
          <button className="btn-primary notif-save-btn" onClick={handleSaveMacroInputs}
            disabled={!weightLog[0] || !macroHeight || !macroAge}>
            Calcular Macros
          </button>

          {showMacros && macros && (
            <div className="macro-result">
              <div className="macro-result-header">
                <span>Objetivo: <strong>{goalGoalText[profile.goal] || 'Saúde Geral'}</strong></span>
                <span className="macro-calories">{macros.cal} kcal/dia</span>
              </div>
              <div className="macro-bars">
                <MacroBar label="Proteína"     value={macros.prot} unit="g" color="#6C3AFF" pct={Math.round((macros.prot * 4 / macros.cal) * 100)} />
                <MacroBar label="Carboidratos" value={macros.carb} unit="g" color={`var(--gold)`} pct={Math.round((macros.carb * 4 / macros.cal) * 100)} />
                <MacroBar label="Gorduras"     value={macros.fat}  unit="g" color="#EC4899" pct={Math.round((macros.fat * 9 / macros.cal) * 100)} />
              </div>
              <p className="macro-note">Valores estimados — consulte um nutricionista para um plano personalizado.</p>
            </div>
          )}
        </div>

        {/* Peso Corporal */}
        <div className="profile-section">
          <h4 className="section-title">Peso Corporal</h4>
          <div className="weight-input-row">
            <input
              className="weight-input"
              type="number"
              min="20" max="400" step="0.1"
              placeholder="Ex: 75.5"
              value={weightInput}
              onChange={e => setWeightInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogWeight()}
            />
            <span className="weight-unit">kg</span>
            <button className="btn-primary weight-log-btn" onClick={handleLogWeight}>
              {weightSaved ? '✓' : '+ Registrar'}
            </button>
          </div>

          {weightLog.length >= 2 && (
            <WeightChart log={weightLog.slice().reverse()} />
          )}

          {weightLog.length > 0 && (
            <div className="weight-history">
              <p className="weight-history-title">Últimos registros</p>
              {weightLog.slice(0, 8).map((entry, i) => (
                <div key={i} className="weight-entry">
                  <span className="weight-entry-val">{entry.weight} kg</span>
                  <span className="weight-entry-date">
                    {new Date(entry.date).toLocaleDateString('pt-BR', { day:'2-digit', month:'short' })}
                  </span>
                  {i === 0 && weightLog.length > 1 && (
                    <span className={`weight-entry-diff ${entry.weight - weightLog[1].weight < 0 ? 'down' : 'up'}`}>
                      {entry.weight - weightLog[1].weight > 0 ? '+' : ''}
                      {(entry.weight - weightLog[1].weight).toFixed(1)} kg
                    </span>
                  )}
                  <button className="weight-delete-btn" onClick={() => handleDeleteWeight(i)}>✕</button>
                </div>
              ))}
            </div>
          )}

          {weightLog.length === 0 && (
            <p className="profile-empty">Nenhum registro ainda — registre seu peso para acompanhar a evolução.</p>
          )}
        </div>

        {/* Backup */}
        <div className="profile-section">
          <h4 className="section-title">Backup de Dados</h4>
          <p className="profile-info-text">Exporte seus treinos, planos e recordes para um arquivo JSON.</p>
          <div className="backup-actions">
            <button className="btn-secondary" onClick={handleExport}>
              Exportar backup
            </button>
            <label className="btn-secondary backup-import-label">
              Importar backup
              <input type="file" accept=".json" onChange={handleImport} style={{ display: 'none' }} />
            </label>
          </div>
          {importMsg && <p className="import-msg">{importMsg}</p>}
        </div>

      </div>

      {/* Ações */}
      <div className="profile-actions" id="profile-actions-bottom">
        <button className="profile-action-btn" onClick={onRedoQuestionnaire}>
          <span>Refazer Questionário</span>
        </button>
        <button className="profile-action-btn profile-action-danger" onClick={onLogout}>
          <span>Sair da Conta</span>
        </button>
      </div>
    </div>
  );
}

// ── Barra de macro ───────────────────────────────────────────────────────
function MacroBar({ label, value, unit, color, pct }) {
  return (
    <div className="macro-bar-row">
      <div className="macro-bar-label-row">
        <span className="macro-bar-name">{label}</span>
        <span className="macro-bar-value" style={{ color }}>{value}{unit} <span className="macro-bar-pct">({pct}%)</span></span>
      </div>
      <div className="macro-bar-track">
        <div className="macro-bar-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

// ── Gráfico de peso corporal ──────────────────────────────────────────────
function WeightChart({ log }) {
  const n    = log.length;
  const W    = 300, H = 80, PAD = 12;
  const vals = log.map(e => e.weight);
  const minW = Math.min(...vals);
  const maxW = Math.max(...vals);
  const range = maxW - minW || 1;

  const pts = vals.map((v, i) => ({
    x: PAD + (n > 1 ? (i / (n - 1)) : 0.5) * (W - PAD * 2),
    y: H - PAD - ((v - minW) / range) * (H - PAD * 2),
    weight: v,
  }));

  const polyline   = pts.map(p => `${p.x},${p.y}`).join(' ');
  const areaPoints = `${PAD},${H - PAD} ${polyline} ${pts[n-1].x},${H - PAD}`;
  const isDown     = vals[n - 1] <= vals[0];

  return (
    <div className="weight-chart-wrap">
      <svg viewBox={`0 0 ${W} ${H}`} className="weight-svg" aria-hidden="true">
        <defs>
          <linearGradient id="weight-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={isDown ? '#10B981' : '#EF4444'} stopOpacity="0.35" />
            <stop offset="100%" stopColor={isDown ? '#10B981' : '#EF4444'} stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} stroke="var(--border)" strokeWidth="1" />
        <polygon points={areaPoints} fill="url(#weight-grad)" />
        <polyline points={polyline} fill="none" stroke={isDown ? '#10B981' : '#EF4444'}
          strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {pts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3.5" fill={isDown ? '#10B981' : '#EF4444'}
            stroke="var(--card)" strokeWidth="1.5" />
        ))}
        <text x={pts[0].x} y={H} fontSize="8" fill="var(--text2)" textAnchor="middle">{vals[0]}kg</text>
        <text x={pts[n-1].x} y={H} fontSize="8" fill={isDown ? '#10B981' : '#EF4444'}
          textAnchor="middle" fontWeight="bold">{vals[n-1]}kg</text>
      </svg>
      <div className="weight-chart-summary">
        <span>{n} registros</span>
        <span style={{ color: isDown ? '#10B981' : '#EF4444', fontWeight: 700 }}>
          {vals[n-1] - vals[0] > 0 ? '+' : ''}{(vals[n-1] - vals[0]).toFixed(1)} kg total
        </span>
      </div>
    </div>
  );
}
