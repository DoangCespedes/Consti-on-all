import {Dialog, DialogTitle, DialogContent, DialogActions, Typography, TextField,Button} from '@mui/material';
import { useState } from 'react';

const ModalEmailCodeValidation = () => {

  const [codeInput, setCodeInput] = useState(''); 

  return (
    <>
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Validar Código</DialogTitle>
        <DialogContent>
          <Typography>Ingrese el código de 6 dígitos enviado a su correo:</Typography>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleCodeValidation(codeInput, codeFromServer);
          }}>
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              type="text"
              inputProps={{ maxLength: 6, pattern: "[0-9]*" }} // Restringe la longitud a 6 y asegura que sean solo dígitos
              value={codeInput} // Aquí se guarda el valor actual del código ingresado
              onChange={(e) => setCodeInput(e.target.value)} // Actualiza el estado al escribir
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleCodeValidation(codeInput, codeFromServer)} // Llama a la función solo cuando el usuario haga clic en "Validar"
            color="primary"
          >
            Validar
          </Button>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ModalEmailCodeValidation