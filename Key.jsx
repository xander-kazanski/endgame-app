import clsx from 'clsx';
import React, { useContext } from 'react';
import { AssemblyContext } from './App';

function Key({ letter }) {
  const {currentWord, guessedLetters, won, isOver, addGuessedLetter} = useContext(AssemblyContext)
  const selectionClass = getKeyClass(letter);
  const disabled = won || isOver;

  function getKeyClass(letter) {
    if (currentWord.includes(letter) && guessedLetters.includes(letter)) {
      return clsx({ right: true })
    }
    if (guessedLetters.includes(letter)) {
      return clsx({ wrong: true })
    }
    return clsx({ base: true })
  }

  return (
    <button
      onClick={() => addGuessedLetter(letter)}
      className={`key ${selectionClass}`}
      disabled={disabled}
    >
      {letter.toUpperCase()}
    </button>
  )
}

export default Key;