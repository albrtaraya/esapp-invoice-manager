
import { AuthProvider } from "@/providers/AuthContext";
import { LanguageProvider } from "@/providers/LanguageContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>
    <AuthProvider>
      {children}
    </AuthProvider>
  </LanguageProvider>;
}