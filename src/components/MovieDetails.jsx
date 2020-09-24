import React, { useEffect, useState } from 'react';
import styles from './MovieDetails.module.css';
import TagList from './TagList';
import Circle from './Circle';
import { MOVIE_DETAILS_URL } from '../API';
import InfoBlock from './InfoBlock';

const MovieDetails = ({ movie }) => {
  const [detailedInfo, setDetailedInfo] = useState(null);

  useEffect(() => {
    if (detailedInfo !== null) return;

    const getData = async () => {
      const response = await fetch(MOVIE_DETAILS_URL(movie.id));
      const json = await response.json();

      setDetailedInfo(json);
      console.log(json);
    };
    getData();
  }, [detailedInfo, movie]);

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
            {/* {console.log(movie)} */}
          </div>
        </div>
        <div className={styles.poster}>
          <img src={movie.posterImg} alt="poster"></img>
        </div>
      </div>
    </div>
  );
};

const format = (value) => {
  if (isNaN(value) || value === 0 || !isFinite(value)) return 'Não disponível';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

const timeFormat = (value) =>
  `${parseInt(value / 60)}h${parseInt(value % 60)}min`;

const releaseStatus = (value) => {
  if (typeof value !== 'string') return;
  value = value.toLowerCase();

  if (value === 'released') return 'Lançado';
  if (value === 'in production') return 'Em produção';
  if (value === 'post production') return 'Pós produção';
};

const getLanguage = (detailedInfo) => detailedInfo.spoken_languages[0].name;
export default MovieDetails;
