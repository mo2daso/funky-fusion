"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type CartItem = {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  stock: number
}

type CartContextType = {
  cartItems: CartItem[]
  addToCart: (product: CartItem) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  getCartTotal: () => number
  getSubtotal: () => number
  getDeliveryCost: () => number
}

const DELIVERY_COST = 150 // Rs. 150 delivery cost

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Failed to parse cart from localStorage", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)

      if (existingItem) {
        // Don't exceed available stock
        const newQuantity = Math.min(existingItem.quantity + 1, existingItem.stock)

        return prevItems.map((item) => (item.id === product.id ? { ...item, quantity: newQuantity } : item))
      } else {
        return [...prevItems, { ...product, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId: number, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === productId ? { ...item, quantity: Math.min(quantity, item.stock) } : item)),
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getDeliveryCost = () => {
    return cartItems.length > 0 ? DELIVERY_COST : 0
  }

  const getCartTotal = () => {
    return getSubtotal() + getDeliveryCost()
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getSubtotal,
        getDeliveryCost,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
