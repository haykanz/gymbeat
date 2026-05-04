// ── Sistema de categorias unificado ─────────────────────────────────────────
// Single accent color — premium, sem arco-íris, sem emojis

export const CATEGORY_LABELS = {
  abs:         { label: 'Abdômen',       color: '#00C27A' },
  chest:       { label: 'Peito',         color: '#00C27A' },
  back:        { label: 'Costas',        color: '#00C27A' },
  shoulders:   { label: 'Ombros',        color: '#00C27A' },
  arms:        { label: 'Braços',        color: '#00C27A' },
  legs:        { label: 'Pernas',        color: '#00C27A' },
  glutes:      { label: 'Glúteos',       color: '#00C27A' },
  cardio:      { label: 'Cardio',        color: '#C9A84C' },
  strength:    { label: 'Força',         color: '#00C27A' },
  hiit:        { label: 'HIIT',          color: '#C9A84C' },
  flexibility: { label: 'Flexibilidade', color: '#00C27A' },
  adapted:     { label: 'Adaptado',      color: '#00C27A' },
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
  all:     { label: 'Todos',    color: '#00C27A', match: null },
  free:    { label: 'Sem Peso', color: '#00C27A', match: ['peso_corporal','banco','paralelas','barra_fixa'] },
  dumbell: { label: 'Haltere',  color: '#00C27A', match: ['haltere','kettlebell'] },
  barbell: { label: 'Barra',    color: '#00C27A', match: ['barra','smith'] },
  machine: { label: 'Máquina',  color: '#00C27A', match: ['maquina'] },
  cable:   { label: 'Cabo',     color: '#00C27A', match: ['cabo'] },
  other:   { label: 'Outros',   color: '#00C27A', match: ['elastico','roda_abdominal','kettlebell','bola','faixa'] },
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
