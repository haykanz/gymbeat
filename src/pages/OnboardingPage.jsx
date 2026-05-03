import { useState } from 'react';

const SLIDES = [
  {
    emoji: '🎵',
    title: 'Treino no ritmo certo',
    desc: 'O GymBeat sincroniza a música com o BPM ideal de cada exercício. Música lenta para força, agitada para cardio — tudo automático.',
    accent: '#6C3AFF',
    bg: '#6C3AFF',
  },
  {
    emoji: '💪',
    title: '200+ exercícios completos',
    desc: 'Abdômen, peito, costas, pernas, ombros, braços — com ou sem equipamento. Filtre por grupo muscular e equipamento disponível.',
    accent: '#EC4899',
    bg: '#EC4899',
  },
  {
    emoji: '📈',
    title: 'Acompanhe sua evolução',
    desc: 'Registre cargas, bata recordes pessoais, veja gráficos de evolução e conquiste badges ao longo da jornada.',
    accent: '#10B981',
    bg: '#10B981',
  },
  {
    emoji: '🏆',
    title: 'Tudo personalizado',
    desc: 'Planos gerados com base no seu objetivo, nível e dias disponíveis. Adaptações para condições de saúde incluídas.',
    accent: '#F59E0B',
    bg: '#F59E0B',
  },
];

export default function OnboardingPage({ onFinish }) {
  const [step, setStep] = useState(0);
  const slide = SLIDES[step];
  const isLast = step === SLIDES.length - 1;

  const handleNext = () => {
    if (isLast) {
      localStorage.setItem('gym_onboarded', '1');
      onFinish();
    } else {
      setStep(s => s + 1);
    }
  };

  const handleSkip = () => {
    localStorage.setItem('gym_onboarded', '1');
    onFinish();
  };

  return (
    <div className="onboarding-page" style={{ '--ob-accent': slide.accent }}>

      {/* Skip */}
      <button className="ob-skip" onClick={handleSkip}>Pular →</button>

      {/* Slide content */}
      <div className="ob-slides">
        <div className="ob-slide" key={step}>
          <div className="ob-emoji-wrap" style={{ background: slide.bg + '22', border: `2px solid ${slide.bg}44` }}>
            <span className="ob-emoji">{slide.emoji}</span>
          </div>
          <h2 className="ob-title" style={{ color: slide.accent }}>{slide.title}</h2>
          <p className="ob-desc">{slide.desc}</p>
        </div>
      </div>

      {/* Dots */}
      <div className="ob-dots">
        {SLIDES.map((_, i) => (
          <button key={i} className={`ob-dot ${i === step ? 'active' : ''}`}
            style={i === step ? { background: slide.accent } : {}}
            onClick={() => setStep(i)} />
        ))}
      </div>

      {/* CTA */}
      <div className="ob-footer">
        <button className="ob-next-btn" style={{ background: slide.accent }} onClick={handleNext}>
          {isLast ? '🚀 Criar minha conta' : 'Próximo →'}
        </button>
      </div>
    </div>
  );
}
