import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const StyledCanvas = styled.canvas`
  width: 100vw !important;
  height: 20vh !important;
  max-height: 20vh;
  position: absolute !important;
  bottom: 0;
  z-index: 1;
  opacity: 0;
  animation: ${fadeIn} 1s ease 0.25s 1 normal forwards;
`;
