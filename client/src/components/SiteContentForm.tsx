import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertSiteContentSchema } from "@shared/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface SiteContentFormProps {
  contentKey: string;
  initialValue: string;
  isLongText?: boolean;
  onSubmit: (data: { value: string }) => void;
  onCancel: () => void;
}

export default function SiteContentForm({ 
  contentKey, 
  initialValue,
  isLongText,
  onSubmit, 
  onCancel 
}: SiteContentFormProps) {
  const form = useForm({
    resolver: zodResolver(insertSiteContentSchema),
    defaultValues: {
      key: contentKey,
      value: initialValue
    }
  });

  const handleSubmit = (data: any) => {
    onSubmit({ value: data.value });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white capitalize">
                {contentKey.split('.').join(' ')}
              </FormLabel>
              <FormControl>
                {isLongText ? (
                  <Textarea
                    {...field}
                    className="bg-[#1A1A2E] border-[#16213E] text-white min-h-[100px]"
                  />
                ) : (
                  <Input
                    {...field}
                    className="bg-[#1A1A2E] border-[#16213E] text-white"
                  />
                )}
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
            Guardar Cambios
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="border-[#E94560] text-white hover:bg-[#E94560]/10"
          >
            Cancelar
          </Button>
        </div>
      </form>
    </Form>
  );
}