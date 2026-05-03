// ── Modal de detalhes do exercício ───────────────────────────────────────────
import { CATEGORY_LABELS, EQ_BADGE as EQ_BADGE_MAP } from '../data/categories';
const EQ_LABELS = Object.fromEntries(Object.entries(EQ_BADGE_MAP).map(([k, v]) => [k, { label: v }]));

const DIFFICULTY = (bpmMax) => {
  if (bpmMax >= 160) return { label: 'Avançado',      color: '#EF4444' };
  if (bpmMax >= 130) return { label: 'Intermediário', color: '#F59E0B' };
  return               { label: 'Iniciante',    color: '#10B981' };
};

export default function ExerciseDetailModal({ ex, onClose, onAction, actionLabel }) {
  if (!ex) return null;

  const catInfo  = CATEGORY_LABELS[ex.category] || { label: ex.category || '—', color: '#6C3AFF' };
  const eqInfo   = EQ_LABELS[ex.equipment] || null;
  const diff     = DIFFICULTY(ex.bpmMax || 120);

  return (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail-sheet" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="detail-header">
          <div className="detail-cat-bar" style={{ background: catInfo.color }} />
          <div className="detail-title-area">
            <h3 className="detail-name">{ex.name}</h3>
            <div className="detail-badges">
              <span className="detail-badge" style={{ color: catInfo.color, background: catInfo.color + '18', border: `1px solid ${catInfo.color}33` }}>
                {catInfo.label}
              </span>
              {eqInfo && (
                <span className="detail-badge detail-badge-eq">
                  {eqInfo.label}
                </span>
              )}
              <span className="detail-badge" style={{ color: diff.color, background: diff.color + '18', border: `1px solid ${diff.color}33` }}>
                {diff.label}
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
              <span className="detail-stat-label">Duração</span>
            </div>
            <div className="detail-stat">
              <span className="detail-stat-val">{ex.rest}s</span>
              <span className="detail-stat-label">Descanso</span>
            </div>
            <div className="detail-stat">
              <span className="detail-stat-val">{ex.calories}</span>
              <span className="detail-stat-label">Cal/série</span>
            </div>
            <div className="detail-stat">
              <span className="detail-stat-val">{ex.bpmMin}–{ex.bpmMax}</span>
              <span className="detail-stat-label">BPM ideal</span>
            </div>
          </div>

          {/* Descrição / Execução */}
          {ex.description && (
            <div className="detail-section">
              <h4 className="detail-section-title">Como executar</h4>
              <p className="detail-description">{ex.description}</p>
            </div>
          )}

          {/* Músculos */}
          {(ex.muscles || []).length > 0 && (
            <div className="detail-section">
              <h4 className="detail-section-title">Músculos trabalhados</h4>
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
            <span>Melhor entre <strong>{ex.bpmMin}</strong> e <strong>{ex.bpmMax} BPM</strong> — o app ajusta a música automaticamente</span>
          </div>

        </div>

        {/* Botão de ação */}
        {onAction && (
          <div className="detail-footer">
            <button className="btn-primary detail-action-btn"
              onClick={() => { onAction(ex); onClose(); }}>
              {actionLabel || '+ Adicionar ao treino'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
