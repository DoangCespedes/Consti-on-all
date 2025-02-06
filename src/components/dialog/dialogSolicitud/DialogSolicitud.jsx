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
  Typography
} from '@mui/material';
import { Controller } from 'react-hook-form';
import SelectCustomer from '@/components/select/SelectCustomer';
import DialogError from '../dialogError/DialogError';
import SimpleTableWithSelected from '@/components/tables/simpleTableWithSelected/SimpleTableWithSelected';

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
  setSelectedRowTypePolicy
}) => {
  
  const [error, setError] = useState({ open: false, message: '' });

   // Estados para manejar visibilidad de selects
   const [showSubServicio, setShowSubServicio] = useState(null);
   const [showEspecialidad, setShowEspecialidad] = useState(null);
   const [showProveedor, setShowProveedor] = useState(null);
   const [showReq, setShowReq] = useState(null);
   const [ordenes, setOrdenes] = useState([]);

  const handleFechaChange = (e) => {
    const nuevaFecha = e.target.value;
    const fechaActual = new Date().toISOString().split('T')[0];

    if (nuevaFecha > fechaActual) {
      setError({ open: true, message: 'No puedes seleccionar una fecha mayor a la actual' });
    } else {
      setFechaDesde(nuevaFecha);    
      setValue('fechaDesde', nuevaFecha); 
    }
  };

  
  if (!selectedRow) return null;

  const tipoPoliza = [
    {id:1,type:'colectiva', client:'Instituto Aereopuerto Internacional Maiquetia' },
    {id:2,type:'colectiva', client:'Contraloria Municipal de Baruta' }
  ]

  const userColumns = [
    { field: 'type', headerName: 'Tipo de poliza' },
    { field: 'client', headerName: 'Nombre del contratante' }
  ];


const handleSubmit = () => {
    if (!fechaDesde) {
      setError({ open: true, message: 'Por favor, selecciona una fecha' });
      return;
    }
  
    const submitData = {
      ...formData,
      fechaDesde: fechaDesde,
      tipoPoliza: selectedRowTypePolicy,
      
    };
  
    console.log(submitData); 
  };

  const enfermedades = [
    { label: 'fiebre', value: '001' },
    { label: 'gripe', value: '002' },
    { label: 'dolor de estomago', value: '003' },
    { label: 'diarrea', value: '003' },
    { label: 'vomitos', value: '004' },
    { label: 'infeccion', value: '005' }
  ]

  const subServicios = [
    { label: 'Medicina preventiva', value: '001' },
    { label: 'Evaluacion medica', value: '002' },
    { label: 'Examenes', value: '003' },
  ]

  const especialidadEstudios = [
    { label: 'Eco abdominal', value: '001' },
    { label: 'Tomografia', value: '002' },
    { label: 'Lavado de oidos', value: '003' },
  ]

  const Proveedor = [
    { label: 'Clinica Arboleda', value: '001' },
    { label: 'Clinica Caracas', value: '002' },
    { label: 'Asistanet', value: '003' },
  ]


  // Función para manejar el envío de la orden
  const handleAddOrder = () => {
    if (!fechaDesde) {
      setError({ open: true, message: 'Por favor, selecciona una fecha' });
      return;
    }

    const newOrder = {
        fechaDesde,
        tipoPoliza: selectedRowTypePolicy,
        ciudad: formData.ciudad,
        enfermedad: formData.enfermedad,
        subServicio: formData.subServicio,
        especialidad: formData.especialidad,
        proveedor: formData.proveedor,
        recados: {...formData.recados} // Copia del objeto de recados
      };
  
      setOrdenes(prevOrdenes => [...prevOrdenes, newOrder]);

      // Limpiar campos después de agregar la orden
    setFormData({
        ciudad: '',
        enfermedad: '',
        subServicio: '',
        especialidad: '',
        proveedor: '',
        recados: {
          cedula: false,
          informeMedico: false,
          ordenInterconsulta: false,
          referencia: false,
        }
      });
      setFechaDesde('');
      setSelectedRowTypePolicy(null);
    };
    // Función para eliminar una orden
  const handleDeleteOrder = (index) => {
    setOrdenes(prevOrdenes => prevOrdenes.filter((_, i) => i !== index));
  };





  // Función para manejar los cambios en los selects
  const handleSelectChange = (name) => (event) => {
    const { value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

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
      console.log(showReq, 'TEST1')
      console.log(showReq, 'TEST2')
      console.log(showReq, 'TEST3')
      console.log(showReq, 'TEST4')
  };


  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth sx={{ marginTop: '3rem' }}>
        <DialogTitle>
          Nueva Solicitud de AMP para {selectedRow.first_name} {selectedRow.last_name}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} mt={1}>
            {/* Campos de texto deshabilitados */}
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

            {/* Campo para seleccionar Ciudad */}
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

            {/* Campo para Fecha */}
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

            {/* Tipo de Póliza sólo si hay fecha seleccionada */}
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
                          onChange={handleSelectChange('enfermedad')}
                          options={enfermedades}
                          label="Enfermedad"
                        />
                      </Grid>

                      {showSubServicio != null && (
                        <Grid item xs={12} md={3}>
                          <InputLabel>Sub servicio</InputLabel>
                          <SelectCustomer
                            onChange={handleSelectChange('subServicio')}
                            options={subServicios}
                            label="Sub servicio"
                          />
                        </Grid>
                      )}

                      {showEspecialidad != null && (
                        <Grid item xs={12} md={3}>
                          <InputLabel>Especialidad / Estudio</InputLabel>
                          <SelectCustomer
                            onChange={handleSelectChange('especialidad')}
                            options={especialidadEstudios}
                            label="Especialidad / Estudio"
                          />
                        </Grid>
                      )}
                      {showProveedor != null && (
                        <Grid item xs={12} md={3}>
                          <InputLabel>Proveedor de Salud</InputLabel>
                          <SelectCustomer
                            onChange={handleSelectChange('proveedor')}
                            options={Proveedor}
                            label="Proveedor de Salud"
                          />
                        </Grid>
                      )}
                    </Grid>

                    {showReq != null && (
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1">Recados a Consignar:</Typography>
                        <Box>
                          {['cedula', 'informeMedico', 'ordenInterconsulta', 'referencia'].map((recado) => (
                            <FormControlLabel
                              key={recado}
                              control={<Checkbox checked={formData.recados[recado]} onChange={handleCheckboxChange} name={recado} />}
                              label={recado.charAt(0).toUpperCase() + recado.slice(1).replace(/([A-Z])/g, ' $1')}
                            />
                          ))}
                        </Box>
                      </Grid>
                    )}
                  </>
                )}
              </>
            )}
          </Grid>

          {/* Botón para agregar nueva orden */}
          <Button variant="contained" color="primary" onClick={handleAddOrder}>
            +
          </Button>

          {/* Mostrar órdenes */}
          <Box mt={2}>
            {ordenes.map((orden, index) => (
              <Box key={index} display="flex" alignItems="center" justifyContent="space-between" mt={1}>
                <Button variant="outlined" color="secondary" fullWidth>
                  Orden {index + 1}: {orden.fechaDesde}, {orden.ciudad}, {orden.enfermedad}, {orden.subServicio}, {orden.especialidad}, {orden.proveedor}
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

      {/* DialogError para mostrar errores */}
      <DialogError open={error.open} onClose={() => setError({ open: false, message: '' })} message={error.message} />
    </>
  );
};

export default DialogSolicitud;