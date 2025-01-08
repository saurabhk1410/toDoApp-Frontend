import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Header from "./components/Header"
import Profile from "./pages/Profile"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Login from "./pages/Login"
import { Toaster } from "react-hot-toast"
function App() {
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
