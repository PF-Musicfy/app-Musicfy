import store from "../store/index";
import axios from "axios";
import { userTokenInfo } from "../store/slice/user";
import Swal from 'sweetalert2';

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
        title: error,
        showConfirmButton: true,
        timer: undefined,
      })
      throw new Error(e)
    });
}
