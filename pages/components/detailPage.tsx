import React, { useEffect, useRef, useState } from 'react';
import {
  Text,
  Slide,
  Box,
  Button,
  Flex,
  Image,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

import { BsYoutube } from 'react-icons/bs';
import { MdOutlineComputer } from 'react-icons/md';

import styles from '../../styles/Home.module.css';
import Link from 'next/link';
import { listData, ListType } from '../hooks/list';
import { useCurrentTarget } from '../context/CurrentTargetContext';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};


const DetailPage = ({ isOpen, onClose }: Props) => {

  const [currentData, setCurrentData] = useState<ListType | null>(null);
  const [screenWidth, setScreenWidth] = useState<number>(30);
  const renderFirst = useRef<boolean>(true);
  const target = useCurrentTarget();

  useEffect(() => {
    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth)
    })
  }, [])

  const iconSize =
    screenWidth < 480 ? 20
      : (screenWidth > 480 && screenWidth < 780) ? 30
        : 40;

  useEffect(() => {
    const isInitialData = () => {
      setCurrentData(null)
      onClose()
    }
    renderFirst.current
      ? renderFirst.current = false
      : target === 0
        ? isInitialData()
        : setCurrentData(listData[target - 1]);
  }, [target]);

  return (
    <>
      <Slide
        direction='right'
        in={isOpen}
        style={{
          fontFamily: 'Playfair Display',
          zIndex: 10,
          width: '25%',
          background: 'rgba(255,255,255,0.5)',
          padding: '2px',
        }}
      >
        <Flex justify='end'>
          <Button
            onClick={onClose}
            borderRadius='50%'
            bg='none'
            _hover={{ bg: 'rgba(255,255,255,0.5)' }}
          >
            <CloseIcon fontWeight='800' boxSize={3} />
          </Button>
        </Flex>
        <Box >
          <Text fontSize={{ base: 'xl', md: '2xl', lg: '4xl' }} w='100%' textAlign='center'>
            {currentData?.title}
          </Text>
          <Box w='100%' p='2.5'>
            <Image src={currentData?.src} shadow='xl' />
          </Box>
          <Text fontSize={{ base: 'xs', md: 'lg', lg: 'xl' }} p='2.5'>
            {currentData?.description}
          </Text>
          <Flex justify='end'>
            <Link href={`${currentData?.youtubeLink}`} passHref>
              <a target='_blank'>
                <BsYoutube className={styles.youtube} size={iconSize} />
              </a>
            </Link>
            <Link href={`${currentData?.blogLink}`} passHref>
              <a target='_blank'>
                <MdOutlineComputer size={iconSize} className={styles.blog} />
              </a>
            </Link>
          </Flex>
        </Box>


      </Slide>
    </>
  );
};

export default DetailPage;
