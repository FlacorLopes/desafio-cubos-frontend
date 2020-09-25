export const API_KEY = '4550f1f87b0fbedf6aaed73883e8445c';
export const ptBR = 'pt-BR';
export const BASE_URL = 'https://api.themoviedb.org/3/';

export const GENRE_IDS_URL = `${BASE_URL}genre/movie/list?api_key=${API_KEY}&language=${ptBR}`;

export const TV_GENRE_IDS_URL = `${BASE_URL}genre/tv/list?api_key=${API_KEY}&language=${ptBR}`;

export const API_CONFIG = `${BASE_URL}configuration?api_key=${API_KEY}`;

export const MOVIES_QUERY = (query, genre = null, year = null, page = 1) => {
  if (genre)
    return `${BASE_URL}discover/movie?api_key=${API_KEY}&language=${ptBR}&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}&with_genres=${genre}`;
  if (year)
    return `${BASE_URL}discover/movie?api_key=${API_KEY}&language=${ptBR}&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}&year=${year}`;
  return `${BASE_URL}search/movie?api_key=${API_KEY}&language=${ptBR}&query=${encodeURIComponent(
    query,
  )}&page=${page}&include_adult=false`;
};

export const MOVIE_DETAILS_URL = (movie_id) =>
  `${BASE_URL}movie/${movie_id}?api_key=${API_KEY}&language=${ptBR}&append_to_response=videos`;

export const GET_API_CONFIGS = async () => {
  if (!localStorage.getItem('API_CONFIGS')) {
    const config = await fetch(API_CONFIG);
    const jsonConfig = await config.json();
    localStorage.setItem('API_CONFIGS', JSON.stringify(jsonConfig));
  }
  return JSON.parse(localStorage.getItem('API_CONFIGS'));
};

export const GET_API_GENRES = async () => {
  if (!localStorage.getItem('GENRES')) {
    const movieFetch = await fetch(GENRE_IDS_URL);
    const movieJSON = await movieFetch.json();
    const TVFetch = await fetch(TV_GENRE_IDS_URL);
    const TvJSON = await TVFetch.json();
    localStorage.setItem('GENRES_MOVIES', JSON.stringify(movieJSON));
    localStorage.setItem('GENRES_TV', JSON.stringify(TvJSON));
  }

  const movieJSON = JSON.parse(localStorage.getItem('GENRES_MOVIES'));
  const TvJSON = JSON.parse(localStorage.getItem('GENRES_TV'));
  // filtra a lista de generos de filme e TV, e as une em um array
  // filmes vêm com generos misturados que estão na lista de TV
  const filteredGenres = [
    ...movieJSON.genres,
    ...TvJSON.genres.filter(
      (tv_genre) =>
        !movieJSON.genres.some((movie_genre) => movie_genre.id === tv_genre.id),
    ),
  ];
  return filteredGenres;
};
