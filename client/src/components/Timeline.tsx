import { motion } from "framer-motion";
import { Calendar, MapPin, Building, GraduationCap, Code, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TimelineItem {
  id: string;
  type: 'work' | 'education' | 'project' | 'achievement';
  title: string;
  organization: string;
  location?: string;
  startDate: string;
  endDate?: string;
  description: string;
  technologies?: string[];
  current?: boolean;
}

const timelineData: TimelineItem[] = [
  {
    id: "1",
    type: "work",
    title: "Senior Frontend Developer",
    organization: "Tech Company",
    location: "Remote",
    startDate: "2023-01",
    description: "Leading frontend development for multiple web applications using React and TypeScript. Implementing modern UI/UX patterns and performance optimizations.",
    technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    current: true
  },
  {
    id: "2",
    type: "project",
    title: "E-commerce Platform",
    organization: "Personal Project",
    startDate: "2022-08",
    endDate: "2022-12",
    description: "Built a full-stack e-commerce platform with payment integration, inventory management, and admin dashboard.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"]
  },
  {
    id: "3",
    type: "work",
    title: "Frontend Developer",
    organization: "Startup Inc",
    location: "Madrid, Spain",
    startDate: "2021-06",
    endDate: "2022-12",
    description: "Developed responsive web applications and collaborated with design team to implement pixel-perfect interfaces.",
    technologies: ["Vue.js", "JavaScript", "SCSS", "Figma"]
  },
  {
    id: "4",
    type: "education",
    title: "Computer Science Degree",
    organization: "Universidad Politécnica",
    location: "Madrid, Spain",
    startDate: "2018-09",
    endDate: "2022-06",
    description: "Bachelor's degree focused on software engineering, algorithms, and web development."
  },
  {
    id: "5",
    type: "achievement",
    title: "Best Innovation Award",
    organization: "Tech Hackathon 2022",
    startDate: "2022-03",
    description: "Won first place for developing an AI-powered accessibility tool that helps visually impaired users navigate websites."
  }
];

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

const TimelineItem = ({ item, index }: { item: TimelineItem; index: number }) => {
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
            
            {item.technologies && (
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

        <div className="relative max-w-6xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-[#16213E] h-full"></div>
          
          {timelineData.map((item, index) => (
            <TimelineItem key={item.id} item={item} index={index} />
          ))}
        </div>

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