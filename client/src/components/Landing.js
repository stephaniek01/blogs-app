import React from 'react';
import { Text } from '@chakra-ui/react';

const Landing = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <Text fontSize='6xl'>Blogster!</Text>
      <p> Write private blogs</p>
      <a href='/blogs'>View all my blogs</a>
    </div>
  );
};

export default Landing;
