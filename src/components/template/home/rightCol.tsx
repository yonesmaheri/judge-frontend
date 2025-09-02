import { motion } from "framer-motion";

function RightCol() {
  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
      className="mt-10 md:mt-0 md:ml-16 w-full md:w-1/2 text-center md:text-left"
    >
      <h2 className="text-2xl md:text-5xl font-bold mb-6 text-white">
        Hi, welcome to my portfolio 👋
      </h2>
      <p className="text-[12px] lg:text-base text-white leading-relaxed mb-8">
        I’m a frontend and Python developer, constantly improving my skills in
        data science, web development, and modern technologies. I enjoy creating
        clean, interactive web apps and learning new tools to solve challenging
        problems.
      </p>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
        <a
          href="/Yones Maheri.pdf"
          download
          className="px-6 py-3 text-[12px] lg:text-base rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          Download CV
        </a>
        <a
          href="/resume"
          className="px-6 py-3 text-[12px] lg:text-base text-white rounded-full border border-gray-300 font-medium  transition"
        >
          View Resume
        </a>
      </div>
    </motion.div>
  );
}

export default RightCol;
