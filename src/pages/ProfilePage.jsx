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

  // Exportar / Importar dados
  const [importMsg, setImportMsg]   = useState('');

  // Spotify playlists
  const [spotifyPlaylists, setSpotifyPlaylists] = useState(
    () => JSON.parse(localStorage.getItem(`gym_spotify_${user.id}`) || '{}')
  );
  const [spotifySaved, setSpotifySaved] = useState(false);

  const handleSpotifyChange = (genreId, value) => {
    setSpotifyPlaylists(prev => ({ ...prev, [genreId]: value }));
  };
  const handleSaveSpotify = () => {
    // Normaliza: extrai IDs de URLs completas
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
        setImportMsg('✅ Dados importados com sucesso! Recarregue o app.');
      } catch {
        setImportMsg('❌ Arquivo inválido. Use um backup gerado pelo GymBeat.');
      }
    };
    reader.readAsText(file);
  };

  // Estatísticas
  const history  = JSON.parse(localStorage.getItem(`gym_history_${user.id}`) || '[]');
  const plans    = JSON.parse(localStorage.getItem(`gym_plans_${user.id}`) || '[]');
  const prs      = JSON.parse(localStorage.getItem(`gym_prs_${user.id}`) || '{}');

  const totalMin = history.reduce((a, h) => a + (h.duration || 0), 0);
  const totalCal = history.reduce((a, h) => a + (h.calories || 0), 0);
  const prList   = Object.values(prs).sort((a, b) => new Date(b.date) - new Date(a.date));

  const userGenres = (profile.musicGenres || []).map(id => musicGenres.find(g => g.id === id)).filter(Boolean);
  const userHealth = (profile.healthConditions || ['nenhum'])
    .filter(id => id !== 'nenhum')
    .map(id => healthConditions.find(h => h.id === id))
    .filter(Boolean);

  const goalLabels = {
    'perder-peso':    { label: 'Perder Peso',   emoji: '🔥' },
    'ganhar-musculo': { label: 'Ganhar Músculo', emoji: '💪' },
    'resistencia':    { label: 'Resistência',    emoji: '🏃' },
    'flexibilidade':  { label: 'Flexibilidade',  emoji: '🧘' },
    'saude-geral':    { label: 'Saúde Geral',    emoji: '❤️' },
  };
  const levelLabels = { beginner: 'Iniciante 🌱', intermediate: 'Intermediário ⚡', advanced: 'Avançado 🏆' };
  const goal  = goalLabels[profile.goal] || { label: profile.goal || '—', emoji: '🎯' };
  const level = levelLabels[profile.fitnessLevel] || profile.fitnessLevel || '—';

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
          {theme === 'dark' ? '☀️' : '🌙'}
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
            <button className="profile-edit-btn" onClick={() => setEditingName(true)}>✏️</button>
          </div>
        )}
        {nameSaved && <p className="profile-saved-msg">✓ Nome atualizado!</p>}
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
          <h4 className="section-title">🎯 Objetivo & Nível</h4>
          <div className="profile-tags">
            <span className="profile-tag">{goal.emoji} {goal.label}</span>
            <span className="profile-tag">⚡ {level}</span>
            {profile.daysPerWeek && <span className="profile-tag">📅 {profile.daysPerWeek}x/semana</span>}
            {profile.sessionDuration && <span className="profile-tag">⏱ {profile.sessionDuration} min</span>}
          </div>
        </div>

        {/* Regiões de foco */}
        {(profile.focusAreas || []).length > 0 && (
          <div className="profile-section">
            <h4 className="section-title">🎯 Foco</h4>
            <div className="profile-tags">
              {profile.focusAreas.map(a => (
                <span key={a} className="profile-tag">{a}</span>
              ))}
            </div>
          </div>
        )}

        {/* Gêneros musicais */}
        <div className="profile-section">
          <h4 className="section-title">🎵 Gêneros Musicais</h4>
          <div className="profile-tags">
            {userGenres.length > 0
              ? userGenres.map(g => (
                  <span key={g.id} className="profile-genre-tag"
                    style={{ backgroundColor: g.color + '22', borderColor: g.color, color: g.color }}>
                    {g.emoji} {g.label}
                  </span>
                ))
              : <span className="profile-tag-empty">Não configurado</span>
            }
          </div>
        </div>

        {/* Saúde */}
        <div className="profile-section">
          <h4 className="section-title">🏥 Condições de Saúde</h4>
          <div className="profile-tags">
            {userHealth.length > 0
              ? userHealth.map(h => (
                  <span key={h.id} className="profile-health-tag"
                    style={{ backgroundColor: h.color + '22', borderColor: h.color, color: h.color }}>
                    {h.emoji} {h.label}
                  </span>
                ))
              : <span className="profile-tag profile-tag-green">✅ Sem restrições</span>
            }
          </div>
        </div>

        {/* Recordes Pessoais */}
        <div className="profile-section">
          <h4 className="section-title">🏆 Recordes Pessoais</h4>
          {prList.length === 0 ? (
            <p className="profile-empty">Nenhum recorde ainda — complete um treino com registro de carga!</p>
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
          <h4 className="section-title">📋 Planos de Treino</h4>
          <p className="profile-info-text">{plans.length} plano{plans.length !== 1 ? 's' : ''} criado{plans.length !== 1 ? 's' : ''}</p>
        </div>

        {/* Notificações */}
        <div className="profile-section">
          <h4 className="section-title">🔔 Lembretes de Treino</h4>
          {notifPerm === 'unsupported' ? (
            <p className="profile-info-text">Seu navegador não suporta notificações.</p>
          ) : notifPerm === 'denied' ? (
            <p className="notif-denied">🚫 Permissão negada. Habilite nas configurações do navegador.</p>
          ) : notifPerm === 'default' ? (
            <button className="btn-secondary notif-perm-btn" onClick={handleRequestPermission}>
              🔔 Permitir notificações
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
                {notifSaved ? '✓ Salvo!' : 'Salvar'}
              </button>
            </div>
          )}
        </div>

        {/* Spotify Playlists */}
        <div className="profile-section">
          <h4 className="section-title">🎵 Playlists do Spotify</h4>
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
                    {g.emoji} {g.label}
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
                {spotifySaved ? '✓ Salvo!' : '💾 Salvar Playlists'}
              </button>
            )}
          </div>
          <p className="spotify-hint">
            💡 Abra o Spotify → clique numa playlist → compartilhar → copiar link
          </p>
        </div>

        {/* Backup / Sincronização */}
        <div className="profile-section">
          <h4 className="section-title">☁️ Backup de Dados</h4>
          <p className="profile-info-text">Exporte seus treinos, planos e recordes para um arquivo JSON.</p>
          <div className="backup-actions">
            <button className="btn-secondary" onClick={handleExport}>
              📤 Exportar backup
            </button>
            <label className="btn-secondary backup-import-label">
              📥 Importar backup
              <input type="file" accept=".json" onChange={handleImport} style={{ display: 'none' }} />
            </label>
          </div>
          {importMsg && <p className="import-msg">{importMsg}</p>}
        </div>

      </div>

      {/* Ações */}
      <div className="profile-actions">
        <button className="profile-action-btn" onClick={onRedoQuestionnaire}>
          <span>🔄</span>
          <span>Refazer Questionário</span>
        </button>
        <button className="profile-action-btn profile-action-danger" onClick={onLogout}>
          <span>🚪</span>
          <span>Sair da Conta</span>
        </button>
      </div>
    </div>
  );
}
