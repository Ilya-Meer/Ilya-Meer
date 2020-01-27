import { Canvas } from 'react-three-fiber';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const StyledCanvas = styled(Canvas)`
  width: 100vw !important;
  height: 100vh !important;
  max-height: 100vh;
  position: absolute !important;
  top: 0;
  z-index: 1;
  opacity: 0;
  animation: ${fadeIn} 1s ease 0.25s 1 normal forwards;
`;
