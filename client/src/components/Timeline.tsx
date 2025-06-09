import { motion } from "framer-motion";
import { Calendar, MapPin, Building, GraduationCap, Code, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import type { TimelineItem } from "@shared/schema";

const getIcon = (type: string) => {
  switch (type) {
    case 'work':
      return <Building className="w-4 h-4" />;
    case 'education':
      return <GraduationCap className="w-4 h-4" />;
    case 'project':
      return <Code className="w-4 h-4" />;
    case 'achievement':
      return <Award className="w-4 h-4" />;
    default:
      return <Calendar className="w-4 h-4" />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'work':
      return 'bg-blue-500';
    case 'education':
      return 'bg-green-500';
    case 'project':
      return 'bg-purple-500';
    case 'achievement':
      return 'bg-yellow-500';
    default:
      return 'bg-gray-500';
  }
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('es-ES', { 
    month: 'short', 
    year: 'numeric' 
  });
};

const TimelineItemComponent = ({ item, index }: { item: TimelineItem; index: number }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      className={`flex items-center mb-8 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      {/* Content Card */}
      <div className={`w-5/12 ${isEven ? 'pr-8' : 'pl-8'}`}>
        <Card className="bg-[#1A1A2E] border-[#16213E] hover:border-[#E94560]/50 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-start gap-3 mb-3">
              <div className={`p-2 rounded-full ${getTypeColor(item.type)} text-white`}>
                {getIcon(item.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  {item.current && (
                    <Badge className="bg-[#E94560] text-white text-xs">
                      Actual
                    </Badge>
                  )}
                </div>
                <p className="text-[#E94560] font-medium">{item.organization}</p>
                {item.location && (
                  <div className="flex items-center gap-1 text-white/60 text-sm mt-1">
                    <MapPin className="w-3 h-3" />
                    {item.location}
                  </div>
                )}
              </div>
            </div>
            
            <p className="text-white/80 text-sm mb-4">{item.description}</p>
            
            {item.technologies && item.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {item.technologies.map((tech) => (
                  <Badge 
                    key={tech} 
                    variant="outline" 
                    className="border-[#E94560]/30 text-white/70 text-xs"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Timeline Center */}
      <div className="flex flex-col items-center">
        <div className={`w-4 h-4 rounded-full ${getTypeColor(item.type)} border-4 border-[#0A0A0A] z-10`}></div>
        <div className="w-0.5 bg-[#16213E] h-20 -mt-2"></div>
      </div>

      {/* Date */}
      <div className={`w-5/12 ${isEven ? 'pl-8' : 'pr-8'} ${isEven ? 'text-left' : 'text-right'}`}>
        <div className="text-[#E94560] font-semibold">
          {formatDate(item.startDate)}
          {item.endDate && ` - ${formatDate(item.endDate)}`}
          {item.current && !item.endDate && ' - Presente'}
        </div>
      </div>
    </motion.div>
  );
};

export default function Timeline() {
  const { data: timelineItems = [], isLoading } = useQuery<TimelineItem[]>({
    queryKey: ["/api/timeline"],
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-[#0A0A0A]">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E94560] mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-[#0A0A0A]">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">Mi Trayectoria</h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Un recorrido por mi experiencia profesional, proyectos destacados y logros académicos
          </p>
        </motion.div>

        {timelineItems.length === 0 ? (
          <div className="text-center text-white/70">
            <p>No hay elementos en el timeline aún. Agrega algunos desde el panel de administración.</p>
          </div>
        ) : (
          <div className="relative max-w-6xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-[#16213E] h-full"></div>
            
            {timelineItems.map((item, index) => (
              <TimelineItemComponent key={item.id} item={item} index={index} />
            ))}
          </div>
        )}

        {/* Timeline Legend */}
        <motion.div
          className="flex justify-center gap-6 mt-16 flex-wrap"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-white/70 text-sm">Experiencia Laboral</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-white/70 text-sm">Educación</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span className="text-white/70 text-sm">Proyectos</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-white/70 text-sm">Logros</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}