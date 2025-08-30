"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const projects = [
  {
    id: 1,
    title: "KIMIYA SANAT PARSEH - FRONT-END DEVELOPER",
    description:
      "Company Website using Next.js, Optimizing user experience and performance with react-hook-form, shadcn and axios",
    image: "/project1.jpg",
    link: "https://ks.sevintm.com",
  },
  {
    id: 2,
    title: "DAALAAN-DESIGN - FRONT-END DEVELOPER",
    description:
      "A Booth design company website using Next.js, handling dynamic forms and errors using Formik & Yup, optimizing user experience using Nextui and framer-motion and swiper as sliders.",
    image: "/project2.jpg",
    link: "https://daalaan-design.ir",
  },
  {
    id: 3,
    title: "ZARVAN TRIP - FRONT-END DEVELOPER",
    description:
      "Booking hotels website using shadcn and react query for better user experience.",
    image: "/project3.jpg",
    link: "https://zarvantrip.com",
  },
  {
    id: 4,
    title: "ZARVAN ADMIN PANEL - FRONT-END DEVELOPER",
    description:
      "Admin panel for zarvantrip project to manage the website better than before. It’s currently in development. I’m using shadcn, react hook form and zod in this project",
    image: "/project3.jpg",
    link: "https://servers-admin.zarvantrip.com",
  },
  {
    id: 5,
    title: "SEVIN ADMIN PANEL - FRONT-END DEVELOPER",
    description:
      "Customer Management panel for Sevin Team to manage for managing their hotel cutomers. It’s currently in development. I’m using shadcn, react hook form and zod in this project and zustand for state management",
    image: "/project3.jpg",
    link: "https://serverb.sevinhost.com",
  },
];

export default function ProjectsTemplate() {
  return (
    <section className="lg:max-w-[1280px] max-w-[95%] mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">My Projects</h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.15 } },
        }}
      >
        {projects.map((project) => (
          <motion.div
            key={project.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{
              scale: 1.01,
              boxShadow: "0 0 20px #155dfc",
            }}
            className="relative rounded-2xl"
          >
            <Card className="rounded-2xl overflow-hidden shadow-lg cursor-pointer h-full flex flex-col">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover flex-shrink-0"
              />
              <div className="flex-1 flex flex-col justify-between">
                <CardHeader className="p-4">
                  <CardTitle className="text-lg font-semibold">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 text-sm text-muted-foreground flex-1">
                  {project.description}
                </CardContent>
                <CardFooter className="p-4">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-indigo-500 hover:underline"
                  >
                    View Project
                  </a>
                </CardFooter>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
