'use client';

import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import SimpleTable from '@/components/tables/simpleTable/SimpleTable';
import CustomCard from '@/components/cards/customCard/CustomCard';
import { useForm } from 'react-hook-form';
import DialogSolicitud from '@/components/dialog/dialogSolicitud/DialogSolicitud';

const CrearSolicitud = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const { control, setValue } = useForm();
  const [formData, setFormData] = useState({
    ciudad: '',
    recados: {
      cedula: false,
      informeMedico: false,
      ordenInterconsulta: false,
      referencia: false,
    },
  });

  const [fechaDesde, setFechaDesde] = useState('');
  const [selectedRowTypePolicy, setSelectedRowTypePolicy] = useState(null);
  const [ordenes, setOrdenes] = useState([]);
  const [showReq, setShowReq] = useState(null);

  // Sincronizar `formData` con React Hook Form
  useEffect(() => {
    for (const key in formData) {
      setValue(key, formData[key]);
    }
  }, [formData, setValue]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'fechaDesde' && !isValidDate(value)) {
      console.error('Fecha inválida');
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValue(name, value);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (checked && !isValidForm()) {
      console.error('Formulario inválido');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      recados: { ...prev.recados, [name]: checked },
    }));
    setValue(`recados.${name}`, checked);
  };

  function isValidDate(dateString) {
    const dateParts = dateString.split('-');
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1;
    const day = parseInt(dateParts[2], 10);
    const date = new Date(year, month, day);
    return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day;
  }

  function isValidForm() {
    // Implement your form validation here
    return true; // Replace with your actual validation logic
  }

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRow(null);
    setSelectedRowTypePolicy(null)
    setFechaDesde('')
    setOrdenes([])
    setShowReq(null)

    setFormData({
      // ciudad: '',
      // enfermedad: '',
      // subServicio: '',
      // especialidad: '',
      proveedor: null,
      recados: {
        cedula: false,
        informeMedico: false,
        ordenInterconsulta: false,
        referencia: false,
      },
    });
    
  };

    const userData = [
      { Numero_de_poliza: 'HCMC-001001-2269', "Titular": "V-15332819 Maria Josefina Perez Diaz","tipoid": "V","p_numid":15332819, first_name: 'Maria Josefina', last_name: 'Perez Diaz', "Vigencia": "08/10/2024 - 08/10/2039", email: 'mari@example.com', status: 'Activo', "birthDate": "08/06/1980","sex": "F","phoneNumber": "-" },
      { Numero_de_poliza: 'HCMC-001001-2269', "Titular": "V-15332819 Maria Josefina Perez Diaz", "tipoid": "V","p_numid":6336433, first_name: 'Jose Luis', last_name: 'Perez', "Vigencia": "08/10/2024 - 08/10/2039", email: 'jose@example.com', status: 'Activo', "birthDate": "08/06/1957","sex": "F","phoneNumber": "-" },
      { Numero_de_poliza: 'HCMC-001001-2269', "Titular": "V-15332819 Maria Josefina Perez Diaz","tipoid": "V","p_numid":8234908, first_name: 'Amanda Antonieta', last_name: 'Diaz', "Vigencia": "08/10/2024 - 08/10/2039", email: 'amanda@example.com', status: 'Activo', "birthDate": "08/06/1960","sex": "F","phoneNumber": "-" },
    ];
    
    const userColumns = [
      { field: 'Numero_de_poliza', headerName: 'Numero de poliza' },
      { field: 'first_name', headerName: 'Nombres' },
      { field: 'last_name', headerName: 'Apellidos' },
      { field: 'Vigencia', headerName: 'Vigencia' },
      { field: 'status', headerName: 'Estado' },
    ];

    const dropdownOptions = [
      { label: 'Caracas', value: '001' },
      { label: 'Merida', value: '002' },
      { label: 'Valencia', value: '003' },
      { label: 'Barcelona', value: '003' },
      { label: 'Maracaibo', value: '004' },
      { label: 'Barinas', value: '005' }
    ]


    const handleRowSelect = (row) => {
      setSelectedRow(row);
      setFormData(prev => ({
        ...prev,
        asegurado: row.first_name,
        apellido: row.last_name,
        tipoId: row.tipoid,
        numeroId: row.p_numid,
        numeroPoliza: row.Numero_de_poliza,
      }));
      setOpenModal(true);
    };
    
    
    return (
      <Container>
        <Typography variant="h4">Crear Solicitud de Servicio AMP</Typography>
        <CustomCard>
          <SimpleTable
            title="Polizas"
            columns={userColumns}
            tableData={userData}
            onRowSelect={handleRowSelect}
          />
  
          {selectedRow && (
            <div style={{ marginTop: '20px' }}>
              <h3>Detalles de la Fila Seleccionada:</h3>
              <pre>{JSON.stringify(selectedRow, null, 2)}</pre>
            </div>
          )}
          
          <DialogSolicitud
            open={openModal}
            onClose={handleCloseModal}
            selectedRow={selectedRow}
            formData={formData}
            control={control}
            handleCheckboxChange={handleCheckboxChange}
            dropdownOptions={dropdownOptions}
            setFormData={setFormData}
            setFechaDesde={setFechaDesde}
            fechaDesde={fechaDesde}
            selectedRowTypePolicy={selectedRowTypePolicy}
            setSelectedRowTypePolicy={setSelectedRowTypePolicy}
            ordenes={ordenes}
            setOrdenes={setOrdenes}
            setShowReq={setShowReq}
            showReq={showReq}
          />
        </CustomCard>
      </Container>
    );
  };
  
  export default CrearSolicitud;