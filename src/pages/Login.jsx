

import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { context, server } from "../main";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const { isAuthenticated, setisAuthenticated, loading, setLoading } = useContext(context);

  if (isAuthenticated) return <Navigate to={"/"} />;

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/users/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setisAuthenticated(true);
      setLoading(false);
      toast.success(data.message);
    } catch (error) {
      setisAuthenticated(false);
      setLoading(false);
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-300 p-6">
      <form 
        onSubmit={loginHandler} 
        className="flex flex-col gap-4 bg-slate-800 p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-semibold text-center">Login</h2>
        <input
          className="p-3 rounded-lg bg-slate-700 text-white border-2 border-slate-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          type="email"
          name="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="p-3 rounded-lg bg-slate-700 text-white border-2 border-slate-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          type="password"
          name="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="p-3 rounded-lg bg-green-500 hover:bg-green-600 transition-all text-white font-bold disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="text-center text-lg">Or</p>
        <Link
          to="/register"
          className="text-green-400 text-center hover:underline"
        >
          Sign Up
        </Link>
      </form>
    </div>
  );
};

export default Login;
