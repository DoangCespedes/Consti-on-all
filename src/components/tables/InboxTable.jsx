import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from '@mui/material';

const InboxItem = ({ orderNumber, service, provider, policy, ci, insuredName, status, date }) => (
  <TableRow>
    <TableCell>{orderNumber}</TableCell>
    <TableCell>{service}</TableCell>
    <TableCell>{provider}</TableCell>
    <TableCell>{policy}</TableCell>
    <TableCell>{ci}</TableCell>
    <TableCell>{insuredName}</TableCell>
    <TableCell>
      <Chip label={status.label} sx={{ backgroundColor: status.color, color: '#fff' }} />
    </TableCell>
    <TableCell>{date}</TableCell>
  </TableRow>
);

export const InboxTable = ({ items }) => (
  <TableContainer component={Paper} sx={{ mt: 4 }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Nro de Orden</TableCell>
          <TableCell>Tipo de Servicio</TableCell>
          <TableCell>Proveedor</TableCell>
          <TableCell>Poliza</TableCell>
          <TableCell>CI del Asegurado</TableCell>
          <TableCell>Nom. Asegurado</TableCell>
          <TableCell>Estatus</TableCell>
          <TableCell>Fecha</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {items.map((item, index) => (
          <InboxItem key={index} {...item} />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

// Datos ficticios completos para la tabla
const data = [
  {
    orderNumber: 'ORD12345',
    service: 'Reparación de Motor',
    provider: 'AutoServ Proveedor 1',
    policy: 'POL123456',
    ci: 'V12345678',
    insuredName: 'Juan Pérez',
    status: { label: 'Pendiente', color: 'orange' },
    date: '19/12/2024'
  },
  {
    orderNumber: 'ORD12346',
    service: 'Reemplazo de Cristales',
    provider: 'Cristales Rápidos',
    policy: 'POL123457',
    ci: 'V23456789',
    insuredName: 'Ana López',
    status: { label: 'En Proceso', color: 'blue' },
    date: '20/12/2024'
  },
  {
    orderNumber: 'ORD12347',
    service: 'Alineación y Balanceo',
    provider: 'Neumáticos 4x4',
    policy: 'POL123458',
    ci: 'V34567890',
    insuredName: 'Carlos Sánchez',
    status: { label: 'Finalizado', color: 'green' },
    date: '18/12/2024'
  },
  {
    orderNumber: 'ORD12348',
    service: 'Cambio de Aceite',
    provider: 'LubriFast',
    policy: 'POL123459',
    ci: 'V45678901',
    insuredName: 'María García',
    status: { label: 'Pendiente', color: 'orange' },
    date: '21/12/2024'
  },
  {
    orderNumber: 'ORD12349',
    service: 'Reparación de Frenos',
    provider: 'Frenos Express',
    policy: 'POL123460',
    ci: 'V56789012',
    insuredName: 'José Martínez',
    status: { label: 'En Proceso', color: 'blue' },
    date: '22/12/2024'
  }
];

// Usar el componente InboxTable pasando los datos ficticios
export const Inbox = () => <InboxTable items={data} />;
