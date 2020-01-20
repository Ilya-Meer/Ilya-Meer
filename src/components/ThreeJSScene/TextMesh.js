import React, { useRef, useMemo, useState } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from 'react-three-fiber';
import { useDrag } from 'react-use-gesture';
import { a } from 'react-spring/three';

const TextMesh = ({ colour, JSONfont, displayText, size }) => {
  const [rot, setRot] = useState([3, 3, 3]);

  const { size: vsize, viewport } = useThree();
  const aspect = vsize.width / viewport.width;

  const bindDrag = useDrag(
    ({ offset: [x, y], xy }) => {
      setRot([y / aspect, x / aspect, 0]);
    },
    {
      pointerEvents: true,
      dragDelay: true,
    }
  );

  const font = useMemo(() => new THREE.FontLoader().parse(JSONfont), [
    JSONfont,
  ]);

  const textOptions = {
    font,
    size,
    height: 20,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 9,
    bevelSize: 2,
    bevelSegments: 5,
  };

  const ref = useRef();
  useFrame(() => {
    if (ref.current) {
      ref.current.geometry.center();
      ref.current.rotation.x += 0.002;
      ref.current.rotation.y += 0.003;
      ref.current.rotation.z -= 0.001;
    }
  });

  return (
    <a.mesh ref={ref} {...bindDrag()} rotation={rot} position={[0, 0, -300]}>
      <textGeometry attach="geometry" args={[displayText, textOptions]} />
      <meshPhongMaterial attach="material" color={colour} shininess={500} />
    </a.mesh>
  );
};

export default TextMesh;
