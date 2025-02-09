import { useQuery } from "@tanstack/react-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import SiteContentForm from "./SiteContentForm";
import { Loader2 } from "lucide-react";
import type { SiteContent } from "@shared/schema";

export default function AboutForm() {
  const { data: siteContent = [], isLoading } = useQuery<SiteContent[]>({
    queryKey: ["/api/site-content"],
  });

  const aboutContent = siteContent.filter((item) => item.key.startsWith("about."));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

  const fieldLabels: Record<string, string> = {
    "about.title": "About Page Title",
    "about.description": "Main Description",
    "about.secondary_description": "Secondary Description",
    "about.skills": "Skills (comma-separated list)",
  };

  return (
    <ScrollArea className="h-[600px] pr-4">
      <div className="space-y-6">
        {aboutContent.map((item) => (
          <motion.div
            key={item.key}
            className="bg-[#0A0A0A] p-4 rounded-lg border border-[#16213E]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mb-2">
              <h3 className="text-sm font-medium text-white">
                {fieldLabels[item.key] || item.key}
              </h3>
            </div>
            <SiteContentForm
              contentKey={item.key}
              initialValue={item.value}
              isLongText={item.key.includes("description")}
              onSubmit={({ value }) => {
                // La mutación ya está manejada dentro de SiteContentForm
              }}
              onCancel={() => {}}
            />
          </motion.div>
        ))}
      </div>
    </ScrollArea>
  );
}