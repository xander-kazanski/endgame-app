import React, { useContext } from 'react';
import { AssemblyContext } from './App';

function RenderBanner() {
  let title;
  let message;
  const {won, isOver, languages, guessedLetters, wrongCount} = useContext(AssemblyContext)
  const currentLanguage = guessedLetters.length ? languages.slice(0, wrongCount).map(language => language.name) : []

  const status = (function () {
    if (won) {
      title = "You win!"
      message = "Well done! 🎉"
      return 'win'
    } else if (!won && isOver) {
      title = "Game over!"
      message = "You lose! Better start learning Assembly 😭"
      return 'loose';
    } else if (!currentLanguage.length) {
      return 'base';
    } else {
      title = `Farewell ${currentLanguage.join(" & ")} 🫡`
      return 'farwell'
    }
  })()

  return (
    <div className={`status ${status}`} role="status">
      <p className="title">{title}</p>
      <p className="message">{message}</p>
    </div>
  )
}

export default RenderBanner;