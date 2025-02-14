'use client'
import React, { useEffect, useState } from 'react';
import { Button, Container, Typography } from '@mui/material';
import SimpleTable from '@/components/tables/simpleTable/SimpleTable';
import CustomCard from '@/components/cards/customCard/CustomCard';
import { useForm } from 'react-hook-form';
import DialogSolicitud from '@/components/dialog/dialogSolicitud/DialogSolicitud';
import userData from '../../../../JSON/userData.json'
import { HeaderButtons } from '@/components/cards/HeaderButtons';

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
  const [showPolicies, setShowPolicies] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

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
    return true; 
  }

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRow(null);
    setSelectedRowTypePolicy(null)
    setFechaDesde('')
    setOrdenes([])
    setShowReq(null)

    setFormData({
      proveedor: null,
      recados: {
        cedula: false,
        informeMedico: false,
        ordenInterconsulta: false,
        referencia: false,
      },
    });
    
  };
    
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
      { label: 'Valencia', value: '004' },
      { label: 'Barcelona', value: '005' },
      { label: 'Maracaibo', value: '006' },
      { label: 'Barinas', value: '007' }
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



    const btn = [{
      title: 'Servicios',
      color: '#1976d2', // Azul
      iconColor: '#1565c0',
      dropdownOptions: [
        { label: 'Solicitar Atencion medica primaria', value: '001' }
      ]
    }]

    const handleSelectChange = (value) => {
      setSelectedOption(value);
    };
    
    console.log('Opción seleccionada:', selectedOption);
    
    return (
      <Container>
        <Typography variant="h4">Crear Nueva Solicitud de Servicio</Typography>

        <div style={{display:'flex', justifyContent:'center', alignContent:'center', marginTop:'3rem'}}>

          <HeaderButtons
            buttons={btn}
            onChange={handleSelectChange} 
          />
        </div>

        {selectedOption === '001' && (

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
        )}
      </Container>
    );
  };
  
  export default CrearSolicitud;