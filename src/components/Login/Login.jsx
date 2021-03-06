import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import "./Login.css"
import AppContext from "../../context/AppContext"

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';

import { useAuth } from '../../context/AuthContext';

import { auth } from '../../config/firebase/firebase';



export const Login = () => {
  const state = useContext(AppContext);

  const { login } = useAuth();
  const [error, setError] = useState('');
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = e => setEmail(e.target.value);
  const handlePassword = e => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      state.getUser(auth.currentUser.uid)
      history.push('/');
    } catch (error) {
      setError('Datos incorrectos');
      setTimeout(() => setError(''), 1500);
    }
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height:400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 10,
    p: 4,
  };

  const inputStyle = {
    width:300
  }



  return (
    <Box className="background">
      <Box sx={style}>
        <Box >
          <Typography sx={{textAlign:'center'}} id="modal-modal-title" variant="h2" component="h1">
              Iniciar Sesion
            </Typography>
        </Box>
        <Box sx={{display:"flex", flexDirection: 'column' , alignItems: 'center', }}>
          <form onSubmit={handleSubmit}>
            <Box sx={{marginTop:2}}>
              <Input sx={inputStyle} type='email' placeholder='Email' onChange={handleEmail} />
            </Box>
            <Box sx={{marginTop:5}}>
              <Input sx={inputStyle} type='password' placeholder='Contrase??a' onChange={handlePassword} />
            </Box>   
            <Button sx={{marginTop:5, marginLeft:12}} variant="outlined" type='submit' value='Entrar'>Entrar</Button>
          </form>
          
          <p>No tienes una cuenta? <Link to='/signup'>Registrate</Link> </p>
        </Box>
      </Box>  
    </Box>
    
  )
}
