"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { NavigationBar } from "@/components/navigation-bar"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Check } from "lucide-react"

type OrderItem = {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

type ShippingDetails = {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
}

type Order = {
  id: string
  date: string
  subtotal: number
  deliveryCost: number
  total: number
  status: "processing" | "shipped" | "delivered"
  items: OrderItem[]
  shippingDetails: ShippingDetails
  orderNumber: string
  orderDate: string
}

export default function ConfirmationPage() {
  const router = useRouter()
  const [order, setOrder] = useState<Order | null>(null)

  useEffect(() => {
    const savedOrder = localStorage.getItem("lastOrder")
    if (savedOrder) {
      try {
        setOrder(JSON.parse(savedOrder))
      } catch (error) {
        console.error("Failed to parse order from localStorage", error)
        router.push("/")
      }
    } else {
      router.push("/")
    }
  }, [router])

  if (!order) {
    return (
      <div className="min-h-screen dark:bg-gray-950 dark:text-white">
        <NavigationBar />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-playfair font-bold mb-6">Loading...</h1>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen dark:bg-gray-950 dark:text-white">
      <div className="print:hidden">
        <NavigationBar />
      </div>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm print:shadow-none">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full mb-4">
              <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-3xl font-playfair font-bold">Order Confirmed!</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Thank you for your order. We've received your order and will process it shortly.
            </p>
          </div>

          <div className="border-t border-b dark:border-gray-700 py-4 my-6">
            <div className="flex flex-wrap justify-between text-sm">
              <div className="mb-4 md:mb-0">
                <p className="text-gray-500 dark:text-gray-400">Order Number</p>
                <p className="font-medium">{order.orderNumber}</p>
              </div>
              <div className="mb-4 md:mb-0">
                <p className="text-gray-500 dark:text-gray-400">Order Date</p>
                <p className="font-medium">{new Date(order.orderDate).toLocaleDateString()}</p>
              </div>
              <div className="mb-4 md:mb-0">
                <p className="text-gray-500 dark:text-gray-400">Payment Method</p>
                <p className="font-medium">Cash on Delivery</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">Total Amount</p>
                <p className="font-medium">Rs. {order.total}</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-medium mb-4">Order Details</h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-start gap-4">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium">Rs. {item.price * item.quantity}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-medium mb-4">Shipping Address</h2>
              <div className="text-sm">
                <p className="font-medium">{order.shippingDetails.fullName}</p>
                <p>{order.shippingDetails.address}</p>
                <p>
                  {order.shippingDetails.city}, {order.shippingDetails.state} {order.shippingDetails.zipCode}
                </p>
                <p className="mt-2">
                  <span className="font-medium">Email:</span> {order.shippingDetails.email}
                </p>
                <p>
                  <span className="font-medium">Phone:</span> {order.shippingDetails.phone}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-medium mb-4">Order Summary</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <p className="text-gray-600 dark:text-gray-400">Subtotal</p>
                  <p>Rs. {order.subtotal}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600 dark:text-gray-400">Delivery</p>
                  <p>Rs. {order.deliveryCost}</p>
                </div>
                <div className="flex justify-between font-medium text-base pt-2 border-t dark:border-gray-700">
                  <p>Total</p>
                  <p>Rs. {order.total}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center print:hidden">
            <Button className="bg-secondary hover:bg-secondary/90" onClick={() => router.push("/")}>
              Continue Shopping
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
