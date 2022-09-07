import store from "../store/index";
import axios from "axios";
import { userTokenInfo } from "../store/slice/user";
import Swal from 'sweetalert2';

import Cookies from "universal-cookie";
const cookies = new Cookies();

const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  iconColor: 'white',
  customClass: {
    popup: 'colored-toast'
  },
  showConfirmButton: false,
  timer: 1500,
})

export default function login(obj, url, text = 'logeado') {
  return axios.post(axios.defaults.baseURL+url,
    obj,{
      withCredentials: true
    })
    .then((e) => {
      cookies.set('refreshToken', e.data.token, {path: '/'})
      Toast.fire({
        icon: 'success',
        title: text || 'Success'
      })
      store.dispatch(userTokenInfo())
    })
    .catch((e) => {
      const error = "posibles errores:\n" +
          "- el back no se ha iniciado\n" +
          "- alguno de los campos falta o es incorrecto\n" +
          "- el usuario no existe en la base de datos";
      Toast.fire({
        icon: 'error',
        title: typeof e.response.data === 'object' ? error : e.response.data,
        showConfirmButton: true,
        timer: undefined,
      })
      throw e;
    });
}
