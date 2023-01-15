import React, { useEffect, useRef } from 'react';
import { StyledCanvas } from './style';
import { createNoise2D } from 'simplex-noise';

let yOff = 0.0;
let xIncrement = 0.03;
let yIncrement = 0.01;

const draw = ({ canvas, ctx, noise, strokeColour }) => {
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = strokeColour;
  ctx.beginPath();
  let xOff = 0;
  for (let x = 0; x <= canvas.width; x += 10) {
    let y = (noise(xOff, yOff) * canvas.height) / 4 + 250;
    if (x === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
    xOff += xIncrement;
  }
  yOff += yIncrement;
  ctx.stroke();
};

const resizeCanvas = (canvas, config) => {
  canvas.width = window.innerWidth;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = config.bgColour;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const Canvas = ({ config }) => {
  const canvasRef = useRef(null);

  // Heavily inspired by
  // https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
  useEffect(() => {
    let animationFrameId;
    let resizeCallback;

    const init = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      canvas.width = config.width;
      canvas.height = config.height;
      resizeCanvas(canvas, config);

      resizeCallback = () => resizeCanvas(canvas, config);
      window.addEventListener('resize', resizeCallback);

      const drawParams = {
        canvas,
        ctx,
        noise: createNoise2D(),
        strokeColour: config.strokeColour,
      };

      const render = () => {
        draw(drawParams);
        animationFrameId = requestAnimationFrame(render);
      };

      render();
    };

    const cleanUp = () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCallback);
    };

    init();

    return cleanUp;
  }, [config]);

  return <StyledCanvas ref={canvasRef} />;
};

export default Canvas;
