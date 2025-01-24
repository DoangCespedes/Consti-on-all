import React from "react";
import { Box, CardContent, Typography, Button } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import icons from "../../utils/icons";

const CustomArrow = ({ className, style, onClick }) => (
  <div
    className={className}
    style={{
      ...style,
      background: "#c9c9c9", // Cambia el color aquí
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2,
    }}
    onClick={onClick}
  />
);

const ResponsiveSlider = ({ items }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <CustomArrow />, // Botón personalizado para "siguiente"
    prevArrow: <CustomArrow />, // Botón personalizado para "anterior"
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Box sx={{ width: "100%", padding: "20px" }}>
      <Slider {...settings}>
        {items.map((item, index) => {
          const Icon = icons[item.icon];
          return (
            <Button
              key={index}
              onClick={() => (window.location.href = item.route)}
              sx={{
                textAlign: "center",
                borderRadius: "16px",
                boxShadow: 3,
                padding: 0,
                minWidth: "auto",
                backgroundColor: "#f5f5f5",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    margin: "0 auto 10px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: item.iconBackground,
                  }}
                >
                  {Icon && <Icon sx={{ color: "#fff", fontSize: 32 }} />}
                </Box>
                <Typography variant="h6" component="div">
                  {item.text}
                </Typography>
              </CardContent>
            </Button>
          );
        })}
      </Slider>
    </Box>
  );
};

export default ResponsiveSlider;
