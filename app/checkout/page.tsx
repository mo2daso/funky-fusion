"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { NavigationBar } from "@/components/navigation-bar"
import Image from "next/image"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { validateEmail, validateName, validatePhone } from "@/lib/validation"

export default function CheckoutPage() {
  const { cartItems, getCartTotal, getSubtotal, getDeliveryCost, clearCart } = useCart()
  const { user, addOrder } = useAuth()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [useProfileInfo, setUseProfileInfo] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  })

  // If user is logged in, ask if they want to use their profile info
  useEffect(() => {
    if (user && user.address) {
      setUseProfileInfo(true)
    }
  }, [user])

  // Update form data when useProfileInfo changes
  useEffect(() => {
    if (user && useProfileInfo) {
      setFormData({
        fullName: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        zipCode: user.zipCode || "",
      })
    } else if (!useProfileInfo) {
      setFormData({
        fullName: "",
        email: user ? user.email : "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
      })
    }
  }, [user, useProfileInfo])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    if (!validateName(formData.fullName)) {
      newErrors.fullName = "Name should not contain numbers"
    }

    // Validate email format
    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Validate phone (only numbers)
    if (!validatePhone(formData.phone)) {
      newErrors.phone = "Phone number should only contain numbers"
    }

    // Check required fields
    if (!formData.fullName) newErrors.fullName = "Full name is required"
    if (!formData.email) newErrors.email = "Email is required"
    if (!formData.phone) newErrors.phone = "Phone number is required"
    if (!formData.address) newErrors.address = "Address is required"
    if (!formData.city) newErrors.city = "City is required"
    if (!formData.state) newErrors.state = "State is required"
    if (!formData.zipCode) newErrors.zipCode = "ZIP code is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate order processing
    setTimeout(() => {
      // Create order object
      const orderDetails = {
        id: `FF-${Math.floor(100000 + Math.random() * 900000)}`,
        items: cartItems,
        subtotal: getSubtotal(),
        deliveryCost: getDeliveryCost(),
        total: getCartTotal(),
        shippingDetails: formData,
        orderNumber: `FF-${Math.floor(100000 + Math.random() * 900000)}`,
        orderDate: new Date().toISOString(),
        date: new Date().toISOString(),
        status: "processing" as const,
      }

      // Store order details in localStorage for the confirmation page
      localStorage.setItem("lastOrder", JSON.stringify(orderDetails))

      // Add to user's orders if logged in
      if (user) {
        addOrder(orderDetails)
      }

      // Clear the cart
      clearCart()

      // Redirect to confirmation page
      router.push("/checkout/confirmation")
    }, 1500)
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen dark:bg-gray-950 dark:text-white">
        <NavigationBar />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-playfair font-bold mb-6">Your Cart is Empty</h1>
            <p className="mb-8">You don't have any items in your cart to checkout.</p>
            <Button className="bg-secondary hover:bg-secondary/90" onClick={() => router.push("/")}>
              Continue Shopping
            </Button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen dark:bg-gray-950 dark:text-white">
      <NavigationBar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-playfair font-bold mb-8 text-center">Checkout</h1>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="md:col-span-1">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-medium mb-4">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium">Rs. {item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t dark:border-gray-700 pt-4">
                  <div className="flex justify-between mb-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Subtotal</p>
                    <p className="text-sm font-medium">Rs. {getSubtotal()}</p>
                  </div>
                  <div className="flex justify-between mb-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Delivery</p>
                    <p className="text-sm font-medium">Rs. {getDeliveryCost()}</p>
                  </div>
                  <div className="flex justify-between font-medium text-lg mt-4 pt-4 border-t dark:border-gray-700">
                    <p>Total</p>
                    <p>Rs. {getCartTotal()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="md:col-span-2">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-medium">Shipping Information</h2>
                  {!user && (
                    <div className="text-sm">
                      <Link href="/login" className="text-secondary hover:underline">
                        Login
                      </Link>
                      {" or "}
                      <Link href="/signup" className="text-secondary hover:underline">
                        Sign Up
                      </Link>
                    </div>
                  )}
                </div>

                {user && user.address && (
                  <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Use your saved information?</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-300">
                          We'll fill the form with your profile details
                        </p>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="useProfile"
                          checked={useProfileInfo}
                          onChange={() => setUseProfileInfo(!useProfileInfo)}
                          className="h-4 w-4 text-secondary focus:ring-secondary/50 border-gray-300 rounded"
                        />
                        <label htmlFor="useProfile" className="ml-2 text-sm font-medium">
                          Yes, use my profile
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-2">
                      <label htmlFor="fullName" className="block text-sm font-medium mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-2 border ${errors.fullName ? "border-red-500" : "border-gray-300 dark:border-gray-600"} rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50 dark:bg-gray-700 dark:text-white`}
                      />
                      {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-2 border ${errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-600"} rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50 dark:bg-gray-700 dark:text-white`}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-2 border ${errors.phone ? "border-red-500" : "border-gray-300 dark:border-gray-600"} rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50 dark:bg-gray-700 dark:text-white`}
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>

                    <div className="col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium mb-1">
                        Address
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        rows={3}
                        className={`w-full px-4 py-2 border ${errors.address ? "border-red-500" : "border-gray-300 dark:border-gray-600"} rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50 dark:bg-gray-700 dark:text-white`}
                      />
                      {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                    </div>

                    <div>
                      <label htmlFor="city" className="block text-sm font-medium mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-2 border ${errors.city ? "border-red-500" : "border-gray-300 dark:border-gray-600"} rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50 dark:bg-gray-700 dark:text-white`}
                      />
                      {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                    </div>

                    <div>
                      <label htmlFor="state" className="block text-sm font-medium mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-2 border ${errors.state ? "border-red-500" : "border-gray-300 dark:border-gray-600"} rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50 dark:bg-gray-700 dark:text-white`}
                      />
                      {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                    </div>

                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-medium mb-1">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-2 border ${errors.zipCode ? "border-red-500" : "border-gray-300 dark:border-gray-600"} rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50 dark:bg-gray-700 dark:text-white`}
                      />
                      {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>}
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-lg font-medium mb-4">Payment Method</h3>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md border border-gray-200 dark:border-gray-600">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="cod"
                          name="paymentMethod"
                          checked
                          readOnly
                          className="h-4 w-4 text-secondary focus:ring-secondary/50"
                        />
                        <label htmlFor="cod" className="ml-2 block text-sm font-medium">
                          Cash on Delivery (COD)
                        </label>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">
                        Pay with cash when your order is delivered.
                      </p>
                    </div>
                  </div>

                  <div className="mt-8">
                    <Button
                      type="submit"
                      className="w-full bg-secondary hover:bg-secondary/90 py-3 text-base"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </span>
                      ) : (
                        "Place Order"
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
