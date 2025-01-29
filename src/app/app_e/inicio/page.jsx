'use client';

import ResponsiveSlider from '@/components/sliderCards/ResponsiveSlider';
import { Container, Typography } from '@mui/material';
import React from 'react';
import CardDashboard from '@/components/cards/cardDashboard/CardDashboard';
import data from '../../../../JSON/data.json';

const inicio = () => {
    const items = [
        { icon: "CreateNewFolderIcon", iconBackground: "#007BFF", text: "Crear Solicitud", route: "/app_e/crear_solicitud" },
        { icon: "AutorenewIcon", iconBackground: "#28A745", text: "Crear Proceso", route: "/app_e/crear_proceso" },
        { icon: "DescriptionIcon", iconBackground: "#FFC107", text: "Crear Declaracion", route: "/app_e/crear_declaracion" },
        { icon: "NotificationAddIcon", iconBackground: "#DC3545", text: "Crear notificaciones", route: "/app_e/crear_notificacion" },
    ];

    return (
        <>
            <Container>
                <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
                    Seleccione una opción 
                </Typography>

                <ResponsiveSlider items={items} />

                <div>
                    {/* <h3>Polizas</h3> */}
                    <div style={{ padding: '20px' }}>
                    {data.map((item, index) => (
                        <CardDashboard
                        key={index}
                        title={item.title}
                        tableData={item.table}
                        chartData={item.chart}
                        />
                    ))}
                    </div>
                </div>
            </Container>
        </>
    );
};

export default inicio;
