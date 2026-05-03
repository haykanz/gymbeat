// ─── Biblioteca de exercícios ────────────────────────────────────────────────
// Campos: id, name, duration(s), rest(s), calories, bpmMin, bpmMax, gif, description, muscles, equipment
export const exerciseLibrary = {

  // ══════════════════════════════════════════════════════════
  //  ABDOMINAIS — corpo livre, sem máquinas
  // ══════════════════════════════════════════════════════════
  abs: [
    { id:'crunch',              name:'Crunch',                    duration:45, rest:15, calories:4,  bpmMin:95,  bpmMax:120, gif:'🏋️', equipment:'peso_corporal', description:'Deitado, eleve apenas os ombros do chão contraindo o abdômen', muscles:['abdômen'] },
    { id:'crunch-rotacao',      name:'Crunch com Rotação',        duration:45, rest:15, calories:5,  bpmMin:95,  bpmMax:122, gif:'🌀', equipment:'peso_corporal', description:'No crunch, gire o cotovelo em direção ao joelho oposto', muscles:['abdômen','oblíquos'] },
    { id:'crunch-reverso',      name:'Crunch Reverso',            duration:45, rest:15, calories:4,  bpmMin:90,  bpmMax:115, gif:'🔄', equipment:'peso_corporal', description:'Deitado, eleve o quadril do chão trazendo os joelhos ao peito', muscles:['abdômen inferior'] },
    { id:'situp',               name:'Sit-up Completo',           duration:45, rest:15, calories:6,  bpmMin:100, bpmMax:128, gif:'⬆️', equipment:'peso_corporal', description:'Sente completamente usando força abdominal, mãos atrás da cabeça', muscles:['abdômen','flexores do quadril'] },
    { id:'elevacao-pernas',     name:'Elevação de Pernas Deitado',duration:45, rest:20, calories:5,  bpmMin:88,  bpmMax:112, gif:'🦵', equipment:'peso_corporal', description:'Deitado, mantenha pernas juntas e erguidas a 90° e desça sem tocar o chão', muscles:['abdômen inferior','flexores do quadril'] },
    { id:'bicycle-crunch',      name:'Bicycle Crunch',            duration:45, rest:15, calories:7,  bpmMin:105, bpmMax:132, gif:'🚲', equipment:'peso_corporal', description:'Cotovelo ao joelho oposto em movimento de pedalada', muscles:['abdômen','oblíquos'] },
    { id:'russian-twist',       name:'Russian Twist',             duration:40, rest:15, calories:5,  bpmMin:100, bpmMax:125, gif:'🌀', equipment:'peso_corporal', description:'Sentado com tronco inclinado, gire os braços de lado a lado', muscles:['oblíquos','core'] },
    { id:'flutter-kicks',       name:'Tesoura (Flutter Kicks)',   duration:40, rest:15, calories:5,  bpmMin:100, bpmMax:128, gif:'✂️', equipment:'peso_corporal', description:'Deitado, alterne as pernas estendidas como uma tesoura', muscles:['abdômen inferior','flexores do quadril'] },
    { id:'v-up',                name:'V-Up',                      duration:40, rest:20, calories:6,  bpmMin:100, bpmMax:128, gif:'✌️', equipment:'peso_corporal', description:'Eleve simultaneamente pernas e tronco formando um V', muscles:['abdômen','flexores do quadril'] },
    { id:'dead-bug',            name:'Dead Bug',                  duration:45, rest:15, calories:3,  bpmMin:80,  bpmMax:105, gif:'🐛', equipment:'peso_corporal', description:'Deitado, estenda braço e perna opostos mantendo o core estável', muscles:['core','abdômen'] },
    { id:'hollow-body',         name:'Hollow Body Hold',          duration:30, rest:20, calories:4,  bpmMin:80,  bpmMax:105, gif:'🫙', equipment:'peso_corporal', description:'Deitado, eleve ombros e pernas do chão mantendo a posição', muscles:['core','abdômen'] },
    { id:'leg-pull-in',         name:'Leg Pull-In',               duration:40, rest:15, calories:4,  bpmMin:90,  bpmMax:115, gif:'🦵', equipment:'peso_corporal', description:'Sentado na borda, puxe os joelhos ao peito e estenda', muscles:['abdômen inferior'] },
    { id:'toque-tornozelo',     name:'Toque no Tornozelo',        duration:45, rest:10, calories:3,  bpmMin:88,  bpmMax:112, gif:'👋', equipment:'peso_corporal', description:'Deitado com joelhos dobrados, incline para tocar alternadamente os tornozelos', muscles:['oblíquos'] },
    { id:'prancha',             name:'Prancha Frontal',           duration:45, rest:15, calories:4,  bpmMin:80,  bpmMax:108, gif:'🧘', equipment:'peso_corporal', description:'Apoiado nos antebraços e dedos dos pés, mantenha o corpo reto', muscles:['core','ombros','abdômen'] },
    { id:'prancha-lateral-d',   name:'Prancha Lateral Direita',   duration:30, rest:15, calories:3,  bpmMin:78,  bpmMax:105, gif:'↗️', equipment:'peso_corporal', description:'Apoiado no antebraço direito, empilhe os pés e eleve o quadril', muscles:['oblíquos','core'] },
    { id:'prancha-lateral-e',   name:'Prancha Lateral Esquerda',  duration:30, rest:15, calories:3,  bpmMin:78,  bpmMax:105, gif:'↖️', equipment:'peso_corporal', description:'Apoiado no antebraço esquerdo, empilhe os pés e eleve o quadril', muscles:['oblíquos','core'] },
    { id:'prancha-braco',       name:'Prancha com Elevação de Braço',duration:40, rest:20, calories:4, bpmMin:82, bpmMax:108, gif:'🙋', equipment:'peso_corporal', description:'Em prancha alta, eleve um braço de cada vez sem girar o tronco', muscles:['core','abdômen','ombros'] },
    { id:'mountain-climbers',   name:'Mountain Climbers',         duration:45, rest:15, calories:9,  bpmMin:140, bpmMax:165, gif:'🧗', equipment:'peso_corporal', description:'Prancha alta: alterne os joelhos rápido ao peito', muscles:['core','ombros','pernas'] },
    { id:'mountain-slow',       name:'Mountain Climbers Lento',   duration:45, rest:15, calories:5,  bpmMin:90,  bpmMax:115, gif:'🧗', equipment:'peso_corporal', description:'Mountain climbers em ritmo controlado, pausando no topo', muscles:['core','abdômen'] },
    { id:'toe-touch',           name:'Toque nos Dedos (Deitado)', duration:40, rest:15, calories:4,  bpmMin:90,  bpmMax:115, gif:'👆', equipment:'peso_corporal', description:'Deitado com pernas a 90°, eleve os braços em direção aos pés', muscles:['abdômen'] },
    { id:'jackknife',           name:'Jackknife',                 duration:40, rest:20, calories:5,  bpmMin:95,  bpmMax:120, gif:'🗡️', equipment:'peso_corporal', description:'Deitado, eleve pernas e tronco ao mesmo tempo se tocando no meio', muscles:['abdômen','flexores do quadril'] },
    { id:'ab-rollout',          name:'Ab Rollout (Roda Abdominal)',duration:30, rest:30, calories:5, bpmMin:88, bpmMax:112, gif:'⚙️', equipment:'roda_abdominal', description:'Com a roda, role para frente mantendo o core contraído, volte controlando', muscles:['core','abdômen','dorsal'] },
    { id:'dragon-flag',         name:'Dragon Flag',               duration:30, rest:30, calories:6, bpmMin:85,  bpmMax:112, gif:'🐉', equipment:'banco', description:'Apoiado num banco, eleve e desça o corpo inteiro rígido', muscles:['abdômen','core'] },
    { id:'cruncho-pe-elevado',  name:'Crunch com Pé Elevado',     duration:45, rest:15, calories:4, bpmMin:92,  bpmMax:118, gif:'🏋️', equipment:'peso_corporal', description:'Pernas a 90° no ar, execute crunch normalmente', muscles:['abdômen'] },
    { id:'side-crunch',         name:'Crunch Lateral',            duration:45, rest:15, calories:4, bpmMin:92,  bpmMax:118, gif:'↔️', equipment:'peso_corporal', description:'Deitado de lado, eleve o tronco lateralmente', muscles:['oblíquos'] },
    { id:'windshield-wiper',    name:'Windshield Wipers',         duration:40, rest:20, calories:5, bpmMin:88,  bpmMax:112, gif:'🌬️', equipment:'peso_corporal', description:'Deitado, pernas a 90° e gire para os lados como um palheiro', muscles:['oblíquos','core'] },
    { id:'toe-tap',             name:'Toe Taps Alternados',       duration:45, rest:15, calories:6, bpmMin:105, bpmMax:130, gif:'👣', equipment:'peso_corporal', description:'Em pé, toque alternadamente os pés na frente com velocidade', muscles:['core','pernas'] },
    { id:'sit-up-perna',        name:'Sit-up com Perna Cruzada',  duration:40, rest:15, calories:5, bpmMin:95,  bpmMax:120, gif:'⬆️', equipment:'peso_corporal', description:'Sit-up com uma perna cruzada sobre a outra para trabalhar oblíquos', muscles:['abdômen','oblíquos'] },
  ],

  // ══════════════════════════════════════════════════════════
  //  PEITO — livre + máquinas
  // ══════════════════════════════════════════════════════════
  chest: [
    { id:'flexao-reto',         name:'Flexão de Braço',           duration:45, rest:20, calories:7,  bpmMin:105, bpmMax:130, gif:'💪', equipment:'peso_corporal', description:'Posição de prancha, desça o peito ao chão com cotovelos a 45°', muscles:['peito','tríceps','ombros'] },
    { id:'flexao-inclinada',    name:'Flexão Inclinada',          duration:45, rest:20, calories:6,  bpmMin:100, bpmMax:125, gif:'📐', equipment:'peso_corporal', description:'Mãos elevadas num banco, ativa a parte inferior do peito', muscles:['peito inferior','tríceps'] },
    { id:'flexao-declinada',    name:'Flexão Declinada',          duration:40, rest:20, calories:7,  bpmMin:105, bpmMax:130, gif:'📉', equipment:'peso_corporal', description:'Pés elevados num banco, ativa a parte superior do peito', muscles:['peito superior','tríceps','ombros'] },
    { id:'flexao-diamante',     name:'Flexão Diamante',           duration:40, rest:20, calories:6,  bpmMin:100, bpmMax:125, gif:'💎', equipment:'peso_corporal', description:'Mãos juntas formando um losango, foco no tríceps e peito interno', muscles:['tríceps','peito interno'] },
    { id:'flexao-larga',        name:'Flexão com Mãos Abertas',   duration:45, rest:20, calories:7,  bpmMin:100, bpmMax:128, gif:'↔️', equipment:'peso_corporal', description:'Mãos mais abertas que os ombros, foco nas laterais do peito', muscles:['peito','ombros'] },
    { id:'flexao-explosiva',    name:'Flexão Explosiva (Palmas)', duration:35, rest:25, calories:8,  bpmMin:120, bpmMax:148, gif:'💥', equipment:'peso_corporal', description:'Desça e suba explosivamente com as mãos saindo do chão', muscles:['peito','tríceps'] },
    { id:'dip-paralelas',       name:'Dip nas Paralelas',         duration:40, rest:25, calories:7,  bpmMin:100, bpmMax:128, gif:'🏋️', equipment:'paralelas', description:'Apoiado nas paralelas, desça o corpo com cotovelos abrindo levemente', muscles:['peito','tríceps','ombros'] },
    { id:'supino-barra',        name:'Supino Reto com Barra',     duration:45, rest:60, calories:8,  bpmMin:95,  bpmMax:118, gif:'🏋️', equipment:'barra', description:'Deitado no banco, desça a barra ao nível do peito e empurre', muscles:['peito','tríceps','ombros'] },
    { id:'supino-inclinado',    name:'Supino Inclinado com Barra',duration:45, rest:60, calories:8,  bpmMin:95,  bpmMax:118, gif:'📈', equipment:'barra', description:'Banco inclinado 30-45°, ativa a porção clavicular do peitoral', muscles:['peito superior','ombros','tríceps'] },
    { id:'supino-declinado',    name:'Supino Declinado com Barra',duration:45, rest:60, calories:7,  bpmMin:95,  bpmMax:118, gif:'📉', equipment:'barra', description:'Banco declinado, ativa o peitoral inferior', muscles:['peito inferior','tríceps'] },
    { id:'supino-halter',       name:'Supino com Halteres',       duration:45, rest:60, calories:7,  bpmMin:95,  bpmMax:118, gif:'🏋️', equipment:'haltere', description:'Halteres nos punhos, maior amplitude de movimento que a barra', muscles:['peito','tríceps'] },
    { id:'supino-inclin-halter',name:'Supino Inclinado c/ Haltere',duration:45, rest:60, calories:7, bpmMin:95, bpmMax:118, gif:'📈', equipment:'haltere', description:'Banco inclinado com halteres, ótima amplitude', muscles:['peito superior','ombros'] },
    { id:'crucifixo-halter',    name:'Crucifixo com Halteres',    duration:45, rest:60, calories:6,  bpmMin:90,  bpmMax:112, gif:'✈️', equipment:'haltere', description:'Abra os braços em arco como abraçar uma árvore, stretch máximo', muscles:['peito','ombros'] },
    { id:'crucifixo-inclinado', name:'Crucifixo Inclinado',       duration:45, rest:60, calories:6,  bpmMin:90,  bpmMax:112, gif:'✈️', equipment:'haltere', description:'Crucifixo no banco inclinado, foco na porção superior', muscles:['peito superior','ombros'] },
    { id:'peck-deck',           name:'Peck Deck (Borboleta)',      duration:45, rest:60, calories:6,  bpmMin:90,  bpmMax:112, gif:'🦋', equipment:'maquina', description:'Máquina de peck deck: cotovelos na plataforma, junte e abra', muscles:['peito','ombros'] },
    { id:'crossover-cabo',      name:'Crossover no Cabo',         duration:45, rest:45, calories:6,  bpmMin:90,  bpmMax:115, gif:'🔀', equipment:'cabo', description:'Dois cabos acima, traga os punhos à frente cruzando', muscles:['peito','ombros'] },
    { id:'crossover-baixo',     name:'Crossover Cabo Baixo',      duration:45, rest:45, calories:6,  bpmMin:90,  bpmMax:115, gif:'⬆️', equipment:'cabo', description:'Cabos posicionados baixo, eleve cruzando para cima', muscles:['peito superior'] },
    { id:'cable-fly',           name:'Cable Fly',                 duration:40, rest:45, calories:5,  bpmMin:88,  bpmMax:112, gif:'🔀', equipment:'cabo', description:'Cabo na altura do peito: abra e feche os braços em arco', muscles:['peito','ombros'] },
    { id:'smith-supino',        name:'Supino Smith Machine',      duration:45, rest:60, calories:7,  bpmMin:95,  bpmMax:118, gif:'🔧', equipment:'smith', description:'Supino na máquina Smith para maior estabilidade e controle', muscles:['peito','tríceps'] },
    { id:'pullover-halter',     name:'Pullover com Haltere',      duration:40, rest:45, calories:5,  bpmMin:88,  bpmMax:112, gif:'🔄', equipment:'haltere', description:'Deitado no banco, segure haltere com ambas mãos e arqueie sobre a cabeça', muscles:['peito','dorsal','tríceps'] },
  ],

  // ══════════════════════════════════════════════════════════
  //  COSTAS — livre + máquinas
  // ══════════════════════════════════════════════════════════
  back: [
    { id:'barra-fixa',          name:'Barra Fixa (Pull-up)',       duration:40, rest:60, calories:8,  bpmMin:95,  bpmMax:120, gif:'🏋️', equipment:'barra_fixa', description:'Pronado, puxe o corpo até o queixo ultrapassar a barra', muscles:['dorsal','bíceps','rombóides'] },
    { id:'chin-up',             name:'Chin-up (Supinado)',         duration:40, rest:60, calories:8,  bpmMin:95,  bpmMax:120, gif:'🔼', equipment:'barra_fixa', description:'Pegada supinada, puxe o corpo maior ativação do bíceps', muscles:['dorsal','bíceps'] },
    { id:'puxada-frontal',      name:'Puxada Frontal',             duration:45, rest:60, calories:7,  bpmMin:92,  bpmMax:115, gif:'⬇️', equipment:'maquina', description:'Puxe a barra ao peito contraindo a escápula', muscles:['dorsal','bíceps','rombóides'] },
    { id:'puxada-nuca',         name:'Puxada à Nuca',              duration:45, rest:60, calories:7,  bpmMin:92,  bpmMax:115, gif:'↙️', equipment:'maquina', description:'Puxe atrás da cabeça à altura da nuca com cuidado', muscles:['dorsal superior','rombóides'] },
    { id:'puxada-neutra',       name:'Puxada Pega Neutra',         duration:45, rest:60, calories:7,  bpmMin:92,  bpmMax:115, gif:'⬇️', equipment:'maquina', description:'Pega neutra (palmas se olhando), puxe ao peitoral', muscles:['dorsal','bíceps'] },
    { id:'remada-cabo',         name:'Remada Sentado no Cabo',     duration:45, rest:60, calories:7,  bpmMin:92,  bpmMax:115, gif:'🚣', equipment:'cabo', description:'Puxe o cabo à região abdominal contraindo as escápulas', muscles:['dorsal','rombóides','bíceps'] },
    { id:'remada-barra',        name:'Remada com Barra',           duration:45, rest:60, calories:8,  bpmMin:95,  bpmMax:120, gif:'🏋️', equipment:'barra', description:'Inclinado ~45°, puxe a barra ao abdômen mantendo costas retas', muscles:['dorsal','rombóides','bíceps','trapézio'] },
    { id:'remada-unilateral',   name:'Remada Unilateral c/ Haltere',duration:45, rest:60, calories:7, bpmMin:92, bpmMax:115, gif:'🏋️', equipment:'haltere', description:'Apoiado no banco, puxe o haltere ao quadril de cada lado', muscles:['dorsal','bíceps','rombóides'] },
    { id:'remada-cavalinho',    name:'Remada Cavalinho (T-Bar)',   duration:45, rest:60, calories:8,  bpmMin:95,  bpmMax:120, gif:'🐎', equipment:'barra', description:'Barra fixada no chão, puxe com triângulo ao peito', muscles:['dorsal médio','rombóides','trapézio'] },
    { id:'deadlift',            name:'Terra (Deadlift)',            duration:40, rest:90, calories:10, bpmMin:95,  bpmMax:118, gif:'💀', equipment:'barra', description:'Pegue a barra do chão com costas retas e se levante', muscles:['lombar','glúteos','isquiotibiais','trapézio','core'] },
    { id:'stiff',               name:'Stiff (Romanian DL)',        duration:45, rest:60, calories:7,  bpmMin:90,  bpmMax:115, gif:'🦵', equipment:'barra', description:'Pernas levemente dobradas, desça a barra pela frente das pernas', muscles:['isquiotibiais','glúteos','lombar'] },
    { id:'hyperextensao',       name:'Hiperextensão Lombar',       duration:45, rest:30, calories:4,  bpmMin:82,  bpmMax:108, gif:'🔙', equipment:'banco_romano', description:'No banco romano, eleve o tronco contraindo os lombares', muscles:['lombar','glúteos'] },
    { id:'superman',            name:'Superman',                   duration:45, rest:15, calories:4,  bpmMin:85,  bpmMax:110, gif:'🦸', equipment:'peso_corporal', description:'Deitado de bruços, eleve braços e pernas simultaneamente', muscles:['lombar','glúteos','dorsais'] },
    { id:'face-pull',           name:'Face Pull no Cabo',          duration:45, rest:30, calories:4,  bpmMin:85,  bpmMax:110, gif:'😤', equipment:'cabo', description:'Puxe o cabo de frente ao rosto, separando os cotovelos', muscles:['rombóides','trapézio médio','ombros posteriores'] },
    { id:'shrug-halter',        name:'Encolhimento c/ Halteres',  duration:40, rest:30, calories:4,  bpmMin:88,  bpmMax:112, gif:'🤷', equipment:'haltere', description:'Eleve os ombros ao máximo sem girar, contraia o trapézio', muscles:['trapézio'] },
    { id:'shrug-barra',         name:'Encolhimento com Barra',    duration:40, rest:30, calories:4,  bpmMin:88,  bpmMax:112, gif:'🤷', equipment:'barra', description:'Barra à frente, encolha os ombros para o alto', muscles:['trapézio'] },
    { id:'bom-dia',             name:'Bom Dia (Good Morning)',     duration:40, rest:60, calories:5,  bpmMin:88,  bpmMax:110, gif:'☀️', equipment:'barra', description:'Barra nos ombros, incline o tronco à frente com costas retas', muscles:['lombar','isquiotibiais','glúteos'] },
    { id:'remada-maquina',      name:'Remada na Máquina',          duration:45, rest:60, calories:6,  bpmMin:90,  bpmMax:115, gif:'🚣', equipment:'maquina', description:'Máquina de remada: puxe as alças ao abdômen', muscles:['dorsal','rombóides'] },
    { id:'pull-down-reto',      name:'Pulldown Braço Reto',        duration:40, rest:45, calories:5,  bpmMin:88,  bpmMax:112, gif:'⬇️', equipment:'cabo', description:'Puxe a barra de cima mantendo os braços quase retos', muscles:['serrátil','dorsal','tríceps'] },
    { id:'remada-invertida',    name:'Remada Invertida (Corpo Livre)',duration:45, rest:30, calories:6, bpmMin:90, bpmMax:115, gif:'🔄', equipment:'barra_fixa', description:'Deitado sob a barra, puxe o peito até tocá-la', muscles:['dorsal','bíceps','rombóides'] },
  ],

  // ══════════════════════════════════════════════════════════
  //  OMBROS — livre + máquinas
  // ══════════════════════════════════════════════════════════
  shoulders: [
    { id:'desenvolvimento-halter',  name:'Desenvolvimento c/ Halteres', duration:45, rest:60, calories:6, bpmMin:90, bpmMax:115, gif:'🙆', equipment:'haltere', description:'Pressione os halteres de altura dos ombros acima da cabeça', muscles:['deltóide anterior','deltóide medial','tríceps'] },
    { id:'desenvolvimento-barra',   name:'Desenvolvimento com Barra',   duration:45, rest:60, calories:7, bpmMin:92, bpmMax:118, gif:'🏋️', equipment:'barra', description:'Barra no nível do pescoço, pressione acima da cabeça', muscles:['deltóide','tríceps','trapézio'] },
    { id:'desenvolvimento-maquina', name:'Desenvolvimento na Máquina',  duration:45, rest:60, calories:6, bpmMin:90, bpmMax:115, gif:'🔧', equipment:'maquina', description:'Máquina de desenvolvimento: pressione guias acima da cabeça', muscles:['deltóide','tríceps'] },
    { id:'arnold-press',            name:'Arnold Press',                duration:45, rest:60, calories:6, bpmMin:90, bpmMax:115, gif:'💪', equipment:'haltere', description:'Comece com palmas à frente e gire enquanto pressiona', muscles:['deltóide completo','tríceps'] },
    { id:'elevacao-lateral',        name:'Elevação Lateral',            duration:40, rest:30, calories:4, bpmMin:85, bpmMax:108, gif:'✈️', equipment:'haltere', description:'Eleve os halteres lateralmente até a altura dos ombros', muscles:['deltóide medial'] },
    { id:'elevacao-lateral-cabo',   name:'Elevação Lateral no Cabo',    duration:40, rest:30, calories:4, bpmMin:85, bpmMax:108, gif:'↔️', equipment:'cabo', description:'Cabo baixo: eleve lateralmente com tensão constante', muscles:['deltóide medial'] },
    { id:'elevacao-frontal',        name:'Elevação Frontal',            duration:40, rest:30, calories:4, bpmMin:85, bpmMax:108, gif:'⬆️', equipment:'haltere', description:'Eleve os halteres à frente até a altura dos ombros', muscles:['deltóide anterior'] },
    { id:'elevacao-frontal-barra',  name:'Elevação Frontal com Barra',  duration:40, rest:30, calories:4, bpmMin:85, bpmMax:108, gif:'⬆️', equipment:'barra', description:'Barra em pegada pronada, eleve à frente', muscles:['deltóide anterior'] },
    { id:'crucifixo-posterior',     name:'Crucifixo Posterior',         duration:40, rest:30, calories:4, bpmMin:82, bpmMax:108, gif:'🔙', equipment:'haltere', description:'Inclinado à frente, abra os halteres contraindo os deltóides posteriores', muscles:['deltóide posterior','rombóides'] },
    { id:'peck-deck-posterior',     name:'Peck Deck Posterior',         duration:40, rest:45, calories:4, bpmMin:82, bpmMax:108, gif:'🦋', equipment:'maquina', description:'Peck deck invertido: abra os braços para trás', muscles:['deltóide posterior','rombóides'] },
    { id:'face-pull-ombro',         name:'Face Pull',                   duration:40, rest:30, calories:4, bpmMin:82, bpmMax:108, gif:'😤', equipment:'cabo', description:'Corda no alto: puxe ao rosto abrindo os cotovelos', muscles:['deltóide posterior','trapézio médio'] },
    { id:'upright-row',             name:'Remada Alta',                 duration:40, rest:45, calories:5, bpmMin:90, bpmMax:115, gif:'⬆️', equipment:'barra', description:'Puxe a barra ao queixo com cotovelos acima das mãos', muscles:['deltóide medial','trapézio'] },
    { id:'lateral-raise-machine',   name:'Elevação Lateral Máquina',   duration:40, rest:45, calories:4, bpmMin:85, bpmMax:108, gif:'🔧', equipment:'maquina', description:'Máquina de elevação lateral: cotovelos nas plataformas', muscles:['deltóide medial'] },
    { id:'rotacao-externa',         name:'Rotação Externa no Cabo',     duration:40, rest:20, calories:3, bpmMin:78, bpmMax:100, gif:'🔄', equipment:'cabo', description:'Cotovelo fixo ao lado, gire o antebraço para fora', muscles:['manguito rotador'] },
    { id:'rotacao-interna',         name:'Rotação Interna no Cabo',     duration:40, rest:20, calories:3, bpmMin:78, bpmMax:100, gif:'🔄', equipment:'cabo', description:'Cotovelo fixo, gire o antebraço para dentro', muscles:['manguito rotador'] },
    { id:'lateral-seated',          name:'Elevação Lateral Sentado',    duration:40, rest:30, calories:4, bpmMin:85, bpmMax:108, gif:'✈️', equipment:'haltere', description:'Sentado no banco, eleve os halteres lateralmente', muscles:['deltóide medial'] },
  ],

  // ══════════════════════════════════════════════════════════
  //  BRAÇOS — Bíceps + Tríceps
  // ══════════════════════════════════════════════════════════
  arms: [
    // ── Bíceps ──
    { id:'rosca-direta-barra',    name:'Rosca Direta com Barra',    duration:45, rest:60, calories:5, bpmMin:88, bpmMax:112, gif:'💪', equipment:'barra', description:'Barra em pegada supinada, flexione totalmente sem mover os cotovelos', muscles:['bíceps','antebraço'] },
    { id:'rosca-alternada',       name:'Rosca Alternada c/ Haltere',duration:45, rest:60, calories:5, bpmMin:88, bpmMax:112, gif:'💪', equipment:'haltere', description:'Alterne os halteres, supinando o punho no topo', muscles:['bíceps','braquial'] },
    { id:'rosca-martelo',         name:'Rosca Martelo',             duration:40, rest:60, calories:4, bpmMin:85, bpmMax:110, gif:'🔨', equipment:'haltere', description:'Pega neutra (polegar acima), trabalha o braquial e braquiorradial', muscles:['braquial','braquiorradial','bíceps'] },
    { id:'rosca-scott',           name:'Rosca Scott (Preacher)',    duration:40, rest:60, calories:5, bpmMin:85, bpmMax:110, gif:'🏋️', equipment:'barra', description:'Braço apoiado no banco Scott, isola completamente o bíceps', muscles:['bíceps'] },
    { id:'rosca-concentrada',     name:'Rosca Concentrada',         duration:35, rest:45, calories:4, bpmMin:82, bpmMax:108, gif:'🎯', equipment:'haltere', description:'Cotovelo apoiado na coxa, flexione o haltere com foco total', muscles:['bíceps'] },
    { id:'rosca-cabo',            name:'Rosca no Cabo',             duration:40, rest:45, calories:4, bpmMin:85, bpmMax:110, gif:'🔗', equipment:'cabo', description:'Cabo baixo: tensão constante durante toda a amplitude', muscles:['bíceps'] },
    { id:'rosca-inclinada',       name:'Rosca Inclinada',           duration:40, rest:60, calories:5, bpmMin:85, bpmMax:110, gif:'📐', equipment:'haltere', description:'Sentado no banco inclinado, braços suspensos para maior amplitude', muscles:['bíceps','bíceps longa'] },
    { id:'rosca-barra-w',         name:'Rosca Barra W (EZ-Bar)',    duration:45, rest:60, calories:5, bpmMin:88, bpmMax:112, gif:'〰️', equipment:'barra_w', description:'Barra W reduz tensão no pulso, ótima para volume de bíceps', muscles:['bíceps','antebraço'] },
    { id:'rosca-maquina',         name:'Rosca na Máquina',          duration:40, rest:60, calories:4, bpmMin:85, bpmMax:110, gif:'🔧', equipment:'maquina', description:'Máquina de rosca: isola o bíceps com movimento guiado', muscles:['bíceps'] },
    // ── Tríceps ──
    { id:'triceps-pulley-corda',  name:'Tríceps Pulley na Corda',   duration:45, rest:60, calories:5, bpmMin:90, bpmMax:115, gif:'🔗', equipment:'cabo', description:'Corda no alto: extensão do cotovelo separando as pontas no final', muscles:['tríceps'] },
    { id:'triceps-pulley-barra',  name:'Tríceps Pulley Barra Reta', duration:45, rest:60, calories:5, bpmMin:90, bpmMax:115, gif:'⬇️', equipment:'cabo', description:'Barra reta no alto: extensão do cotovelo completa', muscles:['tríceps'] },
    { id:'triceps-frances',       name:'Tríceps Francês',           duration:40, rest:60, calories:5, bpmMin:88, bpmMax:112, gif:'🇫🇷', equipment:'haltere', description:'Sentado, desça o haltere atrás da cabeça e estenda', muscles:['tríceps longo','tríceps'] },
    { id:'triceps-frances-barra', name:'Tríceps Francês com Barra', duration:40, rest:60, calories:5, bpmMin:88, bpmMax:112, gif:'🏋️', equipment:'barra_w', description:'Deitado, desça a barra atrás da cabeça', muscles:['tríceps'] },
    { id:'triceps-testa',         name:'Tríceps Testa (Skull Crusher)',duration:40, rest:60, calories:5, bpmMin:88, bpmMax:112, gif:'💀', equipment:'barra_w', description:'Deitado, desça a barra à testa e estenda', muscles:['tríceps'] },
    { id:'triceps-coice',         name:'Tríceps Coice (Kickback)',   duration:40, rest:45, calories:4, bpmMin:85, bpmMax:110, gif:'🦵', equipment:'haltere', description:'Inclinado, estenda o braço para trás mantendo o cotovelo fixo', muscles:['tríceps lateral'] },
    { id:'triceps-cadeira',       name:'Tríceps na Cadeira (Dip)',  duration:40, rest:30, calories:5, bpmMin:92, bpmMax:118, gif:'💺', equipment:'cadeira', description:'Mãos na cadeira, desça o corpo flexionando cotovelos', muscles:['tríceps','peito'] },
    { id:'triceps-mergulho',      name:'Mergulho nas Paralelas',    duration:40, rest:60, calories:6, bpmMin:95, bpmMax:120, gif:'🏋️', equipment:'paralelas', description:'Corpo ereto nas paralelas, desça com cotovelos fechados', muscles:['tríceps','peito'] },
    { id:'closegrip-bench',       name:'Supino Pegada Fechada',     duration:40, rest:60, calories:6, bpmMin:92, bpmMax:118, gif:'🤏', equipment:'barra', description:'Supino com pegada estreita, foco no tríceps', muscles:['tríceps','peito interno'] },
    { id:'triceps-maquina',       name:'Tríceps na Máquina',        duration:40, rest:60, calories:4, bpmMin:88, bpmMax:112, gif:'🔧', equipment:'maquina', description:'Máquina de extensão de tríceps: extensão do cotovelo guiada', muscles:['tríceps'] },
    { id:'overhead-cabo',         name:'Tríceps Overhead no Cabo',  duration:40, rest:45, calories:4, bpmMin:88, bpmMax:112, gif:'🔗', equipment:'cabo', description:'Cabo atrás da cabeça: extensão acima do corpo', muscles:['tríceps longo'] },
  ],

  // ══════════════════════════════════════════════════════════
  //  PERNAS — máquinas + livre com peso
  // ══════════════════════════════════════════════════════════
  legs: [
    { id:'agachamento-barra',    name:'Agachamento com Barra',       duration:50, rest:90, calories:10, bpmMin:98, bpmMax:122, gif:'🏋️', equipment:'barra', description:'Barra nos ombros: desça até coxas paralelas ao chão', muscles:['quadríceps','glúteos','isquiotibiais','core'] },
    { id:'agachamento-goblet',   name:'Agachamento Goblet',          duration:45, rest:60, calories:8,  bpmMin:95, bpmMax:118, gif:'🍺', equipment:'haltere', description:'Segure haltere ao peito, agache profundamente', muscles:['quadríceps','glúteos','core'] },
    { id:'agachamento-sumo',     name:'Agachamento Sumô',            duration:45, rest:60, calories:8,  bpmMin:95, bpmMax:118, gif:'🤼', equipment:'peso_corporal', description:'Pés afastados e virados, foco no interior das coxas', muscles:['quadríceps','adutores','glúteos'] },
    { id:'agachamento-bulgaro',  name:'Agachamento Búlgaro',         duration:45, rest:60, calories:8,  bpmMin:95, bpmMax:120, gif:'🦵', equipment:'banco', description:'Pé traseiro elevado no banco, agache profundamente', muscles:['quadríceps','glúteos'] },
    { id:'agachamento-hack',     name:'Hack Squat',                  duration:50, rest:90, calories:9,  bpmMin:95, bpmMax:118, gif:'🔧', equipment:'maquina', description:'Máquina Hack Squat: pernas no ângulo ideal, desça profundo', muscles:['quadríceps','glúteos'] },
    { id:'agachamento-smith',    name:'Agachamento Smith Machine',   duration:50, rest:90, calories:9,  bpmMin:95, bpmMax:118, gif:'🔧', equipment:'smith', description:'Smith Machine para agachamento com maior segurança', muscles:['quadríceps','glúteos'] },
    { id:'leg-press',            name:'Leg Press 45°',               duration:50, rest:90, calories:9,  bpmMin:95, bpmMax:118, gif:'🏋️', equipment:'maquina', description:'Pés na plataforma, empurre controlando a descida', muscles:['quadríceps','glúteos','isquiotibiais'] },
    { id:'leg-press-pegada',     name:'Leg Press Pega Fechada',      duration:45, rest:90, calories:8,  bpmMin:92, bpmMax:115, gif:'🏋️', equipment:'maquina', description:'Pés próximos ao centro: foco no vasto externo', muscles:['quadríceps externos'] },
    { id:'cadeira-extensora',    name:'Cadeira Extensora',           duration:45, rest:60, calories:6,  bpmMin:90, bpmMax:112, gif:'🪑', equipment:'maquina', description:'Estenda completamente o joelho e desça controlado', muscles:['quadríceps'] },
    { id:'mesa-flexora',         name:'Mesa Flexora (Deitado)',       duration:45, rest:60, calories:6,  bpmMin:88, bpmMax:112, gif:'🛏️', equipment:'maquina', description:'Deitado, flexione os joelhos contraindo isquiotibiais', muscles:['isquiotibiais'] },
    { id:'flexora-sentado',      name:'Flexora Sentado',             duration:45, rest:60, calories:6,  bpmMin:88, bpmMax:112, gif:'🪑', equipment:'maquina', description:'Versão sentada da mesa flexora, ativa mais a cabeça longa', muscles:['isquiotibiais'] },
    { id:'panturrilha-maquina',  name:'Panturrilha na Máquina',      duration:45, rest:30, calories:4,  bpmMin:88, bpmMax:112, gif:'🦶', equipment:'maquina', description:'Elevação de calcanhar na máquina com carga', muscles:['panturrilha','sóleo'] },
    { id:'panturrilha-smith',    name:'Panturrilha no Smith',        duration:45, rest:30, calories:4,  bpmMin:88, bpmMax:112, gif:'🦶', equipment:'smith', description:'Panturrilha com barra no Smith Machine', muscles:['panturrilha'] },
    { id:'panturrilha-livre',    name:'Elevação de Panturrilha',     duration:40, rest:15, calories:3,  bpmMin:88, bpmMax:112, gif:'🦶', equipment:'peso_corporal', description:'Em pé, eleve os calcanhares até o limite', muscles:['panturrilha'] },
    { id:'abdutora',             name:'Abdutora (Máquina)',           duration:45, rest:45, calories:5,  bpmMin:85, bpmMax:108, gif:'↔️', equipment:'maquina', description:'Máquina abdutora: empurre as pernas para fora', muscles:['abdutores','glúteo médio'] },
    { id:'adutora',              name:'Adutora (Máquina)',            duration:45, rest:45, calories:5,  bpmMin:85, bpmMax:108, gif:'↔️', equipment:'maquina', description:'Máquina adutora: puxe as pernas para dentro', muscles:['adutores'] },
    { id:'avanço-halter',        name:'Avanço com Halteres',         duration:45, rest:60, calories:7,  bpmMin:92, bpmMax:118, gif:'🦵', equipment:'haltere', description:'Halteres na mão, dê uma passada longa e desça o joelho traseiro', muscles:['quadríceps','glúteos'] },
    { id:'step-up',              name:'Step-Up no Banco',            duration:45, rest:45, calories:7,  bpmMin:95, bpmMax:120, gif:'⬆️', equipment:'banco', description:'Suba num banco ou step alternando as pernas', muscles:['quadríceps','glúteos'] },
    { id:'leg-press-unilateral', name:'Leg Press Unilateral',        duration:45, rest:60, calories:7,  bpmMin:90, bpmMax:115, gif:'🏋️', equipment:'maquina', description:'Uma perna por vez no leg press para correção de assimetria', muscles:['quadríceps','glúteos'] },
    { id:'sissy-squat',          name:'Sissy Squat',                 duration:35, rest:45, calories:6,  bpmMin:90, bpmMax:115, gif:'🦵', equipment:'peso_corporal', description:'Joelhos avançam à frente, calcanhares elevados, isola o quadríceps', muscles:['quadríceps'] },
    { id:'stiff-halter',         name:'Stiff com Halteres',          duration:45, rest:60, calories:6,  bpmMin:88, bpmMax:112, gif:'🏋️', equipment:'haltere', description:'Halteres à frente da coxa, incline preservando a curvatura', muscles:['isquiotibiais','glúteos','lombar'] },
  ],

  // ══════════════════════════════════════════════════════════
  //  GLÚTEOS
  // ══════════════════════════════════════════════════════════
  glutes: [
    { id:'hip-thrust-barra',    name:'Hip Thrust com Barra',        duration:45, rest:60, calories:8, bpmMin:92, bpmMax:115, gif:'🍑', equipment:'barra', description:'Ombros no banco, barra no quadril, eleve contraindo os glúteos', muscles:['glúteos','isquiotibiais'] },
    { id:'hip-thrust-halter',   name:'Hip Thrust com Haltere',      duration:45, rest:60, calories:7, bpmMin:90, bpmMax:112, gif:'🍑', equipment:'haltere', description:'Versão com haltere no quadril, mesma mecânica do hip thrust', muscles:['glúteos'] },
    { id:'ponte-gluteos',       name:'Ponte de Glúteos',            duration:45, rest:15, calories:5, bpmMin:88, bpmMax:112, gif:'🍑', equipment:'peso_corporal', description:'Deitado, eleve o quadril contraindo os glúteos no topo', muscles:['glúteos','isquiotibiais'] },
    { id:'ponte-unilateral',    name:'Ponte de Glúteos Unilateral', duration:40, rest:20, calories:5, bpmMin:88, bpmMax:112, gif:'🦵', equipment:'peso_corporal', description:'Uma perna estendida, eleve o quadril com a outra', muscles:['glúteos','isquiotibiais'] },
    { id:'donkey-kick',         name:'Donkey Kicks',                duration:45, rest:20, calories:4, bpmMin:88, bpmMax:112, gif:'🦵', equipment:'peso_corporal', description:'De quatro, chute uma perna para cima contraindo glúteos', muscles:['glúteos'] },
    { id:'fire-hydrant',        name:'Fire Hydrant',                duration:45, rest:20, calories:4, bpmMin:85, bpmMax:108, gif:'🚒', equipment:'peso_corporal', description:'De quatro, eleve o joelho lateralmente como um cachorro', muscles:['glúteo médio','abdutores'] },
    { id:'agachamento-elastico',name:'Agachamento com Elástico',    duration:45, rest:30, calories:6, bpmMin:90, bpmMax:115, gif:'🦀', equipment:'elastico', description:'Elástico acima dos joelhos, agache empurrando para fora', muscles:['glúteo médio','quadríceps'] },
    { id:'glute-kick-cabo',     name:'Glúteo Coice no Cabo',        duration:40, rest:45, calories:5, bpmMin:88, bpmMax:112, gif:'🔗', equipment:'cabo', description:'Tornozeiro no cabo, chute a perna para trás em extensão total', muscles:['glúteos'] },
    { id:'glute-abducao-cabo',  name:'Abdução de Quadril no Cabo',  duration:40, rest:45, calories:4, bpmMin:85, bpmMax:108, gif:'↔️', equipment:'cabo', description:'Tornozeiro no cabo, abduza a perna para o lado', muscles:['glúteo médio','abdutores'] },
    { id:'glute-machine',       name:'Glúteo na Máquina (Kickback)',duration:45, rest:60, calories:5, bpmMin:88, bpmMax:112, gif:'🔧', equipment:'maquina', description:'Máquina de extensão de quadril: empurre para trás', muscles:['glúteos'] },
    { id:'agachamento-plie',    name:'Agachamento Plié c/ Haltere', duration:45, rest:30, calories:6, bpmMin:90, bpmMax:115, gif:'🩰', equipment:'haltere', description:'Pés muito abertos, haltere no centro, agache profundo', muscles:['adutores','glúteos','quadríceps'] },
    { id:'hip-thrust-elastico', name:'Hip Thrust com Elástico',     duration:45, rest:30, calories:5, bpmMin:88, bpmMax:112, gif:'🍑', equipment:'elastico', description:'Elástico sobre o quadril, bridge com resistência', muscles:['glúteos'] },
    { id:'reverse-hyper',       name:'Extensão Invertida de Quadril',duration:40, rest:30, calories:4, bpmMin:85, bpmMax:108, gif:'🔙', equipment:'banco', description:'Deitado no banco, eleve as pernas estendidas atrás contraindo glúteos', muscles:['glúteos','isquiotibiais','lombar'] },
    { id:'clamshell',           name:'Clamshell (Ostinha)',          duration:45, rest:20, calories:3, bpmMin:80, bpmMax:105, gif:'🐚', equipment:'elastico', description:'Deitado de lado, joelhos dobrados, abra como uma ostra', muscles:['glúteo médio','rotadores externos'] },
  ],

  // ══════════════════════════════════════════════════════════
  //  CARDIO — aeróbico e funcional
  // ══════════════════════════════════════════════════════════
  cardio: [
    { id:'jumping-jacks',       name:'Jumping Jacks',               duration:45, rest:15, calories:8,  bpmMin:130, bpmMax:155, gif:'🤸', equipment:'peso_corporal', description:'Abra e feche braços e pernas simultaneamente', muscles:['pernas','ombros'] },
    { id:'high-knees',          name:'High Knees',                  duration:45, rest:15, calories:10, bpmMin:140, bpmMax:165, gif:'🏃', equipment:'peso_corporal', description:'Eleve os joelhos alternadamente até a altura do quadril', muscles:['core','pernas'] },
    { id:'burpees',             name:'Burpees',                     duration:30, rest:30, calories:12, bpmMin:150, bpmMax:175, gif:'💪', equipment:'peso_corporal', description:'Agachamento, prancha, flexão e salto explosivo', muscles:['corpo inteiro'] },
    { id:'skipping',            name:'Skipping no Lugar',           duration:60, rest:15, calories:11, bpmMin:135, bpmMax:158, gif:'⚡', equipment:'peso_corporal', description:'Corra no lugar elevando os joelhos rapidamente', muscles:['pernas','core'] },
    { id:'lateral-shuffle',     name:'Passada Lateral',             duration:45, rest:15, calories:8,  bpmMin:120, bpmMax:145, gif:'↔️', equipment:'peso_corporal', description:'Deslize lateralmente de um lado para o outro', muscles:['pernas','glúteos'] },
    { id:'pular-corda',         name:'Pular Corda',                 duration:60, rest:30, calories:12, bpmMin:140, bpmMax:168, gif:'🪢', equipment:'corda', description:'Pule a corda mantendo ritmo constante', muscles:['panturrilha','pernas','ombros'] },
    { id:'step-touch',          name:'Step Touch',                  duration:60, rest:15, calories:7,  bpmMin:118, bpmMax:140, gif:'👟', equipment:'peso_corporal', description:'Passe o peso de um pé para o outro com braços balançando', muscles:['pernas','core'] },
    { id:'jog-no-lugar',        name:'Corrida no Lugar',            duration:60, rest:20, calories:10, bpmMin:138, bpmMax:162, gif:'🏃', equipment:'peso_corporal', description:'Corra no lugar em ritmo moderado', muscles:['pernas','core'] },
    { id:'salto-estrela',       name:'Salto Estrela',               duration:30, rest:20, calories:9,  bpmMin:140, bpmMax:168, gif:'⭐', equipment:'peso_corporal', description:'Salte abrindo braços e pernas em formato de estrela', muscles:['pernas','ombros'] },
    { id:'grapevine',           name:'Grapevine Lateral',           duration:45, rest:15, calories:7,  bpmMin:118, bpmMax:142, gif:'🍇', equipment:'peso_corporal', description:'Cruz lateral: pé cruza na frente e atrás alternando', muscles:['pernas','quadril'] },
    { id:'eliptico',            name:'Elíptico',                    duration:300, rest:0, calories:45, bpmMin:120, bpmMax:148, gif:'🔄', equipment:'maquina', description:'Mantenha postura ereta, empurre e puxe os braços', muscles:['corpo inteiro'] },
    { id:'esteira',             name:'Esteira (Caminhada Rápida)',  duration:300, rest:0, calories:35, bpmMin:100, bpmMax:130, gif:'🏃', equipment:'maquina', description:'Incline 2-5%, caminhe em ritmo aeróbico', muscles:['pernas','glúteos'] },
    { id:'bike-ergometrica',    name:'Bike Ergométrica',            duration:300, rest:0, calories:40, bpmMin:110, bpmMax:138, gif:'🚴', equipment:'maquina', description:'Pedale mantendo cadência de 70-90 RPM', muscles:['pernas','core'] },
    { id:'remo-ergometrico',    name:'Remo Ergométrico',            duration:120, rest:30, calories:20, bpmMin:128, bpmMax:155, gif:'🚣', equipment:'maquina', description:'Puxe com pernas primeiro, depois core e braços', muscles:['corpo inteiro'] },
  ],

  // ══════════════════════════════════════════════════════════
  //  FORÇA FUNCIONAL — exercícios compostos sem equipamento específico
  // ══════════════════════════════════════════════════════════
  strength: [
    { id:'agachamento',         name:'Agachamento Livre',           duration:45, rest:20, calories:6,  bpmMin:100, bpmMax:130, gif:'🦵', equipment:'peso_corporal', description:'Desça com as costas retas até as coxas paralelas ao chão', muscles:['quadríceps','glúteos'] },
    { id:'lunge',               name:'Avanço (Lunge)',              duration:45, rest:20, calories:6,  bpmMin:100, bpmMax:128, gif:'🦵', equipment:'peso_corporal', description:'Avance um passo e desça o joelho traseiro ao chão', muscles:['quadríceps','glúteos'] },
    { id:'wall-sit',            name:'Cadeira na Parede',           duration:45, rest:20, calories:5,  bpmMin:90,  bpmMax:118, gif:'🧱', equipment:'peso_corporal', description:'Encoste na parede e flexione os joelhos a 90°', muscles:['quadríceps','glúteos'] },
    { id:'glute-bridge',        name:'Ponte de Glúteos',            duration:45, rest:15, calories:5,  bpmMin:88,  bpmMax:112, gif:'🍑', equipment:'peso_corporal', description:'Deitado, eleve o quadril contraindo os glúteos', muscles:['glúteos','isquiotibiais'] },
    { id:'tricep-dip',          name:'Tríceps na Cadeira',          duration:40, rest:20, calories:5,  bpmMin:95,  bpmMax:120, gif:'💺', equipment:'cadeira', description:'Apoie as mãos na cadeira e desça o corpo', muscles:['tríceps','peito'] },
    { id:'calf-raise',          name:'Elevação de Panturrilha',     duration:40, rest:15, calories:3,  bpmMin:95,  bpmMax:120, gif:'🦶', equipment:'peso_corporal', description:'Fique na ponta dos pés, subindo e descendo', muscles:['panturrilha'] },
    { id:'squat-single',        name:'Agachamento Unilateral',      duration:40, rest:30, calories:6,  bpmMin:95,  bpmMax:120, gif:'🦵', equipment:'peso_corporal', description:'Pistol squat parcial: equilibre-se numa perna', muscles:['quadríceps','glúteos','core'] },
    { id:'bear-crawl',          name:'Bear Crawl',                  duration:40, rest:20, calories:7,  bpmMin:105, bpmMax:130, gif:'🐻', equipment:'peso_corporal', description:'De quatro, avance com quadril baixo e joelhos fora do chão', muscles:['core','ombros','pernas'] },
    { id:'turkish-getup',       name:'Turkish Get-Up',              duration:40, rest:30, calories:6,  bpmMin:88,  bpmMax:112, gif:'🏋️', equipment:'haltere', description:'Do chão à posição de pé segurando peso acima', muscles:['core','ombros','pernas'] },
    { id:'kettlebell-swing',    name:'Kettlebell Swing',            duration:40, rest:30, calories:9,  bpmMin:125, bpmMax:152, gif:'🔔', equipment:'kettlebell', description:'Explosão de quadril balançando o kettlebell até a altura do peito', muscles:['glúteos','lombar','core'] },
    { id:'farmers-carry',       name:'Farmers Walk',                duration:40, rest:30, calories:6,  bpmMin:90,  bpmMax:115, gif:'🏋️', equipment:'haltere', description:'Caminhe segurando halteres pesados, core ativado', muscles:['trapézio','antebraço','core','pernas'] },
    { id:'clean-press',         name:'Clean & Press com Haltere',   duration:35, rest:45, calories:8,  bpmMin:105, bpmMax:132, gif:'🏋️', equipment:'haltere', description:'Puxe o haltere e pressione acima da cabeça num movimento fluido', muscles:['pernas','ombros','core'] },
  ],

  // ══════════════════════════════════════════════════════════
  //  HIIT — alta intensidade
  // ══════════════════════════════════════════════════════════
  hiit: [
    { id:'squat-jump',          name:'Agachamento com Salto',       duration:30, rest:30, calories:12, bpmMin:150, bpmMax:178, gif:'🚀', equipment:'peso_corporal', description:'Agache e exploda num salto vertical máximo', muscles:['pernas','glúteos'] },
    { id:'speed-skaters',       name:'Speed Skaters',               duration:40, rest:20, calories:10, bpmMin:145, bpmMax:168, gif:'⛸️', equipment:'peso_corporal', description:'Salte lateralmente alternando as pernas como um patinador', muscles:['pernas','core'] },
    { id:'box-jumps',           name:'Box Jumps',                   duration:30, rest:30, calories:13, bpmMin:155, bpmMax:182, gif:'📦', equipment:'caixa', description:'Salte e aterrisse suavemente em agachamento no caixote', muscles:['pernas','core'] },
    { id:'push-jump',           name:'Flexão com Salto',            duration:30, rest:30, calories:11, bpmMin:150, bpmMax:175, gif:'🔥', equipment:'peso_corporal', description:'Flexão seguida de um salto explosivo para cima', muscles:['peito','pernas','core'] },
    { id:'tuck-jumps',          name:'Tuck Jumps',                  duration:30, rest:30, calories:14, bpmMin:158, bpmMax:185, gif:'🦘', equipment:'peso_corporal', description:'Salte puxando os joelhos até o peito no ar', muscles:['pernas','core'] },
    { id:'burpee-pullup',       name:'Burpee com Barra Fixa',       duration:30, rest:40, calories:14, bpmMin:155, bpmMax:182, gif:'💥', equipment:'barra_fixa', description:'Burpee seguido de pull-up na barra', muscles:['corpo inteiro'] },
    { id:'jump-lunge',          name:'Avanço com Salto',            duration:35, rest:25, calories:12, bpmMin:150, bpmMax:178, gif:'🦘', equipment:'peso_corporal', description:'Troque as pernas no ar a cada avanço', muscles:['pernas','glúteos','core'] },
    { id:'tabata-squat',        name:'Tabata Agachamento',          duration:20, rest:10, calories:8,  bpmMin:155, bpmMax:185, gif:'⏱️', equipment:'peso_corporal', description:'20s máximo de agachamentos, 10s descanso — 8 rounds', muscles:['pernas','glúteos'] },
    { id:'sprawl',              name:'Sprawl',                      duration:30, rest:30, calories:11, bpmMin:150, bpmMax:178, gif:'💨', equipment:'peso_corporal', description:'Burpee sem salto: deite, levante e repita explosivamente', muscles:['corpo inteiro'] },
    { id:'plyo-pushup',         name:'Flexão Pliométrica',          duration:30, rest:30, calories:10, bpmMin:148, bpmMax:175, gif:'💥', equipment:'peso_corporal', description:'Flexão explosiva com palmas saindo do chão', muscles:['peito','tríceps','ombros'] },
  ],

  // ══════════════════════════════════════════════════════════
  //  FLEXIBILIDADE & MOBILIDADE
  // ══════════════════════════════════════════════════════════
  flexibility: [
    { id:'downward-dog',        name:'Cachorro para Baixo',         duration:60, rest:10, calories:2,  bpmMin:70,  bpmMax:95,  gif:'🐕', equipment:'peso_corporal', description:'Forme um V invertido com o corpo, calcanhares no chão', muscles:['panturrilha','ombros','costas'] },
    { id:'child-pose',          name:'Postura da Criança',          duration:60, rest:10, calories:1,  bpmMin:60,  bpmMax:85,  gif:'🧘', equipment:'peso_corporal', description:'Ajoelhe e estenda os braços à frente, relaxando a coluna', muscles:['costas','quadris'] },
    { id:'hip-flexor',          name:'Flexor de Quadril',           duration:60, rest:10, calories:2,  bpmMin:68,  bpmMax:90,  gif:'🙆', equipment:'peso_corporal', description:'Em avanço, mantenha o quadril baixo e expanda o peito', muscles:['flexores do quadril'] },
    { id:'seated-twist',        name:'Torção Sentada',              duration:45, rest:10, calories:1,  bpmMin:65,  bpmMax:88,  gif:'🌀', equipment:'peso_corporal', description:'Sente e gire o tronco para cada lado lentamente', muscles:['coluna','oblíquos'] },
    { id:'cat-cow',             name:'Gato e Vaca',                 duration:45, rest:10, calories:1,  bpmMin:60,  bpmMax:82,  gif:'🐈', equipment:'peso_corporal', description:'De quatro, alterne a coluna curvada e arqueada', muscles:['coluna','core'] },
    { id:'pigeon-pose',         name:'Postura do Pombo',            duration:60, rest:10, calories:2,  bpmMin:62,  bpmMax:84,  gif:'🕊️', equipment:'peso_corporal', description:'Abra o quadril numa posição de passada ampla', muscles:['quadris','glúteos'] },
    { id:'world-greatest',      name:"World's Greatest Stretch",   duration:45, rest:10, calories:2,  bpmMin:65,  bpmMax:88,  gif:'🌍', equipment:'peso_corporal', description:'Avanço com torção de tronco e elevação de braço', muscles:['quadril','torácica','isquiotibiais'] },
    { id:'butterfly',           name:'Borboleta',                   duration:60, rest:10, calories:1,  bpmMin:60,  bpmMax:82,  gif:'🦋', equipment:'peso_corporal', description:'Planta dos pés juntas, pressione os joelhos ao chão', muscles:['adutores','quadril'] },
    { id:'seated-hamstring',    name:'Alongamento Isquiotibial',    duration:45, rest:10, calories:1,  bpmMin:62,  bpmMax:84,  gif:'🦵', equipment:'peso_corporal', description:'Sentado com pernas estendidas, incline em direção aos pés', muscles:['isquiotibiais'] },
    { id:'cobra-pose',          name:'Cobra',                       duration:45, rest:10, calories:1,  bpmMin:60,  bpmMax:82,  gif:'🐍', equipment:'peso_corporal', description:'Deitado de bruços, eleve o tronco com os braços estendidos', muscles:['lombar','abdômen','ombros'] },
    { id:'thoracic-rotation',   name:'Rotação Torácica',            duration:45, rest:10, calories:1,  bpmMin:62,  bpmMax:84,  gif:'🔄', equipment:'peso_corporal', description:'De quatro ou deitado, gire a coluna torácica', muscles:['torácica','oblíquos'] },
    { id:'quad-stretch',        name:'Alongamento de Quadríceps',   duration:40, rest:10, calories:1,  bpmMin:60,  bpmMax:80,  gif:'🦵', equipment:'peso_corporal', description:'Em pé, puxe o pé ao glúteo mantendo joelhos juntos', muscles:['quadríceps','flexores do quadril'] },
    { id:'calf-stretch',        name:'Alongamento de Panturrilha',  duration:40, rest:10, calories:1,  bpmMin:60,  bpmMax:80,  gif:'🦶', equipment:'peso_corporal', description:'Pé na parede ou degrau, desça o calcanhar', muscles:['panturrilha','sóleo'] },
    { id:'chest-opener',        name:'Abertura de Peito',           duration:45, rest:10, calories:1,  bpmMin:62,  bpmMax:82,  gif:'💪', equipment:'peso_corporal', description:'Braços atrás, peitoral aberto, olhe para cima', muscles:['peito','ombros','bíceps'] },
    { id:'shoulder-cross',      name:'Alongamento de Ombro Cruzado',duration:40, rest:10, calories:1,  bpmMin:60,  bpmMax:80,  gif:'↔️', equipment:'peso_corporal', description:'Passe o braço em frente ao peito e puxe com o outro', muscles:['deltóide posterior'] },
  ],

  // ══════════════════════════════════════════════════════════
  //  ADAPTADOS — para condições de saúde
  // ══════════════════════════════════════════════════════════
  adapted: [
    { id:'seated-march',        name:'Marcha Sentado',              duration:60, rest:15, calories:3,  bpmMin:88,  bpmMax:115, gif:'🪑', equipment:'cadeira', description:'Sentado, eleve os joelhos alternadamente', muscles:['pernas','core'], adapts:['joelho','lombar','gravidez'] },
    { id:'wall-pushup',         name:'Flexão na Parede',            duration:45, rest:15, calories:4,  bpmMin:95,  bpmMax:118, gif:'🧱', equipment:'peso_corporal', description:'Flexão inclinado contra a parede, sem impacto', muscles:['peito','tríceps'], adapts:['ombro_leve'] },
    { id:'seated-leg-raise',    name:'Elevação de Perna Sentado',   duration:45, rest:15, calories:3,  bpmMin:85,  bpmMax:110, gif:'🦵', equipment:'cadeira', description:'Sentado, estenda a perna alternando os lados', muscles:['quadríceps'], adapts:['joelho','lombar','gravidez'] },
    { id:'gentle-squat',        name:'Mini-Agachamento',            duration:45, rest:20, calories:4,  bpmMin:92,  bpmMax:118, gif:'🏋️', equipment:'peso_corporal', description:'Agachamento parcial (menos de 90°), sem impacto', muscles:['quadríceps','glúteos'], adapts:['joelho','cardiac'] },
    { id:'deep-breathing',      name:'Respiração Diafragmática',    duration:60, rest:10, calories:1,  bpmMin:60,  bpmMax:80,  gif:'🫁', equipment:'peso_corporal', description:'Inspire pelo nariz 4s, expire pela boca 6s', muscles:['core','diafragma'], adapts:['cardiac','hipertensao','gravidez'] },
    { id:'standing-side-bend',  name:'Flexão Lateral em Pé',        duration:45, rest:10, calories:2,  bpmMin:72,  bpmMax:95,  gif:'🤸', equipment:'peso_corporal', description:'Em pé, incline o tronco para os lados alternando', muscles:['oblíquos','lombar'], adapts:['lombar_leve','gravidez'] },
    { id:'ankle-circles',       name:'Círculos de Tornozelo',       duration:45, rest:10, calories:1,  bpmMin:70,  bpmMax:90,  gif:'🦶', equipment:'peso_corporal', description:'Faça círculos com os pés, sentado ou deitado', muscles:['tornozelo','panturrilha'], adapts:['varizes','joelho'] },
    { id:'seated-shoulder',     name:'Mobilidade de Ombro Sentado', duration:45, rest:10, calories:2,  bpmMin:68,  bpmMax:88,  gif:'💆', equipment:'peso_corporal', description:'Sentado, faça círculos lentos com os ombros', muscles:['ombros'], adapts:['ombro','cardiac','gravidez'] },
    { id:'pelvic-tilt',         name:'Inclinação Pélvica',          duration:45, rest:10, calories:2,  bpmMin:65,  bpmMax:85,  gif:'🧘', equipment:'peso_corporal', description:'Deitado, contraia o core e achate as costas no chão', muscles:['core','lombar'], adapts:['lombar','gravidez_inicial'] },
    { id:'standing-march',      name:'Marcha no Lugar (Leve)',      duration:60, rest:15, calories:4,  bpmMin:95,  bpmMax:120, gif:'🚶', equipment:'peso_corporal', description:'Marche no lugar em ritmo confortável', muscles:['pernas','core'], adapts:['cardiac','hipertensao','varizes','diabetes'] },
    { id:'water-walk',          name:'Caminhada Estacionária',      duration:120, rest:20, calories:5, bpmMin:88,  bpmMax:110, gif:'🚶', equipment:'peso_corporal', description:'Caminhe no lugar com movimentos suaves de braço', muscles:['pernas'], adapts:['cardiac','gravidez','varizes'] },
    { id:'chair-squat',         name:'Agachamento na Cadeira',      duration:45, rest:20, calories:4,  bpmMin:88,  bpmMax:112, gif:'🪑', equipment:'cadeira', description:'Use a cadeira como referência, levante e sente controlado', muscles:['quadríceps','glúteos'], adapts:['joelho_leve','lombar_leve'] },
  ],
};

