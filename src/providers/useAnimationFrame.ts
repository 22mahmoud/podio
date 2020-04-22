import { useRef, useEffect, useLayoutEffect } from 'react';

export const useAnimationFrame = (
  callback: (deltaTime: number) => void,
  deps: any[],
) => {
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  const animate = (time: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;
      callback(deltaTime);
    }

    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useLayoutEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef?.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [deps]);
};
