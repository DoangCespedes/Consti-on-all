"use client";

import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import { Card, CardActionArea, Box } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Botón personalizado de Next
const NextArrow = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        position: "absolute",
        top: "50%",
        right: "-45px",
        transform: "translateY(-50%)",
        zIndex: 10,
        width: "40px",
        height: "40px",
        backgroundColor: "#444", // Color más oscuro
        color: "#fff",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontSize: "20px",
        boxShadow: "0px 4px 8px rgba(0,0,0,0.3)",
      }}
    >
      ❯
    </div>
  );
};

// Botón personalizado de Prev
const PrevArrow = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        position: "absolute",
        top: "50%",
        left: "-45px",
        transform: "translateY(-50%)",
        zIndex: 10,
        width: "40px",
        height: "40px",
        backgroundColor: "#444", // Color más oscuro
        color: "#fff",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontSize: "20px",
        boxShadow: "0px 4px 8px rgba(0,0,0,0.3)",
      }}
    >
      ❮
    </div>
  );
};

const CarouselEmpresas = ({ items, onSelect }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1000, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <Box sx={{ width: "100%", textAlign: "center", padding: "10px" }}>
      <Slider {...settings}>
        {items.map((item, index) => (
          <Box key={index} sx={{ display: "flex", justifyContent: "center", padding: "10px" }}>
            <Card sx={{ maxWidth: 330, p: 1, boxShadow: 3, borderRadius: "15px", marginLeft:'1rem' }}>
              <CardActionArea onClick={() => onSelect(item.text)}>
                <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
                  <Image src={item.image} alt={item.text} width={180} height={100} />
                </Box>
              </CardActionArea>
            </Card>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default CarouselEmpresas;
