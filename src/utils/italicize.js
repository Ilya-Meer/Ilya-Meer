import React, { Fragment } from 'react';

const italicize = (str) => {
  if (!str.includes('_')) {
    return str;
  }

  const segments = str.split('_');

  const [ remainder, toBeItalicized, ...rest ] = segments;

  return (
    <Fragment>
      {remainder}
      <span style={{ fontStyle: 'italic' }}>{toBeItalicized}</span>  
      {rest}
    </Fragment>
  );
}

export default italicize;