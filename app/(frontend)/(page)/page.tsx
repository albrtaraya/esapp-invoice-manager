"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, Filter, LayoutGrid, Table2, FileSpreadsheet, FileText, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSelector } from "@/components/language-selector"
import { InvoiceCard } from "@/components/invoice-card"
import { InvoiceTable } from "@/components/invoice-table"
import { FiltersPanel } from "@/components/filters-panel"
import { translations, type Language } from "@/lib/translations"
import { Header } from "@/components/header"

// Mock data para demostración
const mockInvoices = [
  {
    id: "1",
    invoiceNumber: "INV-2025-001",
    amount: 1250.0,
    dueDate: "2025-11-15",
    status: "pending" as const,
  },
  {
    id: "2",
    invoiceNumber: "INV-2025-002",
    amount: 3400.5,
    dueDate: "2025-10-20",
    status: "overdue" as const,
  },
  {
    id: "3",
    invoiceNumber: "INV-2025-003",
    amount: 890.25,
    dueDate: "2025-12-01",
    status: "pending" as const,
  },
  {
    id: "4",
    invoiceNumber: "INV-2025-004",
    amount: 2100.0,
    dueDate: "2025-11-25",
    status: "paid" as const,
  },
  {
    id: "5",
    invoiceNumber: "INV-2025-005",
    amount: 1750.0,
    dueDate: "2025-11-30",
    status: "pending" as const,
  },
  {
    id: "6",
    invoiceNumber: "INV-2025-006",
    amount: 4200.0,
    dueDate: "2025-10-15",
    status: "overdue" as const,
  },
  {
    id: "7",
    invoiceNumber: "INV-2025-007",
    amount: 950.5,
    dueDate: "2025-12-10",
    status: "pending" as const,
  },
  {
    id: "8",
    invoiceNumber: "INV-2025-008",
    amount: 3100.0,
    dueDate: "2025-11-20",
    status: "paid" as const,
  },
]

