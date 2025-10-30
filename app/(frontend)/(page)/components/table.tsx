"use client"

import { useState, useEffect } from "react"
import { Filter, LayoutGrid, Table2, FileSpreadsheet, FileText, ChevronLeft, ChevronRight } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { InvoiceCard } from "@/components/invoice-card"
import { InvoiceTable } from "@/components/invoice-table"
import { FiltersPanel } from "@/components/filters-panel"
import { useLanguageContext } from "@/providers/LanguageContext"
import { Button } from "@/components/ui/button"
import { translations } from "@/app/(frontend)/(page)/translations"
import { useInvoice } from "../contexts/InvoiceContext"

export function Table({
    setMockInvoices,
    setLoading,
    setError
}:{
    setMockInvoices: (invoices: any[]) => void,
    setLoading: (loading: boolean) => void,
    setError: (error: string | null) => void
}) {
    const {
        isFirstSearch, 
        searchBarMovingUp, 
        searchQuery, 
        showResults, 
        setShowResults,
        currentPage,
        setCurrentPage,
        invoices,
        setInvoices,
        mockInvoices
    } = useInvoice();
    const { language } = useLanguageContext();
    const [isFiltersOpen, setIsFiltersOpen] = useState(false)
    const [rowsPerPage, setRowsPerPage] = useState(6)
    const [viewMode, setViewMode] = useState<"cards" | "table">("cards")

    const t = translations[language]

  const [filters, setFilters] = useState({
    status: "all",
    minAmount: "",
    maxAmount: "",
    startDate: "",
    endDate: "",
  })

  
    useEffect(() => {
      if(localStorage.getItem("isFirst") == "true"){
        setCurrentPage(1)
        const filtered = mockInvoices.filter(
          (inv: any) =>
            inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            inv.amount.toString().includes(searchQuery),
        )
        setInvoices(filtered)
        const timer1 = setTimeout(() => {
          setTimeout(() => {
            setShowResults(true)
          }, 200)
        }, 100);
    
        return () => {
          clearTimeout(timer1)
        }
      }
    }, [])

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
  
    const exportToExcel = () => {
      alert("Exportando a Excel...")
    }
  
    const exportToPDF = () => {
      alert("Exportando a PDF...")
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

    return <>
        {invoices.length > 0 && (
            <div className="pt-24 pb-8 min-h-screen">
            <div className="container mx-auto max-w-7xl px-6 max-lg:pt-16">
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
                    {currentInvoices.map((invoice: any, index: any) => (
                        <div
                        key={invoice.id}
                        className={`transition-all duration-500 ease-out ${
                            showResults ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        }`}
                        style={{
                            transitionDelay: showResults ? `${index * 80}ms` : "0ms",
                        }}
                        >
                        <InvoiceCard invoice={invoice} language={language} 
                            setError={setError}
                            setLoading={setLoading}
                            setMockInvoices={setMockInvoices} />
                        </div>
                    ))}
                    </div>
                ) : (
                    <InvoiceTable invoices={currentInvoices} language={language} 
                        setError={setError}
                        setLoading={setLoading}
                        setMockInvoices={setMockInvoices} />
                )}
                </div>

                <div
                className={`flex items-center justify-between mt-8 max-lg:flex-col max-lg:justify-center ${
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

                <div className="text-sm text-muted-foreground max-lg:py-5">
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
    </>
}