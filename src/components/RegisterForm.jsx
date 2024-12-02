'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, IconButton, Box, Typography, Container, MenuItem, FormControl, InputLabel, Select, Grid } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    defaultValues: {
      tipoDocumento: 'V' // Valor inicial
    }
  });

  const router = useRouter();

  const onSubmit = async (data) => {
    console.log('Datos enviados:', data);
  
    try {
      const userId = `${data.tipoDocumento}${data.numeroDocumento}`;
  
      // Construimos el payload esperado por la API
      const payload = {
        nombre: userId,
        nuevoCampo: true, // Este campo parece ser obligatorio según Postman
        correo: data.email,
        telefono: data.telefono,
        password: data.password,
        perfil: "USUARIO_ASEGURADO" // Si es un valor constante, mantenlo aquí
      };
  
      const response = await axios.post('http://localhost:7000/api/usuarios', payload);
  
      console.log('Respuesta exitosa:', response.data);
  
      if (response.status === 200) {
        router.push('/login'); // Navegación si todo es correcto
      }
    } catch (error) {
      if (error.response) {
        console.error('Error del servidor:', error.response.data);
      } else if (error.request) {
        console.error('No hay respuesta del servidor:', error.request);
      } else {
        console.error('Error en la configuración:', error.message);
      }
    }
  };
  

  const tipoDocumento = watch('tipoDocumento', 'V');

  const handleChange = (event) => {
    setValue('tipoDocumento', event.target.value);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, p: 3, borderRadius: 2, background: 'rgba(255,255,255, 0.7)' }}>
      <Grid container spacing={2} direction="column" alignItems="center">
      <Grid item>
          <Box sx={{
            width: 80,
            height: 80,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 3,
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="40" height="40">
              <rect x="0" y="0" width="24" height="24" fill="black" rx="4"></rect>
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </Box>
        </Grid>
        <Grid item>
          <Typography component="h1" variant="h5" color="black" mb={2}>
            Registrarme
          </Typography>
        </Grid>

        <Grid item xs={12} component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
          <Grid container spacing={2}>
            {/* Tipo y Número de Documento */}
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Tipo</InputLabel>
                <Select value={tipoDocumento} onChange={handleChange} label="Tipo">
                  {['V', 'J', 'E'].map((tipo) => (
                    <MenuItem key={tipo} value={tipo}>{tipo}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={8}>
              <TextField
                label="Número de documento"
                variant="outlined"
                fullWidth
                {...register('numeroDocumento', {
                  required: 'Número de documento es requerido',
                  pattern: {
                    value: /^[0-9]+$/,
                    message: 'El número de documento debe ser numérico'
                  }
                })}
                error={!!errors.numeroDocumento}
                helperText={errors.numeroDocumento?.message}
              />
            </Grid>

            {/* Email */}
            <Grid item xs={12}>
              <TextField
                label="Correo electrónico"
                variant="outlined"
                fullWidth
                {...register('email', {
                  required: 'Correo electrónico es requerido',
                  pattern: {
                    value: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
                    message: 'Correo electrónico no válido'
                  }
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>

            {/* Teléfono */}
            <Grid item xs={12}>
              <TextField
                label="Teléfono"
                variant="outlined"
                fullWidth
                {...register('telefono', {
                  required: 'Teléfono es requerido',
                  pattern: {
                    value: /^[0-9]{7,15}$/,
                    message: 'Teléfono no válido'
                  }
                })}
                error={!!errors.telefono}
                helperText={errors.telefono?.message}
              />
            </Grid>

            {/* Contraseña */}
            <Grid item xs={12}>
              <TextField
                label="Contraseña"
                variant="outlined"
                fullWidth
                type={showPassword ? 'text' : 'password'}
                {...register('password', {
                  required: 'Contraseña es requerida',
                  minLength: {
                    value: 6,
                    message: 'La contraseña debe tener al menos 6 caracteres'
                  }
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  )
                }}
              />
            </Grid>

            {/* Confirmar Contraseña */}
            <Grid item xs={12}>
              <TextField
                label="Confirmar contraseña"
                variant="outlined"
                fullWidth
                type="password"
                {...register('confirmPassword', {
                  required: 'Confirma tu contraseña',
                  validate: (value) => value === watch('password') || 'Las contraseñas no coinciden'
                })}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} mt={2}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Registrarme
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
