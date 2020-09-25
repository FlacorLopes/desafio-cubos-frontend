import React from 'react';
import styles from './styles/Header.module.css';
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <header className={styles.header}>
      <span>
        <Link to="/">Movies</Link>
      </span>
    </header>
  );
};

export default Header;
