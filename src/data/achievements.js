// ── Definição de Conquistas ──────────────────────────────────────────────
export const achievements = [
  {
    id: 'first-workout',
    emoji: '🏋️',
    title: 'Primeiro Passo',
    desc: 'Completou seu primeiro treino',
    rarity: 'common',
    check: ({ history }) => history.length >= 1,
  },
  {
    id: 'strong-start',
    emoji: '💪',
    title: 'Começo Forte',
    desc: 'Completou 5 treinos',
    rarity: 'common',
    check: ({ history }) => history.length >= 5,
  },
  {
    id: 'dedicated',
    emoji: '📅',
    title: 'Dedicado',
    desc: 'Completou 30 treinos',
    rarity: 'rare',
    check: ({ history }) => history.length >= 30,
  },
  {
    id: 'centurion',
    emoji: '💯',
    title: 'Centurião',
    desc: 'Completou 100 treinos',
    rarity: 'epic',
    check: ({ history }) => history.length >= 100,
  },
  {
    id: 'streak-3',
    emoji: '🔥',
    title: 'Em Chamas',
    desc: '3 dias seguidos de treino',
    rarity: 'common',
    check: ({ streak }) => streak >= 3,
  },
  {
    id: 'streak-7',
    emoji: '⚡',
    title: 'Semana Perfeita',
    desc: '7 dias seguidos de treino',
    rarity: 'rare',
    check: ({ streak }) => streak >= 7,
  },
  {
    id: 'streak-30',
    emoji: '🌟',
    title: 'Imparável',
    desc: '30 dias seguidos de treino',
    rarity: 'legendary',
    check: ({ streak }) => streak >= 30,
  },
  {
    id: 'first-pr',
    emoji: '🏆',
    title: 'Levantador',
    desc: 'Registrou o primeiro recorde pessoal',
    rarity: 'common',
    check: ({ prs }) => Object.keys(prs).length >= 1,
  },
  {
    id: 'pr-machine',
    emoji: '💎',
    title: 'Máquina de PRs',
    desc: 'Acumulou 10 recordes pessoais',
    rarity: 'rare',
    check: ({ prs }) => Object.keys(prs).length >= 10,
  },
  {
    id: 'free-spirit',
    emoji: '🎲',
    title: 'Espírito Livre',
    desc: 'Usou o Treino Livre pela primeira vez',
    rarity: 'common',
    check: ({ history }) => history.some(h => h.isFree),
  },
  {
    id: 'marathon',
    emoji: '⏱️',
    title: 'Maratonista',
    desc: 'Treinou por 60 minutos ou mais',
    rarity: 'rare',
    check: ({ history }) => history.some(h => (h.duration || 0) >= 60),
  },
  {
    id: 'calorie-crusher',
    emoji: '🔥',
    title: 'Queimador',
    desc: 'Queimou 500 calorias em um único treino',
    rarity: 'rare',
    check: ({ history }) => history.some(h => (h.calories || 0) >= 500),
  },
  {
    id: 'heavy-lifter',
    emoji: '🦾',
    title: 'Peso Pesado',
    desc: 'Levantou 100kg ou mais em qualquer exercício',
    rarity: 'epic',
    check: ({ prs }) => Object.values(prs).some(p => p.weight >= 100),
  },
  {
    id: 'plan-creator',
    emoji: '📋',
    title: 'Estrategista',
    desc: 'Criou seu primeiro plano de treino',
    rarity: 'common',
    check: ({ plans }) => plans.length >= 1,
  },
  {
    id: 'early-bird',
    emoji: '🌅',
    title: 'Madrugador',
    desc: 'Treinou antes das 7h da manhã',
    rarity: 'rare',
    check: ({ history }) => history.some(h => {
      const d = new Date(h.date);
      return d.getHours() < 7;
    }),
  },
];

export const rarityConfig = {
  common:    { label: 'Comum',    color: '#9CA3AF', bg: '#9CA3AF22' },
  rare:      { label: 'Raro',     color: '#3B82F6', bg: '#3B82F622' },
  epic:      { label: 'Épico',    color: '#8B5CF6', bg: '#8B5CF622' },
  legendary: { label: 'Lendário', color: '#F59E0B', bg: '#F59E0B22' },
};

/** Verifica quais conquistas foram desbloqueadas agora e retorna as novas */
export function checkNewAchievements(userId, context) {
  const unlocked = JSON.parse(localStorage.getItem(`gym_achievements_${userId}`) || '{}');
  const newOnes = [];

  for (const ach of achievements) {
    if (unlocked[ach.id]) continue; // já tinha
    try {
      if (ach.check(context)) {
        unlocked[ach.id] = { unlockedAt: new Date().toISOString() };
        newOnes.push(ach);
      }
    } catch { /* ignore */ }
  }

  if (newOnes.length > 0) {
    localStorage.setItem(`gym_achievements_${userId}`, JSON.stringify(unlocked));
  }
  return newOnes;
}
