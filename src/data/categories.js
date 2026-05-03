// ── Sistema de categorias unificado ─────────────────────────────────────────
// 5 grupos de cor semânticos — sem arco-íris, sem emojis estranhos

export const CATEGORY_LABELS = {
  // Força superior → roxo
  chest:       { label: 'Peito',      emoji: '💪', color: '#7C3AED' },
  back:        { label: 'Costas',     emoji: '💪', color: '#7C3AED' },
  shoulders:   { label: 'Ombros',     emoji: '💪', color: '#7C3AED' },
  arms:        { label: 'Braços',     emoji: '💪', color: '#7C3AED' },
  // Core → azul-ciano
  abs:         { label: 'Abdômen',    emoji: '🔥', color: '#0891B2' },
  // Força inferior → azul
  legs:        { label: 'Pernas',     emoji: '🦵', color: '#2563EB' },
  glutes:      { label: 'Glúteos',    emoji: '🦵', color: '#2563EB' },
  // Energia → laranja
  cardio:      { label: 'Cardio',     emoji: '🏃', color: '#D97706' },
  hiit:        { label: 'HIIT',       emoji: '⚡', color: '#DC2626' },
  // Funcional → verde
  strength:    { label: 'Força Func.',emoji: '🏋️', color: '#059669' },
  flexibility: { label: 'Flex.',      emoji: '🧘', color: '#059669' },
  adapted:     { label: 'Adaptado',   emoji: '✅', color: '#059669' },
};

// Tradução simples (sem cor) para exibição em texto puro
export const CAT_PT = {
  abs:         'Abdômen',
  chest:       'Peito',
  back:        'Costas',
  shoulders:   'Ombros',
  arms:        'Braços',
  legs:        'Pernas',
  glutes:      'Glúteos',
  cardio:      'Cardio',
  strength:    'Força Funcional',
  hiit:        'HIIT',
  flexibility: 'Flexibilidade',
  adapted:     'Adaptado',
};

// ── Equipamentos ─────────────────────────────────────────────────────────────
export const EQUIPMENT_FILTERS = {
  all:     { label: 'Todos',      emoji: '',   color: '#6C3AFF', match: null },
  free:    { label: 'Sem Peso',   emoji: '',   color: '#6C3AFF', match: ['peso_corporal','banco','paralelas','barra_fixa'] },
  dumbell: { label: 'Haltere',    emoji: '',   color: '#6C3AFF', match: ['haltere','kettlebell'] },
  barbell: { label: 'Barra',      emoji: '',   color: '#6C3AFF', match: ['barra','smith'] },
  machine: { label: 'Máquina',    emoji: '',   color: '#6C3AFF', match: ['maquina'] },
  cable:   { label: 'Cabo',       emoji: '',   color: '#6C3AFF', match: ['cabo'] },
  other:   { label: 'Outros',     emoji: '',   color: '#6C3AFF', match: ['elastico','roda_abdominal','kettlebell','bola','faixa'] },
};

export const EQ_BADGE = {
  peso_corporal:  'Corpo Livre',
  banco:          'Banco',
  paralelas:      'Paralelas',
  barra_fixa:     'Barra Fixa',
  haltere:        'Haltere',
  kettlebell:     'Kettlebell',
  barra:          'Barra',
  smith:          'Smith',
  maquina:        'Máquina',
  cabo:           'Cabo',
  elastico:       'Elástico',
  roda_abdominal: 'Roda Abd.',
};
