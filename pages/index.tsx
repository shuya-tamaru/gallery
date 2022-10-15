import { ChakraProvider, useDisclosure } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import Experience from '../threeScripts/Experience/Experience';
import DetailPage from './components/detailPage';
import PageButtons from './components/pageButtons';
import { CurrentTargetprovider } from './context/CurrentTargetContext';

const Home: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        <CurrentTargetprovider>
          <PageButtons onOpen={onOpen} />
          <DetailPage isOpen={isOpen} onClose={onClose} />
        </CurrentTargetprovider>
      </ChakraProvider>
    </>
  );
};

export default Home;
