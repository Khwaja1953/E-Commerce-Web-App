import React from 'react'
import { Link, NavLink, useNavigate} from 'react-router-dom'
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
   useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  
  }, []);
   const logoutHandler = () => {
    localStorage.removeItem("token");
     localStorage.removeItem("userInfo");
    setIsLogin(false);
    navigate("/login");
  };



  console.log("i am navbar")
  return (
    <div className='flex bg-gray-400 h-[10vh] justify-between items-center px-40 sticky top-0 w-full'>
      <p>My Shoppie</p>
      <ul className='flex w-[50vw] justify-evenly'>
        <li><NavLink className={(e)=> e.isActive?"bg-gray-600 px-2 py-1 border rounded text-white":""} to='/'>Home</NavLink></li>
        <li><NavLink className={(e)=> e.isActive?"bg-gray-600 px-2 py-1 border rounded text-white":""} to='/products'>products</NavLink></li>
        {isLogin ? (
          <>
        <li><NavLink className={(e)=> e.isActive?"bg-gray-600 px-2 py-1 border rounded text-white":""}to="/cart">Cart</NavLink></li>
        <li><button onClick={logoutHandler}className="bg-red-500 px-2 py-1 rounded text-white">Logout</button></li></>
        ) : (<>
        <li><NavLink className={(e)=> e.isActive?"bg-gray-600 px-2 py-1 border rounded text-white":""}to="/register">Register</NavLink></li>
        <li><NavLink className={(e)=> e.isActive?"bg-gray-600 px-2 py-1 border rounded text-white":""} to="/login">Login</NavLink></li>
        <li><NavLink className={(e)=> e.isActive?"bg-gray-600 px-2 py-1 border rounded text-white":""} to="/cart">cart</NavLink></li>
       </>)}
      </ul>
    </div>
  );
}


export default Navbar