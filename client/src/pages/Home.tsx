import Hero from "@/components/Hero";
import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import { Code2, Palette, Globe2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Project, Technology } from "@shared/schema";

export default function Home() {
  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const { data: technologies = [] } = useQuery<Technology[]>({
    queryKey: ["/api/technologies"],
  });

  const featuredProjects = projects.slice(0, 3);
  const services = technologies.filter(tech => tech.type === 'service');
  const techStack = technologies.filter(tech => tech.type === 'stack');

  return (
    <div className="bg-[#0A0A0A]">
      <Hero />

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-white mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Services
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <motion.div
                key={service.id}
                className="bg-[#1A1A2E] p-6 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="text-[#E94560] mb-4" dangerouslySetInnerHTML={{ __html: service.icon }} />
                <h3 className="text-xl font-bold text-white mb-2">{service.name}</h3>
                <p className="text-white/70">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
            {techStack.map((tech) => (
              <motion.div
                key={tech.id}
                className="bg-[#1A1A2E] px-6 py-3 rounded-full text-white"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
              >
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
    </div>
  );
}