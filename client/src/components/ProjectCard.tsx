import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
}

export default function ProjectCard({ title, description, image, tags }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden bg-[#1A1A2E] border-[#16213E]">
        <div className="aspect-video overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-white/70 mb-4">{description}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span 
                key={tag}
                className="px-3 py-1 bg-[#0F3460] text-white/90 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
