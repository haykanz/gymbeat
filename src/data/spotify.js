// ── Playlists Spotify por gênero ─────────────────────────────────────────
// IDs de playlists editoriais do Spotify — estáveis e públicas
export const DEFAULT_PLAYLISTS = {
  'funk':       '37i9dQZF1DX0FOF1IUWK1W', // Funk Hits (Brazil)
  'rock':       '37i9dQZF1DXcF6B6QPhFDv', // Rock Classics
  'pop':        '37i9dQZF1DXcBWIGoYBM5M', // Today's Top Hits
  'eletronico': '37i9dQZF1DX4dyzvuaRJ0n', // Mint (EDM)
  'sertanejo':  '37i9dQZF1DX9dVJOgMEtkK', // Sertanejo Universitário
  'reggaeton':  '37i9dQZF1DX10zKzsJ2jva', // Baila Reggaeton
  'hip-hop':    '37i9dQZF1DX0XUsuxWHRQd', // RapCaviar
  'classico':   '37i9dQZF1DWWEJlAGA9gs0', // Classical Essentials
};

/**
 * Retorna a URL de embed do Spotify para um gênero.
 * customPlaylists: objeto { genreId: 'url_ou_id' } salvo pelo usuário
 */
export function getSpotifyEmbedUrl(genreId, customPlaylists = {}) {
  const raw = customPlaylists[genreId] || DEFAULT_PLAYLISTS[genreId] || '';
  if (!raw) return null;

  // Aceita URL completa ou só o ID
  const match = raw.match(/playlist\/([A-Za-z0-9]+)/);
  const id = match ? match[1] : raw.trim();
  if (!id) return null;

  return `https://open.spotify.com/embed/playlist/${id}?utm_source=generator&theme=0`;
}

/** Extrai o ID de uma URL do Spotify (para salvar no perfil) */
export function extractPlaylistId(urlOrId) {
  const match = urlOrId.match(/playlist\/([A-Za-z0-9]+)/);
  return match ? match[1] : urlOrId.trim();
}
