import { useState, useMemo } from 'react';
import { exerciseLibrary, healthConditions } from '../data/exercises';
import { musicGenres } from '../data/music';

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
          <span className="fw-config-label">🔁 Séries por exercício</span>
          <div className="fw-sets-control">
            <button className="fw-set-btn" onClick={() => setSets(s => Math.max(1, s - 1))}>−</button>
            <span className="fw-sets-value">{sets}</span>
            <button className="fw-set-btn" onClick={() => setSets(s => Math.min(6, s + 1))}>+</button>
          </div>
        </div>

        {/* Info de duração */}
        {exercises.length > 0 && (
          <div className="fw-info-bar">
            <span>💪 {exercises.length} exercício{exercises.length !== 1 ? 's' : ''}</span>
            <span>🔁 {sets} séries</span>
            <span>⏱ ~{Math.round(totalTime / 60)} min</span>
          </div>
        )}

        {/* Lista de exercícios */}
        {exercises.length === 0 ? (
          <div className="fw-empty">
            <p className="fw-empty-icon">🏋️</p>
            <p className="fw-empty-title">Nenhum exercício ainda</p>
            <p className="fw-empty-sub">Adicione exercícios para montar seu treino</p>
          </div>
        ) : (
          <div className="fw-exercise-list">
            {exercises.map((ex, i) => {
              const catInfo = CATEGORY_LABELS[ex.category] || { color: '#6C3AFF', emoji: '•' };
              return (
                <div key={i} className="fw-ex-item">
                  <div className="fw-ex-order">
                    <button className="fw-order-btn" onClick={() => handleMoveUp(i)} disabled={i === 0}>↑</button>
                    <span className="fw-ex-num">{i + 1}</span>
                    <button className="fw-order-btn" onClick={() => handleMoveDown(i)} disabled={i === exercises.length - 1}>↓</button>
                  </div>
                  <span className="fw-ex-emoji">{ex.gif}</span>
                  <div className="fw-ex-info">
                    <p className="fw-ex-name">{ex.name}</p>
                    <div className="fw-ex-meta">
                      <span style={{ color: catInfo.color }}>{catInfo.emoji} {catInfo.label}</span>
                      <span>⏱ {ex.duration}s</span>
                      <span>🎵 {ex.bpmMin}–{ex.bpmMax} BPM</span>
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
          style={{ borderColor: genreInfo.color, color: genreInfo.color }}>
          + Adicionar Exercício
        </button>

        {/* Botão iniciar */}
        {exercises.length > 0 && (
          <button className="btn-primary btn-full fw-start-btn" onClick={handleStart}
            style={{ background: `linear-gradient(135deg, ${genreInfo.color}, ${genreInfo.color}cc)` }}>
            🎵 Iniciar Treino com Música
          </button>
        )}
      </div>
    </div>
  );
}

// ── Seletor de exercícios (reutiliza lógica do WorkoutSession) ─────────────
function ExercisePicker({ restricted, alreadyAdded, onSelect, onClose, genreInfo }) {
  const [search,    setSearch]    = useState('');
  const [catFilter, setCatFilter] = useState('all');

  const allExercises = useMemo(() => {
    const list = [];
    Object.entries(exerciseLibrary).forEach(([cat, exs]) => {
      exs.forEach(ex => { if (!restricted.has(ex.id)) list.push({ ...ex, category: cat }); });
    });
    return list;
  }, [restricted]);

  const filtered = useMemo(() => allExercises.filter(ex => {
    const matchCat    = catFilter === 'all' || ex.category === catFilter;
    const matchSearch = !search || ex.name.toLowerCase().includes(search.toLowerCase()) ||
      (ex.muscles || []).some(m => m.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  }), [allExercises, catFilter, search]);

  const categories = ['all', 'abs', 'chest', 'back', 'shoulders', 'arms', 'legs', 'glutes', 'cardio', 'strength', 'hiit', 'flexibility', 'adapted'];

  return (
    <div className="picker-overlay">
      <div className="picker-sheet">
        <div className="picker-header">
          <div>
            <h3>Adicionar Exercício</h3>
            <p className="picker-sub">{alreadyAdded.length} já adicionado{alreadyAdded.length !== 1 ? 's' : ''}</p>
          </div>
          <button className="picker-close" onClick={onClose}>✕</button>
        </div>
        <div className="picker-search-bar">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="Buscar por nome ou músculo..."
            value={search} onChange={e => setSearch(e.target.value)} autoFocus />
          {search && <button className="search-clear" onClick={() => setSearch('')}>✕</button>}
        </div>
        <div className="picker-cats">
          {categories.map(cat => {
            const info = cat === 'all'
              ? { label: 'Todos', emoji: '📋', color: '#6C3AFF' }
              : CATEGORY_LABELS[cat] || { label: cat, emoji: '•', color: '#6C3AFF' };
            return (
              <button key={cat}
                className={`cat-chip ${catFilter === cat ? 'active' : ''}`}
                style={catFilter === cat ? { backgroundColor: info.color, borderColor: info.color } : {}}
                onClick={() => setCatFilter(cat)}
              >{info.emoji} {info.label}</button>
            );
          })}
        </div>
        <p className="picker-count">{filtered.length} exercício{filtered.length !== 1 ? 's' : ''}</p>
        <div className="picker-list">
          {filtered.map(ex => {
            const catInfo = CATEGORY_LABELS[ex.category] || { color: '#6C3AFF', emoji: '•' };
            const added   = alreadyAdded.includes(ex.id);
            return (
              <button key={ex.id}
                className={`picker-item ${added ? 'picker-item-added' : ''}`}
                onClick={() => onSelect(ex)}
              >
                <span className="picker-item-emoji">{ex.gif}</span>
                <div className="picker-item-info">
                  <div className="picker-item-name-row">
                    <span className="picker-item-name">{ex.name}</span>
                    {added && <span className="added-tag">✓ Adicionado</span>}
                  </div>
                  <div className="picker-item-meta">
                    <span className="picker-cat-badge" style={{ color: catInfo.color }}>{catInfo.emoji} {catInfo.label}</span>
                    <span className="picker-bpm">🎵 {ex.bpmMin}–{ex.bpmMax} BPM</span>
                    <span className="picker-duration">⏱ {ex.duration}s</span>
                  </div>
                  <div className="picker-muscles">
                    {(ex.muscles || []).slice(0, 3).map((m, i) => (
                      <span key={i} className="muscle-tag-sm">{m}</span>
                    ))}
                  </div>
                </div>
                {!added && (
                  <span className="picker-add-icon" style={{ color: genreInfo.color }}>+</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
