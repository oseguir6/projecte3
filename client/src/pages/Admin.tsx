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

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <motion.h1
            className="text-3xl font-bold text-white"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            Admin Dashboard
          </motion.h1>
          <Button
            variant="destructive"
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
          >
            {logoutMutation.isPending ? "Logging out..." : "Logout"}
          </Button>
        </div>

        <Tabs defaultValue="contacts" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
            <TabsTrigger value="contacts">Contact Messages</TabsTrigger>
            <TabsTrigger value="visits">Page Visits</TabsTrigger>
          </TabsList>

          <TabsContent value="contacts">
            <Card className="bg-[#1A1A2E] border-[#16213E]">
              <CardHeader>
                <CardTitle className="text-white">Contact Messages</CardTitle>
                <CardDescription>
                  View all contact form submissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] rounded-md border border-[#16213E] p-4">
                  <div className="space-y-4">
                    {contacts.map((contact) => (
                      <motion.div
                        key={contact.id}
                        className="bg-[#0A0A0A] p-4 rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold text-white">
                            {contact.name}
                          </h3>
                          <span className="text-sm text-white/60">
                            {new Date(contact.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-white/80 mb-2">{contact.email}</p>
                        <p className="text-white/70">{contact.message}</p>
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="visits">
            <Card className="bg-[#1A1A2E] border-[#16213E]">
              <CardHeader>
                <CardTitle className="text-white">Page Visits</CardTitle>
                <CardDescription>
                  Track website traffic and page visits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] rounded-md border border-[#16213E] p-4">
                  <div className="space-y-2">
                    {visits.map((visit) => (
                      <motion.div
                        key={visit.id}
                        className="bg-[#0A0A0A] p-3 rounded-lg flex justify-between items-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <span className="text-white">{visit.page}</span>
                        <span className="text-white/60">
                          {new Date(visit.timestamp).toLocaleString()}
                        </span>
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
