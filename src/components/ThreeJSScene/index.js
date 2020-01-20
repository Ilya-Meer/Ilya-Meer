import React from 'react';
import { Canvas } from 'react-three-fiber';
import TextMesh from './TextMesh';
import styles from './styles.module.css';

const Scene = ({ colour, size, displayText, font, style }) => {
  return (
    <Canvas
      className={styles.canvas}
      camera={{ position: [0, 0, 50] }}
      style={{ width: '100vw', height: '100vh', ...style }}
    >
      <ambientLight color={0xffffff} intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.75} />
      <TextMesh
        colour={colour}
        size={size}
        displayText={displayText}
        JSONfont={font}
      />
    </Canvas>
  );
};

export default Scene;
