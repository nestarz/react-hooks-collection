import { useState } from 'react';

export const usePrinting = () => {
  const [printing, setPrinting] = useState(false);
  window.addEventListener('beforeprint', () => setPrinting(true));
  window.addEventListener('afterprint', () => setPrinting(false));
  return printing
}
