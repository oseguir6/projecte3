import { useQuery, useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Terminal, Users, Eye } from "lucide-react";
import type { Contact, Visit } from "@shared/schema";

export default function Admin() {
  const [_, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: contacts = [] } = useQuery<Contact[]>({
    queryKey: ["/api/admin/contacts"],
  });

  const { data: visits = [] } = useQuery<Visit[]>({
    queryKey: ["/api/admin/visits"],
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

        <Tabs defaultValue="analytics" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

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
  );
}