import { useQuery } from "@tanstack/react-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import SiteContentForm from "./SiteContentForm";
import { Loader2 } from "lucide-react";
import type { SiteContent } from "@shared/schema";

export default function AboutForm() {
  const { data: content = [], isLoading } = useQuery<SiteContent[]>({
    queryKey: ["/api/site-content"],
    select: (data) => data.filter((item) => item.key.startsWith("about.")),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

  return (
    <ScrollArea className="h-[600px] pr-4">
      <div className="space-y-6">
        {content.map((item) => (
          <motion.div
            key={item.key}
            className="bg-[#0A0A0A] p-4 rounded-lg border border-[#16213E]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
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