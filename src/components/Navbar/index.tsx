'use client';

import { useAuth } from '@/app/AuthContext';
import { routes } from '@/config/routes'; // Certifique-se de que o caminho está correto
import {
  ArrowDropDown,
  Logout,
  Menu as MenuIcon,
  Person,
} from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import DrawerList from './DrawerList';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [subMenuEl, setSubMenuEl] = useState<null | HTMLElement>(null);
  const [currentSubMenu, setCurrentSubMenu] = useState<string | null>(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const open = Boolean(anchorEl);
  const openSubMenu = Boolean(subMenuEl);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenDrawer(newOpen);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSubMenuEl(null);
    setCurrentSubMenu(null);
  };

  const handleSubMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    category: string,
  ) => {
    setSubMenuEl(event.currentTarget);
    setCurrentSubMenu(category);
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
          {!isMobile && (
            <>
              {routes.map((route) => (
                <div key={route.id}>
                  <Button
                    id={`${route.id}-button`}
                    aria-controls={open ? `${route.id}-menu` : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={(event) =>
                      handleSubMenuClick(event, route.id ?? '')
                    }
                    color="inherit"
                  >
                    {route.name}
                  </Button>
                  <Menu
                    anchorEl={subMenuEl}
                    open={openSubMenu && currentSubMenu === route.id}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': `${route.id}-button`,
                    }}
                  >
                    {route.children?.map((child) => (
                      <Link
                        href={child.path}
                        style={{ textDecoration: 'none' }}
                        key={child.path}
                      >
                        <MenuItem onClick={handleClose}>{child.name}</MenuItem>
                      </Link>
                    ))}
                  </Menu>
                </div>
              ))}
              {isAuthenticated ? (
                <>
                  <Button
                    color="inherit"
                    onClick={(event) => setAnchorEl(event.currentTarget)}
                    endIcon={<ArrowDropDown />}
                  >
                    {user || 'Usuário'}
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    sx={{
                      '& .MuiMenu-paper': {
                        minWidth: '8dvw',
                      },
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <MenuItem
                      onClick={() => router.push('/administrative/profile')}
                      sx={{
                        display: 'flex',
                        gap: '1rem',
                        alignContent: 'center',
                        padding: '0.8rem',
                      }}
                    >
                      <Person /> Perfil
                    </MenuItem>
                    <MenuItem
                      className="text-red-700"
                      onClick={logout}
                      sx={{
                        display: 'flex',
                        gap: '1rem',
                        alignContent: 'center',
                        padding: '0.8rem',
                      }}
                    >
                      <Logout /> Sair
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button color="inherit" onClick={() => router.push('/login')}>
                  Login
                </Button>
              )}
            </>
          )}
          {isMobile && (
            <>
              <IconButton onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={openDrawer}
                onClose={toggleDrawer(false)}
              >
                <DrawerList open={openDrawer} toggleDrawer={toggleDrawer} />
              </Drawer>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;

/* 'use client';

import { useAuth } from '@/app/AuthContext';
import { global } from '@/config/routes';
import { Menu as MenuIcon } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import DrawerList from './DrawerList';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [subMenuEl, setSubMenuEl] = useState<null | HTMLElement>(null);
  const [currentSubMenu, setCurrentSubMenu] = useState<string | null>(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const open = Boolean(anchorEl);
  const openSubMenu = Boolean(subMenuEl);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenDrawer(newOpen);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSubMenuEl(null);
    setCurrentSubMenu(null);
  };

  const handleSubMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    category: string,
  ) => {
    setSubMenuEl(event.currentTarget);
    setCurrentSubMenu(category);
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
          <Button color="inherit" LinkComponent={Link} href="/">
            Início
          </Button>
          {!isMobile && (
            <>
              <Button
                id="Dataserver-button"
                aria-controls={open ? 'Dataserver-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={(event) => handleSubMenuClick(event, 'Dataserver')}
                color="inherit"
              >
                Dataserver
              </Button>
              <Menu
                anchorEl={subMenuEl}
                open={openSubMenu && currentSubMenu === 'Dataserver'}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'Dataserver-button',
                }}
              >
                {global
                  .filter((item) => item.category === 'Dataserver')
                  .map((value) => (
                    <Link
                      href={value.path}
                      style={{ textDecoration: 'none' }}
                      key={value.path}
                    >
                      <MenuItem key={value.path} onClick={handleClose}>
                        {value.name}
                      </MenuItem>
                    </Link>
                  ))}
              </Menu>
              <Button
                id="consulta-sql-button"
                aria-controls={open ? 'consulta-sql-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={(event) => handleSubMenuClick(event, 'consulta-sql')}
                color="inherit"
              >
                Consulta SQL
              </Button>
              <Menu
                anchorEl={subMenuEl}
                open={openSubMenu && currentSubMenu === 'consulta-sql'}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'consulta-sql-button',
                }}
              >
                {global
                  .filter((item) => item.category === 'SQL')
                  .map((value) => (
                    <Link
                      href={value.path}
                      style={{ textDecoration: 'none' }}
                      key={value.path}
                    >
                      <MenuItem key={value.path} onClick={handleClose}>
                        {value.name}
                      </MenuItem>
                    </Link>
                  ))}
              </Menu>
              <Button
                id="workflow-button"
                aria-controls={open ? 'workflow-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={(event) => handleSubMenuClick(event, 'Workflow')}
                color="inherit"
              >
                Fórmula Visual
              </Button>
              <Menu
                anchorEl={subMenuEl}
                open={openSubMenu && currentSubMenu === 'Workflow'}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'workflow-button',
                }}
              >
                {global
                  .filter((item) => item.category === 'Workflow')
                  .map((value) => (
                    <Link
                      href={value.path}
                      style={{ textDecoration: 'none' }}
                      key={value.path}
                    >
                      <MenuItem key={value.path} onClick={handleClose}>
                        {value.name}
                      </MenuItem>
                    </Link>
                  ))}
              </Menu>

              {isAuthenticated ? (
                <>
                  <Button
                    color="inherit"
                    onClick={(event) => setAnchorEl(event.currentTarget)}
                  >
                    {user || 'Usuário'}
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                  >
                    <MenuItem
                      onClick={() => router.push('/administrative/profile')}
                    >
                      Perfil
                    </MenuItem>
                    <MenuItem className="text-red-700" onClick={logout}>
                      Sair
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button color="inherit" onClick={() => router.push('/login')}>
                  Login
                </Button>
              )}
            </>
          )}
          {isMobile && (
            <>
              <IconButton onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={openDrawer}
                onClose={toggleDrawer(false)}
              >
                <DrawerList open={openDrawer} toggleDrawer={toggleDrawer} />
              </Drawer>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
 */
