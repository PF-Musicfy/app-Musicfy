import './login.css';
import { useAuth0 } from '@auth0/auth0-react';
import { useState, useRef } from 'react';
import validate from '../../utils/validate.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Logout from '../Logout';
import Profile from '../Profile';
import setTitle from '../../utils/setTitle.js';

export default function Login(){
  setTitle('Login - Musicfy')
  
  const { loginWithPopup, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const inputPass = useRef();

  const [input, setInput] = useState({
    user: '',
    pass: '',
  });
  const [errors, setErrors] = useState({});

  const inputChange = (e) => {
    const {name, value} = e.target;
    setInput({...input, [name]: value})
    setErrors(validate({...input, [name]: value}))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/v1/auth/login', {
      email: input.user,
      password: input.pass,
    })
    .then(() => {
      alert('logeado');
      navigate('/home');
    })
    .catch((e) => {
      console.log(e);
      alert('posibles errores:\n'+
        '- el back no se ha iniciado\n'+
        '- alguno de los campos falta o es incorrecto\n'+
        '- el usuario no existe en la base de datos'
      );
    })
  }

  return (
    <div className="login">
      <div className="login-logo">
        <img
          src=''
          alt='Musicfy Logo'
          onClick={() => navigate('/')}
        />
      </div>
      <hr></hr>
      <div className="login-container">
        <button
          onClick={() => navigate(-1)}
        >
          volver atras
        </button>
        <div className="login-options">

          {isAuthenticated ?
            <>
              <Profile />
              <Logout />
            </>
            : 
            <>
              <p>Para continuar, inicia sesión en Musicfy.</p>
              <p>probar en Auth0 con:</p>
              <span><b>email:</b> jaeden31z_d781g@cguf.site</span>
              <p><b>password:</b> ASdf1234</p>
              <button
                onClick={loginWithPopup}
              >
                CONTINUAR CON AUTH0
              </button>
            </>
          }

        </div>
        <hr></hr>
        <form
          className="login-form"
          onSubmit={handleSubmit}
        >
          <label>Correo electrónico o nombre de usuario</label>
          <input
            type='text'
            name="user"
            placeholder="Correo electronico o nombre de usuario"
            onChange={inputChange}
            value={input.user}
            className={errors.user ? 'input-err' : ''}
          />
          <p className='msg-err'>{errors.user || ''}</p>
          <label>Contraseña</label>
          <input
            ref={inputPass}
            type='password'
            name="pass"
            placeholder="Contraseña"
            onChange={inputChange}
            value={input.pass}
            className={errors.pass ? 'input-err' : ''}
          />
          <button
            type='button'
            onClick={() => {
              if(inputPass.current.type === 'password'){
                inputPass.current.type = 'text'
              }else{
                inputPass.current.type = 'password'
              }
            }}
          >
            mostrar contraseña
          </button>
          <p className='msg-err'>{errors.pass || ''}</p>
          <div>
            <button>
              INICIAR SESION
            </button>
          </div>
        </form>
        <hr></hr>
        <p>¿No tienes cuenta?</p>
        <button
          onClick={() => navigate('/register')}
        >
          REGISTRATE EN MUSICFY
        </button>
      </div>
    </div>
  )
}
