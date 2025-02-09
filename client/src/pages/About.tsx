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

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-20">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square rounded-lg overflow-hidden">
              <img
                src={getContent("about.image")}
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
            <h1 className="text-4xl font-bold text-white mb-2">
              {getContent("about.title")}
            </h1>
            <h2 className="text-2xl text-[#E94560] mb-6">
              {getContent("about.subtitle")}
            </h2>
            <p className="text-white/70 mb-6">
              {getContent("about.description")}
            </p>
          </motion.div>
        </div>

        {/* Experience Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            {getContent("about.experience.title")}
          </h2>
          <p className="text-white/70">
            {getContent("about.experience.description")}
          </p>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            {getContent("about.skills.title")}
          </h2>
          <div className="flex flex-wrap gap-3">
            {getContent("about.skills")
              .split(",")
              .map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-[#1A1A2E] text-white rounded-full"
                >
                  {skill.trim()}
                </span>
              ))}
          </div>
        </motion.div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            {getContent("about.education.title")}
          </h2>
          <p className="text-white/70">
            {getContent("about.education.description")}
          </p>
        </motion.div>
      </div>
    </div>
  );
}