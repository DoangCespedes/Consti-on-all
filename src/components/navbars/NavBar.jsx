import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Image from 'next/image';
import { Box, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const NavBar = ({ companyName, buttons, bgColor, urlImg, colorTextDrawell }) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: bgColor, zIndex:'1000000000'}}>
      <Toolbar>
        <Box component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center'}}>
            {companyName ? (
              <Link href= {companyName.enlace} passHref>
                <Typography variant="h6" component="div" sx={{ cursor: 'pointer', color: companyName.color }}>
                  {companyName.title}
                </Typography>
              </Link>
            ) : (
              <Link href= {urlImg.enlace} passHref>
                <Image src={urlImg.url} alt="Logo" width={200} height={50} />
              </Link>
            )}
        </Box>
        
        {/* Hidden on larger screens */}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <IconButton
            color={colorTextDrawell}
            aria-label="menu"
            edge="start"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          PaperProps={{
            sx: {
              backgroundColor: bgColor, // Cambia el color de fondo aquí
              color: colorTextDrawell, // Cambia el color del texto aquí si es necesario
              padding: '16px', // Ajusta el padding si quieres más espacio
              width: '250px', // Ajusta el ancho del Drawer si lo necesitas
              
            },
          }}
        >
          <List style={{marginTop:'3rem'}}>
            {buttons && buttons.map((button, index) => (
              <ListItem button key={index} onClick={toggleDrawer(false)}>
                <Link href={button.enlace} passHref>
                  <ListItemText primary={button.titulo} />
                </Link>
              </ListItem>
            ))}
          </List>
        </Drawer>

        </Box>

        {/* Hidden on smaller screens */}
        <Box sx={{ display: { xs: 'none', md: 'flex'} }}>
          {buttons && buttons.map((button, index) => (
            <Button 
              key={index}
              //  color={button.color}
              sx={{
                color: button.color, // Cambia el color de la fuente a negro
                textTransform: 'none', // Desactiva las mayúsculas automáticas
                fontWeight: 'bold', // Fuente en negrita si lo prefieres
              }}
            
            >
              <Link href={button.enlace} passHref>
                <Typography variant="button" component="span">
                  <div style={{fontSize:'0.7rem', fontWeight:'bold'}}>
                    {button.titulo}
                  </div>
                </Typography>
              </Link>
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

NavBar.propTypes = {
  companyName: PropTypes.string.isRequired,
  urlImg: PropTypes.string.isRequired,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      titulo: PropTypes.string.isRequired,
      enlace: PropTypes.string.isRequired,
      color: PropTypes.string,
    })
  ).isRequired,
  bgColor: PropTypes.string,
};

NavBar.defaultProps = {
  bgColor: 'primary.main',
};

export default NavBar;
