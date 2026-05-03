import { useState } from 'react';

const SLIDES = [
  {
    step: '01',
    title: 'Treino no ritmo certo',
    desc: 'O GymBeat sincroniza a música com o BPM ideal de cada exercício. Música lenta para força, agitada para cardio — tudo automático.',
  },
  {
    step: '02',
    title: '200+ exercícios completos',
    desc: 'Abdômen, peito, costas, pernas, ombros, braços — com ou sem equipamento. Filtre por grupo muscular e equipamento disponível.',
  },
  {
    step: '03',
    title: 'Acompanhe sua evolução',
    desc: 'Registre cargas, bata recordes pessoais, veja gráficos de evolução e conquiste badges ao longo da jornada.',
  },
  {
    step: '04',
    title: 'Tudo personalizado',
    desc: 'Planos gerados com base no seu objetivo, nível e dias disponíveis. Adaptações para condições de saúde incluídas.',
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
    <div className="onboarding-page">

      {/* Skip */}
      <button className="ob-skip" onClick={handleSkip}>Pular</button>

      {/* Slide content */}
      <div className="ob-slides">
        <div className="ob-slide" key={step}>
          <p className="ob-step-num">{slide.step}</p>
          <h2 className="ob-title">{slide.title}</h2>
          <p className="ob-desc">{slide.desc}</p>
        </div>
      </div>

      {/* Dots */}
      <div className="ob-dots">
        {SLIDES.map((_, i) => (
          <button key={i} className={`ob-dot ${i === step ? 'active' : ''}`}
            onClick={() => setStep(i)} />
        ))}
      </div>

      {/* CTA */}
      <div className="ob-footer">
        <button className="ob-next-btn" onClick={handleNext}>
          {isLast ? 'Criar minha conta' : 'Próximo'}
        </button>
      </div>
    </div>
  );
}
