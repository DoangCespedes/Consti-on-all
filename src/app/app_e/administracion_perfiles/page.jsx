"use client";

import UserSearchForm from "@/components/userSearchForm/UserSearchForm";
import React from "react";
// import UserSearchForm from "@/components/UserSearchForm";

const administracion_perfiles = () => {
  const handleSearch = (data) => {
    console.log("Datos del formulario:", data);
    // Aquí puedes realizar una llamada a la API o manejar la búsqueda
  };

  return (
    <div>
      <UserSearchForm onSearch={handleSearch} />
    </div>
  );
};

export default administracion_perfiles;
