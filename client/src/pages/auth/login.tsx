import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { MapPin, Mountain } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState<"user" | "admin" | "superadmin">("user");
  const { login } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
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
            <CardTitle className="text-2xl font-bold text-primary">SIP Bogor</CardTitle>
            <CardDescription>Sistem Informasi Pariwisata Kabupaten Bogor</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username" 
                  placeholder="Masukkan username anda" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role Akses</Label>
                <Select value={role} onValueChange={(val: any) => setRole(val)}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Pilih Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User (Staff)</SelectItem>
                    <SelectItem value="admin">Admin Dinas</SelectItem>
                    <SelectItem value="superadmin">Super Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 mt-4">
                Masuk Dashboard
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center text-xs text-muted-foreground">
            &copy; 2026 Dinas Kebudayaan dan Pariwisata Kab. Bogor
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
