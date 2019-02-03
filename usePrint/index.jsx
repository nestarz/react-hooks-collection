import { useState, useEffect } from 'react';

export const usePrint = (ms) => {
  const [preparePrint, setPreparePrint] = useState(false);
  const [triggerPrint, setTriggerPrint] = useState(false);
  const togglePrint = () => setPreparePrint(value => !value);

  useEffect(() => {
    if (preparePrint) setTimeout(() => setTriggerPrint(true), ms)
  }, [preparePrint])

  useEffect(() => {
    if (triggerPrint) {
      window.print()
      setPreparePrint(false)
      setTriggerPrint(false)
    }
  }, [triggerPrint])

  return [preparePrint, togglePrint]
}
