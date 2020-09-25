import React, { useEffect, useState } from 'react';
import styles from './styles/MovieDetails.module.css';
import TagList from './TagList';
import Circle from './Circle';
import { MOVIE_DETAILS_URL } from '../API';
import InfoBlock from './InfoBlock';
import {
  getVideoKey,
  releaseStatus,
  timeFormat,
  format,
  getLanguage,
} from '../utils';
import { useNavigate, Navigate } from 'react-router-dom';

const MovieDetails = ({ movie }) => {
  const [detailedInfo, setDetailedInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (detailedInfo !== null || !movie) return;

    const getData = async () => {
      const response = await fetch(MOVIE_DETAILS_URL(movie.id));
      const json = await response.json();

      setDetailedInfo(json);
      console.log(json);
    };
    getData();
  }, [detailedInfo, movie, navigate]);

  if (!movie) {
    return <Navigate to="/" />;
  }
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.title}>{movie.title}</span>
        <span className={styles.release}>{movie.release}</span>
      </div>
      <div className={styles.content}>
        <div className={styles.contentColumn}>
          <h2>Sinopse</h2>
          <p>{movie.synopsis || 'Não disponível'}</p>
          <h2>Informações</h2>
          <div className={styles.infoContainer}>
            {detailedInfo && (
              <>
                <InfoBlock
                  column="Situação"
                  value={releaseStatus(detailedInfo.status)}
                />
                <InfoBlock column="Idioma" value={getLanguage(detailedInfo)} />
                <InfoBlock
                  column="Duração"
                  value={timeFormat(detailedInfo.runtime)}
                />
                <InfoBlock
                  column="Orçamento"
                  value={format(detailedInfo.budget)}
                />
                <InfoBlock
                  column="Receita"
                  value={format(detailedInfo.revenue)}
                />
                <InfoBlock
                  column="Lucro"
                  value={format(detailedInfo.revenue - detailedInfo.budget)}
                />
              </>
            )}
          </div>
          <div className={styles.tagsAndRate}>
            <TagList tags={movie.tags} />
            <Circle
              content={`${movie.rate * 10}%`}
              width="100px"
              font="2.5rem"
            />
          </div>
        </div>
        <div className={styles.poster}>
          <img src={movie.posterImg} alt="poster"></img>
        </div>
      </div>
      {detailedInfo && getVideoKey(detailedInfo) && (
        <iframe
          width="100%"
          height="500"
          title="video"
          src={`https://www.youtube.com/embed/${getVideoKey(detailedInfo)}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

export default MovieDetails;
