import Hero from "@/components/Hero";
import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
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
    </div>
  );
}