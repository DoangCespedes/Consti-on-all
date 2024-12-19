import React from 'react';
// import { HeaderButtons } from './HeaderButtons';
// import { InboxTable } from './InboxTable';
import { Container, Typography } from '@mui/material';
import { HeaderButtons } from '@/components/cards/HeaderButtons';
import { InboxTable } from '@/components/tables/InboxTable';

const inicio = () => {
  const headerButtons = [
    { title: 'Solicitudes', color: '#213555',
      //  onClick: () => alert('Ir a Solicitudes') 
    },
    { title: 'Declaraciones', color: '#213555',
      //  onClick: () => alert('Ir a Declaraciones') 
    },
    { title: 'Notificaciones', color: '#FFE001',
      //  onClick: () => alert('Ir a Notificaciones') 
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
      <HeaderButtons buttons={headerButtons} />
      <InboxTable items={inboxItems} />
    </Container>
  );
};

export default inicio;
