"use client"

import { X, Download, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface Transaction {
  id: number
  description: string
  amount: number
  type: "income" | "expense"
  date: string
  merchant: string
}

interface TransactionDetailDrawerProps {
  transaction: Transaction | null
  isOpen: boolean
  onClose: () => void
}

export default function TransactionDetailDrawer({ transaction, isOpen, onClose }: TransactionDetailDrawerProps) {
  const [showDetails, setShowDetails] = useState(true)

  if (!isOpen || !transaction) return null

  const formattedDate = new Date(transaction.date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const formattedTime = new Date(transaction.date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })

  const transactionStatus = transaction.type === "income" ? "Completed" : "Completed"
  const statusColor = transaction.type === "income" ? "text-green-600" : "text-green-600"

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 z-40 transition-opacity" onClick={onClose} aria-hidden="true" />

      {/* Drawer */}
      <div className="fixed bottom-0 left-0 right-0 bg-card rounded-t-2xl shadow-2xl z-50 max-w-2xl mx-auto animation-in slide-in-from-bottom">
        <div className="max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between rounded-t-2xl">
            <h2 className="text-lg font-semibold text-foreground">Transaction Details</h2>
            <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors" aria-label="Close">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-8 space-y-8">
            {/* Amount Section */}
            <div className="text-center space-y-3">
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${
                  transaction.type === "income" ? "bg-green-100" : "bg-red-100"
                }`}
              >
                <span
                  className={`text-2xl font-bold ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}
                >
                  {transaction.type === "income" ? "+" : "-"}
                </span>
              </div>
              <p
                className={`text-4xl font-bold ${transaction.type === "income" ? "text-green-600" : "text-foreground"}`}
              >
                ${Math.abs(transaction.amount).toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground">{transaction.description}</p>
            </div>

            {/* Status */}
            <div className="bg-muted rounded-lg p-4 flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Status</span>
              <span className={`text-sm font-semibold ${statusColor}`}>{transactionStatus}</span>
            </div>

            {/* Transaction Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Transaction Information</h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-xs text-muted-foreground font-medium mb-1">Merchant</p>
                  <p className="text-sm font-semibold text-foreground">{transaction.merchant}</p>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-xs text-muted-foreground font-medium mb-1">Category</p>
                  <p className="text-sm font-semibold text-foreground">
                    {transaction.type === "income" ? "Deposits" : "Purchases"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-xs text-muted-foreground font-medium mb-1">Date</p>
                  <p className="text-sm font-semibold text-foreground">{formattedDate}</p>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-xs text-muted-foreground font-medium mb-1">Time</p>
                  <p className="text-sm font-semibold text-foreground">{formattedTime}</p>
                </div>
              </div>

              <div className="bg-muted rounded-lg p-4">
                <p className="text-xs text-muted-foreground font-medium mb-1">Transaction ID</p>
                <p className="text-sm font-semibold text-foreground font-mono">
                  TXN#{String(transaction.id).padStart(8, "0")}
                </p>
              </div>

              <div className="bg-muted rounded-lg p-4">
                <p className="text-xs text-muted-foreground font-medium mb-1">Account</p>
                <p className="text-sm font-semibold text-foreground">Checking • ••••8742</p>
              </div>
            </div>

            {/* Additional Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Additional Details</h3>

              <div className="bg-muted rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Exchange Rate</span>
                  <span className="text-sm font-semibold text-foreground">1.00 USD</span>
                </div>
                <div className="border-t border-border my-2" />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Fee</span>
                  <span className="text-sm font-semibold text-foreground">$0.00</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pb-4">
              <Button variant="outline" className="h-11 gap-2 rounded-lg bg-transparent">
                <Download className="w-4 h-4" />
                <span>Download</span>
              </Button>
              <Button variant="outline" className="h-11 gap-2 rounded-lg bg-transparent">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
