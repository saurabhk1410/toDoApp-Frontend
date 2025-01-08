import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <nav className='bg-slate-800 text-slate-300 px-12 flex justify-between h-16 text-xl items-center'>
      <div className=''>TODO APP.</div>
      <div className="flex gap-x-16 h-full items-center">
      <Link to={"/"}>Home</Link>
      <Link to={"/profile"}>Profile</Link>
      <Link to={"/login"}>Login</Link>
      </div>
    </nav>
  )
}

export default Header