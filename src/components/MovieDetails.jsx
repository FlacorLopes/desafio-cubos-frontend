import React from 'react';
import styles from './MovieDetails.module.css';
import TagList from './TagList';
import Circle from './Circle';
// import poster from '../assets/img/poster.png';

const MovieDetails = ({ title, release, synopsis, tags, poster, rate }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        <span className={styles.release}>{release}</span>
      </div>
      <div className={styles.content}>
        <div className={styles.contentColumn}>
          <h2>Sinopse</h2>
          <p>{synopsis}</p>
          <h2>Informações</h2>
          <div className={styles.infoAndRate}>
            <TagList tags={tags} />
            <Circle content={rate} width="100px" font="2.5rem" />
          </div>
        </div>
        <div className={styles.poster}>
          <img src={poster} alt="poster"></img>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
