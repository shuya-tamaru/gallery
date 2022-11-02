import { useEffect, useState } from 'react';

export const getWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
    ratio: 1.1,
  });

  useEffect(() => {
    const agent = navigator.userAgent;

    if (typeof window !== 'undefined') {
      if (
        !(
          agent.indexOf('iPhone') > 0 ||
          agent.indexOf('iPad') > 0 ||
          agent.indexOf('Android') > 0 ||
          agent.indexOf('Mobile') > 0
        )
      ) {
        const handleResize = () => {
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
            ratio: window.innerWidth / window.innerHeight,
          });

          document.body.style.width = `${window.innerWidth}px`;
          document.body.style.height = `${window.innerHeight}px`;
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
      } else {
        const handleOrientation = () => {
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
            ratio: window.innerWidth / window.innerHeight,
          });
          document.body.style.width = `${window.innerWidth}px`;
          document.body.style.height = `${window.innerHeight}px`;
        };
        window.addEventListener('orientationchange', () => {
          setTimeout(handleOrientation, 100);
        });
        handleOrientation();
        return () => screen.orientation.removeEventListener('change', handleOrientation);
      }
    } else {
      return;
    }
  }, []);
  return windowSize;
};
