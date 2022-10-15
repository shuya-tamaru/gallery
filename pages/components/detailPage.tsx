import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
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

type Props = {
  isOpen: boolean;
  onClose: () => void;
  target: number;
  setTarget: Dispatch<SetStateAction<number>>
};

const DetailPage = ({ isOpen, onClose, target, setTarget }: Props) => {

  const [currentData, setCurrentData] = useState<ListType | null>(null);
  const renderFirst = useRef<boolean>(true);

  useEffect(() => {
    renderFirst.current
      ? renderFirst.current = false
      : target === 0
        ? setCurrentData(null)
        : setCurrentData(listData[target - 1]);
  }, [target]);

  return (
    <>
      <Slide
        direction='right'
        in={target === 0 ? false : isOpen}
        style={{
          fontFamily: 'Playfair Display',
          zIndex: 10,
          width: '25%',
          background: 'rgba(255,255,255,0.5)',
          padding: '10px',
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
        <Text fontSize='4xl' w='100%' textAlign='center'>
          {currentData?.title}
        </Text>
        <Box w='100%' p='2.5'>
          <Image src='/images/hexDome.png' shadow='xl' />
        </Box>
        <Text fontSize='xl' p='2.5'>
          {currentData?.description}
        </Text>
        <Flex justify='end'>
          <Link href={`${currentData?.youtubeLink}`} passHref>
            <a target='_blank'>
              <BsYoutube className={styles.youtube} size={40} />
            </a>
          </Link>
          <Link href={`${currentData?.blogLink}`} passHref>
            <a target='_blank'>
              <MdOutlineComputer size={40} className={styles.blog} />
            </a>
          </Link>
        </Flex>
      </Slide>
    </>
  );
};

export default DetailPage;
