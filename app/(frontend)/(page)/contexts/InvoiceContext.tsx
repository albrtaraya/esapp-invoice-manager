'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { ProxyPublicRequest } from '../../login/lib/proxyAxios'

interface InvoiceContextType {
  searchQuery: string
  setSearchQuery: (query: string) => void
  searchBarMovingUp: boolean
  setSearchBarMovingUp: (moving: boolean) => void
  showResults: boolean
  setShowResults: (show: boolean) => void
  isFirstSearch: boolean
  setIsFirstSearch: (first: boolean) => void
  currentPage: number
  setCurrentPage: (page: number) => void
  invoices: any[]
  setInvoices: (invoices: any[]) => void
  mockInvoices: any[]
}

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined)

export function InvoiceProvider({ 
    children, 
    mockInvoices,
    setMockInvoices,
    setLoading,
    setError
}: { 
    children: ReactNode
    mockInvoices: any[],
    setMockInvoices: (invoices: any[]) => void,
    setLoading: (loading: boolean) => void,
    setError: (error: string | null) => void
}) {
    const [searchQuery, setSearchQuery] = useState('')
    const [searchBarMovingUp, setSearchBarMovingUp] = useState(false)
    const [showResults, setShowResults] = useState(false)
    const [isFirstSearch, setIsFirstSearch] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [invoices, setInvoices] = useState<any[]>([])

    
    
    useEffect(() => {
        const updateInvoices = async () => {
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
        updateInvoices()
    }, []);

    return (
        <InvoiceContext.Provider value={{
            searchQuery,
            setSearchQuery,
            searchBarMovingUp,
            setSearchBarMovingUp,
            showResults,
            setShowResults,
            isFirstSearch,
            setIsFirstSearch,
            currentPage,
            setCurrentPage,
            invoices,
            setInvoices,
            mockInvoices
        }}>
            {children}
        </InvoiceContext.Provider>
    )
}

export function useInvoice() {
  const context = useContext(InvoiceContext)
  if (!context) {
    throw new Error('useInvoice must be used within InvoiceProvider')
  }
  return context
}