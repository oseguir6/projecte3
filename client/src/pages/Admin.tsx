import { useQuery, useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import ProjectForm from "@/components/ProjectForm";
import TechnologyForm from "@/components/TechnologyForm";
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
import type { Contact, Visit, Project, Technology, Blog, SiteContent } from "@shared/schema";
import { useState } from "react";
import SiteContentForm from "@/components/SiteContentForm";
import BlogForm from "@/components/BlogForm";
import AboutForm from "@/components/AboutForm";

export default function Admin() {
  const [_, setLocation] = useLocation();
  const { toast } = useToast();
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isTechnologyModalOpen, setIsTechnologyModalOpen] = useState(false);
  const [selectedTechnology, setSelectedTechnology] = useState<Technology | null>(null);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  const { data: contacts = [] } = useQuery<Contact[]>({
    queryKey: ["/api/admin/contacts"],
  });

  const { data: visits = [] } = useQuery<Visit[]>({
    queryKey: ["/api/admin/visits"],
  });

  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const { data: technologies = [] } = useQuery<Technology[]>({
    queryKey: ["/api/technologies"],
  });

  const { data: blogs = [] } = useQuery<Blog[]>({
    queryKey: ["/api/blogs"],
  });

  const { data: siteContent = [] } = useQuery<SiteContent[]>({
    queryKey: ["/api/site-content"],
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

  const createTechnologyMutation = useMutation({
    mutationFn: async (data: any) => {
      await apiRequest("POST", "/api/admin/technologies", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/technologies"] });
      setIsTechnologyModalOpen(false);
      setSelectedTechnology(null);
      toast({
        title: "Success",
        description: "Technology created successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create technology",
        variant: "destructive",
      });
    },
  });

  const updateTechnologyMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      await apiRequest("PUT", `/api/admin/technologies/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/technologies"] });
      setIsTechnologyModalOpen(false);
      setSelectedTechnology(null);
      toast({
        title: "Success",
        description: "Technology updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update technology",
        variant: "destructive",
      });
    },
  });

  const deleteTechnologyMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/admin/technologies/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/technologies"] });
      toast({
        title: "Success",
        description: "Technology deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete technology",
        variant: "destructive",
      });
    },
  });

  const createBlogMutation = useMutation({
    mutationFn: async (data: any) => {
      await apiRequest("POST", "/api/admin/blogs", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blogs"] });
      setIsBlogModalOpen(false);
      setSelectedBlog(null);
      toast({
        title: "Success",
        description: "Blog post created successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create blog post",
        variant: "destructive",
      });
    },
  });

  const updateBlogMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      await apiRequest("PUT", `/api/admin/blogs/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blogs"] });
      setIsBlogModalOpen(false);
      setSelectedBlog(null);
      toast({
        title: "Success",
        description: "Blog post updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update blog post",
        variant: "destructive",
      });
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/admin/blogs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blogs"] });
      toast({
        title: "Success",
        description: "Blog post deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive",
      });
    },
  });

  const updateSiteContentMutation = useMutation({
    mutationFn: async ({ key, value }: { key: string; value: string }) => {
      await apiRequest("PUT", `/api/admin/site-content/${key}`, { value });
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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

        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-7 max-w-[1000px]">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="technologies">Technologies</TabsTrigger>
            <TabsTrigger value="blogs">Blogs</TabsTrigger>
            <TabsTrigger value="content">Site Content</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="about">
            <Card className="bg-[#1A1A2E] border-[#16213E]">
              <CardHeader>
                <CardTitle className="text-white">About Page Management</CardTitle>
                <CardDescription>
                  Edit content for the About page
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  <AboutForm />
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

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
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-white mb-2">
                              {project.title}
                            </h3>
                            <p className="text-white/70 mb-3">{project.description}</p>
                            <div className="flex flex-wrap gap-2">
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
                        {project.image && (
                          <div className="aspect-video overflow-hidden rounded-lg mt-4">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="technologies">
            <div className="space-y-6">
              {/* Tech Stack Content Management */}
              <Card className="bg-[#1A1A2E] border-[#16213E]">
                <CardHeader>
                  <CardTitle className="text-white">Tech Stack Content</CardTitle>
                  <CardDescription>
                    Edit the title, subtitle and description for your tech stack section
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {siteContent
                      .filter(content => content.key.startsWith('technologies.'))
                      .map((content) => (
                        <motion.div
                          key={content.key}
                          className="bg-[#0A0A0A] p-4 rounded-lg border border-[#16213E]"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <SiteContentForm
                            contentKey={content.key}
                            initialValue={content.value}
                            isLongText={content.key.includes("description") || content.key.includes("list")}
                            onSubmit={({ value }) =>
                              updateSiteContentMutation.mutate({ key: content.key, value })
                            }
                            onCancel={() => {}}
                          />
                        </motion.div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              {/* Individual Technologies Management */}
              <Card className="bg-[#1A1A2E] border-[#16213E]">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-white">Individual Technologies</CardTitle>
                      <CardDescription>
                        Manage your specific technologies with icons
                      </CardDescription>
                    </div>
                    <Button
                      onClick={() => {
                        setSelectedTechnology(null);
                        setIsTechnologyModalOpen(true);
                      }}
                      className="bg-[#E94560] hover:bg-[#E94560]/90"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Technology
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[500px] pr-4">
                    <div className="space-y-4">
                      {technologies.map((tech) => (
                        <motion.div
                          key={tech.id}
                          className="bg-[#0A0A0A] p-4 rounded-lg border border-[#16213E]"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-3">
                                <div className="text-[#E94560]" dangerouslySetInnerHTML={{ __html: tech.icon }} />
                                <h3 className="text-lg font-semibold text-white">
                                  {tech.name}
                                </h3>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => {
                                  setSelectedTechnology(tech);
                                  setIsTechnologyModalOpen(true);
                                }}
                                className="border-[#E94560] hover:bg-[#E94560]/10"
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="destructive"
                                size="icon"
                                onClick={() => deleteTechnologyMutation.mutate(tech.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="blogs">
            <Card className="bg-[#1A1A2E] border-[#16213E]">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-white">Blog Management</CardTitle>
                    <CardDescription>
                      Manage your blog posts and articles
                    </CardDescription>
                  </div>
                  <Button
                    onClick={() => {
                      setSelectedBlog(null);
                      setIsBlogModalOpen(true);
                    }}
                    className="bg-[#E94560] hover:bg-[#E94560]/90"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Blog Post
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-4">
                    {blogs.map((blog) => (
                      <motion.div
                        key={blog.id}
                        className="bg-[#0A0A0A] p-4 rounded-lg border border-[#16213E]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg font-semibold text-white">
                                {blog.title}
                              </h3>
                              {blog.published ? (
                                <span className="px-2 py-1 text-xs bg-green-500/20 text-green-500 rounded-full">
                                  Published
                                </span>
                              ) : (
                                <span className="px-2 py-1 text-xs bg-yellow-500/20 text-yellow-500 rounded-full">
                                  Draft
                                </span>
                              )}
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {blog.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-1 text-xs bg-[#1A1A2E] text-white/70 rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <p className="text-white/70 mt-2 line-clamp-2">
                              {blog.content}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => {
                                setSelectedBlog(blog);
                                setIsBlogModalOpen(true);
                              }}
                              className="border-[#E94560] hover:bg-[#E94560]/10"
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => deleteBlogMutation.mutate(blog.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        {blog.image && (
                          <div className="aspect-video overflow-hidden rounded-lg mt-4">
                            <img
                              src={blog.image}
                              alt={blog.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content">
            <Card className="bg-[#1A1A2E] border-[#16213E]">
              <CardHeader>
                <CardTitle className="text-white">Site Content Management</CardTitle>
                <CardDescription>
                  Edit website content and texts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-6">
                    {siteContent.map((content) => (
                      <motion.div
                        key={content.key}
                        className="bg-[#0A0A0A] p-4 rounded-lg border border-[#16213E]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <SiteContentForm
                          contentKey={content.key}
                          initialValue={content.value}
                          isLongText={content.key.includes("description")}
                          onSubmit={({ value }) =>
                            updateSiteContentMutation.mutate({ key: content.key, value })
                          }
                          onCancel={() => {}}
                        />
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
                        tickFormatter={(value) => value.replace("/", "")}
                      />
                      <YAxis stroke="#ffffff60" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1A1A2E",
                          border: "1px solid #16213E",
                          borderRadius: "4px",
                          color: "#fff",
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

        {/* Technology Dialog */}
        <Dialog open={isTechnologyModalOpen} onOpenChange={setIsTechnologyModalOpen}>
          <DialogContent className="bg-[#1A1A2E] border-[#16213E] text-white">
            <DialogHeader>
              <DialogTitle>
                {selectedTechnology ? "Edit Technology" : "Add New Technology"}
              </DialogTitle>
              <DialogDescription>
                {selectedTechnology 
                  ? "Update the technology information below."
                  : "Add a new technology to your tech stack."
                }
              </DialogDescription>
            </DialogHeader>
            <TechnologyForm
              initialData={selectedTechnology || undefined}
              onSubmit={(data) => {
                if (selectedTechnology) {
                  updateTechnologyMutation.mutate({ id: selectedTechnology.id, data });
                } else {
                  createTechnologyMutation.mutate(data);
                }
              }}
              onCancel={() => {
                setIsTechnologyModalOpen(false);
                setSelectedTechnology(null);
              }}
            />
          </DialogContent>
        </Dialog>

        {/* Project Dialog */}
        <Dialog open={isProjectModalOpen} onOpenChange={setIsProjectModalOpen}>
          <DialogContent className="bg-[#1A1A2E] border-[#16213E] text-white">
            <DialogHeader>
              <DialogTitle>
                {selectedProject ? "Edit Project" : "Add New Project"}
              </DialogTitle>
              <DialogDescription>
                {selectedProject 
                  ? "Update the project information below."
                  : "Add a new project to your portfolio."
                }
              </DialogDescription>
            </DialogHeader>
            <ProjectForm
              initialData={selectedProject || undefined}
              onSubmit={(data) => {
                if (selectedProject) {
                  updateProjectMutation.mutate({ id: selectedProject.id, data });
                } else {
                  createProjectMutation.mutate(data);
                }
              }}
              onCancel={() => {
                setIsProjectModalOpen(false);
                setSelectedProject(null);
              }}
            />
          </DialogContent>
        </Dialog>

        {/* Blog Dialog */}
        <Dialog open={isBlogModalOpen} onOpenChange={setIsBlogModalOpen}>
          <DialogContent className="bg-[#1A1A2E] border-[#16213E] text-white max-w-4xl">
            <DialogHeader>
              <DialogTitle>
                {selectedBlog ? "Edit Blog Post" : "Add New Blog Post"}
              </DialogTitle>
              <DialogDescription>
                {selectedBlog 
                  ? "Update the blog post information below."
                  : "Create a new blog post."
                }
              </DialogDescription>
            </DialogHeader>
            <BlogForm
              initialData={selectedBlog || undefined}
              onSubmit={(data) => {
                if (selectedBlog) {
                  updateBlogMutation.mutate({ id: selectedBlog.id, data });
                } else {
                  createBlogMutation.mutate(data);
                }
              }}
              onCancel={() => {
                setIsBlogModalOpen(false);
                setSelectedBlog(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}