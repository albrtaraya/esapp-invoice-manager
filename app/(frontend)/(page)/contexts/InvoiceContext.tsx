'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

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
  mockInvoices 
}: { 
  children: ReactNode
  mockInvoices: any[] 
}) {
    const [searchQuery, setSearchQuery] = useState('')
    const [searchBarMovingUp, setSearchBarMovingUp] = useState(false)
    const [showResults, setShowResults] = useState(false)
    const [isFirstSearch, setIsFirstSearch] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [invoices, setInvoices] = useState<any[]>([])

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