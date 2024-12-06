import React, { createContext, useCallback, useEffect, useState } from "react"
import { languages } from "./languages"
import clsx from "clsx"
import Language from "./Language"
import Letter from "./Letter"
import RenderBanner from "./RenderBanner"
import Key from "./Key"

export const AssemblyContext = createContext({})

export default function AssemblyEndgame() {
  const [currentWord, setCurrentWord] = useState("react");
  const [guessedLetters, setGuessedLetters] = useState([]);

  const wrongGuesses = useCallback(() => {
    return guessedLetters.filter(letter => {
      return !currentWord.includes(letter);
    })
  }, [guessedLetters]);

  const rightGuesses = useCallback(() => {
    return guessedLetters.filter(letter => {
      return currentWord.includes(letter);
    })
  }, [guessedLetters]);

  const wrongCount = wrongGuesses().length

  const isOver = wrongCount >= languages.length

  const won = rightGuesses().length === currentWord.length && wrongCount <= languages.length;

  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  function addGuessedLetter(letter) {
    if (!guessedLetters.includes(letter)) {
      setGuessedLetters(prevLetters => [...prevLetters, letter])
    }
  }

  function handleGameOverClick() {
    setGuessedLetters([])
  }

  const currentLanguage = guessedLetters.length ? languages.slice(0, wrongCount).map(language => language.name) : []
  const lost = !won && isOver;

  return (
    <AssemblyContext.Provider value={{
      won,
      isOver,
      currentLanguage,
      wrongCount,
      guessedLetters,
      currentWord,
      addGuessedLetter
    }}>

      <main>
        <header>
          <h1>Assembly: Endgame</h1>
          <p>Guess the word within 8 attempts to keep the
            programming world safe from Assembly!</p>
        </header>
        <RenderBanner />
        <div className="languages">
          {languages.map((language, idx) => {
            return (
              <Language
                key={language.name + idx}
                idx={idx}
                {...language}
              />
            )
          })}
        </div>
        <div className="letters">
          {currentWord.split("").map((letter, idx) => {
            return <Letter
              key={letter + idx}
              letter={letter}
            />

          })}
        </div>
        <div className="keyboard">
          {alphabet.split("").map((letter, idx) => {
            return <Key
              key={letter + idx}
              letter={letter}
            />

          })}
        </div>
        {(isOver === true) || (won === true) ? <button
          onClick={handleGameOverClick}
          type="button"
          className="new-game">
          New Game

        </button>
          : ''}
      </main>
    </AssemblyContext.Provider>
  )
}
