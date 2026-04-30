// ─── Gêneros musicais ───────────────────────────────────────────────────────
export const musicGenres = [
  { id: 'funk',      label: 'Funk / Baile',      emoji: '🎵', color: '#FF6B35' },
  { id: 'pagode',    label: 'Pagode / Samba',     emoji: '🥁', color: '#8B5CF6' },
  { id: 'sertanejo', label: 'Sertanejo',          emoji: '🤠', color: '#F59E0B' },
  { id: 'rock',      label: 'Rock',               emoji: '🎸', color: '#EF4444' },
  { id: 'eletronico',label: 'Eletrônico / Dance', emoji: '🎧', color: '#06B6D4' },
  { id: 'hip-hop',   label: 'Hip-Hop / Rap',      emoji: '🎤', color: '#84CC16' },
  { id: 'pop',       label: 'Pop',                emoji: '🌟', color: '#EC4899' },
  { id: 'metal',     label: 'Metal / Heavy',      emoji: '🤘', color: '#6B7280' },
  { id: 'trap',      label: 'Trap / Phonk',       emoji: '💀', color: '#9333EA' },
  { id: 'axe',       label: 'Axé / Forró',        emoji: '🌴', color: '#F97316' },
];

// ─── Banco de músicas com BPM variado por gênero ────────────────────────────
// Cada gênero cobre faixas de BPM: baixo (60-95), médio (96-129), alto (130-165), muito alto (166+)
export const musicTracks = {
  funk: [
    { id: 'f0', title: 'Deixa Eu Te Amar',    artist: 'Seu Jorge',       bpm: 72,  duration: 210 },
    { id: 'f1', title: 'Não Vou Deixar',      artist: 'Mumuzinho',       bpm: 90,  duration: 225 },
    { id: 'f2', title: 'Tudo Ok',             artist: 'Thiaguinho',      bpm: 105, duration: 220 },
    { id: 'f3', title: 'Tô Voando',           artist: 'Ludmilla',        bpm: 118, duration: 210 },
    { id: 'f4', title: 'Vai Malandra',        artist: 'Anitta',          bpm: 132, duration: 200 },
    { id: 'f5', title: 'Bum Bum Tam Tam',     artist: 'MC Fioti',        bpm: 138, duration: 180 },
    { id: 'f6', title: 'Baile de Favela',     artist: 'MC João',         bpm: 145, duration: 195 },
    { id: 'f7', title: 'Onda Diferente',      artist: 'Anitta',          bpm: 153, duration: 188 },
    { id: 'f8', title: 'Me Libera',           artist: 'Dennis DJ',       bpm: 160, duration: 185 },
    { id: 'f9', title: 'Tombei',              artist: 'Lexa',            bpm: 168, duration: 175 },
  ],
  pagode: [
    { id: 'p0', title: 'Se Eu Ficar',         artist: 'Thiaguinho',      bpm: 68,  duration: 240 },
    { id: 'p1', title: 'Quando a Chuva Passar',artist:'Thiaguinho',      bpm: 82,  duration: 235 },
    { id: 'p2', title: 'Deixa a Vida Me Levar',artist:'Zeca Pagodinho',  bpm: 95,  duration: 240 },
    { id: 'p3', title: 'Saudade da Minha Terra',artist:'Grupo Revelação',bpm: 108, duration: 225 },
    { id: 'p4', title: 'Sorte Grande',        artist: 'Ivete Sangalo',   bpm: 120, duration: 215 },
    { id: 'p5', title: 'Com Você',            artist: 'Exaltasamba',     bpm: 130, duration: 222 },
    { id: 'p6', title: 'Aquarela Brasileira', artist: 'Conjunto Época',  bpm: 142, duration: 200 },
    { id: 'p7', title: 'Raça Negra',          artist: 'Raça Negra',      bpm: 155, duration: 195 },
  ],
  sertanejo: [
    { id: 's0', title: 'Tô Indo',             artist: 'Marília Mendonça',bpm: 70,  duration: 240 },
    { id: 's1', title: 'Infiel',              artist: 'Marília Mendonça',bpm: 85,  duration: 232 },
    { id: 's2', title: 'Largado às Traças',   artist:'Zé Neto e Cristiano',bpm:100,duration: 220 },
    { id: 's3', title: 'Intensidade',         artist: 'Gusttavo Lima',   bpm: 112, duration: 215 },
    { id: 's4', title: 'Notificação Preferida',artist:'Hugo e Guilherme',bpm: 125, duration: 230 },
    { id: 's5', title: 'Fui Fácil',          artist: 'Jorge e Mateus',  bpm: 135, duration: 218 },
    { id: 's6', title: 'A Hora é Essa',       artist: 'Simone e Simaria',bpm: 148, duration: 205 },
    { id: 's7', title: 'Abala',               artist: 'Henrique e Diego',bpm: 160, duration: 195 },
  ],
  rock: [
    { id: 'r0', title: 'Wish You Were Here', artist: 'Pink Floyd',       bpm: 66,  duration: 334 },
    { id: 'r1', title: 'Hotel California',   artist: 'Eagles',           bpm: 75,  duration: 391 },
    { id: 'r2', title: 'We Will Rock You',   artist: 'Queen',            bpm: 82,  duration: 130 },
    { id: 'r3', title: 'Eye of the Tiger',   artist: 'Survivor',         bpm: 108, duration: 245 },
    { id: 'r4', title: 'Welcome to Jungle',  artist: "Guns N' Roses",    bpm: 125, duration: 270 },
    { id: 'r5', title: 'Thunderstruck',      artist: 'AC/DC',            bpm: 136, duration: 290 },
    { id: 'r6', title: 'Lose Yourself',      artist: 'Eminem',           bpm: 171, duration: 326 },
    { id: 'r7', title: 'Master of Puppets',  artist: 'Metallica',        bpm: 212, duration: 515 },
  ],
  eletronico: [
    { id: 'e0', title: 'Sunset Lover',       artist: 'Petit Biscuit',    bpm: 72,  duration: 230 },
    { id: 'e1', title: 'Lean On',            artist: 'Major Lazer',      bpm: 98,  duration: 177 },
    { id: 'e2', title: 'Wake Me Up',         artist: 'Avicii',           bpm: 124, duration: 247 },
    { id: 'e3', title: 'Titanium',           artist: 'David Guetta',     bpm: 126, duration: 244 },
    { id: 'e4', title: 'Levels',             artist: 'Avicii',           bpm: 128, duration: 195 },
    { id: 'e5', title: 'Animals',            artist: 'Martin Garrix',    bpm: 138, duration: 245 },
    { id: 'e6', title: 'Clarity',            artist: 'Zedd',             bpm: 128, duration: 271 },
    { id: 'e7', title: 'Jump',               artist: 'Kris Kross Amsterdam',bpm:152,duration: 185 },
    { id: 'e8', title: 'Turn Down for What', artist: 'DJ Snake',         bpm: 165, duration: 199 },
    { id: 'e9', title: 'Scary Monsters',     artist: 'Skrillex',         bpm: 175, duration: 268 },
  ],
  'hip-hop': [
    { id: 'h0', title: 'Passionfruit',       artist: 'Drake',            bpm: 72,  duration: 294 },
    { id: 'h1', title: 'God\'s Plan',        artist: 'Drake',            bpm: 78,  duration: 198 },
    { id: 'h2', title: 'Work Out',           artist: 'J. Cole',          bpm: 83,  duration: 221 },
    { id: 'h3', title: 'Power',              artist: 'Kanye West',       bpm: 89,  duration: 288 },
    { id: 'h4', title: 'All I Do Is Win',    artist: 'DJ Khaled',        bpm: 100, duration: 226 },
    { id: 'h5', title: 'HUMBLE.',            artist: 'Kendrick Lamar',   bpm: 150, duration: 177 },
    { id: 'h6', title: 'Can\'t Hold Us',     artist: 'Macklemore',       bpm: 155, duration: 257 },
    { id: 'h7', title: 'Stronger',           artist: 'Kanye West',       bpm: 102, duration: 311 },
    { id: 'h8', title: 'Numb/Encore',        artist: 'Jay-Z & Linkin Park',bpm:120,duration: 286 },
    { id: 'h9', title: 'Pump It',            artist: 'Black Eyed Peas',  bpm: 162, duration: 216 },
  ],
  pop: [
    { id: 'pp0', title: 'Someone Like You', artist: 'Adele',             bpm: 67,  duration: 285 },
    { id: 'pp1', title: 'Rolling in Deep',  artist: 'Adele',             bpm: 105, duration: 228 },
    { id: 'pp2', title: 'Uptown Funk',      artist: 'Bruno Mars',        bpm: 115, duration: 270 },
    { id: 'pp3', title: 'Can\'t Stop Feeling',artist:'Justin Timberlake',bpm: 113, duration: 236 },
    { id: 'pp4', title: 'Physical',         artist: 'Dua Lipa',          bpm: 123, duration: 194 },
    { id: 'pp5', title: 'Levitating',       artist: 'Dua Lipa',          bpm: 103, duration: 203 },
    { id: 'pp6', title: 'Blinding Lights',  artist: 'The Weeknd',        bpm: 171, duration: 200 },
    { id: 'pp7', title: 'Shape of You',     artist: 'Ed Sheeran',        bpm: 96,  duration: 234 },
    { id: 'pp8', title: 'Shake It Off',     artist: 'Taylor Swift',      bpm: 160, duration: 219 },
    { id: 'pp9', title: 'Roar',             artist: 'Katy Perry',        bpm: 180, duration: 228 },
  ],
  metal: [
    { id: 'm0', title: 'Nothing Else Matters',artist:'Metallica',        bpm: 69,  duration: 388 },
    { id: 'm1', title: 'The Unforgiven',    artist: 'Metallica',         bpm: 78,  duration: 387 },
    { id: 'm2', title: 'Killing in the Name',artist:'RATM',              bpm: 100, duration: 313 },
    { id: 'm3', title: 'Enter Sandman',     artist: 'Metallica',         bpm: 123, duration: 331 },
    { id: 'm4', title: 'Paranoid',          artist: 'Black Sabbath',     bpm: 154, duration: 172 },
    { id: 'm5', title: 'Back in Black',     artist: 'AC/DC',             bpm: 186, duration: 255 },
    { id: 'm6', title: 'Master of Puppets',  artist: 'Metallica',        bpm: 212, duration: 515 },
    { id: 'm7', title: 'Angel of Death',    artist: 'Slayer',            bpm: 230, duration: 272 },
  ],
  trap: [
    { id: 't0', title: 'No Role Modelz',    artist: 'J. Cole',           bpm: 68,  duration: 293 },
    { id: 't1', title: 'Mo Bamba',          artist: 'Sheck Wes',         bpm: 81,  duration: 172 },
    { id: 't2', title: 'Rockstar',          artist: 'Post Malone',       bpm: 88,  duration: 218 },
    { id: 't3', title: 'XO TOUR Llif3',     artist: 'Lil Uzi Vert',      bpm: 153, duration: 183 },
    { id: 't4', title: 'Drip Too Hard',     artist: 'Gunna',             bpm: 137, duration: 175 },
    { id: 't5', title: 'Sicko Mode',        artist: 'Travis Scott',      bpm: 155, duration: 312 },
    { id: 't6', title: 'MANIAC',            artist: 'Ythan Savoy (Phonk)',bpm: 170, duration: 165 },
    { id: 't7', title: 'INTERNET (Phonk)',  artist: 'MOONDEITY',         bpm: 185, duration: 168 },
  ],
  axe: [
    { id: 'a0', title: 'Quero Que Vá',      artist: 'Chiclete c/ Banana',bpm: 80,  duration: 215 },
    { id: 'a1', title: 'Alguma Coisa',       artist: 'Timbalada',         bpm: 95,  duration: 215 },
    { id: 'a2', title: 'Tchu Tcha Tcha',    artist: 'Psirico',           bpm: 110, duration: 220 },
    { id: 'a3', title: 'Kuat',              artist: 'Chiclete c/ Banana',bpm: 128, duration: 230 },
    { id: 'a4', title: 'Macuxi',            artist: 'Psirico',           bpm: 140, duration: 210 },
    { id: 'a5', title: 'Lepo Lepo',         artist: 'Psirico',           bpm: 152, duration: 200 },
    { id: 'a6', title: 'Largadinho',        artist: 'Ivete Sangalo',     bpm: 165, duration: 195 },
  ],
};

