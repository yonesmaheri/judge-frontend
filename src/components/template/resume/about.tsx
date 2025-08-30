"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="w-full mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center mb-4 text-black">
        About Me
      </h2>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 120, damping: 16 }}
        className="relative mx-auto p-6 rounded-2xl bg-white backdrop-blur-md border border-white/20 shadow-lg"
      >
        {/* Gradient border glow */}

        <div className="relative">
          <p className="text-gray-900 text-base leading-relaxed">
            I am a passionate Frontend Developer with experience in building
            modern web applications. My work as a Frontend Developer and
            WordPress Specialist has given me practical skills in React,
            Next.js, and TypeScript, along with expertise in designing reusable
            UI/UX components using shadcn and HeroUI.
          </p>
          <br />
          <p>
            I am also exploring backend development with Python and Express, and
            working with databases like PostgreSQL and MySQL. For API management
            and state handling, I use React Query and Zustand, and I am
            proficient in form validation with React Hook Form, Formik, Zod, and
            Yup.
          </p>
          <br />
          <p>
            My goal is to leverage my skills to build interactive, responsive,
            and full-stack applications while continuously learning and
            expanding my expertise in modern web technologies.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
