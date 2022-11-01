import { useEffect, useState } from "react";

export const getWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    _width: 0,
    _height: 0,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowSize({
          _width: window.innerWidth,
          _height: window.innerHeight,
        });
        
        document.body.style.width = `${window.innerWidth}px`;
        document.body.style.height = `${ window.innerHeight }px`;
      };
      const handleResize2 = () => {
        setWindowSize({
          _width: window.innerWidth,
          _height: window.innerHeight,
        });

        document.body.style.width = `${window.innerHeight}px`;
        document.body.style.height = `${ window.innerWidth }px`;
      };

      window.addEventListener("resize", handleResize);
      window.addEventListener('orientationchange', handleResize2);

      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    } else {
      return;
    }
  }, []);
  return windowSize;
};