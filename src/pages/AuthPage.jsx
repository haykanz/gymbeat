import { useState } from 'react';

export default function AuthPage({ onAuth }) {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (mode === 'register') {
      if (!form.name || !form.email || !form.password) {
        setError('Preencha todos os campos');
        return;
      }
      if (form.password.length < 6) {
        setError('Senha deve ter pelo menos 6 caracteres');
        return;
      }
      const users = JSON.parse(localStorage.getItem('gym_users') || '[]');
      if (users.find(u => u.email === form.email)) {
        setError('E-mail já cadastrado');
        return;
      }
      const user = { id: Date.now(), name: form.name, email: form.email, password: form.password, profile: null };
      users.push(user);
      localStorage.setItem('gym_users', JSON.stringify(users));
      onAuth(user, true);
    } else {
      const users = JSON.parse(localStorage.getItem('gym_users') || '[]');
      const user = users.find(u => u.email === form.email && u.password === form.password);
      if (!user) {
        setError('E-mail ou senha incorretos');
        return;
      }
      onAuth(user, false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          {/* Logo mark — two vertical bars (beat/rhythm motif) */}
          <div className="auth-logo-mark">
            <span /><span /><span /><span /><span />
          </div>
          <h1>GymBeat</h1>
          <p>Treino no ritmo certo</p>
        </div>

        <div className="auth-tabs">
          <button
            className={mode === 'login' ? 'tab active' : 'tab'}
            onClick={() => { setMode('login'); setError(''); }}
          >
            Entrar
          </button>
          <button
            className={mode === 'register' ? 'tab active' : 'tab'}
            onClick={() => { setMode('register'); setError(''); }}
          >
            Cadastrar
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {mode === 'register' && (
            <div className="form-group">
              <label>Nome completo</label>
              <input
                type="text"
                placeholder="Seu nome"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
              />
            </div>
          )}
          <div className="form-group">
            <label>E-mail</label>
            <input
              type="email"
              placeholder="seu@email.com"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
          </div>
          {error && <p className="auth-error">{error}</p>}
          <button type="submit" className="btn-primary btn-full">
            {mode === 'login' ? 'Entrar' : 'Criar Conta'}
          </button>
        </form>

        <p className="auth-footer">
          {mode === 'login' ? 'Não tem conta? ' : 'Já tem conta? '}
          <button className="link-btn" onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}>
            {mode === 'login' ? 'Cadastre-se' : 'Entrar'}
          </button>
        </p>
      </div>
    </div>
  );
}
