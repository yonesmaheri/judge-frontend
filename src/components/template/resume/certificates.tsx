"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";

// Certificates data (replace images and texts as needed)
const certificates = [
  {
    id: 1,
    title: "Quera Website Levelup",
    subtitle:
      "An event included a 12-hour online course on algorithms and successful competition of the final exam",
    date: "October 2023",
    image: "/website.jpg",
  },
  {
    id: 2,
    title: "Quera Algorith Levelup",
    subtitle:
      "An event included a 9-hour online course, a workshop, and a practical project",
    date: "August 2025",
    image: "/algorithm.jpg",
  },
  {
    id: 3,
    title: "React Course",
    subtitle: "A 6-hour online course presented by Hesam Mousavi in Roocket.ir",
    date: "October 2023",
    image: "/roocket.png",
  },
];

export default function CertificatesSection() {
  return (
    <section className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Certificates</h2>

      <motion.div
        className="flex items-start justify-between gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.2 } },
        }}
      >
        {certificates.map((cert) => (
          <motion.div
            key={cert.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.05 }}
            className="relative"
          >
            <Card className="rounded-2xl overflow-hidden shadow-lg">
              <Image
                width={450}
                height={150}
                src={cert.image}
                alt={cert.title}
              />
              <CardHeader className="p-4">
                <CardTitle className="text-lg font-semibold">
                  {cert.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{cert.subtitle}</p>
              </CardHeader>
              <CardFooter className="p-4 text-sm text-muted-foreground">
                {cert.date}
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
