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
// import SimpleTableWithSelected from '@/components/tables/simpleTableWithSelected/SimpleTableWithSelected';

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


  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth sx={{ marginTop: '3rem' }}>
        <DialogTitle>
          Nueva Solicitud de AMP para {selectedRow.first_name} {selectedRow.last_name}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
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
                                // onRowSelect={handleRowSelect}
                                setSelectedRowTypePolicy={setSelectedRowTypePolicy}
                                selectedRowTypePolicy={selectedRowTypePolicy}
                              />
                  </FormControl>
                </Grid>

                

                { selectedRowTypePolicy != null && 

                

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
                }
              </>
            )}
          </Grid>
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