"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isLogin, logOut } from "@/utils/auth";
import { toast } from "react-toastify";

export default function Home() {
  const [user, setUser] = useState({ name: "", email: "" });
  const router = useRouter();

  useEffect(() => {
    const authenticate = async () => {
      const loggedIn = await isLogin();

      if (loggedIn.auth) {
        setUser(loggedIn.data);
      } else {
        router.push("/login");
      }
    };
    authenticate();
  }, []);

  const handleLogout = () => {
    logOut();
    toast.success("Logout Successfully");
    router.push("/login");
  };

  return (
    <main className="w-full h-screen grid place-items-center bg-purple-100">
      <div className="p-6 bg-purple-200 rounded-lg shadow-lg w-[90%] max-w-md text-center space-y-4">
        <p className="text-xl font-semibold text-purple-900">Hi {user.name}, welcome</p>
        <p className="text-purple-700">{user.email}</p>
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-300"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </main>
  );
}
