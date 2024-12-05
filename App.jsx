import React from "react"
import { languages } from "./languages"

function Color({name, color, backgroundColor}) {
  const styles = {color, backgroundColor}
  return <p className="color" style={styles}>{name}</p>
}
export default function AssemblyEndgame() {
    return (
        <main>
            <header>
                <h1>Assembly: Endgame</h1>
                <p>Guess the word within 8 attempts to keep the 
                programming world safe from Assembly!</p>
                <div className="win">
                  <p className="title">You win!</p>
                  <p className="message">Well done! 🎉</p>
                </div>
                <div className="languages">
                  {languages.map(({name, backgroundColor, color}) => {
                    return <Color key={name} name={name} backgroundColor={backgroundColor} color={color}/>
                  })}
                </div>
            </header>
        </main>
    )
}
