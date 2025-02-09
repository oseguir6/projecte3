import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertBlogSchema, type Blog } from "@shared/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

interface BlogFormProps {
  initialData?: Blog;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function BlogForm({ initialData, onSubmit, onCancel }: BlogFormProps) {
  const form = useForm({
    resolver: zodResolver(insertBlogSchema),
    defaultValues: {
      title: initialData?.title || "",
      content: initialData?.content || "",
      image: initialData?.image || "",
      tags: initialData?.tags || [],
      published: initialData?.published || false,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Title</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="bg-[#1A1A2E] border-[#16213E] text-white"
                  placeholder="Blog title"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Content</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="bg-[#1A1A2E] border-[#16213E] text-white min-h-[200px]"
                  placeholder="Write your blog content here..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Featured Image URL</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="bg-[#1A1A2E] border-[#16213E] text-white"
                  placeholder="https://example.com/image.jpg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Tags (comma separated)</FormLabel>
              <FormControl>
                <Input
                  value={field.value.join(", ")}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value
                        .split(",")
                        .map((tag) => tag.trim())
                        .filter(Boolean)
                    )
                  }
                  className="bg-[#1A1A2E] border-[#16213E] text-white"
                  placeholder="tech, programming, web development"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="published"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border border-[#16213E] p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-white">Published</FormLabel>
                <div className="text-[0.8rem] text-white opacity-70">
                  Make this blog post visible to visitors
                </div>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="border-[#E94560] hover:bg-[#E94560]/10"
          >
            Cancel
          </Button>
          <Button type="submit" className="bg-[#E94560] hover:bg-[#E94560]/90">
            {initialData ? "Update" : "Create"} Blog Post
          </Button>
        </div>
      </form>
    </Form>
  );
}
