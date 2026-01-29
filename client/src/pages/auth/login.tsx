import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Mountain, Lock } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate role based on username for prototype
    const role = username.toLowerCase().includes("admin") ? "superadmin" : "admin";
    login(username || "Guest", role);
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-cover bg-center relative" 
         style={{ backgroundImage: 'url("/bogor-bg.png")' }}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      
      <div className="z-10 w-full max-w-md px-4 animate-in fade-in zoom-in duration-500">
        <Card className="bg-white/95 backdrop-blur shadow-2xl border-white/20">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-2">
              <Mountain className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-xl font-bold text-primary">Dinas Pariwisata dan Ekonomi Kreatif</CardTitle>
            <CardDescription>Kabupaten Bogor</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username" 
                  placeholder="Username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    type="password"
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white pl-10"
                    required
                  />
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 mt-4">
                Masuk Dashboard
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center text-center text-xs text-muted-foreground px-6">
            &copy; 2026 DINAS PARIWISATA DAN EKONOMI KREATIF KABUPATEN BOGOR
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
