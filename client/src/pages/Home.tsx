import Hero from "@/components/Hero";
import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import { Code2, Palette, Globe2 } from "lucide-react";

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

const services = [
  {
    icon: <Code2 className="w-8 h-8" />,
    title: "Web Development",
    description: "Building modern and scalable web applications with the latest technologies"
  },
  {
    icon: <Palette className="w-8 h-8" />,
    title: "UI/UX Design",
    description: "Creating beautiful and intuitive user interfaces with attention to detail"
  },
  {
    icon: <Globe2 className="w-8 h-8" />,
    title: "Responsive Design",
    description: "Ensuring your website looks great on all devices and screen sizes"
  }
];

const technologies = [
  "React", "TypeScript", "Node.js", "Next.js", "TailwindCSS", 
  "PostgreSQL", "MongoDB", "GraphQL", "AWS", "Docker"
];

const testimonials = [
  {
    name: "John Doe",
    role: "CEO at TechCorp",
    content: "Working with this developer was an absolute pleasure. The attention to detail and technical expertise exceeded our expectations.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
  },
  {
    name: "Sarah Smith",
    role: "Product Manager",
    content: "The development process was smooth and the final product was exactly what we needed. Highly recommend!",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
  }
];

export default function Home() {
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
                key={service.title}
                className="bg-[#1A1A2E] p-6 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="text-[#E94560] mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
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
            {technologies.map((tech) => (
              <motion.div
                key={tech}
                className="bg-[#1A1A2E] px-6 py-3 rounded-full text-white"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
              >
                {tech}
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
            {projects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-[#1A1A2E]">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-white mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Client Testimonials
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.name}
                className="bg-[#0A0A0A] p-6 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-white">{testimonial.name}</h3>
                    <p className="text-white/70">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-white/80 italic">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}