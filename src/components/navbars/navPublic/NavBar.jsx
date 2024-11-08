import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';

const NavBar = ({ companyName, buttons, bgColor }) => {
  return (
    <AppBar position="static" sx={{ backgroundColor: bgColor }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link href="/">{companyName}</Link>
        </Typography>
        {buttons && buttons.map((button, index) => (
          <Button key={index} color={button.color}>
            <Link href={button.enlace} passHref>
              <Typography variant="button" component="span">
                {button.titulo}
              </Typography>
            </Link>
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  );
};

NavBar.propTypes = {
  companyName: PropTypes.string.isRequired,
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
