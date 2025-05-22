import React, { createContext, useCallback, useEffect, useState, useMemo } from "react"
import { languages } from "./languages"
import Language from "./Language"
import Letter from "./Letter"
import RenderBanner from "./RenderBanner"
import Key from "./Key"
import { words } from "./words"

export const AssemblyContext = createContext({})

export default function AssemblyEndgame() {
  const [currentWord, setCurrentWord] = useState(words.random);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const alphabet = "abcdefghijklmnopqrstuvwxyz"
  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
  const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)

  const wrongGuesses = useMemo(() => {
    return guessedLetters.filter(letter => !currentWord.includes(letter));
  }, [guessedLetters, currentWord]);

  const uniqueLettersInWord = useMemo(() => {
    return new Set(currentWord.split('')).size;
  }, [currentWord]);

  const correctGuesses = useMemo(() => {
    return new Set(guessedLetters.filter(letter => currentWord.includes(letter))).size;
  }, [guessedLetters, currentWord]);

  const wrongCount = wrongGuesses.length;
  const isOver = wrongCount >= languages.length;
  const won = correctGuesses === uniqueLettersInWord;

  function addGuessedLetter(letter) {
    if (!guessedLetters.includes(letter)) {
      setGuessedLetters(prevLetters => [...prevLetters, letter])
    }
  }

  function handleGameOverClick() {
    setGuessedLetters([])
    setCurrentWord(words.random);
  }

  return (
    <AssemblyContext.Provider value={{
      won,
      isOver,
      wrongCount,
      guessedLetters,
      currentWord,
      addGuessedLetter,
      languages
    }}>
      <main>
        <header>
          <h1>Assembly: Endgame</h1>
          <p>Guess the word within 8 attempts to keep the
            programming world safe from Assembly!</p>
        </header>
        <RenderBanner />
        <div className="languages">
          {languages.map((language, idx) => (
            <Language
              key={language.name}
              idx={idx}
              {...language}
            />
          ))}
        </div>
        <div className="letters">
          {currentWord.split("").map((letter, idx) => (
            <Letter
              key={`${letter}-${idx}`}
              letter={letter}
            />
          ))}
        </div>
        <section className="sr-only" aria-live="polite" role="status">
          {lastGuessedLetter && (
            <p>
              {currentWord.includes(lastGuessedLetter) 
                ? `Correct! The letter ${lastGuessedLetter.toUpperCase()} is in the word` 
                : `Sorry, the letter ${lastGuessedLetter.toUpperCase()} is not in the word`}
            </p>
          )}
          <p>Current Word: {
            currentWord.split("").map(
              letter => guessedLetters.includes(letter) ? letter.toUpperCase() : 'blank'
            ).join(" ")
          }</p>
        </section>
        <div className="keyboard">
          {alphabet.split("").map(letter => (
            <Key
              key={letter}
              letter={letter}
            />
          ))}
        </div>
        {(isOver || won) && (
          <button
            onClick={handleGameOverClick}
            type="button"
            className="new-game"
          >
            New Game
          </button>
        )}
      </main>
    </AssemblyContext.Provider>
  )
}
