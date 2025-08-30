"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const experiences = [
  {
    role: "WordPress Developer",
    company: "Freelancer",
    date: "2021 - Present",
    description:
      "I started my career as a technical support intern at Hoorakhsh Company, where I helped maintain several WordPress websites. I resolved plugin and theme issues, improved site performance, and handled hosting tasks like backups and domain setup using cPanel. This experience gave me a strong foundation in website support and hosting.",
  },
  {
    role: "Frontend Developer",
    company: "Freelancer",
    date: "2023 - Present",
    description:
      "After my internship, I started working as a freelance frontend developer with different teams. I’ve been involved in building and maintaining web applications using modern technologies, primarily React and Next.js. This experience has helped me improve my skills in component-based architecture, API integration, and responsive UI design while collaborating in real-world development environments.",
  },
  {
    role: "Python Developer (Beginner)",
    company: "Self-learning",
    date: "2024 - Present",
    description: "Exploring Python for data science and automation projects.",
  },
];

export default function Experience() {
  return (
    <section className="relative container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-10 text-center">Work Experience</h2>
      <div className="relative border-l-2 border-blue-500 dark:border-gray-700 pl-8 space-y-10">
        {experiences.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            viewport={{ once: true }}
          >
            <Card className="relative overflow-hidden group hover:shadow-xl transition">
              <span className="absolute -left-12 top-6 w-6 h-6 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 shadow-md"></span>
              <CardHeader>
                <CardTitle>
                  {exp.role} -{" "}
                  <span className="text-muted-foreground">{exp.company}</span>
                </CardTitle>
                <p className="text-sm text-gray-400">{exp.date}</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  {exp.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
