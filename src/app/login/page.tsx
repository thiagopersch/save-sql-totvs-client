'use client';

import * as S from '@/app/login/styles';
import { Button, Card, TextField } from '@mui/material';

export default function LoginPage() {
  return (
    <Card
      variant="elevation"
      sx={{
        width: '50dvw',
      }}
    >
      <S.Wrapper>
        <S.Form>
          <S.Title>Login</S.Title>
          <S.InputSentences>
            <TextField
              type="email"
              label="E-mail"
              variant="filled"
              fullWidth
              required
            />
          </S.InputSentences>
          <S.InputSentences>
            <TextField
              type="password"
              label="Senha"
              variant="filled"
              fullWidth
              required
            />
          </S.InputSentences>
          <S.CTA>
            <Button variant="contained" type="submit">
              Entrar
            </Button>
          </S.CTA>
        </S.Form>
      </S.Wrapper>
    </Card>
  );
}
