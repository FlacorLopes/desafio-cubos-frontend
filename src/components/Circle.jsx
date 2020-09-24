import React from 'react';
import styles from './Circle.module.css';

const Circle = ({ content, width }) => {
  return (
    <div
      className={styles.circle}
      style={{ width: width || '50px', height: width || '50px' }}
    >
      {content}
    </div>
  );
};

export default Circle;
