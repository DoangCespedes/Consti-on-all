'use client';

import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Link from 'next/link';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import icons from '../../utils/icons'; // Importa el archivo centralizado de iconos

const drawerWidth = 260;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: '#213555',
  color: '#fff',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  backgroundColor: '#213555',
  color: '#fff',
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function HoverDrawer({ children, menuOptions = [] }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({});

  const toggleDropdown = (label) => {
    setDropdownOpen((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* <DrawerHeader sx={{ marginTop: '4rem' }}></DrawerHeader> */}
      <Drawer
        variant="permanent"
        open={open}
        onMouseEnter={() => setOpen(true)} // Abre el Drawer al hacer hover
        onMouseLeave={() => setOpen(false)} // Cierra el Drawer al quitar el puntero
        
      >
        <List
          sx={{ marginTop: '4rem' }}
        >
          {menuOptions.length > 0 ? (
            menuOptions.map((option) => {
              const Icon = icons[option.icon]; // Busca el icono dinámicamente
              const hasChildren = option.children && option.children.length > 0;

              return (
                <div key={option.label}>
                  <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                      onClick={hasChildren ? () => toggleDropdown(option.label) : undefined}
                      component={hasChildren ? undefined : Link}
                      href={hasChildren ? undefined : option.route}
                      sx={[
                        {
                          minHeight: 48,
                          px: open ? 2.5 : 0,
                          display: 'flex',
                          alignItems: 'center',
                        },
                        open
                          ? {
                              justifyContent: 'flex-start',
                            }
                          : {
                              justifyContent: 'center',
                            },
                      ]}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff',
                          mr: open ? 3 : 0,
                        }}
                      >
                        {Icon ? <Icon /> : null}
                      </ListItemIcon>
                      <ListItemText
                        primary={option.label}
                        sx={[
                          {
                            whiteSpace: 'normal',
                            wordBreak: 'break-word',
                            maxWidth: open ? drawerWidth - 50 : 0,
                            display: open ? 'block' : 'none',
                          },
                        ]}
                      />
                      {hasChildren && open && (
                        <IconButton sx={{ color: '#ffffff' }}>
                          {dropdownOpen[option.label] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                      )}
                    </ListItemButton>
                  </ListItem>
                  {hasChildren && open &&  (
                    <Collapse in={dropdownOpen[option.label]} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {option.children.map((child) => (
                          <ListItemButton
                            key={child.label}
                            component={Link}
                            href={child.route}
                            sx={{
                              pl: 4,
                              color: '#ffffff',
                            }}
                          >
                            <ListItemText primary={child.label} />
                          </ListItemButton>
                        ))}
                      </List>
                    </Collapse>
                  )}
                </div>
              );
            })
          ) : (
            <ListItem>
              <ListItemText primary="No options available" />
            </ListItem>
          )}
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
}
