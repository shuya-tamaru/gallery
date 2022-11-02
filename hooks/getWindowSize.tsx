import { useEffect, useRef, useState } from 'react';

export const getWindowSize = () => {
  const initialRender = useRef<boolean>(true);
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
    ratio: 1.1,
  });

  useEffect(() => {
    if (initialRender.current) {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const ratio = width / height;
      setWindowSize({
        width,
        height,
        ratio,
      });
      initialRender.current = false;
      return;
    }

    const handleSize = (width: number, height: number) => {
      setWindowSize({
        width,
        height,
        ratio: width / height,
      });
      document.body.style.width = `${width}px`;
      document.body.style.height = `${height}px`;
    };

    if (typeof window !== 'undefined') {
      const agent = navigator.userAgent;
      if (
        !(agent.indexOf('iPhone') > 0 || agent.indexOf('iPad') > 0 || agent.indexOf('Android') > 0 || agent.indexOf('Mobile') > 0)
      ) {
        window.addEventListener('resize', () => {
          const width = window.innerWidth;
          const height = window.innerHeight;
          handleSize(width, height);
        });
      } else {
        screen.orientation.addEventListener;
        window.addEventListener('orientationchange', () => {
          setTimeout(() => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            handleSize(width, height);
          }, 100);
        });
      }
    } else {
      return;
    }
  }, [initialRender.current]);
  return windowSize;
};
