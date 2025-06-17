import styled from 'styled-components';

export const StyledCanvas = styled.canvas`
  width: 100vw !important;
  height: 20vh !important;
  display: none;
  max-height: 20vh;
  position: absolute !important;
  bottom: 0;
  z-index: 1;
  @media all and (min-height: 568px) {
    display: block;
  }
`;
