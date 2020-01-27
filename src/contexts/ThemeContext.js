import React from 'react';
import theme from '../../static/styles/Theme';

const ThemeContext = React.createContext();

const ThemeProvider = ({ children }) => {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
