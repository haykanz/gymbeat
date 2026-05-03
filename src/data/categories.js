// ── Sistema de categorias unificado ─────────────────────────────────────────
// Single accent color — premium, sem arco-íris, sem emojis

export const CATEGORY_LABELS = {
  abs:         { label: 'Abdômen',       color: '#6C3AFF' },
  chest:       { label: 'Peito',         color: '#6C3AFF' },
  back:        { label: 'Costas',        color: '#6C3AFF' },
  shoulders:   { label: 'Ombros',        color: '#6C3AFF' },
  arms:        { label: 'Braços',        color: '#6C3AFF' },
  legs:        { label: 'Pernas',        color: '#6C3AFF' },
  glutes:      { label: 'Glúteos',       color: '#6C3AFF' },
  cardio:      { label: 'Cardio',        color: '#C9A84C' },
  strength:    { label: 'Força',         color: '#6C3AFF' },
  hiit:        { label: 'HIIT',          color: '#C9A84C' },
  flexibility: { label: 'Flexibilidade', color: '#6C3AFF' },
  adapted:     { label: 'Adaptado',      color: '#6C3AFF' },
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
  all:     { label: 'Todos',    color: '#6C3AFF', match: null },
  free:    { label: 'Sem Peso', color: '#6C3AFF', match: ['peso_corporal','banco','paralelas','barra_fixa'] },
  dumbell: { label: 'Haltere',  color: '#6C3AFF', match: ['haltere','kettlebell'] },
  barbell: { label: 'Barra',    color: '#6C3AFF', match: ['barra','smith'] },
  machine: { label: 'Máquina',  color: '#6C3AFF', match: ['maquina'] },
  cable:   { label: 'Cabo',     color: '#6C3AFF', match: ['cabo'] },
  other:   { label: 'Outros',   color: '#6C3AFF', match: ['elastico','roda_abdominal','kettlebell','bola','faixa'] },
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
