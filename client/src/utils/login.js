import store from "../store/index";
import axios from "axios";
import { userTokenInfo } from "../store/slice/user";

export default function login(obj, url, text = 'logeado') {
  return axios.post(axios.defaults.baseURL+url,
    obj,{
      withCredentials: true
    })
    .then((e) => {
      alert(text);
      store.dispatch(userTokenInfo())
    })
    .catch((e) => {
      alert("posibles errores:\n" +
          "- el back no se ha iniciado\n" +
          "- alguno de los campos falta o es incorrecto\n" +
          "- el usuario no existe en la base de datos"
      );
      throw new Error(e)
    });
}
