// ─── Biblioteca de exercícios ────────────────────────────────────────────────
// bpmMin/bpmMax = BPM musical ideal para o ritmo do exercício
export const exerciseLibrary = {
  cardio: [
    { id: 'jumping-jacks',     name: 'Jumping Jacks',        duration: 45, rest: 15, calories: 8,  bpmMin: 130, bpmMax: 155, gif: '🤸', description: 'Abra e feche braços e pernas simultaneamente', muscles: ['pernas', 'ombros'] },
    { id: 'high-knees',        name: 'High Knees',           duration: 45, rest: 15, calories: 10, bpmMin: 140, bpmMax: 165, gif: '🏃', description: 'Eleve os joelhos alternadamente até a altura do quadril', muscles: ['core', 'pernas'] },
    { id: 'burpees',           name: 'Burpees',              duration: 30, rest: 30, calories: 12, bpmMin: 150, bpmMax: 175, gif: '💪', description: 'Agachamento, prancha, flexão e salto', muscles: ['corpo inteiro'] },
    { id: 'mountain-climbers', name: 'Mountain Climbers',    duration: 45, rest: 15, calories: 9,  bpmMin: 140, bpmMax: 165, gif: '🧗', description: 'Posição de prancha com joelhos alternados ao peito', muscles: ['core', 'ombros'] },
    { id: 'skipping',          name: 'Skipping no Lugar',    duration: 60, rest: 15, calories: 11, bpmMin: 135, bpmMax: 158, gif: '⚡', description: 'Corra no lugar elevando os joelhos rapidamente', muscles: ['pernas', 'core'] },
    { id: 'lateral-shuffle',   name: 'Passada Lateral',      duration: 45, rest: 15, calories: 8,  bpmMin: 120, bpmMax: 145, gif: '↔️', description: 'Deslize lateralmente de um lado para o outro', muscles: ['pernas', 'glúteos'] },
  ],
  strength: [
    { id: 'squat',             name: 'Agachamento',          duration: 45, rest: 20, calories: 6,  bpmMin: 100, bpmMax: 130, gif: '🦵', description: 'Desça com as costas retas até as coxas paralelas ao chão', muscles: ['quadríceps', 'glúteos'] },
    { id: 'pushup',            name: 'Flexão de Braço',      duration: 45, rest: 20, calories: 7,  bpmMin: 105, bpmMax: 130, gif: '💪', description: 'Posição de prancha, desça o peito ao chão', muscles: ['peito', 'tríceps', 'ombros'] },
    { id: 'lunge',             name: 'Avanço (Lunge)',       duration: 45, rest: 20, calories: 6,  bpmMin: 100, bpmMax: 128, gif: '🦵', description: 'Avance um passo e desça o joelho traseiro ao chão', muscles: ['quadríceps', 'glúteos'] },
    { id: 'plank',             name: 'Prancha',              duration: 45, rest: 15, calories: 4,  bpmMin: 90,  bpmMax: 115, gif: '🧘', description: 'Mantenha o corpo reto apoiado nos antebraços', muscles: ['core', 'ombros'] },
    { id: 'glute-bridge',      name: 'Ponte de Glúteos',     duration: 45, rest: 15, calories: 5,  bpmMin: 88,  bpmMax: 112, gif: '🍑', description: 'Deitado, eleve o quadril contraindo os glúteos', muscles: ['glúteos', 'isquiotibiais'] },
    { id: 'tricep-dip',        name: 'Tríceps na Cadeira',   duration: 40, rest: 20, calories: 5,  bpmMin: 95,  bpmMax: 120, gif: '💺', description: 'Apoie as mãos na cadeira e desça o corpo', muscles: ['tríceps', 'peito'] },
    { id: 'superman',          name: 'Superman',             duration: 45, rest: 15, calories: 4,  bpmMin: 85,  bpmMax: 110, gif: '🦸', description: 'Deitado de bruços, eleve braços e pernas simultaneamente', muscles: ['lombar', 'glúteos'] },
    { id: 'wall-sit',          name: 'Cadeira na Parede',    duration: 45, rest: 20, calories: 5,  bpmMin: 90,  bpmMax: 118, gif: '🧱', description: 'Encoste na parede e flexione os joelhos a 90°', muscles: ['quadríceps', 'glúteos'] },
    { id: 'calf-raise',        name: 'Elevação de Panturrilha', duration: 40, rest: 15, calories: 3, bpmMin: 95, bpmMax: 120, gif: '🦶', description: 'Fique na ponta dos pés, subindo e descendo', muscles: ['panturrilha'] },
  ],
  flexibility: [
    { id: 'downward-dog',      name: 'Cachorro p/ Baixo',    duration: 60, rest: 10, calories: 2,  bpmMin: 70,  bpmMax: 95,  gif: '🐕', description: 'Forme um V invertido com o corpo', muscles: ['panturrilha', 'ombros', 'costas'] },
    { id: 'child-pose',        name: 'Postura da Criança',   duration: 60, rest: 10, calories: 1,  bpmMin: 60,  bpmMax: 85,  gif: '🧘', description: 'Ajoelhe e estenda os braços à frente, relaxando a coluna', muscles: ['costas', 'quadris'] },
    { id: 'hip-flexor',        name: 'Flexor de Quadril',    duration: 60, rest: 10, calories: 2,  bpmMin: 68,  bpmMax: 90,  gif: '🙆', description: 'Em avanço, mantenha o quadril baixo e expanda o peito', muscles: ['flexores do quadril'] },
    { id: 'seated-twist',      name: 'Torção Sentada',       duration: 45, rest: 10, calories: 1,  bpmMin: 65,  bpmMax: 88,  gif: '🌀', description: 'Sente e gire o tronco para cada lado lentamente', muscles: ['coluna', 'oblíquos'] },
    { id: 'cat-cow',           name: 'Gato e Vaca',          duration: 45, rest: 10, calories: 1,  bpmMin: 60,  bpmMax: 82,  gif: '🐈', description: 'De quatro, alterne a coluna curvada e arqueada', muscles: ['coluna', 'core'] },
    { id: 'pigeon-pose',       name: 'Postura do Pombo',     duration: 60, rest: 10, calories: 2,  bpmMin: 62,  bpmMax: 84,  gif: '🕊️', description: 'Abra o quadril numa posição de passada ampla', muscles: ['quadris', 'glúteos'] },
  ],
  hiit: [
    { id: 'squat-jump',        name: 'Agachamento com Salto',duration: 30, rest: 30, calories: 12, bpmMin: 150, bpmMax: 178, gif: '🚀', description: 'Agache e exploda num salto vertical máximo', muscles: ['pernas', 'glúteos'] },
    { id: 'speed-skaters',     name: 'Speed Skaters',        duration: 40, rest: 20, calories: 10, bpmMin: 145, bpmMax: 168, gif: '⛸️', description: 'Salte lateralmente alternando as pernas como um patinador', muscles: ['pernas', 'core'] },
    { id: 'box-jumps',         name: 'Box Jumps',            duration: 30, rest: 30, calories: 13, bpmMin: 155, bpmMax: 182, gif: '📦', description: 'Salte e aterrisse suavemente em agachamento', muscles: ['pernas', 'core'] },
    { id: 'push-jump',         name: 'Flexão com Salto',     duration: 30, rest: 30, calories: 11, bpmMin: 150, bpmMax: 175, gif: '🔥', description: 'Flexão seguida de um salto explosivo para cima', muscles: ['peito', 'pernas', 'core'] },
    { id: 'tuck-jumps',        name: 'Tuck Jumps',           duration: 30, rest: 30, calories: 14, bpmMin: 158, bpmMax: 185, gif: '🦘', description: 'Salte puxando os joelhos até o peito no ar', muscles: ['pernas', 'core'] },
  ],
  // Exercícios adaptados para condições de saúde
  adapted: [
    { id: 'seated-march',      name: 'Marcha Sentado',       duration: 60, rest: 15, calories: 3,  bpmMin: 88,  bpmMax: 115, gif: '🪑', description: 'Sentado, eleve os joelhos alternadamente', muscles: ['pernas', 'core'], adapts: ['joelho', 'lombar', 'gravidez'] },
    { id: 'wall-pushup',       name: 'Flexão na Parede',     duration: 45, rest: 15, calories: 4,  bpmMin: 95,  bpmMax: 118, gif: '🧱', description: 'Flexão inclinado contra a parede, sem impacto', muscles: ['peito', 'tríceps'], adapts: ['ombro_leve'] },
    { id: 'seated-leg-raise',  name: 'Elevação de Perna Sentado', duration: 45, rest: 15, calories: 3, bpmMin: 85, bpmMax: 110, gif: '🦵', description: 'Sentado, estenda a perna alternando os lados', muscles: ['quadríceps'], adapts: ['joelho', 'lombar', 'gravidez'] },
    { id: 'gentle-squat',      name: 'Mini-Agachamento',     duration: 45, rest: 20, calories: 4,  bpmMin: 92,  bpmMax: 118, gif: '🏋️', description: 'Agachamento parcial (menos de 90°), sem impacto', muscles: ['quadríceps', 'glúteos'], adapts: ['joelho', 'cardiac'] },
    { id: 'deep-breathing',    name: 'Respiração Diafragmática', duration: 60, rest: 10, calories: 1, bpmMin: 60, bpmMax: 80, gif: '🫁', description: 'Inspire pelo nariz 4s, expire pela boca 6s', muscles: ['core', 'diafragma'], adapts: ['cardiac', 'hipertensao', 'gravidez'] },
    { id: 'standing-side-bend',name: 'Flexão Lateral em Pé', duration: 45, rest: 10, calories: 2,  bpmMin: 72,  bpmMax: 95,  gif: '🤸', description: 'Em pé, incline o tronco para os lados alternando', muscles: ['oblíquos', 'lombar'], adapts: ['lombar_leve', 'gravidez'] },
    { id: 'ankle-circles',     name: 'Círculos de Tornozelo',duration: 45, rest: 10, calories: 1,  bpmMin: 70,  bpmMax: 90,  gif: '🦶', description: 'Faça círculos com os pés, sentado ou deitado', muscles: ['tornozelo', 'panturrilha'], adapts: ['varizes', 'joelho'] },
    { id: 'seated-shoulder',   name: 'Mobilidade de Ombro Sentado', duration: 45, rest: 10, calories: 2, bpmMin: 68, bpmMax: 88, gif: '💆', description: 'Sentado, faça círculos lentos com os ombros', muscles: ['ombros'], adapts: ['ombro', 'cardiac', 'gravidez'] },
    { id: 'pelvic-tilt',       name: 'Inclinação Pélvica',   duration: 45, rest: 10, calories: 2,  bpmMin: 65,  bpmMax: 85,  gif: '🧘', description: 'Deitado, contraia o core e achate as costas no chão', muscles: ['core', 'lombar'], adapts: ['lombar', 'gravidez_inicial'] },
    { id: 'standing-march',    name: 'Marcha no Lugar (Leve)',duration: 60, rest: 15, calories: 4,  bpmMin: 95,  bpmMax: 120, gif: '🚶', description: 'Marche no lugar em ritmo confortável', muscles: ['pernas', 'core'], adapts: ['cardiac', 'hipertensao', 'varizes', 'diabetes'] },
  ],
};

