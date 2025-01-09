/* eslint-disable react-hooks/exhaustive-deps */
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Header from "./components/Header"
import Profile from "./pages/Profile"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Login from "./pages/Login"
import { Toaster } from "react-hot-toast"
import { useContext, useEffect } from "react"
import { context, server } from "./main"
import axios from "axios"
function App() {
  const {setUser,setisAuthenticated,setLoading,user}=useContext(context);
  useEffect(()=>{
    setLoading(true);
    axios.get(`${server}/users/me`,{
      withCredentials:true
    }).then((res)=>{setUser(res.data.user);
      setisAuthenticated(true);
      setLoading(false);
    }).catch((error)=>{setUser({});
    setisAuthenticated(false);
  setLoading(false);});
  },[])
  return (
    <Router>
      <Header/>
       <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/profile" element={<Profile/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
       </Routes>
       <Toaster/>
    </Router>
    
  )
}

export default App
