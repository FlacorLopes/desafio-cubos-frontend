import React from 'react';
import Search from '../Search';
import ResultList from '../ResultList';
import styles from '../../App.module.css';

const Home = () => {
  return (
    <main className={styles.mainSection}>
      <Search />
      <ResultList />
    </main>
  );
};

export default Home;
