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
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-foreground mb-2">
            {getContent("about.title")}
          </h1>
          <h2 className="text-2xl text-muted-foreground mb-6">
            {getContent("about.subtitle")}
          </h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-lg mb-8">
              {getContent("about.description")}
            </p>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Experiencia</h3>
              <p>{getContent("about.experience")}</p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Habilidades</h3>
              <div className="flex flex-wrap gap-2">
                {getContent("about.skills")
                  .split(",")
                  .map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm"
                    >
                      {skill.trim()}
                    </span>
                  ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Educación</h3>
              <p>{getContent("about.education")}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}