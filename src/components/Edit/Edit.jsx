import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import AppContext from "../../context/AppContext";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';

import { useAuth } from '../../context/AuthContext';


export const Edit = () => {
  const state = useContext(AppContext);

  const { signup } = useAuth();
  const [error, setError] = useState('');
  const history = useHistory();


  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');



  const handleName = e => setName(e.target.value);
  const handleLastName = e => setLastName(e.target.value);


  const handleSubmit = async (e) => {
    e.preventDefault();
    state.setUser(name, lastName)
    history.push('/');
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height:600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 10,
    p: 4,
  };

  const inputStyle = {
    width:300
  }

  return (
    <Box className='background'>
      <Box  sx={style}>
        <Box >
          {error && <p className='error' >{error}</p>}
          <Typography sx={{textAlign:'center'}} id="modal-modal-title" variant="h2" component="h1">
              Editar Usuario
            </Typography>
        </Box>
        <Box sx={{display:"flex", flexDirection: 'column' , alignItems: 'center', }}>
          <form onSubmit={handleSubmit} >
            <Box sx={{marginTop:5}}>
              <Input sx={inputStyle} type='Nombre' placeholder='Nombre' onChange={handleName} />
            </Box>
            <Box sx={{marginTop:5}}>
              <Input sx={inputStyle} type='Apellido' placeholder='Apellido' onChange={handleLastName} />
            </Box>
            <Button sx={{marginTop:5, marginLeft:12}} variant="outlined" type='submit' value='registrarse'>Guardar</Button>
          </form>
        
          <p><Link to='/'>Volver</Link> </p>
        </Box>
      </Box>
    </Box>
  )
}