export default function InvoiceSearchPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [language, setLanguage] = useState<Language>("es")
  const [searchQuery, setSearchQuery] = useState("")
  const [showContent, setShowContent] = useState(false)
  const [showHeader, setShowHeader] = useState(false)
  const [showLine, setShowLine] = useState(false)
  const [invoices, setInvoices] = useState<typeof mockInvoices>([])
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards")
  const [hasSearched, setHasSearched] = useState(false)
  const [isFirstSearch, setIsFirstSearch] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(6)
  const [showResults, setShowResults] = useState(false)
  const [searchBarMovingUp, setSearchBarMovingUp] = useState(false)
  const [filters, setFilters] = useState({
    status: "all",
    minAmount: "",
    maxAmount: "",
    startDate: "",
    endDate: "",
  })

  const t = translations[language]

  useEffect(() => {
    // Aplicar tema al documento
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [theme])

  useEffect(() => {
    if(localStorage.getItem("isFirst") != "true"){
      localStorage.setItem("isFirst", "true");
      const timer1 = setTimeout(() => {
        setShowLine(true)
        setTimeout(() => {
          setShowContent(true)
          setTimeout(() => {
            setShowHeader(true)
          }, 500)
        }, 500);
      }, 100);
  
      return () => {
        clearTimeout(timer1)
      }
    }else{
      setShowHeader(true)
      setSearchBarMovingUp(true)
      setCurrentPage(1)
      const filtered = mockInvoices.filter(
        (inv) =>
          inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          inv.amount.toString().includes(searchQuery),
      )
      setInvoices(filtered)
      const timer1 = setTimeout(() => {
        setShowContent(true)
        setTimeout(() => {
          setShowResults(true)
        }, 200)
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

      setTimeout(() => {
        setHasSearched(true)
        setIsFirstSearch(false)

        if (searchQuery.trim()) {
          const filtered = mockInvoices.filter(
            (inv) =>
              inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
        const filtered = mockInvoices.filter(
          (inv) =>
            inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
    }
  }

  const applyFilters = () => {
    setShowResults(false)

    let filtered = [...mockInvoices]

    if (filters.status !== "all") {
      filtered = filtered.filter((inv) => inv.status === filters.status)
    }

    if (filters.minAmount) {
      filtered = filtered.filter((inv) => inv.amount >= Number.parseFloat(filters.minAmount))
    }
    if (filters.maxAmount) {
      filtered = filtered.filter((inv) => inv.amount <= Number.parseFloat(filters.maxAmount))
    }

    if (filters.startDate) {
      filtered = filtered.filter((inv) => inv.dueDate >= filters.startDate)
    }
    if (filters.endDate) {
      filtered = filtered.filter((inv) => inv.dueDate <= filters.endDate)
    }

    setInvoices(filtered)
    setIsFiltersOpen(false)
    setCurrentPage(1)

    setTimeout(() => {
      setShowResults(true)
    }, 400)
  }

  const clearFilters = () => {
    setShowResults(false)

    setFilters({
      status: "all",
      minAmount: "",
      maxAmount: "",
      startDate: "",
      endDate: "",
    })
    setInvoices(mockInvoices)
    setCurrentPage(1)

    setTimeout(() => {
      setShowResults(true)
    }, 400)
  }

  const exportToExcel = () => {
    alert("Exportando a Excel...")
  }

  const exportToPDF = () => {
    alert("Exportando a PDF...")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const totalPages = Math.ceil(invoices.length / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const currentInvoices = invoices.slice(startIndex, endIndex)

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Header/>

      <main className={`absolute flex items-center justify-center px-4 transition-all ease-out duration-700 " ${searchBarMovingUp ? "min-h-0" : "min-h-screen"}`}>
          <div className="w-full max-w-3xl ">
            <div className="relative">
              <div
                className={`flex justify-center items-center flex-col fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 bg-primary transition-all border-x-2 border-x-primary ease-out duration-700 ${
                  searchBarMovingUp ? "!top-9 z-30 scale-100 opacity-100 !duration-0" : "scale-125 "} ${
                  showContent ? "h-auto opacity-100 w-auto !bg-transparent !border-x-transparent !duration-800" :
                  showLine ? "h-10 opacity-100 !duration-800" : "h-0 opacity-0 "
                }`}
              >
              <div
                className={`relative transition-all delay-200 duration-1000 ease-out mx-auto opacity-100 overflow-hidden flex flex-col items-center justify-center ${
                  showContent
                    ? "w-2xl"
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
      {invoices.length > 0 && (
        <div className="pt-24 pb-8 min-h-screen">
          <div className="container mx-auto max-w-7xl px-6">
            <div
              className={`flex items-center justify-between mb-6 ${
                isFirstSearch
                  ? `transition-all duration-500 ease-out ${
                      showResults ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`
                  : ""
              }`}
            >
              <Button variant="outline" size="lg" onClick={() => setIsFiltersOpen(true)} className="gap-2">
                <Filter className="h-4 w-4" />
                {t.filters}
              </Button>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 border rounded-lg p-1">
                  <Button
                    variant={viewMode === "cards" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("cards")}
                    title={t.cardView}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "table" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("table")}
                    title={t.tableView}
                  >
                    <Table2 className="h-4 w-4" />
                  </Button>
                </div>

                <Button variant="outline" size="icon" onClick={exportToExcel} title={t.exportExcel}>
                  <FileSpreadsheet className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={exportToPDF} title={t.exportPDF}>
                  <FileText className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div
              className={`transition-all duration-500 ease-out ${
                showResults ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {viewMode === "cards" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentInvoices.map((invoice, index) => (
                    <div
                      key={invoice.id}
                      className={`transition-all duration-500 ease-out ${
                        showResults ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                      }`}
                      style={{
                        transitionDelay: showResults ? `${index * 80}ms` : "0ms",
                      }}
                    >
                      <InvoiceCard invoice={invoice} language={language} />
                    </div>
                  ))}
                </div>
              ) : (
                <InvoiceTable invoices={currentInvoices} language={language} />
              )}
            </div>

            <div
              className={`flex items-center justify-between mt-8 ${
                isFirstSearch
                  ? `transition-all duration-500 ease-out ${
                      showResults ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`
                  : ""
              }`}
              style={isFirstSearch ? { transitionDelay: showResults ? "300ms" : "0ms" } : {}}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{t.rowsPerPage}:</span>
                <Select
                  value={rowsPerPage.toString()}
                  onValueChange={(value) => {
                    setRowsPerPage(Number.parseInt(value))
                    setCurrentPage(1)
                  }}
                >
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6">6</SelectItem>
                    <SelectItem value="12">12</SelectItem>
                    <SelectItem value="24">24</SelectItem>
                    <SelectItem value="48">48</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="text-sm text-muted-foreground">
                {t.showing} {startIndex + 1}-{Math.min(endIndex, invoices.length)} {t.of} {invoices.length} {t.results}
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={goToPreviousPage} disabled={currentPage === 1}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium px-4">
                  {currentPage} / {totalPages}
                </span>
                <Button variant="outline" size="icon" onClick={goToNextPage} disabled={currentPage === totalPages}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {searchBarMovingUp && invoices.length === 0  && 
            <div style={{display: "flex"}} className={`pointer-events-none flex items-center justify-center min-h-screen delay-700 transition-all overflow-hidden ease-out duration-500 ${searchBarMovingUp && invoices.length === 0  ? "opacity-100 " : "opacity-0 "}`}>
                <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <p className="text-muted-foreground text-lg">{t.noResults}</p>
                </div>
            </div>
      }

      <FiltersPanel
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        language={language}
        filters={filters}
        onFiltersChange={setFilters}
        onApplyFilters={applyFilters}
        onClearFilters={clearFilters}
      />
    </div>
  )
}
