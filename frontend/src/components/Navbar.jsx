import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-[#0d1117] to-[#031d5a] px-8 p-2 shadow-lg text-white flex justify-between items-center">
      <Link to="/" className="font-bold text-lg ">
        <img src="/colored-logo.png" alt="" className="h-21 ml-20 " />
      </Link>

      <div className="space-x-12 font-semibold">
        {user && (
          <>
            <Link
              to="/"
              className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-blue-400 to-white"
            >
              Dashboard
            </Link>
            <Link
              to="/customers"
              className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-blue-400 to-white"
            >
              Customers
            </Link>
            <Link
              to="/invoices"
              className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-blue-400 to-white"
            >
              Invoices
            </Link>
            <Link
              to="/expenses"
              className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-blue-400 to-white"
            >
              Expenses
            </Link>
          </>
        )}

        {user ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 rounded px-3 py-1 hover:bg-gradient-to-r from-[#860000] to-[#851571] hover:text-white"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="mx-2 hover:underline">
              Login
            </Link>
            <Link to="/register" className="mx-2 hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
