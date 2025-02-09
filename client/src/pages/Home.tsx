import Hero from "@/components/Hero";
import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";

const projects = [
  {
    title: "Project Management Dashboard",
    description: "A modern project management tool with real-time updates",
    image: "https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8",
    tags: ["React", "TypeScript", "Tailwind"]
  },
  {
    title: "Analytics Platform",
    description: "Data visualization and analytics dashboard",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
    tags: ["Next.js", "D3.js", "API"]
  },
  {
    title: "E-commerce Solution",
    description: "Full-featured e-commerce platform with payment integration",
    image: "https://images.unsplash.com/photo-1510759395231-72b17d622279",
    tags: ["React", "Node.js", "Stripe"]
  }
];

export default function Home() {
  return (
    <div className="bg-[#0A0A0A]">
      <Hero />
      
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
            {projects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
