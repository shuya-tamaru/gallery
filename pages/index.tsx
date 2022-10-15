import { ChakraProvider, useDisclosure } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import Experience from '../threeScripts/Experience/Experience';
import DetailPage from './components/detailPage';
import PageButtons from './components/pageButtons';

const Home: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [target, setTarget] = useState<number>(0);

  useEffect(() => {
    const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
    const experience = new Experience(canvas);
  }, []);
  return (
    <>
      <ChakraProvider>
        <canvas id='canvas' className={styles.canvas} style={{ position: 'relative' }}></canvas>
        <div id='loadingText' className={styles.container}>
          <span id='#spanText' className={styles.text}>
            Loading...
          </span>
        </div>
        <div id='loadingBar' className={styles.loadingBar}></div>
        <PageButtons onOpen={onOpen} target={target} setTarget={setTarget} />
        <DetailPage isOpen={isOpen} onClose={onClose} target={target} setTarget={setTarget} />
      </ChakraProvider>
    </>
  );
};

export default Home;
