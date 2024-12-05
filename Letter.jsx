import React from 'react';

function Letter({ letter, show, lost, guessedLetters }) {
  return (
    <p
      className={`letter ${lost && !guessedLetters.includes(letter) ? "red-letter" : ''}`}
    >
      {show === true || lost ? letter.toUpperCase() : ''}
    </p>
  )
}

export default Letter;