import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import styles from './App.module.css';
import SearchResult from './components/SearchResult';
import Paginator from './components/Paginator';
import {
  GENRE_IDS_URL,
  MOVIES_QUERY,
  TV_GENRE_IDS_URL,
  GET_API_CONFIGS,
} from './API';
import MovieDetails from './components/MovieDetails';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(currentPage);
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState('');
  const [tags, setTags] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // carrega os generos somente uma vez
  useEffect(() => {
    if (tags !== null) return;

    const getGenres = async () => {
      const movieFetch = await fetch(GENRE_IDS_URL);
      const movieJSON = await movieFetch.json();
      const TVFetch = await fetch(TV_GENRE_IDS_URL);
      const TvJSON = await TVFetch.json();

      // filtra a lista de generos de filme e TV, e as une em um array
      // filmes vêm com generos misturados que estão na lista de TV
      const filteredGenres = [
        ...movieJSON.genres,
        ...TvJSON.genres.filter(
          (tv_genre) =>
            !movieJSON.genres.some(
              (movie_genre) => movie_genre.id === tv_genre.id,
            ),
        ),
      ];
      setTags(filteredGenres);
      // console.log(filteredGenres);
    };
    getGenres();
  }, [tags]);

  // define o filme selecionado ao clicar sobre
  const selectMovie = (id) => {
    const index = searchResults.findIndex((r) => r.id === id);
    setSelectedMovie((s) => searchResults[index]);
  };

  // seta a exibição dos detalhes do filme ao clicar num resultado
  useEffect(() => {
    if (selectedMovie === null) return;
    setShowDetails(true);
  }, [selectedMovie]);

  // helper para criar o objeto do filme a partir do resultado
  const getResultData = (result, config) => {
    return {
      id: result.id,
      title: result.title,
      release: new Date(result.release_date).toLocaleDateString(),
      synopsis: result.overview,
      rate: result.vote_average,
      tags: result.genre_ids.map(
        (genre) => tags.find((tag) => tag.id === genre),
        // faz a correspondencia entre os ids e os generos
      ),
      posterImg: result.poster_path
        ? config.images.base_url +
          config.images.poster_sizes[3] +
          result.poster_path
        : null,
    };
  };

  const search = async () => {
    if (query.trim().length < 1) return;

    const response = await fetch(MOVIES_QUERY(query));
    const json = await response.json();
    let config = await GET_API_CONFIGS(); // botar em outro lugar depois
    config = JSON.parse(config);

    console.log(json);

    if (json.results) {
      setSearchResults(
        json.results.map((result) => getResultData(result, config)),
      );
      setCurrentPage(1); // inicia o paginator na página 1 a cada pesquisa
    }
  };

  // passada ao paginator para alterar a página atual
  const changePage = (page) => {
    setLastPage(currentPage);
    setCurrentPage(page);
    // console.log('Page selecionada', page, 5 * (page - 1));
  };

  useEffect(() => {
    // console.log('page atual', currentPage, 'last page', lastPage);
  }, [currentPage, lastPage]);

  const maxResults = 5;
  const pages = Math.ceil(searchResults.length / maxResults);

  let from = 0;
  let to = maxResults;
  from = maxResults * (currentPage - 1);
  to = maxResults * currentPage;

  return (
    <>
      <Header />
      {!showDetails && (
        <section className={styles.mainSection}>
          <input
            type="text"
            placeholder="Busque um filme por nome, ano ou gênero..."
            className={styles.search}
            value={query}
            onChange={({ target }) => setQuery(target.value)}
            onBlur={() => search()}
          />

          {searchResults.slice(from, to).map((data) => (
            <div
              key={'clicable' + data.id}
              onClick={() => selectMovie(data.id)}
              style={{ width: '100%' }}
            >
              <SearchResult
                key={data.id}
                title={data.title}
                releaseDate={data.release}
                synopsis={data.synopsis}
                rate={`${data.rate * 10}%`}
                tags={data.tags}
                poster={data.posterImg}
              />
            </div>
          ))}

          {searchResults.length !== 0 && (
            <Paginator
              pages={pages}
              current={currentPage}
              action={changePage}
            />
          )}
        </section>
      )}
      {showDetails && (
        <section className={styles.mainSection}>
          <MovieDetails
            title={selectedMovie.title}
            release={selectedMovie.release}
            synopsis={selectedMovie.synopsis}
            tags={selectedMovie.tags}
            poster={selectedMovie.posterImg}
            rate={`${selectedMovie.rate * 10}%`}
          />
          {console.log(selectedMovie)}
        </section>
      )}
    </>
  );
}

export default App;
