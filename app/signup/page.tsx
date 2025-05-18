"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { NavigationBar } from "@/components/navigation-bar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import Link from "next/link"
import { validateEmail, validateName, validatePassword, validatePasswordMatch } from "@/lib/validation"
import { Loader2 } from "lucide-react"

export default function SignupPage() {
  const router = useRouter()
  const { signup } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    // Validate name (no numbers)
    if (!validateName(formData.name)) {
      newErrors.name = "Name should not contain numbers"
    }

    // Validate email format
    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Validate password length
    if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 8 characters long"
    }

    // Validate password match
    if (!validatePasswordMatch(formData.password, formData.confirmPassword)) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    // Check required fields
    if (!formData.name) newErrors.name = "Name is required"
    if (!formData.email) newErrors.email = "Email is required"
    if (!formData.password) newErrors.password = "Password is required"
    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password"

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
      const success = await signup(formData.name, formData.email, formData.password)

      if (success) {
        router.push("/profile")
      } else {
        setError("Email already in use. Please try a different email.")
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
          <h1 className="text-3xl font-playfair font-bold mb-6 text-center">Create Account</h1>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-300 rounded-md text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${errors.name ? "border-red-500" : "border-gray-300 dark:border-gray-600"} rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50 dark:bg-gray-700 dark:text-white`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

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

            <div className="mb-4">
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

            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${errors.confirmPassword ? "border-red-500" : "border-gray-300 dark:border-gray-600"} rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50 dark:bg-gray-700 dark:text-white`}
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>

            <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90 py-2.5" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </span>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p>
              Already have an account?{" "}
              <Link href="/login" className="text-secondary hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
