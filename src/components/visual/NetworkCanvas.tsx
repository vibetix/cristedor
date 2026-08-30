import React from 'react';
import { useCanvasEngine } from '../../hooks/useCanvasEngine';

export const NetworkCanvas: React.FC = () => {
  const canvasRef = useCanvasEngine();

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.75
      }}
    />
  );
};
