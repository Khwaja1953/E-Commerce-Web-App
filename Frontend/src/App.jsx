// src/App.jsx
import {react}from"react"
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Product from "./Pages/Product";
// import Cart from "./pages/Cart";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Order from "./Pages/Order";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/product/:id"
          element={<Product />}
        />

        {/* <Route path="/cart" element={<Cart />} /> */}

        <Route path="/login" element={<Login />} />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/order"
          element={<Order/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;