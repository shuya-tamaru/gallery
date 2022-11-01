import { AspectRatio, Box, Flex } from '@chakra-ui/react';
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';

import { useCurrentTarget, useCurrentTargetUpdate } from '../context/CurrentTargetContext';

const styles = {
  borderRadius: '50%',
  bg: 'rgba(255,255,255,0.5)',
  ml: '3px',
  p: '0',
  fontSize: '20px',
  color: 'black',
  transition: '0.25s',
  fontFamily: 'Playfair Display',
  textAline: 'center',
  cursor: 'pointer',
};

type Props = {
  onOpen: () => void;
  isOpen: boolean;
};

const PageButtons = ({ onOpen, isOpen }: Props) => {
  const buttonNum = [...Array(16)].map((_, i) => i);
  const target = useCurrentTarget();
  const setTarget = useCurrentTargetUpdate();

  const getButtonNum = (e: any) => {
    e.preventDefault();
    const id: number = Number(e.currentTarget.id.substr(10));
    switch (id) {
      case 0: {
        const newTarget = target === 0 ? 14 : target - 1;
        setTarget(newTarget);
        break;
      }
      case 15: {
        const newTarget = target === 14 ? 0 : target + 1;
        setTarget(newTarget);
        break;
      }
      default: {
        setTarget(id);
        break;
      }
    }
  };

  return (
    <>
      <Flex
        id='buttonContainer'
        w='100%'
        margin='0 auto'
        position='absolute'
        bottom='2%'
        justify='center'
        display='none'
      >
        {buttonNum.map((num) => {
          const children =
            num === 0 ? (
              <IoMdArrowDropleft size={20} />
            ) : num === 15 ? (
              <IoMdArrowDropright size={20} />
            ) : (
              num
            );
          const button = (
            <AspectRatio key={num} w={{ base: '30px', md: '30px', lg: '40px' }} ratio={1} ml='6px'>
              <Box
                fontSize={{ base: '4px', md: '6px', lg: '10px' }}
                className='button'
                onClick={
                  num === 1
                    ? (e) => {
                        getButtonNum(e);
                      }
                    : (e) => {
                        onOpen();
                        getButtonNum(e);
                      }
                }
                id={`pageButton${num}`}
                sx={styles}
                _hover={{ bg: 'rgba(255,255,255,1.0)', transform: 'scale(1.2)' }}
              >
                {children}
              </Box>
            </AspectRatio>
          );
          return button;
        })}
      </Flex>
    </>
  );
};

export default PageButtons;
