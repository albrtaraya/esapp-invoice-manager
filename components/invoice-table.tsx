"use client"

import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Language } from "@/app/(frontend)/(page)/translations"
import { translations } from "@/app/(frontend)/(page)/translations"
import { Invoice } from "./invoice-card"
import { ModalPayment } from "@/app/(frontend)/(page)/components/modalPayment"
import { Wallet2Icon } from "lucide-react"

interface InvoiceTableProps {
  invoices: Invoice[]
  language: Language
  setMockInvoices: (invoices: any[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export function InvoiceTable({ invoices, language, 
    setMockInvoices,
    setLoading,
    setError  }: InvoiceTableProps) {
  const t = translations[language]

  const statusColors = {
    pending: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
    overdue: "bg-red-500/10 text-red-700 dark:text-red-400",
    paid: "bg-green-500/10 text-green-700 dark:text-green-400",
  }

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t.invoiceNumber}</TableHead>
            <TableHead>{t.service}</TableHead>
            <TableHead>{t.amount}</TableHead>
            <TableHead>{t.period}</TableHead>
            <TableHead>{t.status}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
              <TableCell className="font-medium">{invoice.service}</TableCell>
              <TableCell className="font-semibold">${invoice.amount.toFixed(2)}</TableCell>
              <TableCell>{invoice.period}</TableCell>
              <TableCell>
                <Badge className={statusColors[invoice.status]}>{t[invoice.status]}</Badge>
              </TableCell>
              <TableCell>
                <ModalPayment invoice={invoice} 
                              setError={setError}
                              setLoading={setLoading}
                              setMockInvoices={setMockInvoices}>
                  <Wallet2Icon className="cursor-pointer text-primary hover:text-primary/80 w-5 h-5" />
                </ModalPayment>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
