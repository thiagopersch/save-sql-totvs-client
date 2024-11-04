import { global } from '@/config/routes';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
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
            paddingTop: '10rem',
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
                  width: '20rem',
                  height: '20rem',
                  padding: '5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
                elevation={4}
                key={route.path}
              >
                <CardContent sx={{ textAlign: 'center', padding: '0rem' }}>
                  <Link href={route.path} style={{ textDecoration: 'none' }}>
                    <Typography
                      sx={{
                        fontSize: '1.6rem',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        textTransform: 'uppercase',
                      }}
                      color="primary"
                      gutterBottom
                    >
                      {route.name}
                    </Typography>
                  </Link>
                </CardContent>
                <CardActions>
                  <Link href={route.path} style={{ textDecoration: 'none' }}>
                    <Button color="primary" variant="outlined">
                      Verificar
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            ))}
          </Fragment>
        </Box>
      ))}
    </>
  );
}
