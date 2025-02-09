import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertTechnologySchema } from "@shared/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TechnologyFormProps {
  initialData?: {
    name: string;
    type: 'service' | 'stack';
    icon: string;
    description?: string;
  };
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function TechnologyForm({ initialData, onSubmit, onCancel }: TechnologyFormProps) {
  const form = useForm({
    resolver: zodResolver(insertTechnologySchema),
    defaultValues: initialData || {
      name: "",
      type: "stack",
      icon: "",
      description: ""
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="bg-[#1A1A2E] border-[#16213E] text-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="bg-[#1A1A2E] border-[#16213E] text-white">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-[#1A1A2E] border-[#16213E]">
                  <SelectItem value="service" className="text-white">Service</SelectItem>
                  <SelectItem value="stack" className="text-white">Stack</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Icon (SVG or Icon Name)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="bg-[#1A1A2E] border-[#16213E] text-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="bg-[#1A1A2E] border-[#16213E] text-white min-h-[100px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <Button
            type="submit"
            className="bg-[#E94560] hover:bg-[#E94560]/90"
          >
            {initialData ? 'Update Technology' : 'Create Technology'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="border-[#E94560] text-white hover:bg-[#E94560]/10"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
