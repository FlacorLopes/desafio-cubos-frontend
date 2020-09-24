import React from 'react';
import styles from './SearchResult.module.css';
import Circle from './Circle';

const SearchResult = ({ title, rate, releaseDate, synopsis, tags, poster }) => {
  return (
    <>
      <div className={styles.searchResult}>
        <div
          className={styles.poster}
          style={{ backgroundImage: `url('${poster}')` }}
        ></div>
        <div className={styles.column}>
          <div className={styles.header}>
            <div className={styles.innerHeader}>
              <Circle content={rate} width="65px" />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  paddingLeft: '20px',
                }}
              >
                <span className={styles.title}>{title}</span>
                <span className={styles.releaseDate}>{releaseDate}</span>
              </div>
            </div>
          </div>
          <div style={{ paddingLeft: '40px' }}>
            <div className={styles.synopsis}>
              <p>{synopsis || 'Descrição não disponível'}</p>
            </div>
            <ul className={styles.tags}>
              {tags.map((tag) => (
                <li key={Math.random()}>{tag.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchResult;