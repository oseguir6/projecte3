import { useQuery, useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { SiteContent } from "@shared/schema";
import SiteContentForm from "./SiteContentForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AboutForm() {
  const { toast } = useToast();

  const { data: siteContent = [] } = useQuery<SiteContent[]>({
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

  const sections = {
    general: [
      { key: "about.title", label: "Título" },
      { key: "about.subtitle", label: "Subtítulo" },
      { key: "about.description", label: "Descripción", isLong: true }
    ],
    experience: [
      { key: "about.experience", label: "Experiencia", isLong: true }
    ],
    skills: [
      { key: "about.skills", label: "Habilidades (separadas por comas)", isLong: true }
    ],
    education: [
      { key: "about.education", label: "Educación", isLong: true }
    ]
  };

  const getValue = (key: string) => {
    const content = siteContent.find(item => item.key === key);
    return content ? content.value : "";
  };

  return (
    <div className="space-y-6">
      {Object.entries(sections).map(([sectionName, fields]) => (
        <Card key={sectionName} className="bg-[#1A1A2E] border-[#16213E]">
          <CardHeader>
            <CardTitle className="text-white capitalize">{sectionName}</CardTitle>
            <CardDescription>Editar contenido de {sectionName}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {fields.map((field) => (
                <motion.div
                  key={field.key}
                  className="bg-[#0A0A0A] p-4 rounded-lg border border-[#16213E]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <SiteContentForm
                    contentKey={field.key}
                    label={field.label}
                    initialValue={getValue(field.key)}
                    isLongText={field.isLong}
                    onSubmit={({ value }) => 
                      updateContentMutation.mutate({ key: field.key, value })
                    }
                    onCancel={() => {}}
                  />
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}