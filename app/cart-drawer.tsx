"use client"

import { X, Minus, Plus, ShoppingBag } from "lucide-react"
import Image from "next/image"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart()
  const router = useRouter()
  const { theme } = useTheme()

  const handleCheckout = () => {
    onClose()
    router.push("/checkout")
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="relative w-screen max-w-md">
          <div
            className={`h-full flex flex-col ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white"} shadow-xl overflow-y-auto`}
          >
            <div className="flex items-center justify-between px-4 py-6 border-b dark:border-gray-700">
              <h2 className="text-lg font-medium">Shopping Cart</h2>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-secondary/10">
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center flex-1 p-8">
                <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
                <p className="text-gray-500 dark:text-gray-400 text-center">Your cart is empty</p>
                <Button className="mt-4 bg-secondary hover:bg-secondary/90" onClick={onClose}>
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <>
                <div className="flex-1 px-4 py-6 sm:px-6">
                  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {cartItems.map((item) => (
                      <li key={item.id} className="py-6 flex">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={96}
                            height={96}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium">
                              <h3>{item.name}</h3>
                              <p className="ml-4">Rs. {item.price * item.quantity}</p>
                            </div>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="flex items-center border rounded-md dark:border-gray-700">
                              <button
                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                className="p-2 hover:bg-secondary/10"
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="px-2">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-2 hover:bg-secondary/10"
                                disabled={item.quantity >= item.stock}
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              className="font-medium text-secondary hover:text-secondary/80"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium mb-4">
                    <p>Subtotal</p>
                    <p>Rs. {getCartTotal()}</p>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <Button className="w-full bg-secondary hover:bg-secondary/90" onClick={handleCheckout}>
                    Checkout
                  </Button>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="text-sm text-secondary hover:text-secondary/80 flex items-center justify-center w-full"
                      onClick={onClose}
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