// ─── Condições de Saúde ──────────────────────────────────────────────────────
export const healthConditions = [
  {
    id: 'nenhum',
    label: 'Nenhum problema',
    emoji: '✅',
    desc: 'Sem restrições de saúde',
    color: '#10B981',
    restrictedExercises: [],
    restrictedCategories: [],
    maxIntensity: 'high',
    warning: null,
  },
  {
    id: 'joelho',
    label: 'Problema no Joelho',
    emoji: '🦵',
    desc: 'Dor, lesão ou cirurgia no joelho',
    color: '#F59E0B',
    restrictedExercises: ['jumping-jacks','high-knees','burpees','squat-jump','box-jumps','speed-skaters','skipping','tuck-jumps','push-jump','lunge'],
    restrictedCategories: ['hiit'],
    maxIntensity: 'medium',
    warning: '⚠️ Exercícios de impacto e salto foram substituídos por versões sem carga no joelho.',
  },
  {
    id: 'lombar',
    label: 'Dor Lombar / Coluna',
    emoji: '🔙',
    desc: 'Hérnia, dor ou problema na coluna',
    color: '#EF4444',
    restrictedExercises: ['burpees','squat-jump','box-jumps','push-jump','tuck-jumps','superman','downward-dog'],
    restrictedCategories: ['hiit'],
    maxIntensity: 'medium',
    warning: '⚠️ Exercícios que sobrecarregam a coluna foram substituídos por movimentos seguros para a lombar.',
  },
  {
    id: 'ombro',
    label: 'Lesão no Ombro',
    emoji: '💪',
    desc: 'Dor, tendinite ou cirurgia no ombro',
    color: '#8B5CF6',
    restrictedExercises: ['pushup','mountain-climbers','plank','tricep-dip','push-jump','burpees','downward-dog'],
    restrictedCategories: [],
    maxIntensity: 'medium',
    warning: '⚠️ Exercícios que sobrecarregam o ombro foram adaptados ou substituídos.',
  },
  {
    id: 'cardiac',
    label: 'Problema Cardíaco',
    emoji: '❤️',
    desc: 'Doença cardíaca, arritmia ou pós-infarto',
    color: '#EF4444',
    restrictedExercises: ['burpees','squat-jump','box-jumps','push-jump','tuck-jumps','speed-skaters','high-knees','skipping'],
    restrictedCategories: ['hiit'],
    maxIntensity: 'low',
    warning: '🚨 Treino adaptado para frequência cardíaca segura. Consulte seu cardiologista antes de iniciar.',
  },
  {
    id: 'hipertensao',
    label: 'Hipertensão',
    emoji: '🩸',
    desc: 'Pressão arterial alta controlada ou não',
    color: '#EC4899',
    restrictedExercises: ['burpees','squat-jump','box-jumps','push-jump','tuck-jumps'],
    restrictedCategories: ['hiit'],
    maxIntensity: 'medium',
    warning: '⚠️ Exercícios de alta intensidade foram moderados. Monitore sua pressão arterial.',
  },
  {
    id: 'varizes',
    label: 'Varizes',
    emoji: '🦵',
    desc: 'Varizes ou insuficiência venosa nas pernas',
    color: '#6B7280',
    restrictedExercises: ['squat-jump','box-jumps','tuck-jumps','speed-skaters','jumping-jacks'],
    restrictedCategories: [],
    maxIntensity: 'medium',
    warning: '⚠️ Exercícios de salto e impacto foram substituídos para melhorar o retorno venoso.',
  },
  {
    id: 'gravidez',
    label: 'Gravidez',
    emoji: '🤰',
    desc: 'Grávida ou pós-parto recente (< 3 meses)',
    color: '#F97316',
    restrictedExercises: ['burpees','squat-jump','box-jumps','push-jump','tuck-jumps','speed-skaters','mountain-climbers','superman','jumping-jacks','high-knees'],
    restrictedCategories: ['hiit'],
    maxIntensity: 'low',
    warning: '🤰 Treino adaptado para gravidez segura. Sempre consulte seu obstetra antes de treinar.',
  },
  {
    id: 'diabetes',
    label: 'Diabetes',
    emoji: '💉',
    desc: 'Diabetes tipo 1 ou tipo 2',
    color: '#06B6D4',
    restrictedExercises: ['tuck-jumps'],
    restrictedCategories: [],
    maxIntensity: 'medium',
    warning: '⚠️ Monitore a glicemia antes e após o treino. Tenha algo doce à mão caso necessário.',
  },
];

