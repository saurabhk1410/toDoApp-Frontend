/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import "./styles/index.css";
import App from "./App";
import ReactDOM from "react-dom/client";
import React from "react";

export const server = "https://todo-node-etob.onrender.com";

export const context = createContext({ isAuthenticated: false });

const AppWrapper=() =>{
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user,setUser]=useState({});
  return (
    <context.Provider value={{ isAuthenticated, setisAuthenticated ,loading,setLoading,user,setUser}}>
      <App/>
    </context.Provider>
  );
};
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <AppWrapper />
  // </React.StrictMode>
);