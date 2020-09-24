import React from 'react';
import styles from './styles/Circle.module.css';

const Circle = ({ content, width, font }) => {
  return (
    <div
      className={styles.circle}
      style={{
        width: width || '50px',
        height: width || '50px',
        fontSize: font || '1.2rem',
      }}
    >
      {content}
    </div>
  );
};

export default Circle;
