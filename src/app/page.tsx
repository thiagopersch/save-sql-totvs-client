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
                  width: '20vw',
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
    </>
  );
}
