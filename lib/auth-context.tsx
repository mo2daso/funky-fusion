"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type User = {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
}

export type Order = {
  id: string
  date: string
  total: number
  status: "processing" | "shipped" | "delivered"
  items: {
    id: number
    name: string
    price: number
    quantity: number
    image: string
  }[]
  shippingDetails: {
    fullName: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    zipCode: string
  }
}

type AuthContextType = {
  user: User | null
  orders: Order[]
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  updateProfile: (data: Partial<User>) => Promise<boolean>
  addOrder: (order: Order) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load user data from localStorage on initial render
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    const savedOrders = localStorage.getItem("orders")

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Failed to parse user from localStorage", error)
      }
    }

    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders))
      } catch (error) {
        console.error("Failed to parse orders from localStorage", error)
      }
    }

    setIsLoading(false)
  }, [])

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user))
    } else {
      localStorage.removeItem("user")
    }
  }, [user])

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders))
  }, [orders])

  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would make an API call to authenticate
    // For demo purposes, we'll check against localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const foundUser = users.find((u: any) => u.email === email && u.password === password)

    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)

      // Load user's orders
      const allOrders = JSON.parse(localStorage.getItem("allOrders") || "[]")
      const userOrders = allOrders.filter((order: Order) => order.shippingDetails.email === email)
      setOrders(userOrders)

      return true
    }

    return false
  }

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // In a real app, this would make an API call to register
    // For demo purposes, we'll store in localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]")

    // Check if user already exists
    if (users.some((u: any) => u.email === email)) {
      return false
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password, // In a real app, this would be hashed
    }

    users.push(newUser)
    localStorage.setItem("users", JSON.stringify(users))

    // Log the user in
    const { password: _, ...userWithoutPassword } = newUser
    setUser(userWithoutPassword)
    setOrders([])

    return true
  }

  const logout = () => {
    setUser(null)
    setOrders([])
  }

  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    if (!user) return false

    // Update user in state
    const updatedUser = { ...user, ...data }
    setUser(updatedUser)

    // Update user in localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const updatedUsers = users.map((u: any) => {
      if (u.id === user.id) {
        return { ...u, ...data }
      }
      return u
    })

    localStorage.setItem("users", JSON.stringify(updatedUsers))
    return true
  }

  const addOrder = (order: Order) => {
    // Add to user's orders
    setOrders((prev) => [...prev, order])

    // Add to all orders in localStorage
    const allOrders = JSON.parse(localStorage.getItem("allOrders") || "[]")
    allOrders.push(order)
    localStorage.setItem("allOrders", JSON.stringify(allOrders))
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        orders,
        isLoading,
        login,
        signup,
        logout,
        updateProfile,
        addOrder,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
