import React from 'react';
import { Button as ChakraButton } from '@chakra-ui/react';

export const Button = ({ children }: { children: React.ReactNode }) => {
  return <ChakraButton style={{ padding: '8px 12px' }}>{children}</ChakraButton>;
};
