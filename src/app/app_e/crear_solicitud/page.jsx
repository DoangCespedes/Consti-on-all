'use client'

import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
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
  CardContent,
  Card,
} from '@mui/material';
import { HeaderButtons } from '@/components/cards/HeaderButtons';
import SimpleTable from '@/components/tables/simpleTable/SimpleTable';

const CrearSolicitud = () => {
  const [tipoSolicitud, setTipoSolicitud] = useState('');
  const [dirigidoA, setDirigidoA] = useState('');
  const [proveedor, setProveedor] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const TestTitular = 'Megan Fox'

  const handleRowSelect = (row) => {
    setSelectedRow(row); // Actualizamos el estado del padre con la fila seleccionada
    console.log('Fila seleccionada en el padre:', row.name); // Mostramos la fila en la consola
  };

   // Manejar cambios en los valores seleccionados
  const handleTipoSolicitudChange = (newValue) => {
    setTipoSolicitud(newValue);
  };
   // Manejar cambios en los valores seleccionados 
  const handleDirigidoChange = (newValue) => {
    setDirigidoA(newValue);
  };

  const handleProveedorChange = (newValue) => {
    setProveedor(newValue);
  };

  // Estado para los campos del formulario
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

  // Manejar cambios en los campos
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      recados: { ...formData.recados, [name]: checked },
    });
  };

  // Abrir y cerrar modal
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const buttons = [
    {
      title: 'Tipo de solicitud',
      color: '#4caf50',
      iconColor: '#4caf50',
      dropdownOptions: [
        { label: 'Atención Médica Primaria', value: 'atencion_medica_primaria' },
        { label: 'Reembolso de Salud', value: 'reembolso_salud' },
        { label: 'Carta Aval', value: 'carta_aval' },
        { label: 'Emergencia', value: 'emergencia' },
        { label: 'Orden de Farmacia', value: 'orden_farmacia' },
      ],
      onChange: (e) => handleTipoSolicitudChange(e.target.value),
    },
  ];
  const buttons2 = [
    {
      title: 'A quien va dirigido',
      color: '#124567',
      iconColor: '#124567',
      dropdownOptions: [
        { label: 'Solicitar un servicio para mi', value: 'titular' },
        { label: 'Solicitar un servicio para mis dependientes', value: 'beneficiario' },
      ],
      onChange: (e) => handleDirigidoChange(e.target.value),
    },
  ];

  const userData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
  ];
  
  const userColumns = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name' },
    { field: 'email', headerName: 'Email' },
    { field: 'status', headerName: 'Status' },
  ];

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
        Crear Solicitud
      </Typography>
      
      {/* Tarjeta que contiene los botones de selección */}
      <Card sx={{ mb: 4, p: 2 }}>
        <CardContent>
          {tipoSolicitud === '' &&
          
            <HeaderButtons buttons={buttons} />
          }

          {tipoSolicitud !='' &&
          
            <HeaderButtons buttons={buttons2} />
          }
          
          <Button variant="contained" color="primary" onClick={handleOpenModal}>
            Solicitar Servicio
          </Button>
          <Button 
            sx={{ marginLeft:'20rem'}}
            variant="contained" 
            color="primary" 
            onClick={() => setTipoSolicitud('')}>
            Volver a Seleccionar Servicio
          </Button>

          
        </CardContent>
      </Card>
      {dirigidoA === 'beneficiario' && tipoSolicitud != '' &&

      <Card sx={{ mb: 4, p: 2 }}>
        <CardContent>
        
            <SimpleTable
              title="User List"
              columns={userColumns}
              tableData={userData}
              onRowSelect={handleRowSelect} // Pasamos la función al hijo
            />
  
          

          {selectedRow && (
            <div style={{ marginTop: '20px' }}>
              <h3>Detalles de la Fila Seleccionada:</h3>
              <pre>{JSON.stringify(selectedRow, null, 2)}</pre>
            </div>
          )}
        </CardContent>
      </Card>
    }
      {/* <InboxTable items={inboxItems} /> */}

      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md" fullWidth sx={{marginTop:'3rem'}}>
        <DialogTitle>Nueva Solicitud de {tipoSolicitud} para el {dirigidoA}:{dirigidoA === 'titular' ? TestTitular : selectedRow?.name || 'Sin seleccionar'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {/* Primera fila */}
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

            {/* Segunda fila */}
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

            {/* Tercera fila */}
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

            {/* Cuarta fila */}
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

            {/* Quinta fila */}
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
          <Button onClick={handleCloseModal} color="secondary">
            Cancelar
          </Button>
          <Button variant="contained" color="primary">
            Solicitar Orden {tipoSolicitud}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CrearSolicitud;
