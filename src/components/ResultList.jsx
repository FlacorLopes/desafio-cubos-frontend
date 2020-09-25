import React, { useState, useEffect, useContext } from 'react';
import Paginator from './Paginator';
import SearchResult from './SearchResult';
import { Link } from 'react-router-dom';
import SearchContext from '../SearchContext';

const ResultList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { searchResults, totalResults, setSelectedMovie } = useContext(
    SearchContext,
  );
  const maxResults = 5;
  const pages = Math.ceil(totalResults / maxResults);
  let from = maxResults * (currentPage - 1);
  let to = maxResults * currentPage;

  useEffect(() => {
    // console.log(pages, from, to);
  }, [to, searchResults]);

  // define o filme selecionado ao clicar sobre
  const selectMovie = (id) => {
    const index = searchResults.findIndex((r) => r.id === id);
    setSelectedMovie(searchResults[index]);
  };

  // passada ao paginator para alterar a página atual
  const changePage = (page) => {
    // ultimo botao deve carregar mais?
    // if (page === searchResults.length) console.log('Ultimo botao');
    console.log(page, totalResults, searchResults);
    setCurrentPage(page);
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
          action={changePage}
          maxButtons={4}
        />
      )}
    </>
  );
};

export default ResultList;
