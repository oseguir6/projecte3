import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";

const projects = [
  {
    title: "Project Management Dashboard",
    description: "A modern project management tool with real-time updates",
    image: "https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8",
    tags: ["React", "TypeScript", "Tailwind"],
    category: "web"
  },
  {
    title: "Analytics Platform",
    description: "Data visualization and analytics dashboard",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
    tags: ["Next.js", "D3.js", "API"],
    category: "data"
  },
  {
    title: "E-commerce Solution",
    description: "Full-featured e-commerce platform with payment integration",
    image: "https://images.unsplash.com/photo-1510759395231-72b17d622279",
    tags: ["React", "Node.js", "Stripe"],
    category: "web"
  },
  {
    title: "Mobile App Design",
    description: "UI/UX design for a fitness tracking app",
    image: "https://images.unsplash.com/photo-1660592868727-858d28c3ba52",
    tags: ["Figma", "UI/UX", "Mobile"],
    category: "design"
  },
  {
    title: "AI Chat Interface",
    description: "Natural language processing chat application",
    image: "https://images.unsplash.com/photo-1685478237595-f452cb125f27",
    tags: ["Python", "NLP", "React"],
    category: "ai"
  },
  {
    title: "Blockchain Explorer",
    description: "Cryptocurrency blockchain explorer and analytics",
    image: "https://images.unsplash.com/photo-1679409759768-bea306439ab8",
    tags: ["Web3", "React", "GraphQL"],
    category: "blockchain"
  }
];

const categories = ["all", "web", "data", "design", "ai", "blockchain"];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProjects = projects.filter(
    (project) => selectedCategory === "all" || project.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-20">
      <div className="container mx-auto px-4 py-16">
        <motion.h1
          className="text-4xl font-bold text-white text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          My Projects
        </motion.h1>

        <motion.div
          className="flex justify-center gap-4 mb-12 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full capitalize ${
                selectedCategory === category
                  ? "bg-[#E94560] text-white"
                  : "bg-[#1A1A2E] text-white/70 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {filteredProjects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
