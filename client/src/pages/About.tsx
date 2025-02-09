import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import type { SiteContent } from "@shared/schema";

export default function About() {
  const { data: content = [] } = useQuery<SiteContent[]>({
    queryKey: ["/api/site-content"],
  });

  const getContent = (key: string) => {
    return content.find((item) => item.key === key)?.value || "";
  };

  const skills = getContent("about.skills").split(",");

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square rounded-lg overflow-hidden">
              <img
                src={getContent("about.image") || "https://images.unsplash.com/photo-1573496799515-eebbb63814f2"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-4xl font-bold text-white mb-6">
              {getContent("about.title")}
            </h1>
            <p className="text-white/70 mb-6">
              {getContent("about.description")}
            </p>
            <p className="text-white/70 mb-8">
              {getContent("about.secondary_description")}
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">
              {getContent("about.skills_title") || "Skills"}
            </h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <motion.span
                  key={skill}
                  className="px-4 py-2 bg-[#1A1A2E] text-white rounded-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {skill.trim()}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}