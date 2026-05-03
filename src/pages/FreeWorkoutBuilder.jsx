import { useState, useMemo } from 'react';
import { exerciseLibrary, healthConditions } from '../data/exercises';
import { musicGenres } from '../data/music';
import ExerciseDetailModal from '../components/ExerciseDetailModal';
import { CATEGORY_LABELS, EQUIPMENT_FILTERS, EQ_BADGE as EQ_BADGE_MAP } from '../data/categories';

// Adapta EQ_BADGE para o formato com .label usado localmente
const EQ_BADGE = Object.fromEntries(
  Object.entries(EQ_BADGE_MAP).map(([k, v]) => [k, { label: v, emoji: '' }])
);

export default function FreeWorkoutBuilder({ userProfile, userId, onStart, onBack }) {
  const [workoutName, setWorkoutName] = useState('Treino Livre');
  const [exercises, setExercises]     = useState([]);
  const [sets, setSets]               = useState(3);
  const [showPicker, setShowPicker]   = useState(false);

  const genre     = (userProfile?.musicGenres || ['pop'])[0];
  const genreInfo = musicGenres.find(g => g.id === genre) || musicGenres[4];

  // Restrições de saúde
  const activeHealthIds  = userProfile?.healthConditions || ['nenhum'];
  const activeConditions = healthConditions.filter(h => activeHealthIds.includes(h.id) && h.id !== 'nenhum');
  const restricted       = new Set(activeConditions.flatMap(h => h.restrictedExercises));

  const totalTime = exercises.reduce((acc, ex) => acc + (ex.duration || 45) + (ex.rest || 15), 0) * sets;

  const handleAdd = (ex) => {
    setExercises(prev => [...prev, { ...ex }]);
    setShowPicker(false);
  };

  const handleRemove = (idx) => {
    setExercises(prev => prev.filter((_, i) => i !== idx));
  };

  const handleMoveUp = (idx) => {
    if (idx === 0) return;
    setExercises(prev => {
      const arr = [...prev];
      [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
      return arr;
    });
  };

  const handleMoveDown = (idx) => {
    setExercises(prev => {
      if (idx === prev.length - 1) return prev;
      const arr = [...prev];
      [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]];
      return arr;
    });
  };

  const handleStart = () => {
    const workout = {
      day: workoutName,
      category: 'Livre',
      exercises,
      sets,
      totalTime,
      restBetweenSets: 60,
      isFree: true,
    };
    onStart(workout);
  };

  return (
    <div className="free-workout-page">
      {showPicker && (
        <ExercisePicker
          restricted={restricted}
          alreadyAdded={exercises.map(e => e.id)}
          onSelect={handleAdd}
          onClose={() => setShowPicker(false)}
          genreInfo={genreInfo}
        />
      )}

      <header className="profile-header">
        <button className="btn-icon" onClick={onBack}>←</button>
        <h2>Treino Livre</h2>
        <div style={{ width: 40 }} />
      </header>

      <div className="fw-body">
        {/* Nome do treino */}
        <div className="fw-name-section">
          <input
            className="fw-name-input"
            value={workoutName}
            onChange={e => setWorkoutName(e.target.value)}
            placeholder="Nome do treino..."
            maxLength={40}
          />
        </div>

        {/* Config: séries */}
        <div className="fw-config">
          <span className="fw-config-label">Séries por exercício</span>
          <div className="fw-sets-control">
            <button className="fw-set-btn" onClick={() => setSets(s => Math.max(1, s - 1))}>−</button>
            <span className="fw-sets-value">{sets}</span>
            <button className="fw-set-btn" onClick={() => setSets(s => Math.min(6, s + 1))}>+</button>
          </div>
        </div>

        {/* Info de duração */}
        {exercises.length > 0 && (
          <div className="fw-info-bar">
            <span>{exercises.length} exercício{exercises.length !== 1 ? 's' : ''}</span>
            <span>{sets} séries</span>
            <span>~{Math.round(totalTime / 60)} min</span>
          </div>
        )}

        {/* Lista de exercícios */}
        {exercises.length === 0 ? (
          <div className="fw-empty">
            <p className="fw-empty-icon" style={{ fontSize: 32, color: 'var(--text3)' }}>—</p>
            <p className="fw-empty-title">Nenhum exercício ainda</p>
            <p className="fw-empty-sub">Adicione exercícios para montar seu treino</p>
          </div>
        ) : (
          <div className="fw-exercise-list">
            {exercises.map((ex, i) => {
              const catInfo = CATEGORY_LABELS[ex.category] || { color: '#6C3AFF', label: ex.category };
              const eqInfo  = EQ_BADGE[ex.equipment] || null;
              return (
                <div key={i} className="fw-ex-item">
                  <div className="fw-ex-order">
                    <button className="fw-order-btn" onClick={() => handleMoveUp(i)} disabled={i === 0}>↑</button>
                    <span className="fw-ex-num">{i + 1}</span>
                    <button className="fw-order-btn" onClick={() => handleMoveDown(i)} disabled={i === exercises.length - 1}>↓</button>
                  </div>
                  <div className="fw-ex-dot" style={{ background: catInfo.color }} />
                  <div className="fw-ex-info">
                    <p className="fw-ex-name">{ex.name}</p>
                    <div className="fw-ex-meta">
                      <span style={{ color: catInfo.color }}>{catInfo.label}</span>
                      {eqInfo && <span className="eq-badge-sm">{eqInfo.label}</span>}
                      <span>⏱ {ex.duration}s</span>
                    </div>
                  </div>
                  <button className="fw-remove-btn" onClick={() => handleRemove(i)}>✕</button>
                </div>
              );
            })}
          </div>
        )}

        {/* Botão adicionar */}
        <button className="fw-add-btn" onClick={() => setShowPicker(true)}
          style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>
          + Adicionar Exercício
        </button>

        {/* Botão iniciar */}
        {exercises.length > 0 && (
          <button className="btn-primary btn-full fw-start-btn" onClick={handleStart}>
            Iniciar Treino com Música
          </button>
        )}
      </div>
    </div>
  );
}

