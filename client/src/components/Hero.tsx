import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#0A0A0A] py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Creative Developer & Designer
          </motion.h1>
          
          <motion.p
            className="text-xl text-white/70 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Building beautiful digital experiences with modern technologies and a keen eye for design.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <a 
              href="#projects"
              className="bg-[#E94560] text-white px-8 py-3 rounded-md inline-block hover:bg-[#E94560]/90 transition-colors"
            >
              View My Work
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
