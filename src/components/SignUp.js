import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';



import { useAuth } from '../context/AuthContext';


export const SignUp = () => {
  const { signup } = useAuth();

  const [error, setError] = useState('');
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmail = e => setEmail(e.target.value);
  const handlePassword = e => setPassword(e.target.value);
  const handleConfirmPassword = e => setConfirmPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      setTimeout(() => setError(''), 1500);
    } else {
      try {
        await signup(email, password);
        history.push('/');
      } catch (error) {
        setError('Error de credenciales');
        setTimeout(() => setError(''), 1500);
      }
    }
    setLoading(false);
  }

  return (
    <div className='card'>
      <div className='card-header' >
        {error && <p className='error' >{error}</p>}
        <h1>Registrarse</h1>
      </div>
      <div className='card-body'>
        <form onSubmit={handleSubmit} >
          <input type='email' placeholder='Email' onChange={handleEmail} />
          <input type='password' placeholder='Contraseña' onChange={handlePassword} />
          <input type='password' placeholder='Confirmar Contraseña' onChange={handleConfirmPassword} />
          <input type='submit' value='registrarse' />
        </form>
       
        <p>Ya tienes una cuenta? <Link to='/login'>Inicia Sesion</Link> </p>
      </div>

    </div>
  )
}
