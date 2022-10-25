import { ChakraProvider, useDisclosure } from '@chakra-ui/react';

import type { NextPage } from 'next';
import { useEffect, useState } from 'react';

import styles from '../styles/Home.module.css';
import Experience from '../threeScripts/Experience/Experience';
import DetailPage from './components/detailPage';
import PageButtons from './components/pageButtons';
import { CurrentTargetprovider } from './context/CurrentTargetContext';
import DisplayAlertPage from './components/displayAlertPage';

const Home: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentScreenRatio, setCurrentScreenRatio] = useState<any>(1.1);
  const [webgl, setWebgl] = useState<any>(null);
  const [displayStatus, setDisplayStatus] = useState<"block" | "none">("block");

  useEffect(() => {
    const screenRatio = window.innerWidth / window.innerHeight;
    setCurrentScreenRatio(screenRatio)

    window.addEventListener('resize', () => {
      const screenRatio = window.innerWidth / window.innerHeight;
      setCurrentScreenRatio(screenRatio);
    })
  }, []);

  useEffect(() => {
    if (currentScreenRatio > 1 && !webgl) {
      const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
      const experience = new Experience(canvas);
      setWebgl(experience);
      setDisplayStatus("block")
    } else if (currentScreenRatio > 1) {
      setDisplayStatus("block")
    } else {
      setDisplayStatus("none")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentScreenRatio])
  return (
    <>
      <ChakraProvider>
        <div style={{ display: displayStatus }}>
          <canvas id='canvas' className={styles.canvas} style={{ position: 'relative', display: displayStatus }}></canvas>
          <div id='loadingText' className={styles.container} >
            <span id='#spanText' className={styles.text}>
              Loading...
            </span>
            <div id='loadingBar' className={styles.loadingBar}></div>
          </div>
          <CurrentTargetprovider>
            <PageButtons onOpen={onOpen} isOpen={isOpen} />
            <DetailPage isOpen={isOpen} onClose={onClose} />
          </CurrentTargetprovider>
        </div>
        {displayStatus === "none" && <DisplayAlertPage />}
      </ChakraProvider>
    </>
  );
};

export default Home;
