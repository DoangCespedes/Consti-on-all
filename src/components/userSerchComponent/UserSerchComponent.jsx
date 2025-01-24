import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Typography,
  MenuItem,
} from '@mui/material';

const UserSearchComponent = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Grid container spacing={2} justifyContent="center" sx={{ p: 2 }}>
      {/* Form Card */}
      <Grid item xs={12} sm={4}>
        <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
              Usuarios
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    select
                    fullWidth
                    label="Tipo de identificación"
                    {...register('tipoIdentificacion')}
                  >
                    <MenuItem value="CC">Cédula de Ciudadanía</MenuItem>
                    <MenuItem value="TI">Tarjeta de Identidad</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Número de identificación"
                    {...register('numeroIdentificacion')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Código de Usuarios"
                    {...register('codigoUsuarios')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Nombres"
                    {...register('nombres')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Apellidos"
                    {...register('apellidos')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    select
                    fullWidth
                    label="Perfil"
                    {...register('perfil')}
                  >
                    <MenuItem value="admin">Administrador</MenuItem>
                    <MenuItem value="user">Usuario</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    sx={{ backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#115293' } }}
                  >
                    Buscar
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>

      {/* Data Table Card */}
      <Grid item xs={12} sm={8}>
        <Card sx={{ boxShadow: 3, borderRadius: 2, height: '100%' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
              Resultados de la búsqueda
            </Typography>
            <Typography variant="body2" color="text.secondary">
              No hay resultados
            </Typography>
            
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default UserSearchComponent;
