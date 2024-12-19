'use client';

import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';
import icons from '../../utils/icons'; // Importa el archivo centralizado de iconos

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: '#213555', // Cambiar color de fondo
  color: '#fff' 
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
  backgroundColor: '#213555', // Cambiar color de fondo
  color: '#fff' 
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between', // Espaciado entre elementos
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);

export default function CustomDrawer({ children, menuOptions = [] }) {
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex'}}>
      {/* Botón superior para abrir/cerrar el menú */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: theme.zIndex.drawer + 1,
          p: 1,
          borderBottom: `1px solid ${theme.palette.divider}`,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <IconButton onClick={handleDrawer} sx={{ color: '#ffffff' }}> {open ? <MenuIcon /> : <ChevronRightIcon />} </IconButton>
      </Box>

      <Drawer variant="permanent" open={open} sx={{ backgroundColor: theme.palette.background.default }}>
        <DrawerHeader sx={{marginTop:'4rem'}}>
          <IconButton onClick={handleDrawer} sx={{ color: '#ffffff' }}>
            {open === false ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {/* Evitar errores si menuOptions es indefinido */}
          {menuOptions.length > 0 ? (
            menuOptions.map((option) => {
              const Icon = icons[option.icon]; // Busca el icono dinámicamente
              return (
                <ListItem key={option.label} disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    component={Link}
                    href={option.route} // Cambia "to" por "href" para Next.js
                    sx={[
                      {
                        minHeight: 48,
                        px: 2.5,
                      },
                      open
                        ? {
                            justifyContent: 'initial',
                          }
                        : {
                            justifyContent: 'center',
                          },
                    ]}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        justifyContent: 'center',
                        mr: open ? 3 : 'auto',
                        color:'#fff'
                      }}
                    >
                      {Icon ? <Icon /> : null} {/* Renderiza el icono si existe */}
                    </ListItemIcon>
                    <ListItemText
                      primary={option.label}
                      sx={[
                        open
                          ? {
                              opacity: 1,
                            }
                          : {
                              opacity: 0,
                            },
                      ]}
                    />
                  </ListItemButton>
                </ListItem>
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
