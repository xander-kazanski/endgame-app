import React, { useState } from "react"
import { languages } from "./languages"
import clsx from "clsx"

function Language({ name, color, backgroundColor, wrongCount, idx }) {
  const styles = { color, backgroundColor }
  const isLost = wrongCount > 0 && idx < wrongCount;
  console.log(wrongCount, idx, isLost)
  return (
    <p className={`language ${isLost === true && 'lost'}`}  style={styles}>{name}</p>
  )
}
function Letter({ letter, show }) {
  return <p className="letter">{show === true && letter.toUpperCase()}</p>
}
function Key({ letter, onClick, keyClass }) {
  const selectionClass = keyClass(letter);

  return (
    <button
      onClick={() => onClick(letter)}
      className={`key ${selectionClass}`}>
      {letter.toUpperCase()}
    </button>
  )
}
export default function AssemblyEndgame() {
  const [currentWord, setCurrentWord] = useState("react");
  const [guessedLetters, setGuessedLetters] = useState([]);

  const wrongCount = guessedLetters.filter(letter => {
    return !currentWord.includes(letter);
  }).length
  console.log(wrongCount)
  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  function addGuessedLetter(letter) {
    if (!guessedLetters.includes(letter)) {
      setGuessedLetters(prevLetters => [...prevLetters, letter])
    }
  }

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
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word within 8 attempts to keep the
          programming world safe from Assembly!</p>
      </header>
      <div className="win">
        <p className="title">You win!</p>
        <p className="message">Well done! 🎉</p>
      </div>
      <div className="languages">
        {languages.map(({ name, backgroundColor, color }, idx) => {
          
          return <Language key={name} name={name} wrongCount={wrongCount} idx={idx} backgroundColor={backgroundColor} color={color} />
        })}
      </div>
      <div className="letters">
        {currentWord.split("").map((letter, idx) => {
          return <Letter key={letter + idx} idx={idx} letter={letter} show={guessedLetters.includes(letter)} />
        })}
      </div>
      <div className="keyboard">
        {alphabet.split("").map((letter, idx) => {
          return <Key key={letter + idx} letter={letter} onClick={addGuessedLetter} keyClass={getKeyClass} />
        })}
      </div>
      <button type="button" className="new-game">New Game</button>
    </main>
  )
}
