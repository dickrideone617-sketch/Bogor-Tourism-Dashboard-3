import { createContext, useContext, useState, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";

type UserRole = "user" | "admin" | "superadmin";

interface User {
  id: string;
  username: string;
  role: UserRole;
  name: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  const login = (username: string, role: UserRole) => {
    // Mock login logic
    const mockUser: User = {
      id: "1",
      username,
      role,
      name: username === "superadmin" ? "Super Administrator" : username === "admin" ? "Admin DISPARREKRAF" : "Staff Wisata",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
    };
    setUser(mockUser);
    toast({
      title: "Login Berhasil",
      description: `Selamat datang kembali, ${mockUser.name}`,
    });
  };

  const logout = () => {
    setUser(null);
    toast({
      title: "Logout Berhasil",
      description: "Sampai jumpa lagi!",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
