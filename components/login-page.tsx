"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle2 } from "lucide-react"

interface LoginPageProps {
  onLogin: () => void
  onNavigateTo2FA: () => void
}

export default function LoginPage({ onLogin, onNavigateTo2FA }: LoginPageProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Please enter both email/phone and password")
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      setIsVerifying(true)
      setTimeout(() => {
        onNavigateTo2FA()
      }, 800)
    }, 1200)
  }

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-0 shadow-lg">
          <CardContent className="pt-12 pb-12 flex flex-col items-center text-center">
            <div className="mb-4 p-3 bg-accent/10 rounded-full animate-pulse">
              <CheckCircle2 className="w-10 h-10 text-accent" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-1">Sign In Successful</h2>
            <p className="text-muted-foreground text-sm">Verifying your account...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary mb-4">
            <span className="text-primary-foreground font-bold text-lg">F</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">FinanceHub</h1>
          <p className="text-muted-foreground mt-1">Secure Banking Platform</p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>Sign in to your account to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email or Phone Number
                </Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="user@example.com or +1 (555) 000-0000"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-10"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <button type="button" className="text-xs text-accent hover:underline">
                    Forgot?
                  </button>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-10"
                  disabled={isLoading}
                />
              </div>

              <Button
                type="submit"
                className="w-full h-10 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-card text-muted-foreground">Demo Credentials</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-muted-foreground bg-muted p-3 rounded-lg">
              <p>
                <strong>Email/Phone:</strong> user@example.com
              </p>
              <p>
                <strong>Password:</strong> (any password)
              </p>
              <p>
                <strong>2FA Code:</strong> 123456
              </p>
            </div>

            <p className="text-xs text-muted-foreground text-center mt-4">
              Don't have an account? <button className="text-accent hover:underline font-medium">Sign up here</button>
            </p>
          </CardContent>
        </Card>

        <p className="text-xs text-muted-foreground text-center mt-4">© 2025 FinanceHub. All rights reserved.</p>
      </div>
    </div>
  )
}
