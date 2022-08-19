import { useAuth0 } from '@auth0/auth0-react'

export default function Profile(){
  const {user, isAuthenticated, isLoading} = useAuth0();

  if(isLoading) <div>Loading...</div>

  console.log(user);

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h3>Name: {user.name}</h3>
        <p>Email: {user.email}</p>
        <p>Email Verificado: {''+user.email_verified}</p>
        <p>Nickname: {user.nickname}</p>
        <p>Sub: {user.sub}</p>
        <p>Update: {user.updated_at}</p>
      </div>
    )
  )
}
