"use client"

import { useState } from "react"
import LoginPage from "@/components/login-page"
import TwoFAPage from "@/components/two-fa-page"
import DashboardPage from "@/components/dashboard-page"
import TransfersPage from "@/components/transfers-page"
import InvestPage from "@/components/invest-page"
import AnalyticsPage from "@/components/analytics-page"

type PageType = "home" | "transfers" | "invest" | "analytics"
type AuthStep = "login" | "2fa" | "authenticated"

export default function Home() {
  const [authStep, setAuthStep] = useState<AuthStep>("login")
  const [currentPage, setCurrentPage] = useState<PageType>("home")

  const handleLogin = () => {
    setAuthStep("2fa")
  }

  const handleVerify2FA = () => {
    setAuthStep("authenticated")
  }

  const handleLogout = () => {
    setAuthStep("login")
    setCurrentPage("home")
  }

  const handleNavigation = (page: PageType) => {
    setCurrentPage(page)
  }

  if (authStep !== "authenticated") {
    if (authStep === "login") {
      return <LoginPage onLogin={handleLogin} onNavigateTo2FA={() => setAuthStep("2fa")} />
    }
    return <TwoFAPage onBack={() => setAuthStep("login")} onVerify={handleVerify2FA} />
  }

  if (currentPage === "transfers") {
    return <TransfersPage onLogout={handleLogout} onNavigate={handleNavigation} />
  }

  if (currentPage === "invest") {
    return <InvestPage onLogout={handleLogout} onNavigate={handleNavigation} />
  }

  if (currentPage === "analytics") {
    return <AnalyticsPage onLogout={handleLogout} onNavigate={handleNavigation} />
  }

  return <DashboardPage onLogout={handleLogout} onNavigate={handleNavigation} />
}
