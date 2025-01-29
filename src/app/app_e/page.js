'use client'

// import ResponsiveSlider2 from '@/components/sliderCards/ResponsiveSlider2';
import React, { useState } from "react";
import data from '../../../JSON/data.json';
import caravana from '../../../JSON/caravana.json';
import asistanet from '../../../JSON/asistanet.json';
import rpf from '../../../JSON/rpf.json';
import oftalnet from '../../../JSON/oftalnet.json';
import dentalnet from '../../../JSON/dentalnet.json';
import botimarket from '../../../JSON/botimarket.json';
import { Container, Typography } from "@mui/material";
import CarouselEmpresas from '@/components/sliderCards/CarouselEmpresas';
import CardDashboard from "@/components/cards/cardDashboard/CardDashboard";


const AppE = () => {
  const [selectedEmpresa, setSelectedEmpresa] = useState(null);

  const items = [
    { image: "/assets/caravana.png", text: "caravana" },
    { image: "/assets/asistanet.png", text: "asistanet" },
    { image: "/assets/rpf.png", text: "rpf" },
    { image: "/assets/oftalnet.jpg", text: "oftalnet" },
    { image: "/assets/dentalnet.png", text: "dentalnet" },
    { image: "/assets/botimarket.png", text: "botimarket" },
  ];

  const handleSelect = (empresa) => {
    setSelectedEmpresa(empresa);
  };
  
  console.log("Empresa seleccionada:", selectedEmpresa);
  return (
    <>
      <Container>

        <Typography variant="h4" textAlign="center" sx={{ my: 2 }}>
          Filtrar ordenes por empresa
        </Typography>



        <CarouselEmpresas items={items} onSelect={handleSelect} />

        <div>
            { selectedEmpresa === 'caravana' && (

            <div style={{ padding: '20px' }}>
            {caravana.map((item, index) => (
                <CardDashboard
                key={index}
                title={item.title}
                tableData={item.table}
                chartData={item.chart}
                />
            ))}
            </div>
            )}
            { selectedEmpresa === 'asistanet' && (

            <div style={{ padding: '20px' }}>
            {asistanet.map((item, index) => (
                <CardDashboard
                key={index}
                title={item.title}
                tableData={item.table}
                chartData={item.chart}
                />
            ))}
            </div>
            )}
            { selectedEmpresa === 'rpf' && (

            <div style={{ padding: '20px' }}>
            {rpf.map((item, index) => (
                <CardDashboard
                key={index}
                title={item.title}
                tableData={item.table}
                chartData={item.chart}
                />
            ))}
            </div>
            )}
            { selectedEmpresa === 'oftalnet' && (

            <div style={{ padding: '20px' }}>
            {oftalnet.map((item, index) => (
                <CardDashboard
                key={index}
                title={item.title}
                tableData={item.table}
                chartData={item.chart}
                />
            ))}
            </div>
            )}
            { selectedEmpresa === 'dentalnet' && (

            <div style={{ padding: '20px' }}>
            {dentalnet.map((item, index) => (
                <CardDashboard
                key={index}
                title={item.title}
                tableData={item.table}
                chartData={item.chart}
                />
            ))}
            </div>
            )}
            { selectedEmpresa === 'botimarket' && (

            <div style={{ padding: '20px' }}>
            {botimarket.map((item, index) => (
                <CardDashboard
                key={index}
                title={item.title}
                tableData={item.table}
                chartData={item.chart}
                />
            ))}
            </div>
            )}
        </div>
    </Container>
    </>
  );
};

export default AppE;