// ─── Templates de treino ─────────────────────────────────────────────────────
export const workoutTemplates = {
  beginner:     { name: 'Iniciante',     sets: 2, restBetweenSets: 90, description: 'Perfeito para quem está começando' },
  intermediate: { name: 'Intermediário', sets: 3, restBetweenSets: 60, description: 'Para quem já treina há algum tempo' },
  advanced:     { name: 'Avançado',      sets: 4, restBetweenSets: 45, description: 'Para atletas experientes' },
};

// ─── Gerador de plano inteligente ────────────────────────────────────────────
export function generateWorkoutPlan(userProfile) {
  const { goal, fitnessLevel, daysPerWeek, healthConditions: userHealthIds = ['nenhum'] } = userProfile;
  const template = workoutTemplates[fitnessLevel] || workoutTemplates.beginner;

  // Junta todas as restrições das condições selecionadas
  const activeConditions = healthConditions.filter(h => userHealthIds.includes(h.id));
  const allRestrictedExercises = new Set(activeConditions.flatMap(h => h.restrictedExercises));
  const allRestrictedCategories = new Set(activeConditions.flatMap(h => h.restrictedCategories));
  const maxIntensity = activeConditions.some(h => h.maxIntensity === 'low') ? 'low'
    : activeConditions.some(h => h.maxIntensity === 'medium') ? 'medium' : 'high';
  const warnings = activeConditions.map(h => h.warning).filter(Boolean);

  // Mapa de categorias por objetivo (considerando restrições)
  const goalCategoryMap = {
    'perder-peso':   ['hiit', 'cardio', 'strength'],
    'ganhar-musculo':['strength', 'strength', 'cardio'],
    'resistencia':   ['cardio', 'hiit', 'cardio'],
    'flexibilidade': ['flexibility', 'strength', 'flexibility'],
    'saude-geral':   ['cardio', 'strength', 'flexibility'],
  };
  let categories = (goalCategoryMap[goal] || ['cardio', 'strength', 'flexibility'])
    .filter(c => !allRestrictedCategories.has(c));

  // Se todas as categorias do objetivo foram bloqueadas, fallback seguro
  if (categories.length === 0) categories = ['flexibility', 'strength'];

  const dayNames = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
  const selectedDays = dayNames.slice(0, Math.min(parseInt(daysPerWeek) || 3, 7));
  const exCount = fitnessLevel === 'beginner' ? 4 : fitnessLevel === 'intermediate' ? 5 : 6;

  const days = selectedDays.map((dayName, i) => {
    const category = categories[i % categories.length];
    let pool = (exerciseLibrary[category] || exerciseLibrary.cardio)
      .filter(ex => !allRestrictedExercises.has(ex.id));

    // Se poucos exercícios passaram pelo filtro, completa com adaptados
    if (pool.length < exCount) {
      const adaptedPool = exerciseLibrary.adapted.filter(ex =>
        !allRestrictedExercises.has(ex.id)
      );
      pool = [...pool, ...adaptedPool];
    }

    // Ajuste de intensidade: se maxIntensity === 'low', prefere duração menor
    const finalPool = maxIntensity === 'low'
      ? pool.sort((a, b) => a.bpmMax - b.bpmMax)  // começa pelos mais lentos
      : pool;

    const selected = finalPool.slice(0, exCount);

    return {
      day: dayName,
      category,
      sets: template.sets,
      restBetweenSets: template.restBetweenSets,
      exercises: selected,
      totalTime: selected.reduce((acc, ex) => acc + (ex.duration + ex.rest) * template.sets, 0)
        + template.restBetweenSets * (template.sets - 1),
      hasAdaptations: selected.some(ex => ex.adapts),
    };
  });

  return {
    name: buildPlanName(goal, template.name, activeConditions),
    level: template.name,
    days,
    warnings,
    healthConditions: userHealthIds,
    createdAt: new Date().toISOString(),
  };
}

function buildPlanName(goal, level, activeConditions) {
  const goalNames = {
    'perder-peso':   'Queimar Gordura',
    'ganhar-musculo':'Ganho de Massa',
    'resistencia':   'Resistência',
    'flexibilidade': 'Flexibilidade',
    'saude-geral':   'Saúde Total',
  };
  const hasRestrictions = activeConditions.some(h => h.id !== 'nenhum');
  return `${level} — ${goalNames[goal] || 'Treino Personalizado'}${hasRestrictions ? ' (Adaptado)' : ''}`;
}
