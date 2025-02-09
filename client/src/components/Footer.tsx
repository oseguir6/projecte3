import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0A0A] py-6 mt-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 text-center"
      >
        <p className="text-white/70">
          Copyright © {currentYear} Oriol Seguí. Todos los derechos reservados.
        </p>
      </motion.div>
    </footer>
  );
}
