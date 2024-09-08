import {useEffect, useState} from 'react';

export default function useDebounce<T>(item: T, delay: number): T {
  const [state, setState] = useState<T>(item);

  useEffect(() => {
    let timer = setTimeout(() => {
      setState(item);
    }, delay);

    return () => clearTimeout(timer);
  }, [item, delay]);

  return state;
}
