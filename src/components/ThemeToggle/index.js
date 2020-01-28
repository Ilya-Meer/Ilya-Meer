import React from 'react';
import Water from '../Icon/Water';
import Fire from '../Icon/Fire';

const ThemeToggle = ({ darkEnabled, setDarkEnabled, colour, style }) => {
  if (darkEnabled) {
    return (
      <Fire
        style={{ position: 'relative', top: '2px', ...style }}
        colour={colour}
        onClick={() => {
          setDarkEnabled(!darkEnabled);
        }}
      />
    );
  }
  return (
    <Water
      style={{ position: 'relative', top: '2px', ...style }}
      colour={colour}
      onClick={() => {
        setDarkEnabled(!darkEnabled);
      }}
    />
  );
};

export default ThemeToggle;
