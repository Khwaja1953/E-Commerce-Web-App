import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
  console.log("i am navbar")
  return (
    <div className='flex bg-gray-400 h-[10vh] justify-between items-center px-40 sticky top-0 w-full'>
      <p>My Shoppie</p>
      <ul className='flex w-[50vw] justify-evenly'>
        <li><NavLink className={(e)=> e.isActive?"bg-gray-600 px-2 py-1 border rounded text-white":""} to='/'>Home</NavLink></li>
        <li><NavLink className={(e)=> e.isActive?"bg-gray-600 px-2 py-1 border rounded text-white":""} to='/addBlog'>register</NavLink></li>
        <li><NavLink className={(e)=> e.isActive?"bg-gray-600 px-2 py-1 border rounded text-white":""} to="/login">Login</NavLink></li>
        <li><NavLink className={(e)=> e.isActive?"bg-gray-600 px-2 py-1 border rounded text-white":""} to="/cart">cart</NavLink></li>
        <li><NavLink className={(e)=> e.isActive?"bg-gray-600 px-2 py-1 border rounded text-white":""} to="/products">Products</NavLink></li>
      </ul>
    </div>
  );
}

export default Navbar