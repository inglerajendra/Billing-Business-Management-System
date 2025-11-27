import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const Register = ({ setUser }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/Register", form);
      setUser(res.data.user);
      navigate("/");
    } catch (err) {
      console.log(err);

      setError("Registration failed");
    }
  };
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <form
        action=""
        className="bg-white p-6 rounded shadow-md w-full max-w-lg"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl mb-6 font-bold text-center text-gray-800 ">
          Register
        </h1>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <input
          type="text"
          placeholder="enter your name"
          className="border p-2 w-full mb-3"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="enter email"
          className="border p-2 w-full mb-3"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="enter password"
          className="border p-2 w-full mb-3"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="bg-gray-800 text-white p-2 w-full font-semibold hover:bg-gray-700 cursor-pointer">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
