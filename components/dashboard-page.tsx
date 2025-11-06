"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import {
  Send,
  Plus,
  Eye,
  EyeOff,
  LogOut,
  TrendingDown,
  TrendingUp,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react"
import TransactionDetailDrawer from "./transaction-detail-drawer"

interface DashboardPageProps {
  onLogout: () => void
  onNavigate: (page: "home" | "transfers" | "invest" | "analytics") => void
}

const mockTransactions = [
  {
    id: 1,
    description: "Salary Deposit",
    amount: 5000,
    type: "income",
    date: "2024-11-05",
    merchant: "Employer Inc",
  },
  {
    id: 2,
    description: "Grocery Store",
    amount: -85.42,
    type: "expense",
    date: "2024-11-04",
    merchant: "Whole Foods Market",
  },
  {
    id: 3,
    description: "Utility Payment",
    amount: -120,
    type: "expense",
    date: "2024-11-03",
    merchant: "City Power Co",
  },
  {
    id: 4,
    description: "Restaurant",
    amount: -45.99,
    type: "expense",
    date: "2024-11-02",
    merchant: "Olive Garden",
  },
  {
    id: 5,
    description: "ATM Withdrawal",
    amount: -200,
    type: "expense",
    date: "2024-11-01",
    merchant: "ATM 5th & Main",
  },
]

const mockSpendingData = [
  { month: "Aug", amount: 2100, income: 5000 },
  { month: "Sep", amount: 2400, income: 5200 },
  { month: "Oct", amount: 2210, income: 5000 },
  { month: "Nov", amount: 2290, income: 5500 },
]

const mockCategoryData = [
  { name: "Food", value: 450, color: "#10B981" },
  { name: "Transport", value: 320, color: "#3B82F6" },
  { name: "Entertainment", value: 210, color: "#8B5CF6" },
  { name: "Utilities", value: 310, color: "#F59E0B" },
]

