"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { ProxyPublicRequest } from "@/app/(frontend)/login/lib/proxyAxios";

interface User {
  customerId: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (customerId: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const t = Cookies.get("token");
    if (t) {
      setToken(t);
    }
    setLoading(false);
  }, []);

  const login = async (customerId: string) => {
    const response = await ProxyPublicRequest.post("/api/login", { customerId });

    const token = response.data.access_token;
    const user = response.data.user;

    Cookies.set("token", token, {
      expires: 1,
      path: "/",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    setToken(token);
    setUser(user);
  };

  const logout = () => {
    Cookies.remove("token", { path: "/" });
    setToken(null);
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}
