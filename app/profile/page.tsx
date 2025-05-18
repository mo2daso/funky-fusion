"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { NavigationBar } from "@/components/navigation-bar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { validateEmail, validateName, validatePassword, validatePasswordMatch, validatePhone } from "@/lib/validation"
import { Loader2, LogOut, User, MapPin, Package } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ProfilePage() {
  const router = useRouter()
  const { user, orders, logout, updateProfile, isLoading } = useAuth()
  const [activeTab, setActiveTab] = useState("account")
  const [isUpdating, setIsUpdating] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  // Load user data
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        zipCode: user.zipCode || "",
      })
    }
  }, [user])

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateProfileForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    // Validate name (no numbers)
    if (profileData.name && !validateName(profileData.name)) {
      newErrors.name = "Name should not contain numbers"
    }

    // Validate email format
    if (profileData.email && !validateEmail(profileData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Validate phone (only numbers)
    if (profileData.phone && !validatePhone(profileData.phone)) {
      newErrors.phone = "Phone number should only contain numbers"
    }

    // Check required fields
    if (!profileData.name) newErrors.name = "Name is required"
    if (!profileData.email) newErrors.email = "Email is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validatePasswordForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    // Validate password length
    if (!validatePassword(passwordData.newPassword)) {
      newErrors.newPassword = "Password must be at least 8 characters long"
    }

    // Validate password match
    if (!validatePasswordMatch(passwordData.newPassword, passwordData.confirmPassword)) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    // Check required fields
    if (!passwordData.currentPassword) newErrors.currentPassword = "Current password is required"
    if (!passwordData.newPassword) newErrors.newPassword = "New password is required"
    if (!passwordData.confirmPassword) newErrors.confirmPassword = "Please confirm your new password"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateProfileForm()) {
      return
    }

    setIsUpdating(true)
    setMessage({ type: "", text: "" })

    try {
      const success = await updateProfile(profileData)

      if (success) {
        setMessage({ type: "success", text: "Profile updated successfully" })
      } else {
        setMessage({ type: "error", text: "Failed to update profile" })
      }
    } catch (err) {
      setMessage({ type: "error", text: "An error occurred. Please try again." })
    } finally {
      setIsUpdating(false)
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validatePasswordForm()) {
      return
    }

    setIsUpdating(true)
    setMessage({ type: "", text: "" })

    // In a real app, this would verify the current password and update with the new one
    // For demo purposes, we'll just show a success message
    setTimeout(() => {
      setMessage({ type: "success", text: "Password updated successfully" })
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
      setIsUpdating(false)
    }, 1000)
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (isLoading || !user) {
    return (
      <div className="min-h-screen dark:bg-gray-950 dark:text-white">
        <NavigationBar />
        <main className="container mx-auto px-4 py-12 flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen dark:bg-gray-950 dark:text-white">
      <NavigationBar />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-playfair font-bold">My Account</h1>
            <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="account" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Account
              </TabsTrigger>
              <TabsTrigger value="address" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Address
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Orders
              </TabsTrigger>
            </TabsList>

            <TabsContent value="account" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-medium mb-6">Account Information</h2>

              {message.type && (
                <div
                  className={`mb-6 p-4 rounded-md ${
                    message.type === "success"
                      ? "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                      : "bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-300"
                  }`}
                >
                  {message.text}
                </div>
              )}

              <form onSubmit={handleProfileSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={profileData.name}
                      onChange={handleProfileChange}
                      className={`w-full px-4 py-2 border ${
                        errors.name ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50 dark:bg-gray-700 dark:text-white`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                      className={`w-full px-4 py-2 border ${
                        errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50 dark:bg-gray-700 dark:text-white`}
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
                      value={profileData.phone}
                      onChange={handleProfileChange}
                      className={`w-full px-4 py-2 border ${
                        errors.phone ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50 dark:bg-gray-700 dark:text-white`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <Button type="submit" className="bg-secondary hover:bg-secondary/90" disabled={isUpdating}>
                  {isUpdating ? (
                    <span className="flex items-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </span>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </form>

              <div className="mt-10 pt-6 border-t dark:border-gray-700">
                <h3 className="text-lg font-medium mb-6">Change Password</h3>

                <form onSubmit={handlePasswordSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="md:col-span-2">
                      <label htmlFor="currentPassword" className="block text-sm font-medium mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        className={`w-full px-4 py-2 border ${
                          errors.currentPassword ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50 dark:bg-gray-700 dark:text-white`}
                      />
                      {errors.currentPassword && <p className="text-red-500 text-xs mt-1">{errors.currentPassword}</p>}
                    </div>

                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        className={`w-full px-4 py-2 border ${
                          errors.newPassword ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50 dark:bg-gray-700 dark:text-white`}
                      />
                      {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>}
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        className={`w-full px-4 py-2 border ${
                          errors.confirmPassword ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50 dark:bg-gray-700 dark:text-white`}
                      />
                      {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                    </div>
                  </div>

                  <Button type="submit" className="bg-secondary hover:bg-secondary/90" disabled={isUpdating}>
                    {isUpdating ? (
                      <span className="flex items-center">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </span>
                    ) : (
                      "Update Password"
                    )}
                  </Button>
                </form>
              </div>
            </TabsContent>

            <TabsContent value="address" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-medium mb-6">Shipping Address</h2>

              {message.type && (
                <div
                  className={`mb-6 p-4 rounded-md ${
                    message.type === "success"
                      ? "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                      : "bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-300"
                  }`}
                >
                  {message.text}
                </div>
              )}

              <form onSubmit={handleProfileSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium mb-1">
                      Address
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={profileData.address}
                      onChange={handleProfileChange}
                      rows={3}
                      className={`w-full px-4 py-2 border ${
                        errors.address ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50 dark:bg-gray-700 dark:text-white`}
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
                      value={profileData.city}
                      onChange={handleProfileChange}
                      className={`w-full px-4 py-2 border ${
                        errors.city ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50 dark:bg-gray-700 dark:text-white`}
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
                      value={profileData.state}
                      onChange={handleProfileChange}
                      className={`w-full px-4 py-2 border ${
                        errors.state ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50 dark:bg-gray-700 dark:text-white`}
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
                      value={profileData.zipCode}
                      onChange={handleProfileChange}
                      className={`w-full px-4 py-2 border ${
                        errors.zipCode ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50 dark:bg-gray-700 dark:text-white`}
                    />
                    {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>}
                  </div>
                </div>

                <Button type="submit" className="bg-secondary hover:bg-secondary/90" disabled={isUpdating}>
                  {isUpdating ? (
                    <span className="flex items-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </span>
                  ) : (
                    "Save Address"
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="orders" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-medium mb-6">Order History</h2>

              {orders.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400 mb-4">You haven't placed any orders yet.</p>
                  <Link href="/">
                    <Button className="bg-secondary hover:bg-secondary/90">Start Shopping</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div key={order.id} className="border dark:border-gray-700 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 flex flex-wrap justify-between items-center">
                        <div>
                          <p className="font-medium">Order #{order.orderNumber}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(order.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div>
                            <span className="inline-block px-3 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300">
                              {order.status}
                            </span>
                          </div>
                          <div className="font-medium">Rs. {order.total}</div>
                        </div>
                      </div>

                      <div className="p-4">
                        <h3 className="font-medium mb-3">Items</h3>
                        <div className="space-y-3">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-center gap-3">
                              <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  width={48}
                                  height={48}
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium">{item.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
                              </div>
                              <p className="text-sm">Rs. {item.price * item.quantity}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border-t dark:border-gray-700 p-4">
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Shipped to: {order.shippingDetails.fullName}
                          </p>
                          <Link href={`/order/${order.id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-secondary border-secondary hover:bg-secondary/10"
                            >
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}
