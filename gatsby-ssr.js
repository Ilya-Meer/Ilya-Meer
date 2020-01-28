import React, { Fragment } from 'react';
import CSSReset from './static/styles/CSSReset';
import { ThemeProvider } from './src/contexts/ThemeContext';

export const wrapRootElement = ({ element }) => (
  <ThemeProvider>
    <Fragment>
      <CSSReset />
      {element}
    </Fragment>
  </ThemeProvider>
);
