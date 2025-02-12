'use client';

import React, { useState } from 'react';
import CustomCard from '@/components/cards/customCard/CustomCard';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import icons from '@/utils/icons';

Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Dashboard = () => {
    const [selectedStatus, setSelectedStatus] = useState(null); // Estado para trackear la tarjeta seleccionada

    const statuses = [
        { title: 'Todas las Solicitudes', color: 'success', value: 150, icon: 'DashboardCustomizeIcon' }, 
        { title: 'Solicitudes Procesadas', color: 'primary', value: 53, icon: 'LibraryAddCheckIcon' }, 
        { title: 'Solicitudes Pendientes', color: 'warning', value: 65, icon: 'ReportProblemIcon' }, 
        { title: 'Solicitudes Rechazadas', color: 'error', value: 44, icon: 'DisabledByDefaultIcon' },
    ];

    // Definición de los datos antes de su uso
    const dataServicesPerMonth = {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        datasets: [
            {
                label: 'Cantidad de Servicios',
                backgroundColor: 'rgba(75,192,192,0.6)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                data: [30, 50, 80, 20, 90, 45, 60, 100, 55, 70, 40, 95],
            },
        ],
    };

    const dataServicesByStatus = {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        datasets: [
            {
                label: 'Procesados',
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                data: [10, 20, 30, 15, 40, 20, 25, 50, 30, 35, 20, 45],
            },
            {
                label: 'Pendientes',
                backgroundColor: 'rgba(255, 206, 86, 0.6)',
                data: [5, 10, 15, 10, 20, 15, 10, 25, 20, 15, 10, 30],
            },
            {
                label: 'Rechazados',
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                data: [3, 7, 10, 5, 15, 7, 8, 12, 10, 8, 6, 15],
            },
        ],
    };

    const dataServices = {
        'Todas las Solicitudes': dataServicesPerMonth,
        'Solicitudes Procesadas': {
            // Insertar datos específicos para "Solicitudes Procesadas"
            labels: dataServicesPerMonth.labels,
            datasets: [...dataServicesByStatus.datasets], // Puede reutilizar o modificar según sea necesario
        },
        'Solicitudes Pendientes': {
            // Insertar datos específicos para "Solicitudes Pendientes"
            labels: dataServicesPerMonth.labels,
            datasets: [...dataServicesByStatus.datasets], // Puede reutilizar o modificar según sea necesario
        },
        'Solicitudes Rechazadas': {
            // Insertar datos específicos para "Solicitudes Rechazadas"
            labels: dataServicesPerMonth.labels,
            datasets: [...dataServicesByStatus.datasets], // Puede reutilizar o modificar según sea necesario
        },
    };

    const chartOptions = {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        plugins: {
            tooltip: {
                enabled: true,
            },
            legend: {
                display: true,
            },
        },
    };

    const handleCardClick = (status) => {
        setSelectedStatus(status);
    };

    return (
        <>
            <Grid container spacing={2} sx={{ marginTop: 3 }}>
                {statuses.map((status, index) => {
                    const Icon = icons[status.icon];
                    return (
                        <Grid item xs={12} sm={6} md={3} key={index} onClick={() => handleCardClick(status.title)}>
                            <Card sx={{ backgroundColor: `${status.color}.main`, color: '#fff', cursor: 'pointer' }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        {status.title}
                                    </Typography>
                                    <Typography variant="h4">
                                        {status.value} {Icon && <Icon sx={{ ml: 1, fontSize: 30 }} />}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>

            <CustomCard title={selectedStatus ? selectedStatus : "Seleccione una Solicitud"} icon={selectedStatus ? icons[statuses.find(s => s.title === selectedStatus).icon] : 'DashboardCustomizeIcon'}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <CustomCard title="Cantidad de Servicios por Mes">
                            {selectedStatus && <Bar data={dataServices[selectedStatus]} options={chartOptions} />}
                        </CustomCard>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CustomCard title="Cantidad de Servicios por Estado">
                            {selectedStatus && <Bar data={dataServicesByStatus} options={chartOptions} />}
                        </CustomCard>
                    </Grid>
                </Grid>
            </CustomCard>
        </>
    );
};

export default Dashboard;