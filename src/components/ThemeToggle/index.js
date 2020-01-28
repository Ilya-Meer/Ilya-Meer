import React from 'react';
import Water from '../Icon/Water';
import Fire from '../Icon/Fire';

const ThemeToggle = ({ darkEnabled, setDarkEnabled, colours }) => {
  if (darkEnabled) {
    return (
      <Fire
        style={{ position: 'relative', top: '2px' }}
        colour={colours.textContent}
        onClick={() => {
          setDarkEnabled(!darkEnabled);
        }}
      />
    );
  }
  return (
    <Water
      style={{ position: 'relative', top: '2px' }}
      colour={colours.textContent}
      onClick={() => {
        setDarkEnabled(!darkEnabled);
      }}
    />
  );
};

export default ThemeToggle;
