"use client";

import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import icons from "@/utils/icons"; 

const CustomCard = ({ title, children, icon }) => {
  const IconComponent = icon && icons[icon] ? icons[icon] : null;

  return (
    <Card
      sx={{
        // maxWidth: { xs: "90%", sm: "80%", md: "60%", lg: "50%" },
        margin: "20px auto",
        padding: { xs: 2, sm: 3 },
        borderRadius: 3,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        transition: "0.3s",
        "&:hover": { boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.3)" },
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        gap={1.5}
        mb={2}
        flexDirection={{ xs: "column", sm: "row" }}
        textAlign={{ xs: "center", sm: "left" }}
      >
        {/* Renderiza el icono solo si es válido */}
        {IconComponent && <IconComponent sx={{ fontSize: 35, color: "primary.main" }} />}
        <Typography variant="h5" component="div">
          {title}
        </Typography>
      </Box>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CustomCard;
