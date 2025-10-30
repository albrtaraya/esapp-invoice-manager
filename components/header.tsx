"use client";
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSelector } from "@/components/language-selector"
import { useEffect, useState } from "react";
import { useLanguageContext } from "@/providers/LanguageContext";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ProxyPublicRequest } from "@/app/(frontend)/login/lib/proxyAxios";
import { useAuth } from "@/providers/AuthContext";

export function Header(){
    const { language, setLanguage } = useLanguageContext();
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [showHeader, setShowHeader] = useState(false);

    useEffect(() => {
      if(localStorage.getItem("isFirst") != "true"){
        const timer1 = setTimeout(() => {
          setShowHeader(true)
        }, 1100);
        return () => {
          clearTimeout(timer1)
        }
      }else{
        setShowHeader(true);
      }
    }, []);

    useEffect(() => {
      setTheme(localStorage.getItem("theme") === "dark" ? "dark" : "light")
      if (localStorage.getItem("theme") === "dark" ) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    }, [])

    useEffect(() => {
      if (theme === "dark") {
        localStorage.setItem("theme", "dark");
        document.documentElement.classList.add("dark")
      } else {
        localStorage.setItem("theme", "light");
        document.documentElement.classList.remove("dark")
      }
    }, [theme])

    return (<>
        <header
          className={`fixed top-0 left-0 right-0 z-20 bg-background/95 backdrop-blur-sm border-b transition-all delay-0 duration-500 ease-out ${
            showHeader ? "opacity-100 translate-y-0 " : "opacity-0 -translate-y-4"
          }`}
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-xl">EA</span>
                </div>
                <span className="text-xl font-semibold">EsApp</span>
              </div>
  
              <div className="flex items-center gap-3">
                <ThemeToggle theme={theme} onToggle={() => setTheme(theme === "light" ? "dark" : "light")} />
                <LanguageSelector currentLanguage={language} onLanguageChange={setLanguage} />
                <Avatar/>
              </div>
            </div>
          </div>
        </header>
    </>)
}


export function Avatar(){
  const { logout } = useAuth();

  return (<>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-full bg-secondary border-0 p-5 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-user-icon lucide-user"
        >
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuItem onClick={logout}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </>)
}