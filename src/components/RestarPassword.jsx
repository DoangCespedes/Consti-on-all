'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  InputAdornment
} from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function RestarPassword() {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [codeInput, setCodeInput] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [codeFromServer, setCodeFromServer] = useState('');
  const [newId, setNewId] = useState('');
  const [newPerfil, setNewPerfil] = useState('');
  const [isValidCode, setIsValidCode] = useState(false);

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    defaultValues: {
      tipoDocumento: 'V',
    },
  });

  const router = useRouter();
  const tipoDocumento = watch('tipoDocumento', 'V');

  const handleChange = (event) => setValue('tipoDocumento', event.target.value);

  const onSubmit = async (data) => {
    const userId = `${data.tipoDocumento}${data.numeroDocumento}`;
    try {
      const response = await axios.post('http://localhost:7000/api/usuarios/buscar', { nombre: userId });
      console.log(response.data.usuario.uid, "Aqui fue")
      console.log(response.data.usuario.perfil, "Aqui fue")
      setNewId(response.data.usuario.uid)
      setNewPerfil(response.data.usuario.perfil)
      if (response.status === 200 ) {
        const emailResponse = await axios.post('http://localhost:7000/api/emails/send-code', { email: response.data.usuario.correo });
        setCodeFromServer(emailResponse.data.code);
        setOpenDialog(true);
        setSuccessMessage('Enviamos un código a su correo. Por favor, verifique su bandeja de entrada.');
        setErrorMessage('');
      } else {
        setErrorMessage('Usuario no encontrado.');
      }
    } catch (error) {
      console.error('Error al hacer la solicitud:', error);
      setErrorMessage('Hubo un error al procesar la solicitud.');
    }
  };

  const handleCodeValidation = () => {
    if (String(codeInput) === String(codeFromServer)) {
      setIsValidCode(true);
      setErrorMessage('');
      setSuccessMessage('Código validado correctamente.');
      setOpenDialog(false);
    } else {
      setErrorMessage('El código ingresado es incorrecto.');
      setSuccessMessage('');
    }
  };

  const resetPassword = async (data) => {
    try {
      await axios.put(`http://localhost:7000/api/usuarios/${newId}`, {
        password: data.password,
        perfil: newPerfil
      });
      setSuccessMessage('Clave reiniciada con éxito.');
      router.push('/login'); // Redirigir al login después de reiniciar la clave
    } catch (error) {
      setErrorMessage('Hubo un error al reiniciar la clave.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, p: 3, borderRadius: 2, background: 'rgba(255,255,255, 0.7)' }}>
      <Grid container spacing={2} direction="column" alignItems="center">
        <Grid item>
          <Box sx={{ width: 80, height: 80, backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="40" height="40">
              <rect x="0" y="0" width="24" height="24" fill="black" rx="4"></rect>
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </Box>
        </Grid>
        <Grid item>
          <Typography component="h1" variant="h5" color="black" mb={2}>
            Reiniciar Clave
          </Typography>
        </Grid>
        <Grid item xs={12} component="form" onSubmit={handleSubmit(isValidCode ? resetPassword : onSubmit)} sx={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Tipo</InputLabel>
                <Select value={tipoDocumento} onChange={handleChange} label="Tipo">
                  {['V', 'J', 'E'].map((tipo) => <MenuItem key={tipo} value={tipo}>{tipo}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={8}>
              <TextField
                label="Número de documento"
                variant="outlined"
                fullWidth
                type="number"
                {...register('numeroDocumento', { required: 'Número de documento es requerido', pattern: { value: /^[0-9]+$/, message: 'Debe ser numérico' } })}
                error={!!errors.numeroDocumento}
                helperText={errors.numeroDocumento?.message}
              />
            </Grid>
          </Grid>
          {isValidCode && (
            <>
              <Grid item mt={2}>
                <Typography color="black" mb={2}>Por favor introduzca su nueva clave</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Contraseña"
                  variant="outlined"
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', { required: 'Contraseña es requerida', minLength: { value: 6, message: 'Debe tener al menos 6 caracteres' } })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Confirmar contraseña"
                  variant="outlined"
                  fullWidth
                  type="password"
                  {...register('confirmPassword', { required: 'Confirma tu contraseña', validate: value => value === watch('password') || 'Las contraseñas no coinciden' })}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                />
              </Grid>
            </>
          )}
          <Grid item xs={12} mt={2}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              {isValidCode ? 'Reiniciar Clave' : 'Validar'}
            </Button>
          </Grid>
          {successMessage && <Typography color="success.main" mt={2}>{successMessage}</Typography>}
          {errorMessage && <Typography color="error" mt={2}>{errorMessage}</Typography>}
        </Grid>
      </Grid>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Validar Código</DialogTitle>
        <DialogContent>
          <Typography>Ingrese el código de 6 dígitos enviado a su correo:</Typography>
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            type="text"
            inputProps={{ maxLength: 6, pattern: '[0-9]*' }}
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCodeValidation} color="primary">Validar</Button>
          <Button onClick={() => setOpenDialog(false)} color="secondary">Cerrar</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
