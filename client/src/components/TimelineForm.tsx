import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertTimelineItemSchema } from "@shared/schema";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useState } from "react";
import type { TimelineItem } from "@shared/schema";

interface TimelineFormProps {
  initialData?: TimelineItem;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function TimelineForm({ initialData, onSubmit, onCancel }: TimelineFormProps) {
  const [technologies, setTechnologies] = useState<string[]>(initialData?.technologies || []);
  const [newTech, setNewTech] = useState("");

  const form = useForm({
    resolver: zodResolver(insertTimelineItemSchema),
    defaultValues: initialData ? {
      type: initialData.type as 'work' | 'education' | 'project' | 'achievement',
      title: initialData.title,
      organization: initialData.organization,
      location: initialData.location || "",
      startDate: initialData.startDate,
      endDate: initialData.endDate || "",
      description: initialData.description,
      current: initialData.current,
      technologies: initialData.technologies || []
    } : {
      type: "work" as const,
      title: "",
      organization: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
      current: false,
      technologies: []
    }
  });

  const addTechnology = () => {
    if (newTech.trim() && !technologies.includes(newTech.trim())) {
      const updatedTechs = [...technologies, newTech.trim()];
      setTechnologies(updatedTechs);
      form.setValue("technologies", updatedTechs);
      setNewTech("");
    }
  };

  const removeTechnology = (tech: string) => {
    const updatedTechs = technologies.filter(t => t !== tech);
    setTechnologies(updatedTechs);
    form.setValue("technologies", updatedTechs);
  };

  const handleSubmit = (data: any) => {
    onSubmit({
      ...data,
      technologies: technologies.length > 0 ? technologies : undefined
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Tipo</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-[#1A1A2E] border-[#16213E] text-white">
                    <SelectValue placeholder="Selecciona el tipo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-[#1A1A2E] border-[#16213E]">
                  <SelectItem value="work" className="text-white">Experiencia Laboral</SelectItem>
                  <SelectItem value="education" className="text-white">Educación</SelectItem>
                  <SelectItem value="project" className="text-white">Proyecto</SelectItem>
                  <SelectItem value="achievement" className="text-white">Logro</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Título</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="bg-[#1A1A2E] border-[#16213E] text-white"
                  placeholder="Título del puesto/proyecto/logro"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="organization"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Organización</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="bg-[#1A1A2E] border-[#16213E] text-white"
                  placeholder="Empresa/Universidad/Organización"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Ubicación (opcional)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="bg-[#1A1A2E] border-[#16213E] text-white"
                  placeholder="Ciudad, País"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Fecha de Inicio</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="month"
                    className="bg-[#1A1A2E] border-[#16213E] text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Fecha de Fin (opcional)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="month"
                    className="bg-[#1A1A2E] border-[#16213E] text-white"
                    disabled={form.watch("current")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="current"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    if (checked) {
                      form.setValue("endDate", "");
                    }
                  }}
                  className="border-[#16213E] data-[state=checked]:bg-[#E94560] data-[state=checked]:border-[#E94560]"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-white">
                  Posición actual
                </FormLabel>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Descripción</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="bg-[#1A1A2E] border-[#16213E] text-white min-h-[100px]"
                  placeholder="Describe tus responsabilidades, logros o detalles importantes..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <FormLabel className="text-white">Tecnologías (opcional)</FormLabel>
          <div className="mt-2 space-y-2">
            {technologies.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="bg-[#E94560]/20 text-white border-[#E94560]/30"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTechnology(tech)}
                      className="ml-2 hover:text-red-300"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <Input
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
                className="bg-[#1A1A2E] border-[#16213E] text-white flex-1"
                placeholder="Agregar tecnología"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTechnology();
                  }
                }}
              />
              <Button
                type="button"
                onClick={addTechnology}
                variant="outline"
                className="border-[#E94560] text-[#E94560] hover:bg-[#E94560]/10"
              >
                Agregar
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            type="submit"
            className="bg-[#E94560] hover:bg-[#E94560]/90"
          >
            {initialData ? 'Actualizar' : 'Crear'} Elemento
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