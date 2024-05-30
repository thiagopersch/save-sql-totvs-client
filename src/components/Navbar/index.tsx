import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ mr: '1rem' }}>
            <Link href="/" passHref>
              <Image
                src="/rubeus.svg"
                width={48}
                height={48}
                alt="logo-rubeus.svg"
              />
            </Link>
          </Box>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Integração Rubeus
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
