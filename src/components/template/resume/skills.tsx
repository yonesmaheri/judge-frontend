"use client";

import { motion, type Variants } from "framer-motion";

const skills = [
  "REACTJS", "NEXTJS", "TYPESCRIPT", "EXPRESS",
  "SEQUELIZE", "PRISMA", "REACT-QUERY", "SHADCN",
  "HEROUI", "MUI", "ZUSTAND", "HOOK-FORM",
  "FORMIK", "ZOD", "YUP", "PYTHON",
  "POSTGRESQL", "MYSQL",
];

export default function SkillsSection() {
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 16 } },
  };

  return (
    <section className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Skills</h2>

      <motion.ul
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 list-none"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {skills.map((skill, idx) => (
          <motion.li
            key={idx}
            className="p-4 rounded-full text-sm font-medium bg-blue-600 text-white border shadow-md text-center cursor-pointer"
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
          >
            {skill}
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
