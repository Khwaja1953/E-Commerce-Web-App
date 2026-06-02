// src/App.jsx
import {react}from"react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
  import { Routes, Route } from "react-router-dom";
  import React from 'react'
  import Home from "./Pages/Home";
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Product from './Pages/Product'

import Home from "./Pages/Home";
import Product from "./Pages/Product";
// import Cart from "./pages/Cart";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Order from "./Pages/Order";

function App() {
  return (
    <div>
      <Navbar/>
       <Routes>
        <Route path="/" element={<Home />} />
       <Route path="/products" element={<Product />} />
       </Routes>
       <Footer/>
    </div>
  )
}

export default App;