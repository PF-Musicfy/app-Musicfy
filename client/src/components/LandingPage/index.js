import Footer from './Footer';
//import Player from '../Reproductor';
      //<Player />
import Login from '../Login';
import Logout from '../Logout';
import Profile from '../Profile';
import { useAuth0 } from '@auth0/auth0-react'

export default function LandingPage(){                            
  const { isAuthenticated } = useAuth0();

  return (                                                        
    <div>
      {isAuthenticated ?
        <>
          <Profile />
          <Logout />
        </>
        : <Login />
      }
      <Footer />
    </div>
  )                                                               
}  
