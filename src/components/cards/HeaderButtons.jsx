import React from 'react';
import { Box, Button, Card, Typography } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder'; // Icono de carpeta

const HeaderButton = ({ title, color, iconColor, buttonColor, onClick }) => (
  <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: 3,
      width: 380,
      height: 200,
      borderRadius: 2,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fff',
      position: 'relative',
    }}
  >
    {/* Icono superior */}
    <Box
      sx={{
        // position: 'absolute',
        // top: -10,
        backgroundColor: iconColor || color,
        borderRadius: '20%',
        padding: 1,
        display: 'flex',
        alignItems: 'start',
        justifyContent: 'start',
        width: 40,
        height: 40,
        // zIndex: 10000
      }}
    >
      <FolderIcon sx={{ color: '#fff', fontSize: 20 }} />
    </Box>

    {/* Título */}
    <Typography variant="subtitle1" sx={{ mt: 4, fontWeight: 600, color: '#333', textAlign: 'center' }}>
      {title}
    </Typography>

    {/* Botón */}
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        mt: 2,
        backgroundColor: buttonColor || color,
        color: '#fff',
        fontWeight: 600,
        width: '80%',
        '&:hover': { backgroundColor: buttonColor || color },
      }}
    >
      IR
    </Button>
  </Card>
);

export const HeaderButtons = ({ buttons }) => (
  <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', mb: 4 }}>
    {buttons.map((button, index) => (
      <HeaderButton
        key={index}
        title={button.title}
        color={button.color}
        iconColor={button.iconColor}
        buttonColor={button.buttonColor}
        onClick={button.onClick}
      />
    ))}
  </Box>
);
