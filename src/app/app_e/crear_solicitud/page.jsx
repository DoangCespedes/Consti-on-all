'use client';

import React from 'react';
// import { HeaderButtons } from './HeaderButtons';
// import { InboxTable } from './InboxTable';
import { Container, Typography } from '@mui/material';
import { HeaderButtons } from '@/components/cards/HeaderButtons';
import { InboxTable } from '@/components/tables/InboxTable';
// import Slider from '@/components/sliderCards/Slider';
import ResponsiveSlider from '@/components/sliderCards/ResponsiveSlider';

const crear_solicitud = () => {   
  const buttons = [
  
    {
      title: 'Crear solicitud',
      color: '#4caf50',
      iconColor: '#4caf50',
      dropdownOptions: [
        { label: 'Atención Médica Primaria', value: 'atencion_medica_primaria' },
        { label: 'Reembolso de Salud', value: 'reembolso_salud' },
        { label: 'Carta Aval', value: 'carta_aval' },
        { label: 'Emergencia', value: 'emergencia' },
        { label: 'Orden de Farmacia', value: 'orden_farmacia' },
      ],
      onChange: (e) => console.log('Seleccionaste:', e.target.value),
    },
    {
      title: 'Proveedor',
      color: '#4caf',
      iconColor: '#4caf',
      dropdownOptions: [
        { label: 'Asistanet', value: 'asistanet' },
        { label: 'Dentalnet', value: 'dentalnet' },
        { label: 'Caravana', value: 'caravana' },
        { label: 'Oftalnet', value: 'oftalnet' },
        { label: 'RPF', value: 'rpf' },
      ],
      onChange: (e) => console.log('Seleccionaste:', e.target.value),
    },
    {
      title: 'Estatus',
      color: '#fe2b5b',
      iconColor: '#fe2b5b',
      dropdownOptions: [
        { label: 'Procesado', value: 'procesado' },
        { label: 'En proceso', value: 'en_proceso' },
        { label: 'Pendiente', value: 'pendiente' },
        { label: 'Rechazado', value: 'rechazado' },
      ],
      onChange: (e) => console.log('Seleccionaste:', e.target.value),
    },
    
  ];
  const inboxItems = [
    {
      orderNumber: '1964567-0',
      service: 'Atención Médica Primaria',
      provider: 'Asistanet',
      policy: '12345678',
      ci: 'V-12345678',
      insuredName: 'Gabriela Josefina Brito Perez',
      status: { label: 'PROCESADO', color: '#809D3C' },
      date: '18-12-2024 02:22:42 pm',
    },
    {
      orderNumber: '1964566-0',
      service: 'Emergencia',
      provider: 'Caravana',
      policy: '87654321',
      ci: 'V-87654321',
      insuredName: 'Andrea Carolina D\'Gregorio Brito',
      status: { label: 'EN PROCESO', color: '#213555' },
      date: '17-12-2024 04:21:24 pm',
    },
    {
      orderNumber: '1964565-0',
      service: 'Orden de Farmacia',
      provider: 'Botimarket',
      policy: '45678912',
      ci: 'V-45678912',
      insuredName: 'D\'Gregorio Jesus',
      status: { label: 'PENDIENTE', color: '#FFE001' },
      date: '17-12-2024 03:23:50 pm',
    },
    {
      orderNumber: '1964565-0',
      service: 'Orden de Farmacia',
      provider: 'Botimarket',
      policy: '45678912',
      ci: 'V-45678912',
      insuredName: 'D\'Gregorio Jesus',
      status: { label: 'RECHAZADO', color: '#F93827' },
      date: '17-12-2024 03:23:50 pm',
    },
  //   {
  //     "WORKFLOW_ID": 44933,
  //     "STAGE_DATE": "05-01-2022 03:35:08 pm",
  //     "TASK_ID": 102334,
  //     "NONBRE": "Zulay  Arenales Rubio  - Nro. Liquidación: 1798665-0",
  //     "STAGE_STATUS": "En Proceso",
  //     "STATUS_FOR_COLORS": "En Proceso",
  //     "COLOR": "primary",
  //     "TOOLTIP": "Emergencia",
  //     "STAGE_NAME": "Análisis de solicitud de Ingreso - Ingreso(Como Gerente del Proceso)",
  //     "ICON": "local_hospital"
  // },
  ];

  // const sliderItems = [
  //   { text: "Crear Solicitud", route: "/" },
  //   { text: "Crear Proceso", route: "/about" },
  //   { text: "Consultas", route: "/services" },
  //   { text: "Consultas", route: "/services" },
  //   { text: "Consultas", route: "/services" },
  // ];

  const items = [
  { icon: "CreateNewFolderIcon", iconBackground: "#007BFF", text: "Crear Solicitud", route: "/folder" },
  { icon: "CloudDownloadIcon", iconBackground: "#28A745", text: "Crear Proceso", route: "/home" },
  { icon: "PeopleAltIcon", iconBackground: "#FFC107", text: "Consultas", route: "/settings" },
  { icon: "DifferenceIcon", iconBackground: "#DC3545", text: "Crear notificaciones", route: "/favorites" },
];

// const items = [
//   {
//     icon: <CreateNewFolderIcon style={{ color: "white", fontSize: 32 }} />,
//     text: "Crear notificaciones",
//     iconBackground: "#007bff",
//   },
//   {
//     icon: <CloudDownloadIcon style={{ color: "white", fontSize: 32 }} />,
//     text: "Crear solicitudes",
//     iconBackground: "#28a745",
//   },
//   {
//     icon: <CloudDownloadIcon style={{ color: "white", fontSize: 32 }} />,
//     text: "Ver consultas",
//     iconBackground: "#ffc107",
//   },
// ];


  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
        Bandeja de Entrada
      </Typography>
      <HeaderButtons buttons={buttons} />
      {/* <InboxTable items={inboxItems} /> */}
      {/* <div style={{width:'50rem', display:'flex', justifyContent:'center' }}> */}
      <h1>Slider Component Example</h1>
      {/* <Slider
      items={items}
      buttonStyles={{ backgroundColor: "secondary.main" }}
      containerStyles={{ marginTop: "20px" }}
      boxStyles={{
        backgroundColor: "white",
        color: "black",
        minWidth: "200px",
        height: "100px",
      }}
    /> */}
    <ResponsiveSlider items={items} />
    {/* </div> */}
    </Container>
  );
};

export default crear_solicitud;
