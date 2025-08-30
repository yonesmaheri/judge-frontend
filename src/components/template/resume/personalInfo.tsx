import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function PersonalInfo() {
  return (
    <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} className="w-fit mx-auto">
      <div className="relative rounded-2xl text-black shadow-xl">
        {/* animated gradient border */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="absolute -inset-0.5 rounded-2xl z-[-1] bg-[length:200%_200%] 
                 bg-gradient-to-r from-blue-500 via-blue-300 to-blue-100 
                 animate-gradient blur opacity-75"
        ></motion.div>

        {/* white content box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
          className="relative rounded-2xl bg-white p-6"
        >
          <div className="text-center space-y-4">
            <Avatar className="w-30 h-30 mx-auto border-4 border-white">
              <AvatarImage src="/me.jpg" alt="Yones Maheri" />
              <AvatarFallback>YM</AvatarFallback>
            </Avatar>
            <h1 className="text-3xl font-bold">Yones Maheri</h1>
            <p className="text-lg text-gray-500">
              Frontend Developer | WordPress Specialist | Python (Beginner)
            </p>
          </div>
        </motion.div>
      </div>
    </Tilt>
  );
}
