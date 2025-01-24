"use client";
import { useState } from 'react';
import { Box, Button, Grid, Tab, Tabs, TextField, Typography, Card, CardContent, FormControl, InputLabel } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import SelectCustomer from '../select/SelectCustomer';
import { InboxTable } from '../tables/InboxTable';

const inboxItems = [
    // Procesados
    {
      orderNumber: '1964561-0',
      service: 'Atención Médica Primaria',
      provider: 'Asistanet',
      policy: '12345678',
      ci: 'V-12345678',
      insuredName: 'Gabriela Josefina Brito Perez',
      status: { label: 'PROCESADO', color: '#809D3C', value: 'Procesados' },
      date: '18-12-2024 01:22:00 pm',
    },
    {
      orderNumber: '1964562-0',
      service: 'Emergencia',
      provider: 'Caravana',
      policy: '87654321',
      ci: 'V-87654321',
      insuredName: 'Andrea Carolina D\'Gregorio Brito',
      status: { label: 'PROCESADO', color: '#809D3C', value: 'Procesados' },
      date: '18-12-2024 02:45:10 pm',
    },
    {
      orderNumber: '1964563-0',
      service: 'Orden de Farmacia',
      provider: 'Botimarket',
      policy: '45678912',
      ci: 'V-45678912',
      insuredName: 'D\'Gregorio Jesus',
      status: { label: 'PROCESADO', color: '#809D3C', value: 'Procesados' },
      date: '17-12-2024 03:23:50 pm',
    },
    {
      orderNumber: '1964564-0',
      service: 'Atención Médica Primaria',
      provider: 'Asistanet',
      policy: '23456789',
      ci: 'V-23456789',
      insuredName: 'Jose Antonio Martinez',
      status: { label: 'PROCESADO', color: '#809D3C', value: 'Procesados' },
      date: '16-12-2024 11:15:30 am',
    },
    {
      orderNumber: '1964565-0',
      service: 'Emergencia',
      provider: 'Caravana',
      policy: '87654321',
      ci: 'V-87654321',
      insuredName: 'Laura Patricia Suarez',
      status: { label: 'PROCESADO', color: '#809D3C', value: 'Procesados' },
      date: '17-12-2024 08:15:00 am',
    },
  
    // En Proceso
    {
      orderNumber: '1964566-0',
      service: 'Atención Médica Primaria',
      provider: 'Asistanet',
      policy: '11223344',
      ci: 'V-11223344',
      insuredName: 'Maria Fernandez',
      status: { label: 'EN PROCESO', color: '#213555', value: 'En proceso' },
      date: '17-12-2024 10:30:00 am',
    },
    {
      orderNumber: '1964567-0',
      service: 'Emergencia',
      provider: 'Caravana',
      policy: '33445566',
      ci: 'V-33445566',
      insuredName: 'Carlos Alberto Reyes',
      status: { label: 'EN PROCESO', color: '#213555', value: 'En proceso' },
      date: '16-12-2024 09:15:20 am',
    },
    {
      orderNumber: '1964568-0',
      service: 'Orden de Farmacia',
      provider: 'Botimarket',
      policy: '55667788',
      ci: 'V-55667788',
      insuredName: 'Luisa Mariana Gutierrez',
      status: { label: 'EN PROCESO', color: '#213555', value: 'En proceso' },
      date: '16-12-2024 03:45:15 pm',
    },
    {
      orderNumber: '1964569-0',
      service: 'Atención Médica Primaria',
      provider: 'Asistanet',
      policy: '77889900',
      ci: 'V-77889900',
      insuredName: 'Manuel Sanchez',
      status: { label: 'EN PROCESO', color: '#213555', value: 'En proceso' },
      date: '17-12-2024 04:55:30 pm',
    },
  
    // Pendientes
    {
      orderNumber: '1964570-0',
      service: 'Orden de Farmacia',
      provider: 'Botimarket',
      policy: '99887766',
      ci: 'V-99887766',
      insuredName: 'Alejandro Gomez',
      status: { label: 'PENDIENTE', color: '#FFE001' ,value: 'Pendientes'},
      date: '17-12-2024 06:10:45 pm',
    },
    {
      orderNumber: '1964571-0',
      service: 'Emergencia',
      provider: 'Caravana',
      policy: '66778899',
      ci: 'V-66778899',
      insuredName: 'Sofia Lopez',
      status: { label: 'PENDIENTE', color: '#FFE001' ,value: 'Pendientes'},
      date: '17-12-2024 08:20:00 am',
    },
    {
      orderNumber: '1964572-0',
      service: 'Atención Médica Primaria',
      provider: 'Asistanet',
      policy: '55443322',
      ci: 'V-55443322',
      insuredName: 'Juan Pablo Torres',
      status: { label: 'PENDIENTE', color: '#FFE001' ,value: 'Pendientes'},
      date: '18-12-2024 07:15:30 pm',
    },
  
    // Rechazados
    {
      orderNumber: '1964573-0',
      service: 'Emergencia',
      provider: 'Caravana',
      policy: '44332211',
      ci: 'V-44332211',
      insuredName: 'Lorena Ramirez',
      status: { label: 'RECHAZADO', color: '#F93827' ,value: 'Rechazados'},
      date: '16-12-2024 01:30:00 pm',
    },
    {
      orderNumber: '1964574-0',
      service: 'Atención Médica Primaria',
      provider: 'Asistanet',
      policy: '33441122',
      ci: 'V-33441122',
      insuredName: 'Fernando Castillo',
      status: { label: 'RECHAZADO', color: '#F93827' ,value: 'Rechazados'},
      date: '17-12-2024 10:15:00 am',
    },
    {
      orderNumber: '1964575-0',
      service: 'Orden de Farmacia',
      provider: 'Botimarket',
      policy: '22113344',
      ci: 'V-22113344',
      insuredName: 'Elena Paredes',
      status: { label: 'RECHAZADO', color: '#F93827' ,value: 'Rechazados'},
      date: '16-12-2024 02:25:00 pm',
    },
    {
      orderNumber: '1964576-0',
      service: 'Emergencia',
      provider: 'Caravana',
      policy: '11223344',
      ci: 'V-11223344',
      insuredName: 'Diego Morales',
      status: { label: 'RECHAZADO', color: '#F93827' ,value: 'Rechazados'},
      date: '18-12-2024 12:10:00 pm',
    },
  ];
  