// ── Seletor de exercícios ──────────────────────────────────────────────────
function ExercisePicker({ restricted, alreadyAdded, onSelect, onClose, genreInfo }) {
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

  const filtered = useMemo(() => allExercises.filter(ex => {
    const matchCat    = catFilter === 'all' || ex.category === catFilter;
    const eqConf      = EQUIPMENT_FILTERS[eqFilter];
    const matchEq     = eqFilter === 'all' || !eqConf.match || eqConf.match.includes(ex.equipment);
    const matchSearch = !search || ex.name.toLowerCase().includes(search.toLowerCase()) ||
      (ex.muscles || []).some(m => m.toLowerCase().includes(search.toLowerCase())) ||
      (EQ_BADGE[ex.equipment]?.label || '').toLowerCase().includes(search.toLowerCase());
    return matchCat && matchEq && matchSearch;
  }), [allExercises, catFilter, eqFilter, search]);

  const categories  = ['all', 'abs', 'chest', 'back', 'shoulders', 'arms', 'legs', 'glutes', 'cardio', 'strength', 'hiit', 'flexibility', 'adapted'];
  const equipments  = Object.keys(EQUIPMENT_FILTERS);

  // Conta ativos por filtro de equipamento para mostrar disponibilidade
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
        onAction={alreadyAdded.includes(detailEx.id) ? null : onSelect}
        actionLabel="+ Adicionar ao treino"
      />
    )}
    <div className="picker-overlay">
      <div className="picker-sheet">
        <div className="picker-header">
          <div>
            <h3>Adicionar Exercício</h3>
            <p className="picker-sub">{alreadyAdded.length} já adicionado{alreadyAdded.length !== 1 ? 's' : ''}</p>
          </div>
          <button className="picker-close" onClick={onClose}>✕</button>
        </div>

        {/* Busca */}
        <div className="picker-search-bar">
          <span className="search-icon" style={{ color: 'var(--text3)', fontSize: 14 }}>⌕</span>
          <input type="text" placeholder="Nome, músculo ou equipamento..."
            value={search} onChange={e => setSearch(e.target.value)} autoFocus />
          {search && <button className="search-clear" onClick={() => setSearch('')}>✕</button>}
        </div>

        {/* Filtro: Categoria */}
        <p className="picker-filter-label">Grupo muscular</p>
        <div className="picker-cats">
          {categories.map(cat => {
            const info = cat === 'all'
              ? { label: 'Todos', color: '#6C3AFF' }
              : CATEGORY_LABELS[cat] || { label: cat, color: '#6C3AFF' };
            return (
              <button key={cat}
                className={`cat-chip ${catFilter === cat ? 'active' : ''}`}
                style={{}}
                onClick={() => setCatFilter(cat)}
              >{info.label}</button>
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

        {/* Lista */}
        <div className="picker-list">
          {filtered.length === 0 ? (
            <div className="picker-empty">
              <p>Nenhum exercício encontrado</p>
              <p>Tente mudar os filtros</p>
            </div>
          ) : filtered.map(ex => {
            const catInfo = CATEGORY_LABELS[ex.category] || { color: '#6C3AFF', label: ex.category };
            const eqInfo  = EQ_BADGE[ex.equipment] || null;
            const added   = alreadyAdded.includes(ex.id);
            return (
              <div key={ex.id} className={`picker-item ${added ? 'picker-item-added' : ''}`}>
                <div className="picker-item-dot" style={{ background: catInfo.color }} />
                <div className="picker-item-info" onClick={() => setDetailEx(ex)} style={{ cursor: 'pointer', flex: 1 }}>
                  <div className="picker-item-name-row">
                    <span className="picker-item-name">{ex.name}</span>
                    {added && <span className="added-tag">✓ Adicionado</span>}
                  </div>
                  <div className="picker-item-meta">
                    <span className="picker-cat-badge">{catInfo.label}</span>
                    {eqInfo && (
                      <span className="picker-eq-badge">{eqInfo.label}</span>
                    )}
                    <span className="picker-bpm">{ex.bpmMin}–{ex.bpmMax} BPM</span>
                  </div>
                  <div className="picker-muscles">
                    {(ex.muscles || []).slice(0, 3).map((m, i) => (
                      <span key={i} className="muscle-tag-sm">{m}</span>
                    ))}
                  </div>
                </div>
                <div className="picker-item-actions">
                  <button className="picker-info-btn" onClick={() => setDetailEx(ex)} title="Ver detalhes">i</button>
                  {!added && (
                    <button className="picker-add-btn" style={{ color: 'var(--primary)', borderColor: 'var(--primary)' }}
                      onClick={() => onSelect(ex)}>+</button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    </>
  );
}
