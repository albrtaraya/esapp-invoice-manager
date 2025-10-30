"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Language } from "@/app/(frontend)/(page)/translations"
import { translations } from "@/app/(frontend)/(page)/translations"

interface Invoice {
  id: string
  invoiceNumber: string
  amount: number
  dueDate: string
  status: "pending" | "overdue" | "paid"
}

interface InvoiceCardProps {
  invoice: Invoice
  language: Language
}

export function InvoiceCard({ invoice, language }: InvoiceCardProps) {
  const t = translations[language]

  const statusColors = {
    pending: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
    overdue: "bg-red-500/10 text-red-700 dark:text-red-400",
    paid: "bg-green-500/10 text-green-700 dark:text-green-400",
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground">{t.invoiceNumber}</p>
            <p className="text-lg font-semibold">{invoice.invoiceNumber}</p>
          </div>
          <Badge className={statusColors[invoice.status]}>{t[invoice.status]}</Badge>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">{t.amount}</p>
            <p className="text-xl font-bold">${invoice.amount.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{t.dueDate}</p>
            <p className="text-base font-medium">{invoice.dueDate}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
