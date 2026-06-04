// src/App.jsx
import {react}from"react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Product from './Pages/Product'

import Home from "./Pages/Home";
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
       <Route path="/product/:id" element={<Product />} />

       <Route path="/login" element={<Login/>}/>
       <Route path="/register" element={<Register/>}/>
       </Routes>
       <Footer/>
    </div>
  )
}

export default App;