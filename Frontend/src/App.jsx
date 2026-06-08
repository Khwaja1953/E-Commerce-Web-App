// src/App.jsx
import {react}from"react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Product from './Pages/Product'

import Home from "./Pages/Home";
import AdminHome from "./Pages/Admin/Home";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Order from "./Pages/Order";
import VerifyOtp from "./Pages/VerifyOtp";
import Profile from "./Pages/Profile";

function App() {
  return (
    <div>
      <Navbar/>
       <Routes>
        <Route path="/" element={<Home />} />
       <Route path="/products" element={<Product />} />
       <Route path="/product/:id" element={<Product />} />
       <Route path="/cart" element={<Cart />} />
       <Route path="/verify-otp" element={<VerifyOtp />} />
       <Route path="/profile" element={<Profile />} />
       <Route path="/order" element={<Order />} />

       <Route path="/login" element={<Login/>}/>
       <Route path="/register" element={<Register/>}/>

       <Route path="/admin" element={<AdminHome/>}/>
       </Routes>
       <Footer/>
    </div>
  )
}

export default App;