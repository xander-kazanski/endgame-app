import clsx from 'clsx';
import React from 'react';

function Language({ name, color, backgroundColor, wrongCount, idx }) {
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