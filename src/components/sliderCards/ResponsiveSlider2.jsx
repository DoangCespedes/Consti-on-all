'use client'

import { useState } from "react";
import Image from "next/image";
import { Box, Typography, Button, CardContent } from "@mui/material";

const ResponsiveSlider2 = ({ items = [] }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    console.log("Selected item:", item);
    setSelectedItem(item);
  };

  return (
    <Box
      sx={{
        display: "flex",
        overflowX: "auto",
        gap: 2,
        padding: 2,
        scrollSnapType: "x mandatory",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      {items.length > 0 ? (
        items.map((item, index) => (
          <Button
            key={index}
            onClick={() => handleItemClick(item)}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: selectedItem === item ? "#e0f7fa" : "#ffffff",
              borderRadius: "16px",
              boxShadow: 3,
              padding: 2,
              minWidth: 150,
              cursor: "pointer",
              transition: "transform 0.3s",
              scrollSnapAlign: "start", 
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          >
            <CardContent>
              <Box
                sx={{
                  width: 200, 
                  height: 180,
                  borderRadius: "16px",
                  overflow: "hidden",
                  marginBottom: 2,
                }}
              >
                <Image
                  src={item.image} 
                  alt={item.text}
                  width={150} 
                  height={150}
                  style={{
                    objectFit: "cover", 
                  }}
                />
              </Box>
              <Typography variant="h6" component="div" textAlign="center">
                {item.text}
              </Typography>
            </CardContent>
          </Button>
        ))
      ) : (
        <Typography variant="h6" textAlign="center">
          No items available
        </Typography>
      )}
    </Box>
  );
};

export default ResponsiveSlider2;
