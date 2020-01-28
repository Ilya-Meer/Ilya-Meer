import React, { useState } from 'react';
import themes from '../../static/styles/Theme';

const ThemeContext = React.createContext();

const ThemeProvider = ({ children }) => {
  const { lightTheme, darkTheme, fonts } = themes;

  const [darkEnabled, setDarkEnabled] = useState(false);

  return (
    <ThemeContext.Provider
      value={{
        theme: darkEnabled ? darkTheme : lightTheme,
        fonts,
        darkEnabled,
        setDarkEnabled,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
