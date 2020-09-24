export const API_KEY = '4550f1f87b0fbedf6aaed73883e8445c';
export const language = 'pt-BR';

export const GENRE_IDS_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=${language}`;

export const TV_GENRE_IDS_URL = `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=${language}`;

export const API_CONFIG = `https://api.themoviedb.org/3/configuration?api_key=${API_KEY}`;

export const MOVIES_QUERY = (query, page) =>
  `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=${language}&query=${encodeURIComponent(
    query,
  )}&page=${page || 1}&include_adult=false`;

export const MOVIE_DETAILS_URL = (movie_id) =>
  `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}&language=${language}&append_to_response=videos`;

export const GET_API_CONFIGS = async () => {
  if (!localStorage.getItem('API_CONFIGS')) {
    const config = await fetch(API_CONFIG);
    const jsonConfig = await config.json();
    localStorage.setItem('API_CONFIGS', JSON.stringify(jsonConfig));
  }
  return localStorage.getItem('API_CONFIGS');
};
