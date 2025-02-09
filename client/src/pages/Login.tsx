import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { loginSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Login() {
  const [_, setLocation] = useLocation();
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: { username: string; password: string }) => {
      await apiRequest("POST", "/api/login", data);
    },
    onSuccess: () => {
      toast({
        title: "Login successful",
        description: "Welcome back!"
      });
      setLocation("/admin");
    },
    onError: () => {
      toast({
        title: "Login failed",
        description: "Invalid username or password",
        variant: "destructive"
      });
    }
  });

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md mx-4"
      >
        <Card className="bg-[#1A1A2E] border-[#16213E]">
          <CardHeader>
            <CardTitle className="text-2xl text-white text-center">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Username</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-[#0A0A0A] border-[#16213E] text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          className="bg-[#0A0A0A] border-[#16213E] text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-[#E94560] hover:bg-[#E94560]/90"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Logging in..." : "Login"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
