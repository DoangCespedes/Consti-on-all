
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import asistanet from '../../../public/assets/Logo_Asistanet - copia - copia.png';
import caravana from '../../../public/assets/Logo_Caravana_de_la_salud.png';
import dentalnet from '../../../public/assets/Logo_Dentalnet.png';

const AppE = ({ images = [] }) => {
  // Si no se pasan imágenes, usa una por defecto
  const defaultImages = [
    { src: asistanet, alt: 'Caravana', link: '/app_e/inicio' },
    { src: caravana, alt: 'Caravana', link: '/app_e/inicio' },
    { src: dentalnet, alt: 'Caravana', link: '/app_e/inicio' },
    { src: caravana, alt: 'Caravana', link: '/app_e/inicio' },
  ];

  const imageList = images.length > 0 ? images : defaultImages;

  return (
    <>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Bienvenido al dashboard del empleado
      </Typography>

      <Box sx={{ padding: '5rem' }}>
        <Grid
          container
          spacing={4}
          sx={{
            justifyContent: 'center',
          }}
        >
          {imageList.map((image, index) => (
            <Grid
              item
              xs={12} // En pantallas pequeñas ocupa el ancho completo
              sm={6} // En pantallas medianas muestra dos por fila
              md={6}
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Link href={image.link} passHref>
                <Box
                  component="a"
                  sx={{
                    display: 'block',
                    textDecoration: 'none',
                    '&:hover img': {
                      transform: 'scale(1.05)',
                      transition: 'transform 0.3s ease',
                    },
                  }}
                >
                  <Image
                    src={image.src}
                    width={300}
                    height={300}
                    alt={image.alt || `Image ${index + 1}`}
                    style={{
                      marginLeft:'3rem',
                      borderRadius: '8px',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    }}
                  />
                </Box>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default AppE;
