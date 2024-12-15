import { Box, Button, Typography } from '@mui/material';
import styled, { css } from 'styled-components';
import media from 'styled-media-query';

export const Wrapper = styled(Box)`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* padding: 2rem; */
    flex: 1 1 100%;
    width: 100%;
  `}
`;

export const Title = styled(Typography)`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  align-items: center;
  font-weight: bold;

  ${media.lessThan('medium')`
    font-size: 1.5rem;
  `}
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
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 1rem;
`;

export const CTA = styled(Button)`
  ${media.lessThan('medium')`
    width: 100%;
  `}
`;
