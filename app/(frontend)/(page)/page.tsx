"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Table } from "./components/table"
import { ExtraHeader } from "./components/extraHeader"
import { InvoiceProvider } from "./contexts/InvoiceContext"
import { ProxyPublicRequest } from "../login/lib/proxyAxios"

export default function InvoiceSearchPage() {
  const [mockInvoices, setMockInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setLoading(true)
        const response:any = await ProxyPublicRequest('/api/invoice')
        setMockInvoices(response.data.dataset || [])
        setError(null)
      } catch (error: any) {
        setError(error.response?.data?.error || 'Error al cargar facturas')
      } finally {
        setLoading(false)
      }
    }
    fetchInvoices()
  }, []);

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Header/>
      <InvoiceProvider mockInvoices={mockInvoices}>
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
          <Table />
        }
      </InvoiceProvider>
    </div>
  )
}
