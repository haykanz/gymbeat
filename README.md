# 🎵💪 GymBeat — Treino no Ritmo Certo

> App de academia com música sincronizada ao treino, recordes pessoais, conquistas e muito mais.

**🌐 Demo ao vivo:** [musica-academia.vercel.app](https://musica-academia.vercel.app)

---

## ✨ Funcionalidades

### 🏠 Dashboard
- Plano de treino do dia com exercícios e tempo estimado
- Indicador de dia de descanso + próximo treino
- Sequência de dias seguidos (streak)
- Gráfico semanal de calorias e minutos
- Botão de Treino Livre para montar do zero

### 🏋️ Treino ao Vivo
- Timer por exercício com fases: aquecimento → exercício → descanso → série
- **Música sincronizada por BPM** — cada exercício sugere um gênero/ritmo ideal
- Barra de progresso geral do treino
- Sons de beep (Web Audio API) em cada transição
- Vibração haptic em cada fase
- Registro de carga (peso × reps) por exercício
- Detecção automática de **Recordes Pessoais (PRs)** com alerta dourado
- Troca de exercício durante o treino
- Timer urgente (vermelho) nos últimos 3 segundos

### 📈 Evolução de Cargas
- Gráfico SVG por exercício mostrando progressão de peso ao longo do tempo
- Badge de peso máximo e melhora total (+Xkg)
- Quantidade de registros e data do último

### 🏅 Conquistas
- 15 badges desbloqueáveis (Comum, Raro, Épico, Lendário)
- Barra de progresso geral das conquistas
- Progresso parcial para conquistas numéricas
- Alerta de conquista nova na tela de conclusão do treino

### 👤 Perfil
- Edição de nome inline
- Stats: treinos, minutos, calorias, recordes
- Gêneros musicais e condições de saúde
- Lista de recordes pessoais ordenada por data
- **Lembretes de treino** via notificação do navegador (com horário configurável)
- **Backup/restauração** de dados em JSON

### 🎵 Músicas
- Banco de gêneros: Funk/Baile, Rock, Pop, Eletrônico, Sertanejo, Reggaeton, Hip Hop, Clássico
- Matching automático por BPM do exercício
- Indicador visual do gênero ativo

### 🌙 Personalização
- Tema claro / escuro (persiste entre sessões)
- Animações de transição entre telas
- PWA instalável (manifest + service worker)
- Compartilhar treino (Web Share API + fallback clipboard)

---

## 🛠️ Stack

| Tecnologia | Uso |
|---|---|
| **React 18** | UI e estado local |
| **Vite** | Build e dev server |
| **CSS puro** | Estilização com variáveis CSS |
| **localStorage** | Persistência de dados |
| **Web Audio API** | Beeps de transição |
| **Vibration API** | Haptic feedback |
| **Web Share API** | Compartilhamento |
| **Notifications API** | Lembretes de treino |
| **Service Worker** | PWA e cache |

---

## 🚀 Como rodar localmente

```bash
# Clone o repositório
git clone https://github.com/haykanz/gymbeat.git
cd gymbeat

# Instale as dependências
npm install

# Rode o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:5173`

---

## 📦 Build para produção

```bash
npm run build
```

Os arquivos ficam em `dist/`. O projeto está configurado para deploy automático no Vercel via GitHub.

---

## 📁 Estrutura do Projeto

```
src/
├── data/
│   ├── achievements.js       # 15 badges e lógica de verificação
│   ├── exercises.js          # Biblioteca de exercícios e gerador de planos
│   └── music.js              # Gêneros musicais e matching por BPM
├── pages/
│   ├── AuthPage.jsx          # Login e registro
│   ├── QuestionnairePage.jsx # Questionário de perfil
│   ├── Dashboard.jsx         # Tela principal (4 abas)
│   ├── WorkoutSession.jsx    # Treino ao vivo
│   ├── FreeWorkoutBuilder.jsx# Monte seu treino do zero
│   ├── ProfilePage.jsx       # Perfil e configurações
│   └── AchievementsPage.jsx  # Sistema de conquistas
├── hooks/
│   └── useStorage.js
├── App.jsx                   # Roteamento entre telas
└── App.css                   # Todos os estilos
```

---

## 🏆 Conquistas Disponíveis

| Badge | Título | Raridade |
|---|---|---|
| 🏋️ | Primeiro Passo | Comum |
| 💪 | Começo Forte | Comum |
| 📅 | Dedicado | Raro |
| 💯 | Centurião | Épico |
| 🔥 | Em Chamas | Comum |
| ⚡ | Semana Perfeita | Raro |
| 🌟 | Imparável | Lendário |
| 🏆 | Levantador | Comum |
| 💎 | Máquina de PRs | Raro |
| 🎲 | Espírito Livre | Comum |
| ⏱️ | Maratonista | Raro |
| 🔥 | Queimador | Raro |
| 🦾 | Peso Pesado | Épico |
| 📋 | Estrategista | Comum |
| 🌅 | Madrugador | Raro |

---

Feito com ❤️ e muito 🎵
