import { useState } from 'react';

export const useOpacity = () => {
  const [opacity, setOpacity] = useState(0.7);

  return {
    opacity,
    setOpacity,
  };
};
