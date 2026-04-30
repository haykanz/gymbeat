import { useState } from 'react';
import { musicGenres } from '../data/music';
import { healthConditions } from '../data/exercises';

const steps = [
  {
    id: 'goal',
    title: 'Qual é seu objetivo principal?',
    subtitle: 'Escolha o que mais combina com você',
    type: 'single',
    options: [
      { value: 'perder-peso',   label: 'Perder Peso',   emoji: '🔥', desc: 'Queimar gordura e emagrecer' },
      { value: 'ganhar-musculo',label: 'Ganhar Músculo', emoji: '💪', desc: 'Hipertrofia e definição' },
      { value: 'resistencia',   label: 'Resistência',   emoji: '🏃', desc: 'Melhorar condicionamento' },
      { value: 'flexibilidade', label: 'Flexibilidade', emoji: '🧘', desc: 'Alongamento e mobilidade' },
      { value: 'saude-geral',   label: 'Saúde Geral',   emoji: '❤️', desc: 'Qualidade de vida' },
    ],
  },
  {
    id: 'fitnessLevel',
    title: 'Qual seu nível de condicionamento?',
    subtitle: 'Seja honesto — vamos criar o plano ideal',
    type: 'single',
    options: [
      { value: 'beginner',     label: 'Iniciante',     emoji: '🌱', desc: 'Começo agora ou voltei recentemente' },
      { value: 'intermediate', label: 'Intermediário', emoji: '⚡', desc: 'Treino há 6+ meses com regularidade' },
      { value: 'advanced',     label: 'Avançado',      emoji: '🏆', desc: 'Treino há anos, rotina sólida' },
    ],
  },
  {
    id: 'healthConditions',
    title: 'Você tem algum problema de saúde?',
    subtitle: 'Seja honesto — seu treino será adaptado automaticamente',
    type: 'health',  // tipo especial com lógica de "nenhum" exclusivo
    options: healthConditions.map(h => ({
      value: h.id, label: h.label, emoji: h.emoji, desc: h.desc, color: h.color,
    })),
  },
  {
    id: 'daysPerWeek',
    title: 'Quantos dias por semana pode treinar?',
    subtitle: 'Seja realista com sua agenda',
    type: 'single',
    options: [
      { value: '2', label: '2 dias', emoji: '📅', desc: 'Final de semana ou 2× na semana' },
      { value: '3', label: '3 dias', emoji: '📅', desc: 'Clássico e eficiente' },
      { value: '4', label: '4 dias', emoji: '📅', desc: 'Comprometido com resultados' },
      { value: '5', label: '5 dias', emoji: '📅', desc: 'Alta frequência de treino' },
    ],
  },
  {
    id: 'musicGenres',
    title: 'Qual música te coloca pra cima?',
    subtitle: 'Escolha até 3 gêneros favoritos',
    type: 'multiple',
    max: 3,
    options: musicGenres.map(g => ({ value: g.id, label: g.label, emoji: g.emoji, color: g.color })),
  },
  {
    id: 'sessionDuration',
    title: 'Quanto tempo tem por sessão?',
    subtitle: 'Vamos otimizar os exercícios para esse tempo',
    type: 'single',
    options: [
      { value: '20', label: '20 min', emoji: '⚡', desc: 'Treino rápido e intenso' },
      { value: '30', label: '30 min', emoji: '🕐', desc: 'Equilibrado e eficaz' },
      { value: '45', label: '45 min', emoji: '🕒', desc: 'Completo e detalhado' },
      { value: '60', label: '60 min', emoji: '🕐', desc: 'Treino extenso e aprofundado' },
    ],
  },
  {
    id: 'focusAreas',
    title: 'Quais regiões do corpo quer focar?',
    subtitle: 'Escolha até 3 áreas prioritárias',
    type: 'multiple',
    max: 3,
    options: [
      { value: 'peito',   label: 'Peito',   emoji: '🫁', desc: 'Peitoral e ombros' },
      { value: 'costas',  label: 'Costas',  emoji: '🔙', desc: 'Dorsal e lombar' },
      { value: 'pernas',  label: 'Pernas',  emoji: '🦵', desc: 'Quadríceps e isquiotibiais' },
      { value: 'gluteos', label: 'Glúteos', emoji: '🍑', desc: 'Bumbum em alta' },
      { value: 'barriga', label: 'Barriga', emoji: '🎯', desc: 'Core e abdômen' },
      { value: 'braco',   label: 'Braços',  emoji: '💪', desc: 'Bíceps e tríceps' },
    ],
  },
];

