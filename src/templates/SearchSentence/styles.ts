import { Box, Button, Typography } from '@mui/material';
import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: space-between;
    padding: 4rem;
    width: 100%;
  `}
`;

export const Title = styled(Typography)`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  align-items: center;
  font-weight: bold;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  align-items: stretch;
  gap: 1rem;
`;

export const InputSentences = styled(Box)`
  display: flex;
  gap: 3rem;
`;

export const CTA = styled(Button)`
  margin-bottom: 2rem;
`;