// ─── Condições de Saúde ──────────────────────────────────────────────────────
export const healthConditions = [
  {
    id: 'nenhum', label: 'Nenhum problema', emoji: '✅', desc: 'Sem restrições de saúde',
    color: '#10B981', restrictedExercises: [], restrictedCategories: [], maxIntensity: 'high', warning: null,
  },
  {
    id: 'joelho', label: 'Problema no Joelho', emoji: '🦵', desc: 'Dor, lesão ou cirurgia no joelho',
    color: '#F59E0B',
    restrictedExercises: ['jumping-jacks','high-knees','burpees','squat-jump','box-jumps','speed-skaters','skipping','tuck-jumps','push-jump','lunge','agachamento-barra','sissy-squat','jump-lunge','burpee-pullup'],
    restrictedCategories: ['hiit'],
    maxIntensity: 'medium',
    warning: '⚠️ Exercícios de impacto e salto foram substituídos por versões sem carga no joelho.',
  },
  {
    id: 'lombar', label: 'Dor Lombar / Coluna', emoji: '🔙', desc: 'Hérnia, dor ou problema na coluna',
    color: '#EF4444',
    restrictedExercises: ['burpees','squat-jump','box-jumps','push-jump','tuck-jumps','superman','downward-dog','deadlift','stiff','bom-dia','stiff-halter'],
    restrictedCategories: ['hiit'],
    maxIntensity: 'medium',
    warning: '⚠️ Exercícios que sobrecarregam a coluna foram substituídos por movimentos seguros.',
  },
  {
    id: 'ombro', label: 'Lesão no Ombro', emoji: '💪', desc: 'Dor, tendinite ou cirurgia no ombro',
    color: '#8B5CF6',
    restrictedExercises: ['flexao-reto','mountain-climbers','prancha','tricep-dip','push-jump','burpees','downward-dog','desenvolvimento-barra','desenvolvimento-halter','arnold-press','elevacao-lateral','elevacao-frontal'],
    restrictedCategories: [],
    maxIntensity: 'medium',
    warning: '⚠️ Exercícios que sobrecarregam o ombro foram adaptados ou substituídos.',
  },
  {
    id: 'cardiac', label: 'Problema Cardíaco', emoji: '❤️', desc: 'Doença cardíaca, arritmia ou pós-infarto',
    color: '#EF4444',
    restrictedExercises: ['burpees','squat-jump','box-jumps','push-jump','tuck-jumps','speed-skaters','high-knees','skipping','jump-lunge','sprawl','tabata-squat'],
    restrictedCategories: ['hiit'],
    maxIntensity: 'low',
    warning: '🚨 Treino adaptado para frequência cardíaca segura. Consulte seu cardiologista antes de iniciar.',
  },
  {
    id: 'hipertensao', label: 'Hipertensão', emoji: '🩸', desc: 'Pressão arterial alta',
    color: '#EC4899',
    restrictedExercises: ['burpees','squat-jump','box-jumps','push-jump','tuck-jumps'],
    restrictedCategories: ['hiit'],
    maxIntensity: 'medium',
    warning: '⚠️ Exercícios de alta intensidade foram moderados. Monitore sua pressão arterial.',
  },
  {
    id: 'varizes', label: 'Varizes', emoji: '🦵', desc: 'Varizes ou insuficiência venosa nas pernas',
    color: '#6B7280',
    restrictedExercises: ['squat-jump','box-jumps','tuck-jumps','speed-skaters','jumping-jacks'],
    restrictedCategories: [],
    maxIntensity: 'medium',
    warning: '⚠️ Exercícios de salto e impacto foram substituídos para melhorar o retorno venoso.',
  },
  {
    id: 'gravidez', label: 'Gravidez', emoji: '🤰', desc: 'Grávida ou pós-parto recente (< 3 meses)',
    color: '#F97316',
    restrictedExercises: ['burpees','squat-jump','box-jumps','push-jump','tuck-jumps','speed-skaters','mountain-climbers','superman','jumping-jacks','high-knees','deadlift','stiff'],
    restrictedCategories: ['hiit'],
    maxIntensity: 'low',
    warning: '🤰 Treino adaptado para gravidez segura. Sempre consulte seu obstetra antes de treinar.',
  },
  {
    id: 'diabetes', label: 'Diabetes', emoji: '💉', desc: 'Diabetes tipo 1 ou tipo 2',
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

// ─── Mapa de splits por objetivo e dias ──────────────────────────────────────
// Cada posição = categoria para aquele dia da semana (rotação cíclica)
const GOAL_SPLITS = {
  'perder-peso': {
    1: ['hiit'],
    2: ['cardio','hiit'],
    3: ['hiit','cardio','strength'],
    4: ['hiit','cardio','strength','abs'],
    5: ['hiit','cardio','strength','abs','flexibility'],
    6: ['hiit','cardio','strength','legs','abs','flexibility'],
    7: ['hiit','cardio','strength','legs','abs','glutes','flexibility'],
  },
  'ganhar-musculo': {
    1: ['chest'],
    2: ['chest','back'],
    3: ['chest','back','legs'],
    4: ['chest','back','legs','shoulders'],
    5: ['chest','back','legs','shoulders','arms'],
    6: ['chest','back','legs','shoulders','arms','abs'],
    7: ['chest','back','legs','shoulders','arms','abs','glutes'],
  },
  'resistencia': {
    1: ['cardio'],
    2: ['cardio','strength'],
    3: ['cardio','hiit','strength'],
    4: ['cardio','hiit','strength','cardio'],
    5: ['cardio','hiit','strength','legs','cardio'],
    6: ['cardio','hiit','strength','legs','abs','cardio'],
    7: ['cardio','hiit','strength','legs','abs','glutes','flexibility'],
  },
  'flexibilidade': {
    1: ['flexibility'],
    2: ['flexibility','strength'],
    3: ['flexibility','strength','abs'],
    4: ['flexibility','strength','abs','cardio'],
    5: ['flexibility','strength','abs','cardio','glutes'],
    6: ['flexibility','strength','abs','cardio','glutes','flexibility'],
    7: ['flexibility','strength','abs','cardio','glutes','back','flexibility'],
  },
  'saude-geral': {
    1: ['cardio'],
    2: ['cardio','strength'],
    3: ['cardio','strength','flexibility'],
    4: ['cardio','strength','flexibility','abs'],
    5: ['chest','back','legs','cardio','flexibility'],
    6: ['chest','back','legs','cardio','abs','flexibility'],
    7: ['chest','back','legs','shoulders','cardio','abs','flexibility'],
  },
};

// ─── Gerador de plano inteligente ────────────────────────────────────────────
export function generateWorkoutPlan(userProfile) {
  const { goal, fitnessLevel, daysPerWeek, healthConditions: userHealthIds = ['nenhum'] } = userProfile;
  const template = workoutTemplates[fitnessLevel] || workoutTemplates.beginner;

  const activeConditions = healthConditions.filter(h => userHealthIds.includes(h.id));
  const allRestrictedExercises = new Set(activeConditions.flatMap(h => h.restrictedExercises));
  const allRestrictedCategories = new Set(activeConditions.flatMap(h => h.restrictedCategories));
  const maxIntensity = activeConditions.some(h => h.maxIntensity === 'low') ? 'low'
    : activeConditions.some(h => h.maxIntensity === 'medium') ? 'medium' : 'high';
  const warnings = activeConditions.map(h => h.warning).filter(Boolean);

  const days_n = Math.min(parseInt(daysPerWeek) || 3, 7);
  const goalSplit = GOAL_SPLITS[goal] || GOAL_SPLITS['saude-geral'];
  let categories = (goalSplit[days_n] || goalSplit[3])
    .filter(c => !allRestrictedCategories.has(c));

  if (categories.length === 0) categories = ['flexibility', 'adapted'];

  const dayNames = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
  const selectedDays = dayNames.slice(0, days_n);
  const exCount = fitnessLevel === 'beginner' ? 5 : fitnessLevel === 'intermediate' ? 7 : 9;

  const days = selectedDays.map((dayName, i) => {
    const category = categories[i % categories.length];
    let pool = (exerciseLibrary[category] || exerciseLibrary.strength)
      .filter(ex => !allRestrictedExercises.has(ex.id));

    if (pool.length < exCount) {
      const adaptedPool = exerciseLibrary.adapted.filter(ex => !allRestrictedExercises.has(ex.id));
      pool = [...pool, ...adaptedPool];
    }

    // Embaralha para variedade
    const shuffled = pool.sort(() => Math.random() - 0.5);
    const finalPool = maxIntensity === 'low' ? shuffled.sort((a, b) => a.bpmMax - b.bpmMax) : shuffled;
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
    'perder-peso':    'Queimar Gordura',
    'ganhar-musculo': 'Ganho de Massa',
    'resistencia':    'Resistência',
    'flexibilidade':  'Flexibilidade',
    'saude-geral':    'Saúde Total',
  };
  const hasRestrictions = activeConditions.some(h => h.id !== 'nenhum');
  return `${level} — ${goalNames[goal] || 'Treino Personalizado'}${hasRestrictions ? ' (Adaptado)' : ''}`;
}
