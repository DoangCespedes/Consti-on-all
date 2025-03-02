'use client';

import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, IconButton, Box, Typography, Container, FormControl, InputLabel, Grid } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import SelectCustomer from './select/SelectCustomer';
import { UserContext } from '../../context/user.context';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    defaultValues: { tipoDocumento: 'V' }
  });

  const { login } = useContext(UserContext); // Desestructuramos solo lo que necesitamos
  const router = useRouter(); 

  const onSubmit = async (data) => {
    const userId = `${data.tipoDocumento}${data.numeroDocumento}`;
    const password = data.password;

    try {
      await login(userId, password); // Llama al método de login
      router.push('/app_e'); // Redirigir después de un inicio de sesión exitoso
    } catch (error) {
      setErrorMessage(error.message); // Maneja el error si se lanza
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
            {/* Add SVG Icon here */}
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
                  onChange={(event) => setValue('tipoDocumento', event.target.value)}
                  options={[
                    { label: 'V', value: 'V' },
                    { label: 'J', value: 'J' },
                    { label: 'E', value: 'E' },
                  ]}
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
                {...register('numeroDocumento', { required: 'Número de documento es requerido', pattern: { value: /^[0-9]+$/, message: 'El número de documento debe ser numérico' } })}
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
              type={showPassword ? 'text' : 'password'}
              {...register('password', { required: 'Contraseña es requerida' })}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} mt={2}>
            <Button type="submit" fullWidth variant="contained" color="primary">LOGIN</Button>
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