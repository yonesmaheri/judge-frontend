"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoginPage from "@/components/template/login";
import RegisterPage from "@/components/template/register";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <motion.div
      className="h-full relative w-[400px] mx-auto mt-10"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* دکمه‌ها */}
      <div className="flex justify-center mb-4">
        <div className="inline-flex rounded-lg shadow-md overflow-hidden">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              isLogin
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Sign in
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              !isLogin
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Sign up
          </button>
        </div>
      </div>

      {/* باکس انیمیشن کارت */}
      <div className="relative w-full h-full perspective-[1000px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={isLogin ? "login" : "register"}
            initial={{ rotateY: isLogin ? -180 : 180, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: isLogin ? 180 : -180, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute w-full h-full backface-hidden"
          >
            {isLogin ? <LoginPage /> : <RegisterPage />}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
