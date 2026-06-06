// src/pages/Login.jsx

import { useState } from "react";
import API from "../services/Axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const {data}  = await API.post(
        "/user/login",
        formData
      );
       localStorage.setItem("token", data.token);
      localStorage.setItem("userInfo", JSON.stringify(data));

      navigate("/");
    } 
    catch (error) {
      console.log(error);
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl w-full max-w-lg border border-gray-100">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase">
            WELCOME BACK
          </h1>
          <p className="text-gray-400 font-bold uppercase tracking-widest mt-2 text-sm">
            Enter your credentials to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white p-4 rounded-3xl transition-all outline-none font-bold text-gray-900 shadow-sm"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white p-4 rounded-3xl transition-all outline-none font-bold text-gray-900 shadow-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-5 rounded-[30px] font-black text-xl hover:bg-blue-600 transition-all transform active:scale-95 shadow-xl shadow-gray-900/10 uppercase tracking-widest mt-4"
          >
            Login
          </button>
        </form>
        
        <div className="mt-10 text-center">
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:text-blue-700 underline underline-offset-4">
              Create One
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;