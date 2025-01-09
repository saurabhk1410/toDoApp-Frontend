


import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { context, server } from '../main';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaBars, FaTimes } from 'react-icons/fa';
import Loader from "../components/Loader";

const Header = () => {
    const { isAuthenticated, setisAuthenticated, loading, setLoading } = useContext(context);
    const [menuOpen, setMenuOpen] = useState(false);

    const logoutHandler = async () => {
        setLoading(true);
        try {
            const { data } = await axios(`${server}/users/logout`, {
                withCredentials: true
            });
            setisAuthenticated(false);
            setLoading(false);
            toast.success("Logged Out Successfully");
        } catch (error) {
            setisAuthenticated(true);
            toast.error(error.response.data.message);
            setLoading(false);
        }
    };

    return (
        <nav className='bg-slate-800 text-slate-300 px-12 flex justify-between h-16 text-xl items-center relative'>
            {/* Logo */}
            <div className='font-bold'>TODO APP.</div>

            {/* Hamburger Icon for Mobile */}
            <div className="md:hidden text-3xl cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <FaTimes /> : <FaBars />}
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-x-16 h-full items-center">
                <Link to={"/"}>Home</Link>
                <Link to={"/profile"}>Profile</Link>
                {isAuthenticated ? (
                    <button className='disabled:bg-red-700' disabled={loading} onClick={logoutHandler}>Logout</button>
                ) : (
                    <Link to={"/login"}>Login</Link>
                )}
            </div>

            {/* Fullscreen Mobile Menu */}
            {menuOpen && (
                <div className="fixed inset-0 bg-slate-900 text-slate-300 flex flex-col items-center justify-center gap-8 z-50">
                    <Link to={"/"} onClick={() => setMenuOpen(false)}>Home</Link>
                    <Link to={"/profile"} onClick={() => setMenuOpen(false)}>Profile</Link>
                    {isAuthenticated ? (
                        <button className='text-red-500' disabled={loading} onClick={() => { logoutHandler(); setMenuOpen(false); }}>
                            Logout
                        </button>
                    ) : (
                        <Link to={"/login"} onClick={() => setMenuOpen(false)}>Login</Link>
                    )}
                </div>
            )}
        </nav>
    );
}

export default Header;
