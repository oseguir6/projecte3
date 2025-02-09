import { useQuery, useMutation } from "@tanstack/react-query";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

export default function AboutForm() {
  const { toast } = useToast();
  const form = useForm();

  const { data: content, isLoading } = useQuery({
    queryKey: ["/api/site-content"],
    select: (data) => {
      const aboutContent = {};
      data.forEach((item) => {
        if (item.key.startsWith("about.")) {
          aboutContent[item.key] = item.value;
        }
      });
      return aboutContent;
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ key, value }) => {
      const res = await apiRequest("PUT", `/api/admin/site-content/${key}`, { value });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/site-content"] });
      toast({
        title: "Success",
        description: "About content updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update about content",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data) => {
    for (const [key, value] of Object.entries(data)) {
      if (content[key] !== value) {
        await updateMutation.mutateAsync({ key, value });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">About Page Content</h2>
          
          <div className="grid gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                defaultValue={content?.["about.title"]}
                {...form.register("about.title")}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Subtitle</label>
              <Input
                defaultValue={content?.["about.subtitle"]}
                {...form.register("about.subtitle")}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                defaultValue={content?.["about.description"]}
                {...form.register("about.description")}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Experience Section Title</label>
              <Input
                defaultValue={content?.["about.experience.title"]}
                {...form.register("about.experience.title")}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Skills Section Title</label>
              <Input
                defaultValue={content?.["about.skills.title"]}
                {...form.register("about.skills.title")}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Education Section Title</label>
              <Input
                defaultValue={content?.["about.education.title"]}
                {...form.register("about.education.title")}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Contact Section Title</label>
              <Input
                defaultValue={content?.["about.contact.title"]}
                {...form.register("about.contact.title")}
              />
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={updateMutation.isPending}
          className="w-full"
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
