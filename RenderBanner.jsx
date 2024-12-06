import React, { useContext } from 'react';
import { AssemblyContext } from './App';

function RenderBanner() {
  let title;
  let message;
  const {won, isOver, currentLanguage} = useContext(AssemblyContext)


  const status = (function () {
    if (won && isOver) {
      title = "You win!"
      message = "Well done! 🎉"
      return 'win'
    } else if (!won && isOver) {
      title = "Game over!"
      message = "You loose! Better start learning Assembly 😭"
      return 'loose';
    } else if (won || isOver) {
      title = "You win!"
      message = "Well done! 🎉"
      return 'win';
    } else if (!currentLanguage.length) { } else {
      title = `"Farwell ${currentLanguage.join(" & ")} 🫡"`
      return 'farwell'
    }
  })()

  return (
    <div className={`status ${status}`}>
      <p className="title">{title}</p>
      <p className="message">{message}</p>
    </div>
  )
}

export default RenderBanner;