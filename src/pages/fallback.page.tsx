import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import { useAppTitle } from 'hooks/use-app-title';
import React from 'react';

interface IInvalidChainProps {
  title: string;
  text: string;
}
export const FallbackPage: React.FC<IInvalidChainProps> = ({ title, text }) => {
  useAppTitle(title);
  return (
    <Container>
      <Alert severity='warning'>
        {text}
      </Alert>
    </Container >
  )
}
