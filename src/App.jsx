import { useState, useEffect } from 'react';
import AuthPage from './pages/AuthPage';
import QuestionnairePage from './pages/QuestionnairePage';
import Dashboard from './pages/Dashboard';
import WorkoutSession from './pages/WorkoutSession';
import ProfilePage from './pages/ProfilePage';
import FreeWorkoutBuilder from './pages/FreeWorkoutBuilder';
import AchievementsPage from './pages/AchievementsPage';
import OnboardingPage from './pages/OnboardingPage';
import './App.css';

export default function App() {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('gym_current_user') || 'null'); }
    catch { return null; }
  });
  const [screen, setScreen] = useState(() => {
    const u = JSON.parse(localStorage.getItem('gym_current_user') || 'null');
    if (u?.profile) return 'dashboard';
    if (!localStorage.getItem('gym_onboarded')) return 'onboarding';
    if (!u) return 'auth';
    return 'questionnaire';
  });
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [theme, setTheme] = useState(() =>
    localStorage.getItem('gym_theme') || 'dark'
  );

  // Aplica o tema no root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('gym_theme', theme);
  }, [theme]);

  // Lembrete de treino via notificação
  useEffect(() => {
    if (!user) return;
    if (!('Notification' in window) || Notification.permission !== 'granted') return;
    const settings = JSON.parse(localStorage.getItem(`gym_notif_${user.id}`) || '{}');
    if (!settings.enabled) return;

    const today = new Date().toDateString();
    const lastShown = localStorage.getItem(`gym_notif_shown_${user.id}`);
    if (lastShown === today) return;

    const now = new Date();
    const [rh, rm] = (settings.time || '18:00').split(':').map(Number);
    if (now.getHours() < rh || (now.getHours() === rh && now.getMinutes() < rm)) return;

    const history = JSON.parse(localStorage.getItem(`gym_history_${user.id}`) || '[]');
    const trainedToday = history.some(h => new Date(h.date).toDateString() === today);
    if (trainedToday) return;

    new Notification('GymBeat 💪', {
      body: 'Você ainda não treinou hoje! Hora de manter a sequência! 🔥',
      icon: '/icons/icon-192x192.png',
      tag: 'gym-reminder',
    });
    localStorage.setItem(`gym_notif_shown_${user.id}`, today);
  }, [user]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  const handleAuth = (authUser, isNew) => {
    setUser(authUser);
    localStorage.setItem('gym_current_user', JSON.stringify(authUser));
    setScreen(isNew || !authUser.profile ? 'questionnaire' : 'dashboard');
  };

  const handleProfileComplete = (profile) => {
    const updatedUser = { ...user, profile };
    setUser(updatedUser);
    localStorage.setItem('gym_current_user', JSON.stringify(updatedUser));
    setScreen('dashboard');
  };

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('gym_current_user', JSON.stringify(updatedUser));
  };

  const handleStartWorkout = (workout) => {
    setActiveWorkout(workout);
    setScreen('workout');
  };

  const handleWorkoutFinish = () => {
    setActiveWorkout(null);
    const updatedUser = JSON.parse(localStorage.getItem('gym_current_user') || 'null');
    if (updatedUser) setUser(updatedUser);
    setScreen('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('gym_current_user');
    setUser(null);
    setScreen('auth');
  };

  return (
    <div className="app-root" data-theme={theme}>
      {screen === 'onboarding' && (
        <div className="screen-enter">
          <OnboardingPage onFinish={() => setScreen('auth')} />
        </div>
      )}
      {screen === 'auth' && (
        <div className="screen-enter">
          <AuthPage onAuth={handleAuth} theme={theme} toggleTheme={toggleTheme} />
        </div>
      )}
      {screen === 'questionnaire' && (
        <div className="screen-enter">
          <QuestionnairePage user={user} onComplete={handleProfileComplete} />
        </div>
      )}
      {screen === 'dashboard' && user && (
        <div className="screen-enter">
          <Dashboard
            user={user}
            onStartWorkout={handleStartWorkout}
            onCreatePlan={() => {}}
            onLogout={handleLogout}
            onOpenProfile={() => setScreen('profile')}
            onFreeWorkout={() => setScreen('free-workout')}
            onOpenAchievements={() => setScreen('achievements')}
            theme={theme}
            toggleTheme={toggleTheme}
          />
        </div>
      )}
      {screen === 'profile' && user && (
        <div className="screen-enter-right">
          <ProfilePage
            user={user}
            onBack={() => setScreen('dashboard')}
            onLogout={handleLogout}
            onUpdateUser={handleUpdateUser}
            onRedoQuestionnaire={() => setScreen('questionnaire')}
            theme={theme}
            toggleTheme={toggleTheme}
          />
        </div>
      )}
      {screen === 'achievements' && user && (
        <div className="screen-enter-right">
          <AchievementsPage
            user={user}
            onBack={() => setScreen('dashboard')}
            theme={theme}
            toggleTheme={toggleTheme}
          />
        </div>
      )}
      {screen === 'free-workout' && user && (
        <div className="screen-enter-right">
          <FreeWorkoutBuilder
            userProfile={user?.profile}
            userId={user?.id}
            onStart={(workout) => handleStartWorkout(workout)}
            onBack={() => setScreen('dashboard')}
          />
        </div>
      )}
      {screen === 'workout' && activeWorkout && (
        <div className="screen-enter">
          <WorkoutSession
            workout={activeWorkout}
            userProfile={user?.profile}
            userId={user?.id}
            onFinish={handleWorkoutFinish}
          />
        </div>
      )}
    </div>
  );
}
