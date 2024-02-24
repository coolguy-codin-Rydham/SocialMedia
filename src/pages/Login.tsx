import {auth, provider} from "../config/firebase"
import {signInWithPopup} from "firebase/auth"
import { useNavigate } from "react-router-dom"


const Login = () => {

  const navigate = useNavigate();

  

  const signIn = async () =>{
    const result = await signInWithPopup(auth, provider)
    console.log(result)
    navigate('/')

  }

  return (
    <div>
      <h1>Login with Google</h1>
      <button onClick={signIn}>Sign in with Google</button>
    </div>
  )
}

export default Login
