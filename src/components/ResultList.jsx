import React, { useContext } from 'react';
import Paginator from './Paginator';
import SearchResult from './SearchResult';
import { Link } from 'react-router-dom';
import SearchContext from '../SearchContext';

const ResultList = () => {
  const {
    searchResults,
    totalResults,
    setSelectedMovie,
    currentPage,
    setCurrentPage,
  } = useContext(SearchContext);
  const maxResults = 5;
  const pages = Math.ceil(searchResults.length / maxResults);
  let from = maxResults * (currentPage - 1);
  let to = maxResults * currentPage;

  // define o filme selecionado ao clicar sobre
  const selectMovie = (id) => {
    const index = searchResults.findIndex((movieData) => movieData.id === id);
    setSelectedMovie(searchResults[index]);
  };

  return (
    <>
      {searchResults.slice(from, to).map((data) => (
        <Link
          to="/detalhes"
          key={'clickable' + data.id}
          onClick={() => selectMovie(data.id)} // div necessária para habilitar click sobre os resultados
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
        </Link>
      ))}
      {searchResults.length !== 0 && (
        <Paginator
          pages={pages}
          current={currentPage}
          action={(page) => setCurrentPage(page)}
        />
      )}
    </>
  );
};

export default ResultList;