// ─── Matching de BPM por exercício ──────────────────────────────────────────
/**
 * Escolhe a faixa do gênero que tem o BPM mais próximo do alvo do exercício.
 * Retorna a faixa + indicador de compatibilidade.
 */
export function matchTrackToExercise(genre, bpmMin, bpmMax) {
  const tracks = musicTracks[genre] || musicTracks.pop;
  const targetBpm = Math.round((bpmMin + bpmMax) / 2);

  // Tenta encontrar uma faixa DENTRO do range ideal
  const inRange = tracks.filter(t => t.bpm >= bpmMin && t.bpm <= bpmMax);

  if (inRange.length > 0) {
    // Dentre as dentro do range, pega aleatória
    const pick = inRange[Math.floor(Math.random() * inRange.length)];
    return { ...pick, bpmMatch: 'ideal', bpmDiff: Math.abs(pick.bpm - targetBpm) };
  }

  // Fallback: faixa mais próxima do alvo
  const sorted = [...tracks].sort((a, b) =>
    Math.abs(a.bpm - targetBpm) - Math.abs(b.bpm - targetBpm)
  );
  const closest = sorted[0];
  const diff = Math.abs(closest.bpm - targetBpm);
  const match = diff <= 15 ? 'bom' : diff <= 30 ? 'aproximado' : 'distante';
  return { ...closest, bpmMatch: match, bpmDiff: diff };
}

export function getBpmMatchLabel(match) {
  switch (match) {
    case 'ideal':    return { label: '🎯 BPM Ideal',     color: '#10B981' };
    case 'bom':      return { label: '✅ BPM Próximo',    color: '#84CC16' };
    case 'aproximado': return { label: '⚠️ BPM Aprox.',  color: '#F59E0B' };
    default:         return { label: '🔁 Adaptado',       color: '#6B7280' };
  }
}

export function formatDuration(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}
