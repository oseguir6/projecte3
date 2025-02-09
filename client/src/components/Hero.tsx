import { motion } from "framer-motion";
import { Terminal, Code2, Globe } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function Hero() {
  const { data: terminalText = "dev@portfolio:~$" } = useQuery({
    queryKey: ["/api/site-content/hero.terminal.text"],
    select: (data: any) => data.value,
  });

  const { data: heroTitle = "Hola, soy Dev" } = useQuery({
    queryKey: ["/api/site-content/hero.title"],
    select: (data: any) => data.value,
  });

  const { data: heroSubtitle = "Desarrollador Full Stack" } = useQuery({
    queryKey: ["/api/site-content/hero.subtitle"],
    select: (data: any) => data.value,
  });

  const { data: heroDescription = "Me especializo en crear aplicaciones web modernas y escalables" } = useQuery({
    queryKey: ["/api/site-content/hero.description"],
    select: (data: any) => data.value,
  });

  const { data: buttonProjects = "View Projects" } = useQuery({
    queryKey: ["/api/site-content/hero.button.projects"],
    select: (data: any) => data.value,
  });

  const { data: buttonContact = "Contact Me" } = useQuery({
    queryKey: ["/api/site-content/hero.button.contact"],
    select: (data: any) => data.value,
  });

  const { data: techStackTitle = "Tech Stack" } = useQuery({
    queryKey: ["/api/site-content/technologies.subtitle"],
    select: (data: any) => data.value,
  });

  const { data: techList = "JavaScript,TypeScript,React,Node.js,PostgreSQL,Docker,AWS,Linux" } = useQuery({
    queryKey: ["/api/site-content/technologies.list"],
    select: (data: any) => data.value,
  });

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#0A0A0A] py-32 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 grid grid-cols-8 gap-4 opacity-10">
        {Array.from({ length: 64 }).map((_, i) => (
          <motion.div
            key={i}
            className="aspect-square border border-[#E94560]/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-4 mb-6">
            <Terminal className="h-8 w-8 text-[#E94560]" />
            <motion.div
              className="text-xl text-[#E94560] font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {terminalText}
            </motion.div>
          </div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {heroTitle} <br />
            <span className="text-[#E94560]">{heroSubtitle}</span>
          </motion.h1>

          <motion.p
            className="text-xl text-white/70 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {heroDescription}
          </motion.p>

          <motion.div
            className="flex gap-6 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <a
              href="#projects"
              className="bg-[#E94560] text-white px-8 py-3 rounded-md inline-flex items-center gap-2 hover:bg-[#E94560]/90 transition-colors"
            >
              <Code2 className="w-5 h-5" />
              {buttonProjects}
            </a>
            <a
              href="/contact"
              className="border border-[#E94560] text-white px-8 py-3 rounded-md inline-flex items-center gap-2 hover:bg-[#E94560]/10 transition-colors"
            >
              <Globe className="w-5 h-5" />
              {buttonContact}
            </a>
          </motion.div>

          {/* Tech stack icons */}
          <motion.div
            className="mt-16 flex gap-8 items-center justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="text-white/40 text-sm">{techStackTitle}</div>
            <div className="h-px flex-1 bg-gradient-to-r from-[#E94560]/50 to-transparent" />
          </motion.div>

          <motion.div
            className="mt-6 flex flex-wrap gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {techList.split(',').map((tech: string, index: number) => (
              <motion.div
                key={tech}
                className="px-4 py-2 bg-[#1A1A2E] rounded-md text-white/70 border border-[#16213E] hover:border-[#E94560] transition-colors"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + (index * 0.1) }}
              >
                {tech.trim()}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}