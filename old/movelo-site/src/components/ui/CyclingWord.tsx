import React, { useEffect, useState } from 'react';
import styles from '@/styles/CyclingWord.module.scss';

const CyclingWord: React.FC = () => {
  const words = ['walk', 'bike ride', 'train ride', 'bus ride'];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayWord, setDisplayWord] = useState(words[0]);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeOut(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
        setFadeOut(false);
      }, 500);
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    setDisplayWord(words[currentIndex]);
  }, [currentIndex, words]);

  return (
    <span className={styles.cyclingWordContainer}>
      <span className={`${styles.cyclingWord} ${fadeOut ? styles.fadeOut : styles.fadeIn}`}>
        {displayWord}
      </span>
    </span>
  );
};

export default CyclingWord;