import React, { useRef, useContext } from 'react';
import styles from './styles/Search.module.css';
import SearchContext from '../SearchContext';

const Search = () => {
  const searchInput = useRef();
  const { handleSearch, query, setQuery } = useContext(SearchContext);

  return (
    <form onSubmit={(event) => handleSearch(event, searchInput.current.value)}>
      <input
        type="text"
        placeholder="Busque um filme por nome, ano ou gênero..."
        className={styles.search}
        value={query}
        onChange={({ target }) => setQuery(target.value)}
        onBlur={(event) => handleSearch(event, query)}
        ref={searchInput}
      />
    </form>
  );
};

export default Search;
