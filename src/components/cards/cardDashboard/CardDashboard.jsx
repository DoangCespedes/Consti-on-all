import React from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid'; // Para diseño responsivo
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Chip } from '@mui/material';
import CustomCard from '../customCard/CustomCard';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const CardDashboard = ({ title, tableData, chartData, icon }) => {
  return (
    <CustomCard
      title={title} icon={icon}
    >
        <Grid container spacing={2} alignItems="flex-start">
          <Grid item xs={12} md={8}>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Estado</strong></TableCell>
                    <TableCell><strong>Tipo de Servicio</strong></TableCell>
                    <TableCell><strong>Proveedor</strong></TableCell>
                    <TableCell><strong>Fecha</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Chip
                          label={row.status.label} 
                          sx={{
                            backgroundColor: row.status.color, 
                            color: "#fff", 
                            fontWeight: "bold",
                          }}
                        />
                      </TableCell>
                      <TableCell>{row.TiposDeServicio}</TableCell>
                      <TableCell>{row.provedor}</TableCell>
                      <TableCell>{row.fecha}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          {/* Gráfico (50% en pantallas grandes, 100% en pantallas pequeñas) */}
          <Grid item xs={12} md={4}>
            <Bar
              data={{
                labels: chartData.labels,
                datasets: [
                  {
                    label: 'Values',
                    data: chartData.values,
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: true, position: 'top' },
                  tooltip: { enabled: true },
                },
              }}
              style={{ height: '12rem' }}
            />
          </Grid>
        </Grid>
    </CustomCard>
  );
};

CardDashboard.propTypes = {
  title: PropTypes.string.isRequired,
  tableData: PropTypes.arrayOf(
    PropTypes.shape({
      orderNumber: PropTypes.string.isRequired,
      service: PropTypes.string.isRequired,
      provider: PropTypes.string.isRequired,
      policy: PropTypes.string.isRequired,
    })
  ).isRequired,
  chartData: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.string).isRequired,
    values: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
};

export default CardDashboard;
