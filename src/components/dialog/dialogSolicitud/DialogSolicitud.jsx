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
  Button,
  Box,
  Card
} from '@mui/material';
import { Controller } from 'react-hook-form';
import SelectCustomer from '@/components/select/SelectCustomer';
import DialogError from '../dialogError/DialogError';
import SimpleTableWithSelected from '@/components/tables/simpleTableWithSelected/SimpleTableWithSelected';
import enfermedades from '../../../../JSON/enfermedades.JSON'
import tipoPoliza from '../../../../JSON/tipoPoliza.JSON'
import userColumns from '../../../../JSON/userColumns.JSON'
import subServicios from '../../../../JSON/subServicios.JSON'
import especialidadEstudios from '../../../../JSON/especialidadEstudios.JSON'
import proveedor from '../../../../JSON/proveedor.JSON'


const DialogSolicitud = ({
  open,
  onClose,
  selectedRow,
  formData,
  control,
  setValue,
  handleCheckboxChange,
  dropdownOptions,
  setFormData,
  setFechaDesde,
  fechaDesde,
  selectedRowTypePolicy,
  setSelectedRowTypePolicy,
  ordenes,
  setOrdenes,
  setShowReq,
  showReq
}) => {
  
  const [error, setError] = useState({ open: false, message: '' });
  const [showSubServicio, setShowSubServicio] = useState(null);
  const [showEspecialidad, setShowEspecialidad] = useState(null);
  const [showProveedor, setShowProveedor] = useState(null);
  

  const [newOrder, setNewOrder] = useState({
    enfermedad: '',
    subServicio: '',
    especialidad: '',
    proveedor: ''
  });
  

  const handleFechaChange = (e) => {
    const nuevaFecha = e.target.value;
    const fechaActual = new Date();
    const fechaLimite = new Date(fechaActual);
    // Restamos 5 días a la fecha actual
    fechaLimite.setDate(fechaLimite.getDate() - 5);
    
    const fechaActualISO = fechaActual.toISOString().split('T')[0];
    const fechaLimiteISO = fechaLimite.toISOString().split('T')[0];

    if (nuevaFecha > fechaActualISO) {
        setError({ open: true, message: 'No puedes seleccionar una fecha mayor a la actual' });
    } else if (nuevaFecha < fechaLimiteISO) {
        setError({ open: true, message: 'No puedes seleccionar una fecha menor a 5 días antes de la fecha actual' });
    } else {
        setFechaDesde(nuevaFecha);
        setValue('fechaDesde', nuevaFecha);
        setError({ open: false, message: '' }); // Limpiar error si la fecha es válida
    }
};

  if (!selectedRow) return null;

  const handleSubmit = () => {
    if (!fechaDesde) {
      setError({ open: true, message: 'Por favor, selecciona una fecha' });
      return;
    }
  
    const submitData = {
      ...formData,
      fechaDesde: fechaDesde,
      tipoPoliza: selectedRowTypePolicy,
      ordenes: ordenes // Agregado para mostrar las órdenes en el submit
    };
  
    console.log(submitData, 'AQUI FUE'); 
  };


  const handleAddOrder = () => {
    if (!newOrder.enfermedad || !newOrder.subServicio || !newOrder.especialidad || !newOrder.proveedor) {
      setError({ open: true, message: 'Por favor, completa todos los campos antes de agregar la orden' });
      return;
    }

    setOrdenes(prevOrdenes => [...prevOrdenes, newOrder]);

    // Limpiar inputs de nueva orden
    setNewOrder({
      enfermedad: '',
      subServicio: '',
      especialidad: '',
      proveedor: '',
    });
  };


  const handleDeleteOrder = (index) => {
    setOrdenes(prevOrdenes => prevOrdenes.filter((_, i) => i !== index));
  };

const handleSelectChange = (name) => (event) => {
    const { value } = event.target;

    // Actualiza el estado de newOrder en lugar de formData
    setNewOrder((prevData) => ({ ...prevData, [name]: value }));
  
    // Controlar visibilidad de selects
    if (name === 'enfermedad') {
      setShowSubServicio(value);
    } else if (name === 'subServicio') {
      setShowEspecialidad(value);
    } else if (name === 'especialidad') {
      setShowProveedor(value);
    }else if (name === 'proveedor') {
      setShowReq(value);
    }
  
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth sx={{ marginTop: '3rem' }}>
        <DialogTitle>
          Nueva Solicitud de AMP para {selectedRow.first_name} {selectedRow.last_name}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} md={4}>
              <TextField fullWidth label="Asegurado" value={selectedRow.first_name} disabled />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField fullWidth label="Apellido" value={selectedRow.last_name} disabled />
            </Grid>
            <Grid item xs={12} md={1}>
              <TextField fullWidth label="Tipo ID" value={selectedRow.tipoid} disabled />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField fullWidth label="Número de ID" value={selectedRow.p_numid} disabled />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField fullWidth label="Número de Póliza" value={selectedRow.Numero_de_poliza} disabled />
            </Grid>

            <Grid item xs={6} md={4}>
              <Controller
                name="ciudad"
                control={control}
                defaultValue={formData.ciudad}
                render={({ field }) => (
                  <SelectCustomer
                    {...field}
                    options={dropdownOptions}
                    placeholder="Ciudad" 
                    onChange={(value) => {
                      field.onChange(value);  
                      setFormData((prevData) => ({ ...prevData, ciudad: value.target.value }));
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={6} md={4}>
              <TextField
                type="date"
                fullWidth
                label="Fecha desde"
                InputLabelProps={{ shrink: true }}
                value={fechaDesde}
                onChange={handleFechaChange}
              />
            </Grid>

            {fechaDesde && (
              <>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <SimpleTableWithSelected
                      title="Polizas"
                      columns={userColumns}
                      tableData={tipoPoliza}
                      setSelectedRowTypePolicy={setSelectedRowTypePolicy}
                      selectedRowTypePolicy={selectedRowTypePolicy}
                    />
                  </FormControl>
                </Grid>

                {selectedRowTypePolicy != null && (
                  <>
                    <Grid container padding={2} spacing={2} mt={1}>
                    <Grid item xs={12} md={3}>
              <InputLabel>Enfermedad</InputLabel>
              <SelectCustomer
                value={newOrder.enfermedad}
                onChange={handleSelectChange('enfermedad')}
                options={enfermedades}
                label="Enfermedad"
              />
            </Grid>

            {/* Campo para seleccionar el sub servicio */}
            {showSubServicio != null && (
              <Grid item xs={12} md={3}>
                <InputLabel>Sub servicio</InputLabel>
                <SelectCustomer
                  value={newOrder.subServicio}
                  onChange={handleSelectChange('subServicio')}
                  options={subServicios}
                  label="Sub servicio"
                />
              </Grid>
            )}

            {/* Campo para seleccionar la especialidad */}

            {showEspecialidad != null && (
              <Grid item xs={12} md={3}>
                <InputLabel>Especialidad / Estudio</InputLabel>
                <SelectCustomer
                  value={newOrder.especialidad}
                  onChange={handleSelectChange('especialidad')}
                  options={especialidadEstudios}
                  label="Especialidad / Estudio"
                />
              </Grid>
            )}
            {/* Campo para seleccionar el proveedor */}

            {showProveedor != null && (
            <Grid item xs={12} md={3}>
              <InputLabel>Proveedor de Salud</InputLabel>
              <SelectCustomer
                value={newOrder.proveedor}
                onChange={handleSelectChange('proveedor')}
                options={proveedor}
                label="Proveedor de Salud"
              />
            </Grid>
            )}
          </Grid>
                      
                  
                  </>
                )}
              </>
            )}
          </Grid>

          {showReq != null && (
            <Button variant="contained" color="primary" onClick={handleAddOrder}>
              Agregar Orden
            </Button>
          )}

          <Box mt={2}>
            {ordenes.map((orden, index) => (
              <Box key={index} display="flex" alignItems="center" justifyContent="space-between" mt={1}>
                <Button variant="outlined" color="secondary" fullWidth>
                  Orden {index + 1}: Enfermedad: {orden.enfermedad}, Sub Servicio: {orden.subServicio}, Especialidad: {orden.especialidad}, Proveedor: {orden.proveedor}
                </Button>
                <Button variant="outlined" color="error" onClick={() => handleDeleteOrder(index)} size="small" style={{ marginLeft: '10px' }}>
                  Eliminar
                </Button>
              </Box>
            ))}
          </Box>

        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Enviar Solicitud
          </Button>
        </DialogActions>
      </Dialog>

      <DialogError open={error.open} onClose={() => setError({ open: false, message: '' })} message={error.message} />
    </>
  );
};

export default DialogSolicitud;