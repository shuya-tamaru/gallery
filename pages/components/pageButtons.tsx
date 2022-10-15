import { Button, Flex } from '@chakra-ui/react';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';


import React, { Dispatch, SetStateAction, useState } from 'react';

const styles = {
  borderRadius: '50%',
  opacity: '0.7',
  ml: '6px',
  w: '40px',
  h: '40px',
  p: '0',
  fontSize: '20px',
  color: '#666',
  transition: '0.25s',
  fontFamily: 'Playfair Display',
  textAline: "center",
};

type Props = {
  onOpen: () => void;
  target: number;
  setTarget: Dispatch<SetStateAction<number>>
};

const PageButtons = ({ onOpen, target, setTarget }: Props) => {
  const buttonNum = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];


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
        setTarget(newTarget)
        break;
      }
      default: {
        setTarget(id);
        break;
      }
    }
  };
  console.log(target)

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
          const children = num === 0 ? <IoMdArrowDropleft size={25} /> : num === 15 ? <IoMdArrowDropright size={25} /> : num;
          const button = (
            <Button
              key={num}
              className="button"
              onClick={(e) => { onOpen(); getButtonNum(e); }}
              id={`pageButton${num}`}
              sx={styles}
              _hover={{ opacity: '1.0', transform: 'scale(1.1)' }}
            >
              {children}
            </Button>
          );
          return button;
        })}
      </Flex>
    </>
  );
};

export default PageButtons;
