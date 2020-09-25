import React from 'react';
import styles from './styles/Paginator.module.css';
import Circle from './Circle';

const Paginator = ({ current, action, pages }) => {
  return (
    <nav className={styles.paginator}>
      {Array(pages || 1)
        .fill()
        .map((page, index) => {
          ++index;
          return (
            <button
              key={index}
              onClick={({ target }) => {
                target.scrollIntoView(); // chrome dá um pequeno scrollUp a cada click :(
                action(index);
              }}
            >
              {/* // exibe o cículo na página atual */}
              {index === current ? (
                <Circle content={index} width="45px" />
              ) : (
                index
              )}
            </button>
          );
        })}
    </nav>
  );
};

export default Paginator;
