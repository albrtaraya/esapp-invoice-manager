"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLanguageContext } from "@/providers/LanguageContext"
import { translations } from "@/app/(frontend)/(page)/translations"
import { useInvoice } from "../contexts/InvoiceContext"

export function ExtraHeader(){
    const {
        searchQuery, 
        setSearchQuery, 
        searchBarMovingUp, 
        setShowResults, 
        setSearchBarMovingUp, 
        setIsFirstSearch, 
        mockInvoices, 
        isFirstSearch, 
        setInvoices, 
        setCurrentPage
    }= useInvoice();
    
    const { language } = useLanguageContext();
    const [showContent, setShowContent] = useState(false)
    const [showLine, setShowLine] = useState(false)
  
    const t = translations[language]

    useEffect(() => {
        if(localStorage.getItem("isFirst") != "true"){
          const timer1 = setTimeout(() => {
            setShowLine(true)
            setTimeout(() => {
                setShowContent(true)
            }, 500);
          }, 100);
      
          return () => {
              clearTimeout(timer1)
          }
          }else{
          setSearchBarMovingUp(true)
          const timer1 = setTimeout(() => {
              setShowContent(true)
          }, 100);
      
          return () => {
              clearTimeout(timer1)
          }
        }
    }, [])

    const handleSearch = () => {
        setShowResults(false)

        if (isFirstSearch) {
          setSearchBarMovingUp(true)
          localStorage.setItem("isFirst", "true");

          setTimeout(() => {
              setIsFirstSearch(false)

              if (searchQuery.trim()) {
                const filtered = mockInvoices.filter(
                    (inv:any) =>
                    inv.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    inv.period.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    inv.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    inv.amount.toString().includes(searchQuery),
                )
                setInvoices(filtered)
              } else {
                setInvoices(mockInvoices)
              }
              setCurrentPage(1)
                
              setTimeout(() => {
                setShowResults(true)
              }, 100)
          }, 600)
        } else {
          if (searchQuery.trim()) {
          console.log(mockInvoices)
              const filtered = mockInvoices.filter(
              (inv:any) =>
                    inv.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    inv.period.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    inv.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    inv.amount.toString().includes(searchQuery),
              )
          console.log(filtered)
              setInvoices(filtered)
          } else {
              setInvoices(mockInvoices)
          }
          setCurrentPage(1)

          setTimeout(() => {
              setShowResults(true)
          }, 100)
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
        handleSearch()
        }
    }

    return (<>
      <main className={`absolute flex items-center justify-center px-4 transition-all ease-out duration-700 " ${searchBarMovingUp ? "min-h-0" : "min-h-screen"}`}>
          <div className="w-full max-w-3xl ">
            <div className="relative">
              <div
                className={`flex justify-center items-center flex-col fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 bg-primary transition-all border-x-2 border-x-primary ease-out duration-700 max-lg:w-[90%] max-lg:mt-20 ${
                  searchBarMovingUp ? "!top-9 z-30 scale-100 opacity-100 !duration-0" : "scale-110 "} ${
                  showContent ? "h-auto opacity-100 w-auto !bg-transparent !border-x-transparent !duration-800" :
                  showLine ? "h-10 opacity-100 !duration-800" : "h-0 opacity-0 "
                }`}
              >
              <div
                className={`max-lg:bg-background relative transition-all delay-200 duration-1000 ease-out mx-auto opacity-100 overflow-hidden flex flex-col items-center justify-center ${
                  showContent
                    ? "w-2xl  max-lg:w-full"
                    : "w-0 "
                }`}
              >
                <h1 className={`text-5xl font-semibold transition-all duration-700 delay-[1.2s] overflow-hidden  ${showContent ? "opacity-100 h-16 w-auto " : "opacity-0 h-0 w-0 "} ${searchBarMovingUp ? "scale-0 !delay-0 !h-0" : "scale-100"}`}>Buscador de facturas</h1>
                <div className="relative w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
                  <Input
                    type="text"
                    placeholder={t.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className={`pl-12 pr-32 text-lg bg-card border-2 focus:border-primary w-full transition-all duration-500 ease-out`}
                  />
                  <Button
                    onClick={handleSearch}
                    className={`absolute right-1 top-1/2 -translate-y-1/2 px-6 transition-all duration-500 ease-out`}
                  >
                    {t.searchButton}
                  </Button>
                </div>
              </div>
              </div>

            </div>
          </div>
      </main>
    </>)
}