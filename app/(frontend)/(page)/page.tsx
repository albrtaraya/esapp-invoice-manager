"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Table } from "./components/table"
import { ExtraHeader } from "./components/extraHeader"
import { InvoiceProvider } from "./contexts/InvoiceContext"

export default function InvoiceSearchPage() {
  const [mockInvoices, setMockInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Header/>
      <InvoiceProvider 
          mockInvoices={mockInvoices}
          setError={setError}
          setLoading={setLoading}
          setMockInvoices={setMockInvoices}
      >
        <ExtraHeader />
        {loading ? 
          <div className="min-h-screen bg-background flex items-center justify-center">
            <p>Cargando facturas...</p>
          </div>
          :
          error ?
          <div className="min-h-screen bg-background flex items-center justify-center">
            <p className="text-red-500">{error}</p>
          </div>
          :
          <Table 
            setError={setError}
            setLoading={setLoading}
            setMockInvoices={setMockInvoices}
          />
        }
      </InvoiceProvider>
    </div>
  )
}
