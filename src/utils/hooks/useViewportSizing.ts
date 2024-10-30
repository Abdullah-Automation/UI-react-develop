import { useCallback, useEffect, useState } from 'react';
import { throttle } from 'lodash';

export const useViewportSizing = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  // eslint-disable-next-line
  const handleResize = useCallback(
    throttle(
      () =>
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        }),
      200
    ),
    []
  );

  useEffect(() => {
    if (process.browser) {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }

    return undefined;
  }, [handleResize]);

  const isMobile = windowSize.width < 500;

  return {
    windowSize,
    isMobile,
  };
};
