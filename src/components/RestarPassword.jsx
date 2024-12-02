'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Typography, Container, MenuItem, FormControl, InputLabel, Select, Grid, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function RestarPassword() {
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [codeInput, setCodeInput] = useState('');  // Estado para el código ingresado
  const [successMessage, setSuccessMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [codeFromServer, setCodeFromServer] = useState('');
  const [isValidCode, setIsValidCode] = useState(false);
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    defaultValues: {
      tipoDocumento: 'V',
    },
  });

  const router = useRouter();

  const tipoDocumento = watch('tipoDocumento', 'V');

  const handleChange = (event) => {
    setValue('tipoDocumento', event.target.value);
  };

  const onSubmit = async (data) => {
    const userId = `${data.tipoDocumento}${data.numeroDocumento}`;
    try {
      const response = await axios.post('http://localhost:7000/api/usuarios/buscar', {
        nombre: userId,
      });

      if (response.status === 200 && isValidCode === false) {
        const res = await axios.post('http://localhost:7000/api/emails/send-code', {
          email: response.data.usuario.correo,
        });

        let code = res.data.code;
        setCodeFromServer(code);
        setOpenDialog(true);
        setSuccessMessage('Enviamos un código a su correo. Por favor, verifique su bandeja de entrada.');
      } else {
        setErrorMessage('Usuario no encontrado.');
      }
    } catch (error) {
      console.error('Error al hacer la solicitud:', error);
      setErrorMessage('Hubo un error al procesar la solicitud.');
    }
    
  };

  const handleCodeValidation = (codeInput, codeFromServer) => {

    if (String(codeInput) === String(codeFromServer)) {
      setIsValidCode(true); // Establecemos la validación como verdadera
      setErrorMessage(''); // Limpiamos cualquier mensaje de error
      setSuccessMessage('Código validado correctamente.'); // Mensaje de éxito
      setOpenDialog(false);
    } else {
      // setIsValidCode(false); // La validación falla
      setSuccessMessage(''); // Limpiamos cualquier mensaje de éxito
      setErrorMessage('El código ingresado es incorrecto.'); // Mensaje de error
    }
  };
  
  // console.log(codeInput, "codeInput")
  console.log(codeFromServer, "codeFromServer")
  // console.log(isValidCode, "isValidCode")

  const RestarPassword = () =>{
    console.log(" RestarPassword ")
  }

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
            Reiniciar Clave
          </Typography>
        </Grid>

        <Grid item xs={12} component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Tipo</InputLabel>
                <Select
                  value={tipoDocumento}
                  onChange={handleChange}
                  label="Tipo"
                >
                  {['V', 'J', 'E'].map((tipo) => (
                    <MenuItem key={tipo} value={tipo}>{tipo}</MenuItem>
                  ))}
                </Select>
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

          
          

          {isValidCode === true ?

            <>
            <Grid item mt={2}>
              <Typography  color="black" mb={2}>
                Por favor intruduzca su nueva clave
              </Typography>
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
            
                <Grid item xs={12} mt={2}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={RestarPassword}
                  >
                    Reiniciar clave
                  </Button>
                </Grid>
            </>
          


                :
                
                <Grid item xs={12} mt={2}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    VALIDAR
                  </Button>
                </Grid>
          }

          {successMessage && (
            <Grid item xs={12} mt={1}>
              <Typography color="success.main">{successMessage}</Typography>
            </Grid>
          )}

          {errorMessage && (
            <Grid item xs={12} mt={1}>
              <Typography color="error">{errorMessage}</Typography>
            </Grid>
          )}
        </Grid>
      </Grid>

      {/* Modal de validación */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Validar Código</DialogTitle>
        <DialogContent>
          <Typography>Ingrese el código de 6 dígitos enviado a su correo:</Typography>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleCodeValidation(codeInput, codeFromServer);
          }}>
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              type="text"
              inputProps={{ maxLength: 6, pattern: "[0-9]*" }} // Restringe la longitud a 6 y asegura que sean solo dígitos
              value={codeInput} // Aquí se guarda el valor actual del código ingresado
              onChange={(e) => setCodeInput(e.target.value)} // Actualiza el estado al escribir
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleCodeValidation(codeInput, codeFromServer)} // Llama a la función solo cuando el usuario haga clic en "Validar"
            color="primary"
          >
            Validar
          </Button>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cerrar
          </Button>
        </DialogActions>
          {errorMessage && (
            <Grid item xs={12} mt={1}>
              <Typography color="error">{errorMessage}</Typography>
            </Grid>
          )}
      </Dialog>

    </Container>
  );
}
