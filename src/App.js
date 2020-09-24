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

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(currentPage);
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState('');
  const [tags, setTags] = useState(null);

  // carrega os generos somente uma vez
  useEffect(() => {
    if (tags !== null) return;
    const getGenres = async () => {
      const movieFetch = await fetch(GENRE_IDS_URL);
      const movieJSON = await movieFetch.json();
      const TVFetch = await fetch(TV_GENRE_IDS_URL);
      const TvJSON = await TVFetch.json();

      // filtra a lista de generos de filme e TV, e as une em um array
      // filmes vêm com generos misturados
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
      console.log(filteredGenres);
    };
    getGenres();
  }, [tags]);

  const search = async () => {
    const response = await fetch(MOVIES_QUERY(query));
    const json = await response.json();
    let config = await GET_API_CONFIGS(); // botar em outro lugar depois
    config = JSON.parse(config);
    console.log(json.results);

    if (json.results)
      setSearchResults(
        json.results.map((result) => ({
          title: result.title,
          release: result.release_date,
          synopsis: result.overview,
          rate: result.vote_average,
          tags: result.genre_ids.map((genre) =>
            tags.find((tag) => tag.id === genre),
          ),
          posterImg: result.poster_path
            ? config.images.base_url +
              config.images.poster_sizes[3] +
              result.poster_path
            : null,
        })),
      );
  };

  const changePage = (page) => {
    setLastPage(currentPage);
    setCurrentPage(page);
  };

  const maxResults = 5;
  const pages = Math.ceil(searchResults.length / maxResults);

  let from = 0;
  let to = maxResults;
  if (searchResults.length % maxResults !== 0) {
    from = currentPage - 1;
    to = lastPage + maxResults;
  }

  return (
    <>
      <Header />
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
          <SearchResult
            key={Math.random()}
            title={data.title}
            releaseDate={new Date(data.release).toLocaleDateString()}
            synopsis={data.synopsis}
            rate={`${data.rate * 10}%`}
            tags={data.tags}
            poster={data.posterImg}
          />
        ))}

        {searchResults.length !== 0 && (
          <Paginator pages={pages} current={currentPage} action={changePage} />
        )}
      </section>
    </>
  );
}

export default App;
