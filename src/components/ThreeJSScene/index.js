import React from 'react';
import { StyledCanvas } from './style';
import TextMesh from './TextMesh';

const Scene = ({ colour, size, displayText, font }) => {
  return (
    <StyledCanvas camera={{ position: [0, 0, 50] }}>
      <ambientLight color={0xffffff} intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.75} />
      <TextMesh
        colour={colour}
        size={size}
        displayText={displayText}
        JSONfont={font}
      />
    </StyledCanvas>
  );
};

export default Scene;
