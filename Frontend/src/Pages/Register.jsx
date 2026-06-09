// src/pages/Register.jsx

import { useState } from "react";
import API from "../services/Axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      formData.password !== formData.confirmPassword
    ) {
      return setError("Passwords do not match");
    }

    try {
      await API.post(
        "/user/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phoneNumber: formData.phoneNumber,
        }
      );

      alert("OTP sent to your email!");
      navigate("/verify-otp", { state: { email: formData.email } });
    } catch (error) {
      console.log(error);
      console.log(error.response.data.error);

      setError(error.response.data.error || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl w-full max-w-2xl border border-gray-100">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase">
            JOIN THE SQUAD
          </h1>
          <p className="text-gray-400 font-bold uppercase tracking-widest mt-2 text-sm">
            Create your account in seconds
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white p-4 rounded-3xl transition-all outline-none font-bold text-gray-900 shadow-sm"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="+91 9876543210"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white p-4 rounded-3xl transition-all outline-none font-bold text-gray-900 shadow-sm"
                required
              />
            </div>
          </div>

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white p-4 rounded-3xl transition-all outline-none font-bold text-gray-900 shadow-sm"
                required
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-2xl font-bold text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-5 rounded-[30px] font-black text-xl hover:bg-blue-600 transition-all transform active:scale-95 shadow-xl shadow-gray-900/10 uppercase tracking-widest mt-4"
          >
            Register Now
          </button>
        </form>
        
        <div className="mt-10 text-center">
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">
            Already a member?{" "}
            <Link to="/login" className="text-blue-600 hover:text-blue-700 underline underline-offset-4">
              Login Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;