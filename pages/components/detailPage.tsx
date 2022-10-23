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
import { AiFillInstagram } from 'react-icons/ai';
import { BsPinterest } from 'react-icons/bs';
import { BsTwitter } from 'react-icons/bs';
import { BsGithub } from 'react-icons/bs';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import styles from '../../styles/Home.module.css';
import { listData, ListType } from '../hooks/list';
import { useCurrentTarget } from '../context/CurrentTargetContext';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};


const DetailPage = ({ isOpen, onClose }: Props) => {

  const [currentData, setCurrentData] = useState<ListType | null>(null);
  const [screenWidth, setScreenWidth] = useState<number>(40);
  const renderFirst = useRef<boolean>(true);
  const target = useCurrentTarget();

  useEffect(() => {
    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth)
    })
  }, [])

  const iconSize =
    screenWidth < 480 ? 30
      : (screenWidth > 480 && screenWidth < 780) ? 30
        : 40;

  useEffect(() => {
    const isInitialData = () => {
      setCurrentData(null)
      onClose()
    }
    renderFirst.current
      ? renderFirst.current = false
      : target === 0 || target === 1
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
          width: '30%',
          height: '60%',
          background: 'rgba(255,255,255,0.5)',
          padding: '3px',
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
          <Text className={styles.title} color="#333" fontSize={{ base: 'xl', md: '2xl', lg: '4xl' }} w='100%' textAlign='center'>
            {currentData?.title}
          </Text>
          <Box w='100%' p='2.5'>
            <Image src={currentData?.src} shadow='xl' />
          </Box>
          {target === 14 &&
            <Text className={styles.desc} textAlign="center" color="#333" fontSize={{ base: 'sm', md: 'xl', lg: '2xl' }} p='2.5'>
              {currentData?.description}
            </Text>
          }
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
            {target === 14 &&
              <>
                <Link href='https://www.instagram.com/shuya_tamaru/' passHref>
                  <a target='_blank'>
                    <AiFillInstagram size={iconSize} className={styles.insta} />
                  </a>
                </Link>
                <Link href="https://twitter.com/tama20013" passHref>
                  <a target='_blank'>
                    <BsTwitter size={iconSize} className={styles.twitter} />
                  </a>
                </Link>
                <Link href='https://www.pinterest.jp/shuyatamaru/' passHref>
                  <a target='_blank'>
                    <BsPinterest size={iconSize} className={styles.pinterest} />
                  </a>
                </Link>
                <Link href='https://github.com/shuya-tamaru' passHref>
                  <a target='_blank'>
                    <BsGithub size={iconSize} className={styles.github} />
                  </a>
                </Link>
              </>
            }
          </Flex>
        </Box>
      </Slide>
    </>
  );
};

export default DetailPage;
