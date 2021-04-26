import React from 'react';
import Water from '../Icon/Water';
import Fire from '../Icon/Fire';

import { ToggleButton } from './style';

const ThemeToggle = ({ darkEnabled, setDarkEnabled, colour, style }) => {
  if (darkEnabled) {
    return (
      <ToggleButton
        aria-label="Toggle dark theme off"
        onClick={() => setDarkEnabled(!darkEnabled)}
      >
        <Fire
          style={{
            position: 'relative',
            top: '2px',
            cursor: 'pointer',
            ...style,
          }}
          colour={colour}
        />
      </ToggleButton>
    );
  }
  return (
    <ToggleButton
      aria-label="Toggle dark theme on"
      onClick={() => setDarkEnabled(!darkEnabled)}
    >
      <Water
        style={{ position: 'relative', top: '2px', cursor: 'pointer', ...style }}
        colour={colour}
        onClick={() => {
          setDarkEnabled(!darkEnabled);
        }}
      />
    </ToggleButton>
  );
};

export default ThemeToggle;
