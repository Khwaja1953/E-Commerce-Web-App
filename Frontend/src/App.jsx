  import { Routes, Route } from "react-router-dom";
  import React from 'react'
  import Home from "./Pages/Home";
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Product from './Pages/Product'

const App = () => {
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

export default App