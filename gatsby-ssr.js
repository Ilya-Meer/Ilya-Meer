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

const HeadComponents = [
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Condensed:ital,wght@0,400;0,600;1,600&family=IBM+Plex+Sans:ital,wght@0,300;0,400;1,400&display=swap"
  />,
];

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents(HeadComponents);
};
