import React, { Fragment } from 'react';
import CSSReset from './static/styles/CSSReset';
import { ThemeProvider } from './src/contexts/ThemeContext';

export const wrapRootElement = ({ element }) => (
  <Fragment>
    <CSSReset />
    <ThemeProvider>{element}</ThemeProvider>
  </Fragment>
);
