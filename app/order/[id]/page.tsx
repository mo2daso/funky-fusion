"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { NavigationBar } from "@/components/navigation-bar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { orders, isLoading } = useAuth()
  const [order, setOrder] = useState<any>(null)

  useEffect(() => {
    if (!isLoading) {
      const foundOrder = orders.find((o) => o.id === params.id)

      if (foundOrder) {
        setOrder(foundOrder)
      } else {
        router.push("/profile?tab=orders")
      }
    }
  }, [isLoading, orders, params.id, router])

  if (isLoading || !order) {
    return (
      <div className="min-h-screen dark:bg-gray-950 dark:text-white">
        <NavigationBar />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary mx-auto"></div>
            <p className="mt-4">Loading order details...</p>
          </div>
        </main>
        <Footer />
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
          <div className="mb-8 print:hidden">
            <Link href="/profile?tab=orders">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Orders
              </Button>
            </Link>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-playfair font-bold">Order Details</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Order #{order.orderNumber}</p>
          </div>

          <div className="border-t border-b dark:border-gray-700 py-4 my-6">
            <div className="flex flex-wrap justify-between text-sm">
              <div className="mb-4 md:mb-0">
                <p className="text-gray-500 dark:text-gray-400">Order Number</p>
                <p className="font-medium">{order.orderNumber}</p>
              </div>
              <div className="mb-4 md:mb-0">
                <p className="text-gray-500 dark:text-gray-400">Order Date</p>
                <p className="font-medium">{new Date(order.date).toLocaleDateString()}</p>
              </div>
              <div className="mb-4 md:mb-0">
                <p className="text-gray-500 dark:text-gray-400">Status</p>
                <p className="font-medium capitalize">{order.status}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">Total Amount</p>
                <p className="font-medium">Rs. {order.total}</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-medium mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.items.map((item: any) => (
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
                  <p>Rs. {order.subtotal || order.total}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600 dark:text-gray-400">Delivery</p>
                  <p>Rs. {order.deliveryCost || 150}</p>
                </div>
                <div className="flex justify-between font-medium text-base pt-2 border-t dark:border-gray-700">
                  <p>Total</p>
                  <p>Rs. {order.total}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
