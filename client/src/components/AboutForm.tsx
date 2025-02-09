import { useQuery, useMutation } from "@tanstack/react-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { SiteContent } from "@shared/schema";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";

export default function AboutForm() {
  const { toast } = useToast();

  const { data: siteContent = [], isLoading } = useQuery<SiteContent[]>({
    queryKey: ["/api/site-content"],
  });

  const updateContentMutation = useMutation({
    mutationFn: async ({ key, value }: { key: string; value: string }) => {
      const response = await apiRequest("PUT", `/api/admin/site-content/${key}`, { value });
      if (!response.ok) {
        throw new Error('Failed to update content');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/site-content"] });
      toast({
        title: "Success",
        description: "Content updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update content",
        variant: "destructive",
      });
    },
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
    "about.skills_title": "Skills Section Title",
    "about.image": "Profile Image URL"
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
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const value = formData.get("value") as string;
                updateContentMutation.mutate({ key: item.key, value });
              }}
              className="space-y-2"
            >
              {item.key.includes("description") ? (
                <Textarea
                  name="value"
                  defaultValue={item.value}
                  className="min-h-[100px] bg-[#1A1A2E] border-[#16213E] text-white"
                />
              ) : (
                <Input
                  name="value"
                  defaultValue={item.value}
                  className="bg-[#1A1A2E] border-[#16213E] text-white"
                />
              )}
              <Button 
                type="submit"
                disabled={updateContentMutation.isPending}
                className="w-full bg-[#E94560] hover:bg-[#E94560]/90"
              >
                {updateContentMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Save Changes"
                )}
              </Button>
            </form>
          </motion.div>
        ))}
      </div>
    </ScrollArea>
  );
}