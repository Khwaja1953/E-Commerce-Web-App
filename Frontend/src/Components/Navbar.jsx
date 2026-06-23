import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

const getRoleFromToken = (token) => {
  try {
    const payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const decodedPayload = JSON.parse(atob(payload));
    return decodedPayload.role;
  } catch (error) {
    return null;
  }
};

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogin(!!token);
    setUserRole(token ? getRoleFromToken(token) : null);
  }, [location.pathname]);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    setIsLogin(false);
    setUserRole(null);
    setIsOpen(false);
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
  ];

  const authLinks = isLogin
    ? [
        ...(userRole === "ADMIN" ? [{ name: "Admin", path: "/admin" }] : []),
        { name: "Cart", path: "/cart" },
        { name: "Orders", path: "/order" },
        { name: "Profile", path: "/profile" },
      ]
    : [
        { name: "Register", path: "/register" },
        { name: "Login", path: "/login" },
      ];

  return (
    <nav className="bg-gray-900 text-white sticky top-0 z-50 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-black tracking-tighter text-blue-500">
            MY SHOPPIE
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors ${
                      isActive ? "text-blue-400" : "hover:text-blue-400"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="h-6 w-px bg-gray-700 mx-2" />
              {authLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors ${
                      isActive ? "text-blue-400" : "hover:text-blue-400"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              {isLogin && (
                <button
                  onClick={logoutHandler}
                  className="bg-red-600 hover:bg-red-700 px-4 py-1.5 rounded-md text-sm font-bold transition-all transform active:scale-95"
                >
                  Logout
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden bg-gray-800 border-t border-gray-700`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {[...navLinks, ...authLinks].map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive ? "bg-gray-900 text-blue-400" : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          {isLogin && (
            <button
              onClick={logoutHandler}
              className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-400 hover:bg-gray-700 hover:text-red-300"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};


export default Navbar