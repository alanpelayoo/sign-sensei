import React, { useState, useEffect } from 'react';

const TypingText = ({ text, speed = 300 }) => {
  const [words] = useState(text.split(' '));
  const [displayWords, setDisplayWords] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < words.length) {
      const timer = setTimeout(() => {
        setDisplayWords(prevWords => [...prevWords, words[index]]);
        setIndex(prevIndex => prevIndex + 1);
      }, speed);

      return () => clearTimeout(timer);
    }
  }, [index, words, speed]);

  return <p>{displayWords.join(' ')}</p>;
};

export default TypingText;
