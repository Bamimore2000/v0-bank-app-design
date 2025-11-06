"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Send, ArrowLeft, LogOut, CheckCircle, Clock } from "lucide-react"

interface TransfersPageProps {
  onLogout: () => void
  onNavigate: (page: "home" | "transfers" | "invest" | "analytics") => void
}

const recentRecipients = [
  { id: 1, name: "Sarah Johnson", account: "•••• 4821", initials: "SJ" },
  { id: 2, name: "Mike Chen", account: "•••• 5739", initials: "MC" },
  { id: 3, name: "Emma Williams", account: "•••• 3045", initials: "EW" },
  { id: 4, name: "James Davis", account: "•••• 7213", initials: "JD" },
]

const transferHistory = [
  {
    id: 1,
    recipient: "Sarah Johnson",
    amount: 250,
    date: "2024-11-04",
    status: "completed",
    account: "•••• 4821",
  },
  {
    id: 2,
    recipient: "Mike Chen",
    amount: 150,
    date: "2024-11-02",
    status: "completed",
    account: "•••• 5739",
  },
  {
    id: 3,
    recipient: "Emma Williams",
    amount: 500,
    date: "2024-10-30",
    status: "completed",
    account: "•••• 3045",
  },
  {
    id: 4,
    recipient: "James Davis",
    amount: 100,
    date: "2024-10-28",
    status: "pending",
    account: "•••• 7213",
  },
]

export default function TransfersPage({ onLogout, onNavigate }: TransfersPageProps) {
  const [amount, setAmount] = useState("")
  const [selectedRecipient, setSelectedRecipient] = useState<(typeof recentRecipients)[0] | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleTransfer = () => {
    if (amount && selectedRecipient) {
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
      setAmount("")
      setSelectedRecipient(null)
    }
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => onNavigate("home")} className="p-2 hover:bg-muted rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-foreground">Money Transfer</h1>
              <p className="text-xs text-muted-foreground">Send money to your contacts</p>
            </div>
          </div>
          <Button onClick={onLogout} variant="outline" className="h-10 text-sm bg-transparent">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Success Message */}
        {showSuccess && (
          <Card className="mb-6 bg-green-50 border-green-200">
            <CardContent className="pt-4 pb-4 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <div>
                <p className="font-semibold text-green-900 text-sm">Transfer Sent Successfully</p>
                <p className="text-xs text-green-800">
                  ${amount} sent to {selectedRecipient?.name}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Transfer Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Send Money</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Amount</Label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-foreground font-semibold">$</span>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-8 h-12 text-lg font-semibold"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">Select Recipient</Label>
              <div className="grid grid-cols-2 gap-3">
                {recentRecipients.map((recipient) => (
                  <button
                    key={recipient.id}
                    onClick={() => setSelectedRecipient(recipient)}
                    className={`p-3 rounded-lg border-2 transition-all text-left ${
                      selectedRecipient?.id === recipient.id
                        ? "border-accent bg-accent/10"
                        : "border-border hover:border-muted-foreground"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white mb-2 ${
                        selectedRecipient?.id === recipient.id ? "bg-accent" : "bg-muted-foreground"
                      }`}
                    >
                      {recipient.initials}
                    </div>
                    <p className="font-semibold text-sm text-foreground">{recipient.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{recipient.account}</p>
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={handleTransfer}
              disabled={!amount || !selectedRecipient}
              className="w-full h-11 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Money
            </Button>
          </CardContent>
        </Card>

        {/* Transfer History */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Transfers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {transferHistory.map((transfer) => (
                <div
                  key={transfer.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <Send className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">{transfer.recipient}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">{transfer.account}</span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            transfer.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {transfer.status === "completed" ? (
                            <span className="flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              Completed
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              Pending
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="font-bold text-foreground">-${transfer.amount.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-around">
          <button
            onClick={() => onNavigate("home")}
            className="flex flex-col items-center gap-1 p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 11l4-4m0 0l4 4m-4-4v4"
              />
            </svg>
            <span className="text-xs font-medium">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2 text-accent">
            <Send className="w-6 h-6" />
            <span className="text-xs font-medium">Transfers</span>
          </button>
          <button
            onClick={() => onNavigate("invest")}
            className="flex flex-col items-center gap-1 p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8L5.343 18.657M1 21h22M5 21H1m22 0v-8m0 8L18.343 8.343"
              />
            </svg>
            <span className="text-xs font-medium">Invest</span>
          </button>
          <button
            onClick={() => onNavigate("analytics")}
            className="flex flex-col items-center gap-1 p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7H5v12h8V7zM13 3h6v4h-6V3z" />
            </svg>
            <span className="text-xs font-medium">Analytics</span>
          </button>
        </div>
      </nav>
    </div>
  )
}
