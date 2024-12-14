import { Box, Button, Card, Typography } from '@mui/material';
import styled, { css } from 'styled-components';
import media from 'styled-media-query';

export const Container = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100dvh;
  overflow: hidden !important;
  background-image: linear-gradient(
    to right top,
    #3dd5d6,
    #36cccd,
    #2ec3c4,
    #26bbbb,
    #1db2b2,
    #17a5a5,
    #109999,
    #088d8d,
    #057b7b,
    #036969,
    #015858,
    #004747
  );
`;

export const CardContainer = styled(Card)`
  width: 50dvw;
  margin: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;

  @media screen and (max-width: 768px) {
    width: 100dvw;
  }
`;

export const Wrapper = styled(Box)`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 2rem;
    flex: 1 1 100%;

    ${media.lessThan('medium')`
      padding: 1.5rem;
    `}
  `}
`;

export const Title = styled(Typography)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  padding: 1.5rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  align-items: stretch;
  gap: 1rem;
`;

export const InputSentences = styled(Box)`
  display: flex;
  gap: 1rem;

  ${media.lessThan('medium')`
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `}
`;

export const Actions = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  ${media.lessThan('medium')`
    width: 100%;
    flex-direction: column-reverse;
  `}
`;

export const CTA = styled(Button)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;