export default function QuestionnairePage({ user, onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({ healthConditions: ['nenhum'] });
  const step = steps[currentStep];

  // ── Seleção de saúde: "Nenhum" é exclusivo ────────────────────────────────
  const handleHealthSelect = (value) => {
    const current = answers.healthConditions || ['nenhum'];
    if (value === 'nenhum') {
      setAnswers({ ...answers, healthConditions: ['nenhum'] });
      return;
    }
    // Remove 'nenhum' ao selecionar qualquer condição
    const withoutNone = current.filter(v => v !== 'nenhum');
    if (withoutNone.includes(value)) {
      const next = withoutNone.filter(v => v !== value);
      setAnswers({ ...answers, healthConditions: next.length > 0 ? next : ['nenhum'] });
    } else {
      setAnswers({ ...answers, healthConditions: [...withoutNone, value] });
    }
  };

  const handleSelect = (value) => {
    if (step.id === 'healthConditions') { handleHealthSelect(value); return; }
    if (step.type === 'single') {
      setAnswers({ ...answers, [step.id]: value });
    } else {
      const current = answers[step.id] || [];
      if (current.includes(value)) {
        setAnswers({ ...answers, [step.id]: current.filter(v => v !== value) });
      } else if (current.length < (step.max || 99)) {
        setAnswers({ ...answers, [step.id]: [...current, value] });
      }
    }
  };

  const isSelected = (value) => {
    if (step.id === 'healthConditions') return (answers.healthConditions || []).includes(value);
    if (step.type === 'single') return answers[step.id] === value;
    return (answers[step.id] || []).includes(value);
  };

  const canNext = () => {
    if (step.id === 'healthConditions') return (answers.healthConditions || []).length > 0;
    if (step.type === 'single') return !!answers[step.id];
    return (answers[step.id] || []).length > 0;
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const profile = { ...answers, completedAt: new Date().toISOString() };
      const users = JSON.parse(localStorage.getItem('gym_users') || '[]');
      const idx = users.findIndex(u => u.id === user.id);
      if (idx !== -1) { users[idx].profile = profile; localStorage.setItem('gym_users', JSON.stringify(users)); }
      onComplete(profile);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;
  const isHealthStep = step.id === 'healthConditions';
  const hasRestrictions = isHealthStep && (answers.healthConditions || []).some(v => v !== 'nenhum');

  return (
    <div className="questionnaire-page">
      <div className="quest-header">
        <div className="quest-progress-bar">
          <div className="quest-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <p className="quest-step-label">Etapa {currentStep + 1} de {steps.length}</p>
      </div>

      <div className="quest-content">
        <div className="quest-title-block">
          {isHealthStep && <span className="quest-health-icon">🏥</span>}
          <h2>{step.title}</h2>
          <p>{step.subtitle}</p>
          {step.type === 'multiple' && (
            <span className="quest-multi-hint">
              Selecione até {step.max} opções ({(answers[step.id] || []).length}/{step.max})
            </span>
          )}
          {isHealthStep && (
            <div className="quest-health-note">
              <span>🔒</span>
              <span>Informação confidencial — usada apenas para personalizar seu treino</span>
            </div>
          )}
        </div>

        <div className={`quest-options ${
          isHealthStep ? 'grid-health' :
          step.options.length > 4 ? 'grid-3' : 'grid-2'
        }`}>
          {step.options.map(opt => {
            const selected = isSelected(opt.value);
            return (
              <button
                key={opt.value}
                className={`quest-option ${selected ? 'selected' : ''} ${opt.value === 'nenhum' ? 'opt-none' : ''}`}
                onClick={() => handleSelect(opt.value)}
                style={selected && opt.color ? { borderColor: opt.color, backgroundColor: opt.color + '22' } : {}}
              >
                <span className="opt-emoji">{opt.emoji}</span>
                <span className="opt-label">{opt.label}</span>
                {opt.desc && <span className="opt-desc">{opt.desc}</span>}
                {selected && <span className="opt-check" style={opt.color ? { backgroundColor: opt.color } : {}}>✓</span>}
              </button>
            );
          })}
        </div>

        {hasRestrictions && (
          <div className="quest-health-warning">
            <span>⚠️</span>
            <p>Seu plano de treino será <strong>automaticamente adaptado</strong> para as condições selecionadas. Exercícios inadequados serão substituídos por alternativas seguras.</p>
          </div>
        )}

        <div className="quest-actions">
          {currentStep > 0 && (
            <button className="btn-secondary" onClick={() => setCurrentStep(currentStep - 1)}>
              ← Voltar
            </button>
          )}
          <button className="btn-primary" onClick={handleNext} disabled={!canNext()}>
            {currentStep === steps.length - 1 ? '🚀 Criar Meu Plano' : 'Próximo →'}
          </button>
        </div>
      </div>
    </div>
  );
}
