import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

export default function Validation() {
    const {email, username} = useParams()
    const navigate = useNavigate()
    // const eMail = email
    const location = useLocation()
    const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
    console.log(location)
    let password = location.pathname.split('/').splice(4).join('/')
    console.log("password:", password)
    const [state, setState] = useState({error: 0, success: 0})
    useEffect(()=> {
    
    axios.post(`${axios.defaults.baseURL}/api/v1/auth/register`, {email, username, password})
    .then(() => {
        setState({...state, success: 1})
        Toast.fire({
            icon: 'success',
            title: 'User registered succesfully'
          })
        axios.post(`${axios.defaults.baseURL}/send-email-registered`, {email});
    })
    .then(() => {
        setTimeout(() => {
            navigate('/')
        }, 5000);
    })
    .catch((err) => {
        setState({...state, error: 1})
        console.log(err)
        Swal.fire({
            icon: 'error',
            title: 'Oops try again!',
            text: 'Email already registered',
          })
          setTimeout(() => {
            navigate('/register')
        }, 5000);
    })

    }, [])
    return (
        <div>
            {state.error === 1? 
            <div style={{position: 'relative', top: '100px'}}>
                <span style={{fontSize: '30px', backgroundImage: 'url(https://www.gifsanimados.org/data/media/1377/nota-musical-imagen-animada-0046.gif)', backgroundSize: 'contain', padding: '15px 30px 20px 50px', backgroundRepeat: 'no-repeat', margin: '30px'}}> Register failed </span>                
                <img style={{position: 'relative', left: '32%'}} src="https://i.pinimg.com/736x/75/5a/8b/755a8bb396f33507d804afaa7f769337.jpg" alt="note in fire"/>
            </div>
             : false}
            {state.success === 1?
             <div style={{position: 'relative', top: '100px'}}>
             <span style={{fontSize: '30px', backgroundImage: 'url(https://www.gifsanimados.org/data/media/1377/nota-musical-imagen-animada-0046.gif)', backgroundSize: 'contain', padding: '15px 30px 20px 50px', backgroundRepeat: 'no-repeat', margin: '30px'}}> Register succesfull!!! </span>                
             <img style={{position: 'relative', left: '32%'}} src="https://c.tenor.com/_ghn0Sr3fh0AAAAd/music.gif" alt="note in fire"/>
         </div>
             : false}
        </div>
    )
}