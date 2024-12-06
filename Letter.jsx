import React, { useContext } from 'react';
import { AssemblyContext } from './App';
import clsx from 'clsx';

function Letter({ letter }) {
  const { won, isOver, guessedLetters } = useContext(AssemblyContext);
  const lost = !won && isOver;
  const show = guessedLetters.includes(letter);
  const letterClass = clsx({ 'red-letter': lost && !show });
  return (
    <p className={`letter ${letterClass}`}>
      {show === true || lost ? letter.toUpperCase() : ''}
    </p>
  )
}

export default Letter;