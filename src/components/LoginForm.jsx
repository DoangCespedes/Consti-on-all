'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, IconButton, Box, Typography, Container, MenuItem, FormControl, InputLabel, Select, Grid } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import SelectCustomer from './select/SelectCustomer';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    defaultValues: {
      tipoDocumento: 'V' // Valor inicial
    }
  });

  const router = useRouter(); 

  const numeroDocumento = watch('numeroDocumento');
  const tipoDocumento = watch('tipoDocumento', 'V'); // Valor por defecto


  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue('tipoDocumento', newValue); // Actualiza el valor en react-hook-form
  };

  const onSubmit = async (data) => {
    const userId = `${data.tipoDocumento}${data.numeroDocumento}`;
    try {
      const response = await axios.post('http://localhost:7000/api/auth/login', {
        nombre: userId,
        password: data.password
      });

      if (response.status === 200) {
        router.push('/app_e');
      }
    } catch (error) {
      console.error('Error al hacer la solicitud:', error);
      setErrorMessage('Error al iniciar sesión. Por favor, revisa tus credenciales.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, p: 3, borderRadius: 2, background:'rgba(255,255,255, 0.7)' }}>
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
            Ingresar
          </Typography>
        </Grid>

        <Grid item xs={12} component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Tipo</InputLabel>
                
                <SelectCustomer
                  onChange={handleChange}
                  options={[{label: 'V', value: 'V'},
                    {label:'J', value:'J'},
                    {label:'E', value:'E' }]}
                  // placeholder="Tipo"
                  label="Tipo"
                />

              

                {errors.tipoDocumento && <Typography color="error">{errors.tipoDocumento.message}</Typography>}
              </FormControl>
            </Grid>

            <Grid item xs={8}>
              <TextField
                label="Número de documento"
                variant="outlined"
                fullWidth
                type="number"
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
          </Grid>

          <Grid item xs={12} mt={2}>
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type={showPassword ? 'text' : 'password'}
              {...register('password', { required: 'Contraseña es requerida' })}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                )
              }}
            />
          </Grid>

          <Grid item xs={12} mt={2}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              LOGIN
            </Button>
          </Grid>

          {errorMessage && (
            <Grid item xs={12} mt={1}>
              <Typography color="error">{errorMessage}</Typography>
            </Grid>
          )}

          <Grid item xs={12} mt={2} textAlign="center">
            <Link href='/reiniciar_clave'>
              <Typography variant="body2">¿Olvidaste tu contraseña?</Typography>
            </Link>
          </Grid>

          <Grid item xs={12} mt={2} textAlign="center">
            <Link href="/registro">
              <Typography variant="body2">Registrate →</Typography>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
