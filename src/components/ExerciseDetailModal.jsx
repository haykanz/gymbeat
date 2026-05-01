// ── Modal de detalhes do exercício ───────────────────────────────────────────
// Usado no FreeWorkoutBuilder e WorkoutSession pickers

const CATEGORY_LABELS = {
  abs:         { label: 'Abdômen',   emoji: '🎯', color: '#F97316' },
  chest:       { label: 'Peito',     emoji: '🫁', color: '#EC4899' },
  back:        { label: 'Costas',    emoji: '🔙', color: '#14B8A6' },
  shoulders:   { label: 'Ombros',    emoji: '🏔️', color: '#6366F1' },
  arms:        { label: 'Braços',    emoji: '💪', color: '#A855F7' },
  legs:        { label: 'Pernas',    emoji: '🦵', color: '#3B82F6' },
  glutes:      { label: 'Glúteos',   emoji: '🍑', color: '#F43F5E' },
  cardio:      { label: 'Cardio',    emoji: '🏃', color: '#F59E0B' },
  strength:    { label: 'Força',     emoji: '🏋️', color: '#8B5CF6' },
  hiit:        { label: 'HIIT',      emoji: '🔥', color: '#EF4444' },
  flexibility: { label: 'Flex.',     emoji: '🧘', color: '#06B6D4' },
  adapted:     { label: 'Adaptado',  emoji: '✅', color: '#10B981' },
};

const EQ_LABELS = {
  peso_corporal:  { label: 'Corpo Livre', emoji: '🏠' },
  banco:          { label: 'Banco',       emoji: '🪑' },
  paralelas:      { label: 'Paralelas',   emoji: '⊧'  },
  barra_fixa:     { label: 'Barra Fixa',  emoji: '🔝' },
  haltere:        { label: 'Haltere',     emoji: '🏋️' },
  kettlebell:     { label: 'Kettlebell',  emoji: '⚫' },
  barra:          { label: 'Barra',       emoji: '🔩' },
  smith:          { label: 'Smith',       emoji: '🔩' },
  maquina:        { label: 'Máquina',     emoji: '🖥️' },
  cabo:           { label: 'Cabo',        emoji: '🔗' },
  elastico:       { label: 'Elástico',    emoji: '🎀' },
  roda_abdominal: { label: 'Roda Abd.',   emoji: '⚙️' },
};

const DIFFICULTY = (bpmMax) => {
  if (bpmMax >= 160) return { label: 'Avançado',    emoji: '🔴', color: '#EF4444' };
  if (bpmMax >= 130) return { label: 'Intermediário', emoji: '🟡', color: '#F59E0B' };
  return               { label: 'Iniciante',    emoji: '🟢', color: '#10B981' };
};

export default function ExerciseDetailModal({ ex, onClose, onAction, actionLabel }) {
  if (!ex) return null;

  const catInfo  = CATEGORY_LABELS[ex.category] || { label: ex.category || '—', emoji: '•', color: '#6C3AFF' };
  const eqInfo   = EQ_LABELS[ex.equipment] || null;
  const diff     = DIFFICULTY(ex.bpmMax || 120);

  return (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail-sheet" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="detail-header">
          <div className="detail-emoji-wrap">
            <span className="detail-emoji">{ex.gif}</span>
          </div>
          <div className="detail-title-area">
            <h3 className="detail-name">{ex.name}</h3>
            <div className="detail-badges">
              <span className="detail-badge" style={{ color: catInfo.color, background: catInfo.color + '22', border: `1px solid ${catInfo.color}44` }}>
                {catInfo.emoji} {catInfo.label}
              </span>
              {eqInfo && (
                <span className="detail-badge detail-badge-eq">
                  {eqInfo.emoji} {eqInfo.label}
                </span>
              )}
              <span className="detail-badge" style={{ color: diff.color, background: diff.color + '22', border: `1px solid ${diff.color}44` }}>
                {diff.emoji} {diff.label}
              </span>
            </div>
          </div>
          <button className="detail-close" onClick={onClose}>✕</button>
        </div>

        <div className="detail-body">

          {/* Stats rápidas */}
          <div className="detail-stats-grid">
            <div className="detail-stat">
              <span className="detail-stat-val">{ex.duration}s</span>
              <span className="detail-stat-label">⏱ Duração</span>
            </div>
            <div className="detail-stat">
              <span className="detail-stat-val">{ex.rest}s</span>
              <span className="detail-stat-label">😮‍💨 Descanso</span>
            </div>
            <div className="detail-stat">
              <span className="detail-stat-val">{ex.calories}</span>
              <span className="detail-stat-label">🔥 Cal/série</span>
            </div>
            <div className="detail-stat">
              <span className="detail-stat-val">{ex.bpmMin}–{ex.bpmMax}</span>
              <span className="detail-stat-label">🎵 BPM ideal</span>
            </div>
          </div>

          {/* Descrição / Execução */}
          {ex.description && (
            <div className="detail-section">
              <h4 className="detail-section-title">📋 Como executar</h4>
              <p className="detail-description">{ex.description}</p>
            </div>
          )}

          {/* Músculos */}
          {(ex.muscles || []).length > 0 && (
            <div className="detail-section">
              <h4 className="detail-section-title">💪 Músculos trabalhados</h4>
              <div className="detail-muscles">
                {ex.muscles.map((m, i) => (
                  <span key={i} className="detail-muscle-tag"
                    style={{ background: catInfo.color + '22', color: catInfo.color, border: `1px solid ${catInfo.color}44` }}>
                    {m}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Dica BPM */}
          <div className="detail-bpm-tip">
            <span>🎧</span>
            <span>Melhor entre <strong>{ex.bpmMin}</strong> e <strong>{ex.bpmMax} BPM</strong> — o app ajusta a música automaticamente</span>
          </div>

        </div>

        {/* Botão de ação */}
        {onAction && (
          <div className="detail-footer">
            <button className="btn-primary detail-action-btn"
              style={{ background: `linear-gradient(135deg, ${catInfo.color}, ${catInfo.color}bb)` }}
              onClick={() => { onAction(ex); onClose(); }}>
              {actionLabel || '+ Adicionar ao treino'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
