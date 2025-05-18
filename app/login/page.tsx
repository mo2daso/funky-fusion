"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { NavigationBar } from "@/components/navigation-bar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import Link from "next/link"
import { validateEmail } from "@/lib/validation"
import { Loader2 } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    // Validate email format
    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Check required fields
    if (!formData.email) newErrors.email = "Email is required"
    if (!formData.password) newErrors.password = "Password is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const success = await login(formData.email, formData.password)

      if (success) {
        router.push("/")
      } else {
        setError("Invalid email or password")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen dark:bg-gray-950 dark:text-white">
      <NavigationBar />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm">
          <h1 className="text-3xl font-playfair font-bold mb-6 text-center">Login</h1>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-300 rounded-md text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-600"} rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50 dark:bg-gray-700 dark:text-white`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${errors.password ? "border-red-500" : "border-gray-300 dark:border-gray-600"} rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50 dark:bg-gray-700 dark:text-white`}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90 py-2.5" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p>
              Don't have an account?{" "}
              <Link href="/signup" className="text-secondary hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
