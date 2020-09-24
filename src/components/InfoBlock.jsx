import React from 'react';
import styles from './MovieDetails.module.css';

const InfoBlock = ({ column, value }) => {
  return (
    <div className={styles.info}>
      <span>{column}</span>
      <span>{value}</span>
    </div>
  );
};

export default InfoBlock;
