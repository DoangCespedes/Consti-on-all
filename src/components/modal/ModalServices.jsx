import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Box,
  Button,
  Typography,
} from '@mui/material';

const ModalServices = ({ open, onClose, tipoSolicitud, proveedor }) => {
  const [formData, setFormData] = useState({
    asegurado: '',
    ciudad: '',
    tipoPoliza: '',
    enfermedad: '',
    subServicio: '',
    especialidad: '',
    proveedorSalud: '',
    telefono: '',
    correo: '',
    recados: {
      cedula: false,
      informeMedico: false,
      ordenInterconsulta: false,
      referencia: false,
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      recados: {
        ...formData.recados,
        [name]: checked,
      },
    });
  };

  const handleSubmit = () => {
    console.log('Form Data:', formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Nueva Solicitud de {tipoSolicitud} con la empresa {proveedor}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Asegurado"
              name="asegurado"
              value={formData.asegurado}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Ciudad"
              name="ciudad"
              value={formData.ciudad}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Tipo de Póliza</InputLabel>
              <Select
                name="tipoPoliza"
                value={formData.tipoPoliza}
                onChange={handleInputChange}
              >
                <MenuItem value="colectiva1">Colectiva 1</MenuItem>
                <MenuItem value="colectiva2">Colectiva 2</MenuItem>
                <MenuItem value="individual">Individual</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Enfermedad</InputLabel>
              <Select
                name="enfermedad"
                value={formData.enfermedad}
                onChange={handleInputChange}
              >
                <MenuItem value="enfermedad1">Enfermedad 1</MenuItem>
                <MenuItem value="enfermedad2">Enfermedad 2</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Sub Servicio</InputLabel>
              <Select
                name="subServicio"
                value={formData.subServicio}
                onChange={handleInputChange}
              >
                <MenuItem value="sub1">Sub Servicio 1</MenuItem>
                <MenuItem value="sub2">Sub Servicio 2</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Especialidad / Estudio</InputLabel>
              <Select
                name="especialidad"
                value={formData.especialidad}
                onChange={handleInputChange}
              >
                <MenuItem value="especialidad1">Especialidad 1</MenuItem>
                <MenuItem value="especialidad2">Especialidad 2</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Proveedor de Salud</InputLabel>
              <Select
                name="proveedorSalud"
                value={formData.proveedorSalud}
                onChange={handleInputChange}
              >
                <MenuItem value="proveedor1">Proveedor 1</MenuItem>
                <MenuItem value="proveedor2">Proveedor 2</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Número de Teléfono"
              name="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Correo Electrónico"
              name="correo"
              value={formData.correo}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">Recados a Consignar:</Typography>
            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    name="cedula"
                    checked={formData.recados.cedula}
                    onChange={handleCheckboxChange}
                  />
                }
                label="Cédula de Identidad"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="informeMedico"
                    checked={formData.recados.informeMedico}
                    onChange={handleCheckboxChange}
                  />
                }
                label="Informe Médico"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="ordenInterconsulta"
                    checked={formData.recados.ordenInterconsulta}
                    onChange={handleCheckboxChange}
                  />
                }
                label="Orden de Interconsulta"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="referencia"
                    checked={formData.recados.referencia}
                    onChange={handleCheckboxChange}
                  />
                }
                label="Referencia e Indicaciones Médicas"
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">Carga de Recados Requeridos:</Typography>
            <Button variant="contained" component="label">
              Examinar
              <input hidden type="file" />
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Solicitar Orden AMP
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalServices;