export default function DashboardPage({ onLogout, onNavigate }: DashboardPageProps) {
  const [showBalance, setShowBalance] = useState(true)
  const [selectedTransaction, setSelectedTransaction] = useState<(typeof mockTransactions)[0] | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const balance = 12458.37
  const monthlySpending = mockTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0)

  const handleTransactionClick = (transaction: (typeof mockTransactions)[0]) => {
    setSelectedTransaction(transaction)
    setIsDrawerOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
              <span className="text-primary-foreground font-bold">F</span>
            </div>
            <h1 className="text-xl font-bold text-foreground">FinanceHub</h1>
          </div>
          <Button onClick={onLogout} variant="outline" className="h-10 text-sm bg-transparent">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 pb-32">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Good Morning, Anderson</h2>
          <p className="text-muted-foreground">Here's your financial overview</p>
        </div>

        {/* Account Balance Card */}
        <Card className="mb-6 bg-primary text-primary-foreground shadow-lg border-0">
          <CardContent className="pt-8 pb-8">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-primary-foreground/80 text-sm mb-2">Total Balance</p>
                <div className="flex items-center gap-3">
                  <h3 className="text-4xl font-bold tracking-tight">
                    {showBalance ? `$${balance.toFixed(2)}` : "••••••"}
                  </h3>
                  <button
                    onClick={() => setShowBalance(!showBalance)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <Wallet className="w-12 h-12 opacity-80" />
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Button
            onClick={() => onNavigate("transfers")}
            className="h-16 flex flex-col items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg"
          >
            <Send className="w-5 h-5" />
            <span className="text-xs font-medium">Send Money</span>
          </Button>
          <Button
            variant="outline"
            className="h-16 flex flex-col items-center justify-center gap-2 rounded-lg bg-transparent"
          >
            <Plus className="w-5 h-5" />
            <span className="text-xs font-medium">Add Money</span>
          </Button>
          <Button
            onClick={() => onNavigate("invest")}
            variant="outline"
            className="h-16 flex flex-col items-center justify-center gap-2 rounded-lg bg-transparent"
          >
            <TrendingUp className="w-5 h-5" />
            <span className="text-xs font-medium">Invest</span>
          </Button>
          <Button
            variant="outline"
            className="h-16 flex flex-col items-center justify-center gap-2 rounded-lg bg-transparent"
          >
            <Wallet className="w-5 h-5" />
            <span className="text-xs font-medium">Cards</span>
          </Button>
        </div>

        {/* Enhanced Stats Grid with Better Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Income vs Spending Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">Income vs Spending</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={mockSpendingData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--color-chart-1))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--color-chart-1))" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorSpending" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--color-chart-2))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--color-chart-2))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="month" stroke="var(--color-muted-foreground)" style={{ fontSize: "12px" }} />
                  <YAxis stroke="var(--color-muted-foreground)" style={{ fontSize: "12px" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "0.5rem",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                    formatter={(value) => `$${value}`}
                  />
                  <Area
                    type="monotone"
                    dataKey="income"
                    stroke="hsl(var(--color-chart-1))"
                    fillOpacity={1}
                    fill="url(#colorIncome)"
                    name="Income"
                  />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="hsl(var(--color-chart-2))"
                    fillOpacity={1}
                    fill="url(#colorSpending)"
                    name="Spending"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Spending by Category */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">Spending by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
                <div className="w-full md:w-auto flex justify-center">
                  <ResponsiveContainer width={180} height={220}>
                    <PieChart>
                      <Pie
                        data={mockCategoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                        startAngle={90}
                        endAngle={-270}
                      >
                        {mockCategoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} stroke="white" strokeWidth={2} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-full md:w-auto flex flex-col justify-center gap-4">
                  {mockCategoryData.map((category, index) => (
                    <div key={index} className="flex items-center gap-3 whitespace-nowrap">
                      <div
                        className="w-4 h-4 rounded-full flex-shrink-0 border border-white/20"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="text-sm text-muted-foreground flex-1">{category.name}</span>
                      <span className="text-sm font-semibold text-foreground ml-4">${category.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transaction History */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Recent Transactions</CardTitle>
              <button
                onClick={() => {
                  setSelectedTransaction(null)
                  setIsDrawerOpen(true)
                }}
                className="text-sm text-accent hover:underline font-medium"
              >
                View All
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {mockTransactions.map((transaction) => (
                <button
                  key={transaction.id}
                  onClick={() => handleTransactionClick(transaction)}
                  className="w-full flex items-center justify-between p-4 hover:bg-muted rounded-lg transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        transaction.type === "income" ? "bg-green-100" : "bg-muted"
                      }`}
                    >
                      {transaction.type === "income" ? (
                        <ArrowDownLeft className="w-5 h-5 text-green-600" />
                      ) : (
                        <ArrowUpRight className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm">{transaction.description}</p>
                      <p className="text-xs text-muted-foreground">{transaction.merchant}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-semibold text-sm ${
                        transaction.type === "income" ? "text-green-600" : "text-foreground"
                      }`}
                    >
                      {transaction.type === "income" ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground">{transaction.date}</p>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-around">
          <button onClick={() => onNavigate("home")} className="flex flex-col items-center gap-1 p-2 text-accent">
            <Wallet className="w-6 h-6" />
            <span className="text-xs font-medium">Home</span>
          </button>
          <button
            onClick={() => onNavigate("transfers")}
            className="flex flex-col items-center gap-1 p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Send className="w-6 h-6" />
            <span className="text-xs font-medium">Transfers</span>
          </button>
          <button
            onClick={() => onNavigate("invest")}
            className="flex flex-col items-center gap-1 p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <TrendingUp className="w-6 h-6" />
            <span className="text-xs font-medium">Invest</span>
          </button>
          <button
            onClick={() => onNavigate("analytics")}
            className="flex flex-col items-center gap-1 p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <TrendingDown className="w-6 h-6" />
            <span className="text-xs font-medium">Analytics</span>
          </button>
        </div>
      </nav>

      {/* Transaction Detail Drawer Component */}
      <TransactionDetailDrawer
        transaction={selectedTransaction}
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false)
          setSelectedTransaction(null)
        }}
      />
    </div>
  )
}
