import { Link } from "react-router-dom"

const Login = () => {
  return (
    <form action="">
        <input type="email" name="email" placeholder="enter email" />
        <input type="password" name="password" placeholder="enter password" />
        <button type="submit">Login</button>
        <h4>Or</h4>
        <Link to={"/register"}>Sign Up</Link>
    </form>
  )
}

export default Login