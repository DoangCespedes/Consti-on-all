"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Grid, Box, Typography } from "@mui/material";

const UserSearchForm = ({ onSearch }) => {
  const { handleSubmit, control, reset } = useForm();

  const onSubmit = (data) => {
    onSearch(data); // Callback para manejar la búsqueda
  };

  return (
    <Box sx={{ padding: 3, maxWidth: 600, margin: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Buscar Usuarios
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {/* Nombre */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="nombre"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nombre"
                  fullWidth
                  variant="outlined"
                  placeholder="Ingrese el nombre"
                />
              )}
            />
          </Grid>
          {/* Perfil */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="perfil"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Perfil"
                  fullWidth
                  variant="outlined"
                  placeholder="Ingrese el perfil"
                />
              )}
            />
          </Grid>
          {/* Cédula */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="cedula"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Número de cédula"
                  fullWidth
                  variant="outlined"
                  type="number"
                  placeholder="Ingrese el número de cédula"
                />
              )}
            />
          </Grid>
          {/* Botones */}
          <Grid item xs={12} sm={6} display="flex" alignItems="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginRight: 1 }}
            >
              Buscar
            </Button>
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={() => reset()}
            >
              Limpiar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default UserSearchForm;
