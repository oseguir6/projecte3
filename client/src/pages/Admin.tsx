import { useQuery, useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import ProjectForm from "@/components/ProjectForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Terminal, Users, Eye } from "lucide-react";
import type { Contact, Visit, Project } from "@shared/schema";
import { useState } from "react";

export default function Admin() {
  const [_, setLocation] = useLocation();
  const { toast } = useToast();
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const { data: contacts = [] } = useQuery<Contact[]>({
    queryKey: ["/api/admin/contacts"],
  });

  const { data: visits = [] } = useQuery<Visit[]>({
    queryKey: ["/api/admin/visits"],
  });

  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const createProjectMutation = useMutation({
    mutationFn: async (data: any) => {
      await apiRequest("POST", "/api/admin/projects", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      setIsProjectModalOpen(false);
      setSelectedProject(null);
      toast({
        title: "Success",
        description: "Project created successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create project",
        variant: "destructive",
      });
    },
  });

  const updateProjectMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      await apiRequest("PUT", `/api/admin/projects/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      setIsProjectModalOpen(false);
      setSelectedProject(null);
      toast({
        title: "Success",
        description: "Project updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update project",
        variant: "destructive",
      });
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/admin/projects/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/logout");
    },
    onSuccess: () => {
      queryClient.clear();
      toast({
        title: "Logged out",
        description: "You have been logged out successfully",
      });
      setLocation("/login");
    },
  });

  const handleProjectSubmit = (data: any) => {
    if (selectedProject) {
      updateProjectMutation.mutate({ id: selectedProject.id, data });
    } else {
      createProjectMutation.mutate(data);
    }
  };

  // Process visits data for the chart
  const visitsByPage = visits.reduce((acc: { [key: string]: number }, visit) => {
    acc[visit.page] = (acc[visit.page] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(visitsByPage).map(([page, count]) => ({
    page,
    visits: count,
  }));

  const totalVisits = visits.length;
  const uniquePages = Object.keys(visitsByPage).length;
  const totalContacts = contacts.length;

  return (
    <>
      <Dialog open={isProjectModalOpen} onOpenChange={setIsProjectModalOpen}>
        <DialogContent className="sm:max-w-[800px] bg-[#1A1A2E] border-[#16213E]">
          <DialogHeader>
            <DialogTitle className="text-white">
              {selectedProject ? 'Edit Project' : 'Create New Project'}
            </DialogTitle>
            <DialogDescription>
              Add or update project details below
            </DialogDescription>
          </DialogHeader>
          <ProjectForm
            initialData={selectedProject || undefined}
            onSubmit={handleProjectSubmit}
            onCancel={() => {
              setIsProjectModalOpen(false);
              setSelectedProject(null);
            }}
          />
        </DialogContent>
      </Dialog>

      <div className="min-h-screen bg-[#0A0A0A] pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <Terminal className="h-8 w-8 text-[#E94560]" />
              <motion.h1
                className="text-3xl font-bold text-white"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                System Dashboard
              </motion.h1>
            </div>
            <Button
              variant="destructive"
              onClick={() => logoutMutation.mutate()}
              disabled={logoutMutation.isPending}
            >
              {logoutMutation.isPending ? "Logging out..." : "Logout"}
            </Button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-[#1A1A2E] border-[#16213E]">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-white text-lg font-medium">Total Visits</CardTitle>
                <Eye className="h-4 w-4 text-[#E94560]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{totalVisits}</div>
                <p className="text-xs text-white/60">Across all pages</p>
              </CardContent>
            </Card>
            <Card className="bg-[#1A1A2E] border-[#16213E]">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-white text-lg font-medium">Unique Pages</CardTitle>
                <Terminal className="h-4 w-4 text-[#E94560]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{uniquePages}</div>
                <p className="text-xs text-white/60">Different pages visited</p>
              </CardContent>
            </Card>
            <Card className="bg-[#1A1A2E] border-[#16213E]">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-white text-lg font-medium">Messages</CardTitle>
                <Users className="h-4 w-4 text-[#E94560]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{totalContacts}</div>
                <p className="text-xs text-white/60">Contact form submissions</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="projects" className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-[600px]">
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>

            <TabsContent value="projects">
              <Card className="bg-[#1A1A2E] border-[#16213E]">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-white">Projects Management</CardTitle>
                      <CardDescription>
                        Manage your portfolio projects
                      </CardDescription>
                    </div>
                    <Button
                      onClick={() => {
                        setSelectedProject(null);
                        setIsProjectModalOpen(true);
                      }}
                      className="bg-[#E94560] hover:bg-[#E94560]/90"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Project
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px] pr-4">
                    <div className="space-y-4">
                      {projects.map((project) => (
                        <motion.div
                          key={project.id}
                          className="bg-[#0A0A0A] p-4 rounded-lg border border-[#16213E]"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-white">
                                {project.title}
                              </h3>
                              <p className="text-white/70 mt-1">
                                {project.description}
                              </p>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {project.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="px-2 py-1 text-xs bg-[#1A1A2E] text-white/70 rounded-full"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => {
                                  setSelectedProject(project);
                                  setIsProjectModalOpen(true);
                                }}
                                className="border-[#E94560] hover:bg-[#E94560]/10"
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="destructive"
                                size="icon"
                                onClick={() => deleteProjectMutation.mutate(project.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="aspect-[2/1] overflow-hidden rounded-lg mt-4">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <Card className="bg-[#1A1A2E] border-[#16213E]">
                <CardHeader>
                  <CardTitle className="text-white">Page Visits Analytics</CardTitle>
                  <CardDescription>
                    Visual representation of page visits
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData}>
                        <XAxis 
                          dataKey="page" 
                          stroke="#ffffff60"
                          fontSize={12}
                          tickFormatter={(value) => value.replace('/', '')}
                        />
                        <YAxis stroke="#ffffff60" fontSize={12} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1A1A2E',
                            border: '1px solid #16213E',
                            borderRadius: '4px',
                            color: '#fff'
                          }}
                        />
                        <Bar dataKey="visits" fill="#E94560" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <ScrollArea className="h-[200px] mt-6 rounded-md border border-[#16213E] p-4">
                    <div className="space-y-2">
                      {chartData.map(({ page, visits }) => (
                        <motion.div
                          key={page}
                          className="bg-[#0A0A0A] p-3 rounded-lg flex justify-between items-center"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <code className="text-[#E94560]">{page}</code>
                          <span className="text-white/60">{visits} visits</span>
                        </motion.div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="messages">
              <Card className="bg-[#1A1A2E] border-[#16213E]">
                <CardHeader>
                  <CardTitle className="text-white">Contact Messages</CardTitle>
                  <CardDescription>
                    Recent contact form submissions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px] rounded-md border border-[#16213E] p-4">
                    <div className="space-y-4">
                      {contacts.map((contact) => (
                        <motion.div
                          key={contact.id}
                          className="bg-[#0A0A0A] p-4 rounded-lg border border-[#16213E]"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-semibold text-white">
                              {contact.name}
                            </h3>
                            <span className="text-sm text-[#E94560]">
                              {new Date(contact.createdAt!).toLocaleString()}
                            </span>
                          </div>
                          <code className="text-white/80 block mb-2">{contact.email}</code>
                          <p className="text-white/70 bg-[#1A1A2E] p-3 rounded">
                            {contact.message}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}