import { useState } from "react";
import { Link } from "react-router-dom";
import { server } from "../main";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerSubmitHandler = async(e) => {
    e.preventDefault();
   console.log("before");
   
                   try {
                          const res=await axios.post(`${server}/users/new`,{
                            name,email,password
                          },
                          {
                            headers:{
                              "Content-Type":"application/json"
                            },
                            withCredentials:true
                          }
                        );
                          console.log(res.data);
                          setName("");
                          setEmail("");
                          setPassword("");
                        toast.success("done")
                    
                   } catch (error) {
                    console.log(error);
                    
                   }
  };

  return (
    <form
      action=""
      onSubmit={registerSubmitHandler}
    >
      <input
        type="text"
        name="name"
        placeholder="Enter Your Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }
      }
      required
      />
      <input
        type="email"
        name="email"
        placeholder="Enter Your Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        required
      />
      <input 
      type="password" 
      name="password" 
      placeholder="Enter Password" 
      required
      value={password}
      onChange={(e)=>{
        setPassword(e.target.value);
      }}
      />
      <button type="submit">Sign Up</button>
      <p>or</p>
      <Link to={"/login"}>Login</Link>
    </form>
  );
};

export default Register;