export default function SolicitudesPorServicio() {
  const [tabValue, setTabValue] = useState(0);
  const [status, setStatus] = useState();
  const { control, handleSubmit } = useForm();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);

  };

  const handleStatus = (selectedStatus) => {
    
    setStatus(selectedStatus); // Actualizamos el estado con el título del status seleccionado
};
// Datos de los servicios
const tabFilters = [
    { label: "GENERAL", service: "" },
    { label: "EMERGENCIA", service: "Emergencia" },
    { label: "ATENCIÓN MÉDICA PRIMARIA", service: "Atención Médica Primaria" },
    { label: "FARMACIA", service: "Orden de Farmacia" },
  ];

  const statuses = [
    { title: 'Procesados', color: 'success'},
    { title: 'En proceso', color: 'primary'},
    { title: 'Pendientes', color: 'warning'},
    { title: 'Rechazados', color: 'error'},
  ];

  const dropdownOptions = [
    { label: 'Asistanet', value: 'asistanet' },
    { label: 'Dentalnet', value: 'dentalnet' },
    { label: 'Caravana', value: 'caravana' },
    { label: 'Oftalnet', value: 'oftalnet' },
    { label: 'RPF', value: 'rpf' }
  ]

  const onSubmit = (data) => {
    const documentoCompleto = `${data.tipoDocumento || ''}${data.numeroDocumento || ''}`;
    const resultado = { ...data, documentoCompleto };
    console.log('Datos del formulario:', resultado);
};

// Filtra los elementos de la tabla según la pestaña activa
const selectedService = tabFilters[tabValue].service;



const countItemsByStatus = (selectedService) => {
    return inboxItems
      .filter((item) => !selectedService || item.service === selectedService) // Filtra por el servicio seleccionado si está definido
      .reduce((statusCounts, item) => {
        // Cuenta los elementos según su status
        const status = item.status.value;
        statusCounts[status] = (statusCounts[status] || 0) + 1;
        return statusCounts;
      }, {}); // Inicia con un objeto vacío
  };
  
  // Usar la función para obtener el conteo de elementos por status
  const itemsByStatus = countItemsByStatus(selectedService);
  
  console.log("Conteo de elementos por status:", itemsByStatus);
  
  return (
    
    <>
    <Box sx={{ padding: 3 }}>
      {/* <Typography variant="h5" gutterBottom>
        Buscar solicitudes de ordenes por servicio
      </Typography> */}
      

      {/* Filtros */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} sx={{ marginBottom: 3 }}>
          <Grid item xs={6} md={2}>
            <Controller
              name="fechaDesde"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  type="date"
                  fullWidth
                  label="Fecha desde"
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Grid>
          <Grid item xs={6} md={2}>
            <Controller
              name="fechaHasta"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  type="date"
                  fullWidth
                  label="Fecha hasta"
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Grid>
          <Grid item xs={6} md={2}>
            <Controller
              name="proveedor"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <SelectCustomer
                  {...field}
                  options={dropdownOptions}
                  placeholder="Proveedor"
                />
              )}
            />
          </Grid>
          <Grid item xs={4} md={1}>
            <Controller
              name="tipoDocumento"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <SelectCustomer
                  {...field}
                  options={[
                    { label: 'V', value: 'V' },
                    { label: 'J', value: 'J' },
                    { label: 'E', value: 'E' },
                  ]}
                  placeholder="Tipo"
                />
              )}
            />
          </Grid>
          <Grid item xs={6} md={2}>
            <Controller
              name="numeroDocumento"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Número de documento"
                  variant="outlined"
                  fullWidth
                  type="number"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={2} sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Buscar
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Tabs */}
      <div style={{display:'flex', justifyContent:'center'}}>

      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        sx={{ marginBottom: "16px" }}
      >
        {tabFilters.map((tab, index) => (
          <Tab key={index} label={tab.label} />
        ))}
      </Tabs>
      </div>

      {/* Tarjetas de estatus */}
      <Grid container spacing={2} sx={{ marginTop: 3 }}>
        {statuses.map((status, index) => {
            const count = itemsByStatus[status.title] || 0; 
            return (
            <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                style={{ cursor: 'pointer' }}
                onClick={() => handleStatus(status.title)}
                >
                <CardContent>
                    <Typography 
                    variant="h6" 
                    color={`${status.color}.main`} 
                    gutterBottom
                    >
                    {status.title}
                    </Typography>
                    <Typography variant="h4" gutterBottom>
                    {count} {/* Renderiza el conteo */}
                    </Typography>
                </CardContent>
                </Card>
            </Grid>
            );
        })}
        </Grid>


      <InboxTable
        items={inboxItems} 
        selectedStatus={status}
        selectedService={selectedService}
      />
    </Box>
</>
  );
}
