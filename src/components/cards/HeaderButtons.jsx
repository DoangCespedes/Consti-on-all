import React from 'react';
import { Box, Card, Typography, Select, MenuItem } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';

const HeaderButton = ({ title, color, iconColor, dropdownOptions = [], onChange }) => (
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

    {/* Título */}
    <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 600, color: '#333', textAlign: 'center' }}>
      {title}
    </Typography>

    {/* Dropdown */}
    <Select
      defaultValue=""
      onChange={onChange}
      displayEmpty
      sx={{
        mt: 2,
        width: '80%',
        backgroundColor: '#f9f9f9',
        borderRadius: 1,
        '& .MuiSelect-select': {
          padding: '10px',
          fontSize: '14px',
        },
      }}
    >
      <MenuItem value="" disabled>
        Seleccione una opción
      </MenuItem>
      {dropdownOptions.map((option, index) => (
        <MenuItem key={index} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  </Card>
);

export const HeaderButtons = ({ buttons = [] }) => (
  <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', mb: 4 }}>
    {buttons.map((button, index) => (
      <HeaderButton
        key={index}
        title={button.title}
        color={button.color}
        iconColor={button.iconColor}
        dropdownOptions={button.dropdownOptions || []} // Validar array
        onChange={button.onChange}
      />
    ))}
  </Box>
);
