"use client";

import UserSearchForm from "@/components/userSearchForm/UserSearchForm";
import UserSearchComponent from "@/components/userSerchComponent/UserSerchComponent";
import React from "react";
// import UserSearchForm from "@/components/UserSearchForm";

const administracion_perfiles = () => {
  const handleSearch = (data) => {
    console.log("Datos del formulario:", data);
    // Aquí puedes realizar una llamada a la API o manejar la búsqueda
  };

  return (
    <div>
      {/* <UserSearchForm onSearch={handleSearch} /> */}
      <UserSearchComponent/>
    </div>
  );
};

export default administracion_perfiles;
