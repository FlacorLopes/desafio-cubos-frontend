import React from 'react';
import styles from './styles/SearchResult.module.css';
import Circle from './Circle';
import TagList from './TagList';

const SearchResult = ({
  title,
  rate,
  releaseDate,
  synopsis,
  tags,
  poster,
  onClick,
}) => {
  return (
    <>
      <div className={styles.searchResult}>
        <div
          className={styles.poster}
          style={{ backgroundImage: poster ? `url('${poster}')` : '' }}
        ></div>
        <div className={styles.column}>
          <div className={styles.header}>
            <div className={styles.innerHeader}>
              <Circle content={rate} width="65px" className={styles.rating} />
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
              <img
                src={poster}
                alt="poster"
                className={styles.mobileImage}
              ></img>

              <p>{synopsis || 'Descrição não disponível'}</p>
            </div>
            <TagList tags={tags} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchResult;
