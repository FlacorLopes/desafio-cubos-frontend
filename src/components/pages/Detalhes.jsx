import React, { useContext } from 'react';
import SearchContext from '../../SearchContext';
import MovieDetails from '../MovieDetails';

const Detalhes = () => {
  const { selectedMovie } = useContext(SearchContext);
  return <MovieDetails movie={selectedMovie} />;
};

export default Detalhes;
