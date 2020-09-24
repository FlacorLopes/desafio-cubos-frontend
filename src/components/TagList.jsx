import React from 'react';
import styles from './styles/TagList.module.css';

const TagList = ({ tags }) => {
  return (
    <ul className={styles.tags}>
      {tags.map((tag) => (
        <li key={Math.random()}>{tag.name}</li>
      ))}
    </ul>
  );
};

export default TagList;
