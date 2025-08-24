import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Phone } from "lucide-react";

function LeftCol() {
  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex flex-col items-center text-center md:text-left"
    >
      <img
        src="/me.jpg"
        alt="Profile"
        className="w-40 h-40 md:w-56 md:h-56 rounded-full shadow-lg border-4 border-white object-cover"
      />
      <h1 className="mt-6 text-3xl md:text-4xl font-bold">Yones Maheri</h1>
      <p className="text-[12px] lg:text-base text-center text-gray-600">
        Frontend Developer | Python Developer
      </p>

      {/* Socials */}
      <div className="flex items-center justify-center w-full gap-6 mt-6 text-gray-600">
        <a
          href="https://github.com/yonesmaher"
          target="_blank"
          rel="noreferrer"
        >
          <Github className="h-6 w-6 hover:text-black transition" />
        </a>
        <a
          href="https://linkedin.com/in/yones-maheri"
          target="_blank"
          rel="noreferrer"
        >
          <Linkedin className="h-6 w-6 hover:text-blue-600 transition" />
        </a>
        <a href="mailto:yonesmaheri80@gmail.com">
          <Mail className="h-6 w-6 hover:text-red-500 transition" />
        </a>
        <a href="tel:09015319832">
          <Phone className="h-6 w-6 hover:text-green-500 transition" />
        </a>
      </div>
    </motion.div>
  );
}

export default LeftCol;
