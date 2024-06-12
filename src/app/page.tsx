import { global } from '@/config/routes';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  List,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { Fragment } from 'react';

type Route = {
  path: string;
  name: string;
};

type Routes = {
  [key: string]: Route[];
};

const routes: Routes = {
  global,
};

export default function Home() {
  return (
    <>
      {Object.entries(routes).map(([key, value]) => (
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            paddingTop: '5rem',
            paddingBottom: '2rem',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
          key={key}
        >
          <Fragment key={key}>
            {value.map((route) => (
              <Card
                sx={{
                  width: '15vw',
                  height: '20rem',
                  padding: '5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
                raised
                key={route.path}
              >
                <CardContent>
                  <Link href={route.path} style={{ textDecoration: 'none' }}>
                    <Typography
                      sx={{
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        textTransform: 'uppercase',
                      }}
                      color="text.primary"
                      gutterBottom
                    >
                      {route.name}
                    </Typography>
                  </Link>
                </CardContent>
                <CardActions>
                  <Link href={route.path} style={{ textDecoration: 'none' }}>
                    <Button size="large" variant="contained">
                      Verificar
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            ))}
          </Fragment>
        </Box>
      ))}
      <Grid
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          margin: '0 30rem',
        }}
      >
        <Typography variant="h4" color="gray">
          Itens a serem feitos
        </Typography>
        <List>0. Criar autenticação email/senha</List>
        <List>1. Criar CRUD dos clientes</List>
        <List>1.1. Criar CRUD dos acessos TOTVS aos clientes</List>
        <List>2. Criar CRUD do TBC</List>
        <List>3. Criar CRUD das consultas</List>
        <List>
          4. Criar integração para buscar consultas no TOTVS e salvar na base de
          dados para fins de backups
        </List>
        <List>5. Criar tela de envio de todas as consultas para o TOTVS</List>
        <List>5.1. Criar envio de consultas individuais para o TOTVS</List>
      </Grid>
    </>
  );
}
