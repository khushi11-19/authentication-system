"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { baseURL } from "../utils/constant";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
import { isLogin } from "@/utils/auth";

import { setAuthentication } from "../utils/auth";
import { FaUser } from "react-icons/fa"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const authenticate = async () => {
      if (await isLogin()) {
        router.push("/");
      }
    };
    authenticate();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { email, password };

    axios
      .post(`${baseURL}/login`, payload)
      .then((res) => {
        console.log(res.data);
        setAuthentication(res.data.token);
        toast.success("Login Successfully");
        router.push("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-800 p-4">
      <div className="w-full max-w-xs bg-white p-6 rounded-lg shadow-md">
       <h2 className="text-2xl font-semibold text-center text-purple-600 mb-6">
  <span className="inline-flex items-center justify-center">
    <FaUser className="mr-2" /> Login
  </span>
</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/signup" className="text-purple-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
