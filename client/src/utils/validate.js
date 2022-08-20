export default function validate(input){
  let errors = {};

  if(!input.user) errors.user =
  'Ingresa tu nombre de usuario de Spotify o tu dirección de correo electrónico.'

  if(!input.pass) errors.pass =
  'Por favor introduce tu contraseña.'

  return errors
}
