import { Box, Flex, Text } from '@chakra-ui/react';
import { GiSmartphone } from 'react-icons/gi';

import styles from '../../styles/Home.module.css';

const DisplayAlertPage = () => {
  return (
    <Flex h="100vh" bg="linear-gradient(#f0f8ff,#d1e8ff)" justify="center" alignItems="center" >
      <Box display="grid" placeItems="center" >
        <Text color="#333" fontWeight="800">Please turn the screen horizontally</Text>
        <Box className={styles.phoneIcon}>
          <GiSmartphone size={100} color={"666"} />
        </Box>
      </Box>
    </Flex>
  )
}

export default DisplayAlertPage;
