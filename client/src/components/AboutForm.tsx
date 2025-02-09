import { useQuery, useMutation } from "@tanstack/react-query";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import type { SiteContent } from "@shared/schema";

const aboutFormSchema = z.object({
  "about.title": z.string().min(1, "Title is required"),
  "about.subtitle": z.string().min(1, "Subtitle is required"),
  "about.description": z.string().min(10, "Description must be at least 10 characters"),
  "about.experience.title": z.string().min(1, "Experience title is required"),
  "about.skills.title": z.string().min(1, "Skills title is required"),
  "about.education.title": z.string().min(1, "Education title is required"),
  "about.contact.title": z.string().min(1, "Contact title is required"),
});

type AboutFormValues = z.infer<typeof aboutFormSchema>;

export default function AboutForm() {
  const { toast } = useToast();
  const form = useForm<AboutFormValues>({
    resolver: zodResolver(aboutFormSchema),
  });

  const { data: content, isLoading } = useQuery<SiteContent[]>({
    queryKey: ["/api/site-content"],
    select: (data) => {
      return data.filter((item) => item.key.startsWith("about."));
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ key, value }: { key: string; value: string }) => {
      const res = await apiRequest("PUT", `/api/admin/site-content/${key}`, { value });
      if (!res.ok) {
        throw new Error("Failed to update content");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/site-content"] });
      toast({
        title: "Success",
        description: "About content updated successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update about content",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: AboutFormValues) => {
    try {
      for (const [key, value] of Object.entries(data)) {
        if (content?.find(item => item.key === key)?.value !== value) {
          await updateMutation.mutateAsync({ key, value });
        }
      }
    } catch (error) {
      console.error("Error updating about content:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const defaultValues = content?.reduce((acc, item) => ({
    ...acc,
    [item.key]: item.value
  }), {}) as AboutFormValues;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Main Section</h3>
            <div className="grid gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Page Title</label>
                <Input
                  placeholder="About Me"
                  defaultValue={defaultValues?.["about.title"]}
                  {...form.register("about.title")}
                  className="bg-[#0A0A0A] border-[#16213E] text-white"
                />
                {form.formState.errors["about.title"] && (
                  <p className="text-sm text-red-500">{form.formState.errors["about.title"].message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Subtitle</label>
                <Input
                  placeholder="My Journey"
                  defaultValue={defaultValues?.["about.subtitle"]}
                  {...form.register("about.subtitle")}
                  className="bg-[#0A0A0A] border-[#16213E] text-white"
                />
                {form.formState.errors["about.subtitle"] && (
                  <p className="text-sm text-red-500">{form.formState.errors["about.subtitle"].message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Description</label>
                <Textarea
                  placeholder="Share your story..."
                  defaultValue={defaultValues?.["about.description"]}
                  {...form.register("about.description")}
                  className="bg-[#0A0A0A] border-[#16213E] text-white min-h-[100px]"
                />
                {form.formState.errors["about.description"] && (
                  <p className="text-sm text-red-500">{form.formState.errors["about.description"].message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Section Titles</h3>
            <div className="grid gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Experience Section Title</label>
                <Input
                  placeholder="Experience"
                  defaultValue={defaultValues?.["about.experience.title"]}
                  {...form.register("about.experience.title")}
                  className="bg-[#0A0A0A] border-[#16213E] text-white"
                />
                {form.formState.errors["about.experience.title"] && (
                  <p className="text-sm text-red-500">{form.formState.errors["about.experience.title"].message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Skills Section Title</label>
                <Input
                  placeholder="Skills"
                  defaultValue={defaultValues?.["about.skills.title"]}
                  {...form.register("about.skills.title")}
                  className="bg-[#0A0A0A] border-[#16213E] text-white"
                />
                {form.formState.errors["about.skills.title"] && (
                  <p className="text-sm text-red-500">{form.formState.errors["about.skills.title"].message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Education Section Title</label>
                <Input
                  placeholder="Education"
                  defaultValue={defaultValues?.["about.education.title"]}
                  {...form.register("about.education.title")}
                  className="bg-[#0A0A0A] border-[#16213E] text-white"
                />
                {form.formState.errors["about.education.title"] && (
                  <p className="text-sm text-red-500">{form.formState.errors["about.education.title"].message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Contact Section Title</label>
                <Input
                  placeholder="Get in Touch"
                  defaultValue={defaultValues?.["about.contact.title"]}
                  {...form.register("about.contact.title")}
                  className="bg-[#0A0A0A] border-[#16213E] text-white"
                />
                {form.formState.errors["about.contact.title"] && (
                  <p className="text-sm text-red-500">{form.formState.errors["about.contact.title"].message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={updateMutation.isPending}
          className="w-full bg-[#E94560] hover:bg-[#E94560]/90"
        >
          {updateMutation.isPending && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Save Changes
        </Button>
      </form>
    </Form>
  );
}