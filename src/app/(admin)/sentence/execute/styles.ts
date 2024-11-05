import { Box, Typography } from '@mui/material';
import styled from 'styled-components';
import media from 'styled-media-query';

export const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  margin: 0 auto;
  padding: 4rem;

  ${media.lessThan('medium')`
    padding: 1.5rem;
    width: 100%;
  `}
`;

export const Title = styled(Typography)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;

export const SectionOne = styled(Box)`
  display: flex;
  gap: 1rem;

  ${media.lessThan('medium')`
    flex-direction: column;
  `}
`;

export const SectionTwo = styled(Box)`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;

  ${media.lessThan('medium')`
    flex-direction: column;
  `}
`;

export const CTA = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
`;
