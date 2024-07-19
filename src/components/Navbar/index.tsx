'use client';

import { global } from '@/config/routes';
import {
  AppBar,
  Box,
  Button,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
          <Button
            id="menu"
            aria-controls={open ? 'menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            color="inherit"
          >
            Menu
          </Button>
          <Menu
            id="menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {global.map((value) => (
              <MenuItem key={value.path}>
                <Link
                  key={value.path}
                  href={value.path}
                  style={{ textDecoration: 'none' }}
                >
                  {value.name}
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
