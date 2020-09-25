import React, { createContext, useState, useEffect } from 'react';
import { MOVIES_QUERY, GET_API_CONFIGS, GET_API_GENRES } from './API';

const SearchContext = createContext();

export const SearchStorage = ({ children }) => {
  const [tags, setTags] = useState(null);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [apiPage, setApiPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

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

  // const [currentQueryConfigs, setCurrentQueryConfigs] = useState(null);
  // const loadMore = () => {
  //   loadQuery(
  //     currentQueryConfigs.query,
  //     currentQueryConfigs.genre,
  //     currentQueryConfigs.year,
  //     apiPage + 1,
  //   );
  //   setApiPage((w) => w + 1);
  // };

  const loadQuery = async (query, genre, year, page) => {
    if (query.trim().length < 1) return;
    console.log(query);
    // setCurrentQueryConfigs({ query, genre, year, page });

    const response = await fetch(MOVIES_QUERY(query, genre, year, page));
    const json = await response.json();
    let config = await GET_API_CONFIGS();

    setTotalResults(json.total_results);
    console.log(json, 'json');
    setApiPage(page);

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

    // busca especificamente por um genero com o endpoint discover
    let genreID = tags.findIndex(
      (tag) => tag.name.toLowerCase() === query.toLocaleLowerCase(),
    );
    if (genreID !== -1) {
      loadQuery(query, tags[genreID].id, null, apiPage);
      return;
    }
    loadQuery(query, null, null, apiPage);
    setCurrentPage(1);
  };

  return (
    <SearchContext.Provider
      value={{
        searchResults,
        query,
        setQuery,
        handleSearch,
        totalResults,
        selectedMovie,
        setSelectedMovie,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
