import React, { useState } from "react"
import { languages } from "./languages"

function Language({ name, color, backgroundColor }) {
  const styles = { color, backgroundColor }
  return <p className="language" style={styles}>{name}</p>
}
function Letter({ letter }) {
  return <p className="letter">{letter.toUpperCase()}</p>
}
function Key({ letter }) {
  const styles = { backgroundColor: "#FCBA29" }
  return <button onClick={() => console.log("clicked")} style={styles} className="key">{letter.toUpperCase()}</button>
}
export default function AssemblyEndgame() {
  const [currentWord, setCurrentWord] = useState("Bucerotidae");

  const alphabet = "abcdefghijklmnopqrstuvwxyz"
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
        {languages.map(({ name, backgroundColor, color }) => {
          return <Language key={name} name={name} backgroundColor={backgroundColor} color={color} />
          })}
      </div>
      <div className="letters">
        {currentWord.split("").map((letter, idx) => {
          return <Letter key={letter + idx} letter={letter} />
          })}
      </div>
      <div className="keyboard">
        {alphabet.split("").map((letter, idx) => {
          return <Key key={letter + idx} letter={letter} />
          })}
      </div> 
    </main>
  )
}
