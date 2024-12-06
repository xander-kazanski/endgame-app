import clsx from 'clsx';
import React, { useContext } from 'react';
import { AssemblyContext } from './App';

function Language({ name, color, backgroundColor, idx }) {
  const { wrongCount } = useContext(AssemblyContext);
  const styles = { color, backgroundColor }
  const isLost = wrongCount > 0 && idx < wrongCount;


  return (
    <p
      className={`language ${clsx({ lost: isLost === true })}`}
      style={styles}
    >
      {name}
    </p>
  )
}

export default Language;