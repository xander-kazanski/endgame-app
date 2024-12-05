import React, { useEffect, useState } from "react"
import { languages } from "./languages"
import clsx from "clsx"

function Language({ name, color, backgroundColor, wrongCount, idx }) {
  const styles = { color, backgroundColor }
  const isLost = wrongCount > 0 && idx < wrongCount;
  
  return (
    <p className={`language ${clsx({lost: isLost === true})}`}  style={styles}>{name}</p>
  )
}
function Letter({ letter, show }) {
  return <p className="letter">{show === true && letter.toUpperCase()}</p>
}
function Key({ letter, onClick, keyClass, disabled }) {
  const selectionClass = keyClass(letter);

  return (
    <button
      onClick={() => onClick(letter)}
      className={`key ${selectionClass}`}
      disabled={disabled}
    >
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

  const isOver = wrongCount >= languages.length
  
  const won = guessedLetters.filter(letter => {
    return currentWord.includes(letter)
  }).length === currentWord.length && wrongCount <= languages.length;

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

  function handleGameOverClick() {
    setGuessedLetters([])
  }

  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word within 8 attempts to keep the
          programming world safe from Assembly!</p>
      </header>
      {(isOver === true) || (won === true) ? <div className={`status ${clsx({win: won === true, loose: won === false})}`}>
        <p className="title">{won ? 'You win!' : 'Game over!' }</p>
        <p className="message">{won ? 'Well done! 🎉' : 'You lose! Better start learning Assembly 😭'}</p>
      </div> : ''}
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
          return <Key disabled={won || isOver} key={letter + idx} letter={letter} onClick={addGuessedLetter} keyClass={getKeyClass} />
        })}
      </div>
      {(isOver === true) || (won === true) ? <button onClick={handleGameOverClick} type="button" className="new-game">New Game</button> : ''}
    </main>
  )
}
