'use client';

import React from 'react';
// import { HeaderButtons } from './HeaderButtons';
// import { InboxTable } from './InboxTable';
import { Container, Typography } from '@mui/material';
import { HeaderButtons } from '@/components/cards/HeaderButtons';
import { InboxTable } from '@/components/tables/InboxTable';

const inicio = () => {
  const buttons = [
    {
      title: 'Servicios',
      color: '#4caf50',
      iconColor: '#4caf50',
      dropdownOptions: [
        'Atención Médica Primaria',
        'Reembolso de Salud',
        'Carta Aval',
        'Emergencia',
        'Orden de Farmacia',
      ],
      onChange: (e) => console.log('Seleccionaste:', e.target.value),
    },
    {
      title: 'Servicios',
      color: '#4caf50',
      iconColor: '#4caf50',
      dropdownOptions: [
        'Atención Médica Primaria',
        'Reembolso de Salud',
        'Carta Aval',
        'Emergencia',
        'Orden de Farmacia',
      ],
      onChange: (e) => console.log('Seleccionaste:', e.target.value),
    },
    {
      title: 'Servicios',
      color: '#4caf',
      iconColor: '#4caf',
      dropdownOptions: [
        'Atención Médica Primaria',
        'Reembolso de Salud',
        'Carta Aval',
        'Emergencia',
        'Orden de Farmacia',
      ],
      onChange: (e) => console.log('Seleccionaste:', e.target.value),
    },
    {
      title: 'Proveedor',
      color: '#fe2b5b',
      iconColor: '#fe2b5b',
      dropdownOptions: [
        'Asistanet',
        'Caravana',
        'Dentalnet',
        'Botimarket',
      ],
      onChange: (e) => console.log('Seleccionaste:', e.target.value),
    },
  ];
  const inboxItems = [
    {
      service: 'Guilmaris Josefina Brito Perez',
      detail: 'Nro. Liquidación: 1964567-0',
      process: 'Análisis de Solicitud de Egreso - Egreso',
      date: '18-12-2024 02:22:42 pm',
      status: { label: 'EN PROCESO', color: '#213555' },
    },
    {
      service: 'Andrea Carolina D\'Gregorio Brito',
      detail: 'Nro. Liquidación: 1964566-0',
      process: 'Carga de Documentos',
      date: '17-12-2024 04:21:24 pm',
      status: { label: 'PENDIENTE', color: '#FFE001' },
    },
    {
      service: 'D\'Gregorio Jesus',
      detail: 'Nro. Liquidación: 1964565-0',
      process: 'Carga de Documentos',
      date: '17-12-2024 03:23:50 pm',
      status: { label: 'PENDIENTE', color: '#FFE001' },
    },
  ];

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
        Bandeja de Entrada
      </Typography>
      <HeaderButtons buttons={buttons} />
      <InboxTable items={inboxItems} />
    </Container>
  );
};

export default inicio;
