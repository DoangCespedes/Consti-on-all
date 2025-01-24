import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
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

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Polizas = ({ title, tableData, chartData }) => {
  return (
    <Card sx={{ maxWidth: 900, margin: '20px auto', padding: 2 }}>
      <Typography variant="h5" component="div" gutterBottom>
        {title}
      </Typography>
      <CardContent>
        {/* Grid para organización responsiva */}
        <Grid container spacing={2} alignItems="flex-start">
          {/* Tabla (50% en pantallas grandes, 100% en pantallas pequeñas) */}
          <Grid item xs={12} md={6}>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Numero de poliza</strong></TableCell>
                    <TableCell><strong>Titular</strong></TableCell>
                    <TableCell><strong>Vigencia</strong></TableCell>
                    <TableCell><strong>Estado</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.Numero_de_poliza}</TableCell>
                      <TableCell>{row.Titular}</TableCell>
                      <TableCell>{row.Vigencia}</TableCell>
                      <TableCell>{row.Estado}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          {/* Gráfico (50% en pantallas grandes, 100% en pantallas pequeñas) */}
          <Grid item xs={12} md={6}>
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
              style={{ height: '150px' }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

Polizas.propTypes = {
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

export default Polizas;
