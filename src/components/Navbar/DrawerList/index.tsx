// DrawerList.tsx
import { routes } from '@/config/routes'; // Certifique-se de que o caminho está correto
import { Code, ExpandLess, ExpandMore, Storage } from '@mui/icons-material';
import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';

type DrawerProps = {
  open: boolean;
  toggleDrawer: (newOpen: boolean) => () => void;
};

export default function DrawerList({ open, toggleDrawer }: DrawerProps) {
  const initialState: string | null = null;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    initialState,
  );

  const handleCategoryClick = (category: string) => {
    setSelectedCategory((prev) => (prev === category ? null : category));
  };

  return (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {routes.map((route) => (
          <Box key={route.id}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => handleCategoryClick(route.id ?? '')}
              >
                <ListItemIcon>
                  {route.id === 'automations' ? <Storage /> : <Code />}
                </ListItemIcon>
                <ListItemText primary={route.name} />
                {selectedCategory === route.id ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )}
              </ListItemButton>
            </ListItem>

            <Collapse
              in={selectedCategory === route.id}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {route.children?.map((child) => (
                  <ListItem key={child.path} disablePadding>
                    <Link
                      href={child.path}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary={child.name} />
                      </ListItemButton>
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </Box>
        ))}
      </List>
    </Box>
  );
}

/* import { global } from '@/config/routes';
import { Code, ExpandLess, ExpandMore, Storage } from '@mui/icons-material';
import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';

type DrawerProps = {
  open: boolean;
  toggleDrawer: (newOpen: boolean) => () => void;
};

export default function DrawerList({ open, toggleDrawer }: DrawerProps) {
  const initialState: string | null = null;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    initialState,
  );

  const categories = Array.from(new Set(global.map((item) => item.category)));

  const handleCategoryClick = (category: string) => {
    setSelectedCategory((prev) => (prev === category ? null : category));
  };

  return (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {categories.map((category, index) => (
          <Box key={category}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleCategoryClick(category)}>
                <ListItemIcon>
                  {index % 2 === 0 ? <Storage /> : <Code />}
                </ListItemIcon>
                <ListItemText primary={category} />
                {selectedCategory === category ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )}
              </ListItemButton>
            </ListItem>

            <Collapse
              in={selectedCategory === category}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {global
                  .filter((item) => item.category === category)
                  .map((value) => (
                    <ListItem key={value.path} disablePadding>
                      <Link
                        href={value.path}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        <ListItemButton sx={{ pl: 4 }}>
                          <ListItemText primary={value.name} />
                        </ListItemButton>
                      </Link>
                    </ListItem>
                  ))}
              </List>
            </Collapse>
          </Box>
        ))}
      </List>
    </Box>
  );
}
 */
