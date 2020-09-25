import React, { createContext, useState, useEffect } from 'react';
import { MOVIES_QUERY, GET_API_CONFIGS, GET_API_GENRES } from './API';

const SearchContext = createContext();

export const SearchStorage = ({ children }) => {
  const [tags, setTags] = useState(null);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [workinPage, setWorkingPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // carrega os generos da api
  useEffect(() => {
    if (tags !== null) return;

    const getGenres = async () => {
      const genres = await GET_API_GENRES();
      setTags(genres);
      console.log(genres);
    };
    getGenres();
  }, [tags]);

  const search = async (query, genre, year, page) => {
    if (query.trim().length < 1) return;

    console.log(query);
    setWorkingPage(page);
    const response = await fetch(MOVIES_QUERY(query, genre, year, page));
    const json = await response.json();
    let config = await GET_API_CONFIGS(); // botar em outro lugar depois
    setTotalResults(json.total_results);
    console.log(json, 'json');

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
    if (json.results) {
      setSearchResults(
        json.results.map((result) => getResultData(result, config)),
      );
    }
  };

  const handleSearch = (event, query) => {
    event.preventDefault();
    if (query.length < 2) return;

    let genreID = tags.findIndex(
      (tag) => tag.name.toLowerCase() === query.toLocaleLowerCase(),
    );
    if (genreID !== -1) {
      alert('Buscar por genero' + tags[genreID].id);
      search(query, tags[genreID].id, null, workinPage);
      setQuery('');
      return;
    }
    search(query, null, null, workinPage);
  };

  return (
    <SearchContext.Provider
      value={{
        searchResults,
        workinPage,
        query,
        setQuery,
        handleSearch,
        totalResults,
        selectedMovie,
        setSelectedMovie,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
