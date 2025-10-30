"use client"

import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Language } from "@/lib/translations"
import { translations } from "@/lib/translations"

interface Invoice {
  id: string
  invoiceNumber: string
  amount: number
  dueDate: string
  status: "pending" | "overdue" | "paid"
}

interface InvoiceTableProps {
  invoices: Invoice[]
  language: Language
}

export function InvoiceTable({ invoices, language }: InvoiceTableProps) {
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
            <TableHead>{t.amount}</TableHead>
            <TableHead>{t.dueDate}</TableHead>
            <TableHead>{t.status}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
              <TableCell className="font-semibold">${invoice.amount.toFixed(2)}</TableCell>
              <TableCell>{invoice.dueDate}</TableCell>
              <TableCell>
                <Badge className={statusColors[invoice.status]}>{t[invoice.status]}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
