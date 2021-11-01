import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import "./Login.css"

import { useAuth } from '../../context/AuthContext';



export const Login = () => {

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
      history.push('/');
    } catch (error) {
      setError('Wrong Credentials');
      setTimeout(() => setError(''), 1500);
    }
  }


  return (
    <div className='card'>
      <div className='card-header' >
        {error && <p className='error' >{error}</p>}
        <h1>Iniciar Sesion</h1>
      </div>
      <div className='card-body'>
        <form onSubmit={handleSubmit}>
          <input type='email' placeholder='Email' onChange={handleEmail} />
          <input type='password' placeholder='Contraseña' onChange={handlePassword} />
          <input type='submit' value='Entrar' />
        </form>
        
        <p>No tienes una cuenta? <Link to='/signup'>Registrate</Link> </p>
      </div>

    </div>
  )
}
