import React from 'react';
import { Box, Card, Typography } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import SelectCustomer from '../select/SelectCustomer';

const HeaderButton = ({ title, color, iconColor, dropdownOptions = [], onChange }) => (
  <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: 3,
      width: 300,
      height: 180,
      borderRadius: 2,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fff',
      position: 'relative',
    }}
  >
    <Box
      sx={{
        backgroundColor: iconColor || color,
        borderRadius: '50%',
        padding: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
      }}
    >
      <FolderIcon sx={{ color: '#fff', fontSize: 28 }} />
    </Box>
    <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 600, color: '#333', textAlign: 'center' }}>
      {title}
    </Typography>
    <SelectCustomer
      options={dropdownOptions}
      onChange={onChange}
      placeholder="Seleccione una opción"
      padding="10px"
    />
  </Card>
);

export const HeaderButtons = ({ buttons = [] }) => (
  <Box
    sx={{
      display: 'flex',
      gap: 3,
      justifyContent: 'center',
      mb: 4,
      flexWrap: 'wrap', // Permite que las cajitas se muevan a otra línea
      '@media (max-width: 768px)': {
        flexDirection: 'column', // Cambia la dirección a vertical en pantallas pequeñas
        alignItems: 'center', // Centra las cajitas
      },
    }}
  >
    {buttons.map((button, index) => (
      <HeaderButton
        key={index}
        title={button.title}
        color={button.color}
        iconColor={button.iconColor}
        dropdownOptions={button.dropdownOptions || []}
        onChange={button.onChange}
      />
    ))}
  </Box>
);
