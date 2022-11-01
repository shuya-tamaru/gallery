import { Box, Flex, Text } from '@chakra-ui/react';
import { GiSmartphone } from 'react-icons/gi';

import styles from '../styles/Home.module.css';

type Props = {
  width: number,
  height: number
}

const DisplayAlertPage = ({width, height}:Props) => {
  return (
    <Flex h={height} bg="linear-gradient(#f0f8ff,#d1e8ff)" justify="center" alignItems="center" >
      <Box display="grid" placeItems="center" >
        <Text color="#333" fontSize={{ base: 'xl', md: '3xl', lg: '4xl' }} fontWeight="800">Please turn the screen horizontally</Text>
        <Box className={styles.phoneIcon}>
          <GiSmartphone size={150} color={"666"} />
        </Box>
      </Box>
    </Flex >
  )
}

export default DisplayAlertPage;
