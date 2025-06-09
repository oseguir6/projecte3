import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";
import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import BlogSection from "@/components/BlogSection";
import { useQuery } from "@tanstack/react-query";
import type { Project, Technology } from "@shared/schema";
import { Link } from "wouter";

export default function Home() {
  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const { data: technologies = [] } = useQuery<Technology[]>({
    queryKey: ["/api/technologies"],
  });

  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="bg-[#0A0A0A]">
      <Hero />

      {/* Technologies Section */}
      <section className="py-20 bg-[#16213E]">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-white mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Technologies I Work With
          </motion.h2>

          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech) => (
              <motion.div
                key={tech.id}
                className="flex items-center gap-2 bg-[#1A1A2E] px-6 py-3 rounded-full text-white"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
              >
                <div className="text-[#E94560]" dangerouslySetInnerHTML={{ __html: tech.icon }} />
                {tech.name}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-white mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Featured Projects
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Preview Section */}
      <section className="py-20 bg-[#16213E]">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Mi Trayectoria</h2>
            <p className="text-white/70 mb-6">
              Un vistazo a mi experiencia profesional y proyectos destacados
            </p>
            <Link href="/timeline">
              <motion.button
                className="bg-[#E94560] hover:bg-[#E94560]/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ver Timeline Completo
              </motion.button>
            </Link>
          </motion.div>
          
          {/* Mini Timeline Preview */}
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-[#E94560]/30 h-full"></div>
              
              <div className="space-y-12">
                <motion.div
                  className="flex items-center"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="w-5/12 pr-8 text-right">
                    <div className="bg-[#1A1A2E] p-4 rounded-lg">
                      <h3 className="text-white font-semibold">Desarrollador Frontend</h3>
                      <p className="text-[#E94560] text-sm">2023 - Presente</p>
                      <p className="text-white/70 text-sm mt-2">
                        Desarrollo de aplicaciones web modernas con React y TypeScript
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-4 h-4 rounded-full bg-[#E94560] border-4 border-[#16213E] z-10"></div>
                  </div>
                  <div className="w-5/12 pl-8"></div>
                </motion.div>

                <motion.div
                  className="flex items-center"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="w-5/12 pr-8"></div>
                  <div className="flex justify-center">
                    <div className="w-4 h-4 rounded-full bg-purple-500 border-4 border-[#16213E] z-10"></div>
                  </div>
                  <div className="w-5/12 pl-8">
                    <div className="bg-[#1A1A2E] p-4 rounded-lg">
                      <h3 className="text-white font-semibold">Proyecto E-commerce</h3>
                      <p className="text-[#E94560] text-sm">2022</p>
                      <p className="text-white/70 text-sm mt-2">
                        Plataforma completa con React, Node.js y MongoDB
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="w-5/12 pr-8 text-right">
                    <div className="bg-[#1A1A2E] p-4 rounded-lg">
                      <h3 className="text-white font-semibold">Grado en Informática</h3>
                      <p className="text-[#E94560] text-sm">2018 - 2022</p>
                      <p className="text-white/70 text-sm mt-2">
                        Especialización en desarrollo web y algoritmos
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-4 h-4 rounded-full bg-green-500 border-4 border-[#16213E] z-10"></div>
                  </div>
                  <div className="w-5/12 pl-8"></div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <BlogSection />
    </div>
  );
}