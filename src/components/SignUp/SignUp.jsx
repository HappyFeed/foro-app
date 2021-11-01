import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import "./SignUp.css"
import AppContext from "../../context/AppContext";

import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';

import { useAuth } from '../../context/AuthContext';


export const SignUp = () => {
  const state = useContext(AppContext);

  const { signup } = useAuth();

  const [error, setError] = useState('');
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEmail = e => setEmail(e.target.value);
  const handlePassword = e => setPassword(e.target.value);
  const handleName = e => setName(e.target.value);
  const handleLastName = e => setLastName(e.target.value);
  const handleConfirmPassword = e => setConfirmPassword(e.target.value);

  const handleSubmit = async (e) => {

    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      setTimeout(() => setError(''), 1500);
    } else {
      try {
        await signup(email, password);
        state.saveUser(name, lastName, email, password)
        history.push('/');
      } catch (error) {
        setError('Error de credenciales');
        setTimeout(() => setError(''), 1500);
      }
    }
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
              Registro
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
            <Box sx={{marginTop:5}}>
              <Input sx={inputStyle} type='email' placeholder='Email' onChange={handleEmail} />
            </Box>
            <Box sx={{marginTop:5}}>
              <Input sx={inputStyle} type='password' placeholder='Contraseña' onChange={handlePassword} />
            </Box>
            <Box sx={{marginTop:5}}>
              <Input sx={inputStyle} type='password' placeholder='Confirmar Contraseña' onChange={handleConfirmPassword} />
            </Box>
            <Button sx={{marginTop:5, marginLeft:12}} variant="outlined" type='submit' value='registrarse'>Registrarse</Button>
          </form>
        
          <p>Ya tienes una cuenta? <Link to='/login'>Inicia Sesion</Link> </p>
        </Box>
      </Box>
    </Box>
  )
}
