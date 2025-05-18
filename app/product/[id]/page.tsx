"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { NavigationBar } from "@/components/navigation-bar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { getProductById, type Product } from "@/lib/products"
import { Minus, Plus, Check } from "lucide-react"
import Link from "next/link"
import { useTheme } from "next-themes"

export default function ProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { addToCart } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    const productId = Number.parseInt(params.id)
    if (isNaN(productId)) {
      router.push("/")
      return
    }

    const foundProduct = getProductById(productId)
    if (foundProduct) {
      setProduct(foundProduct)
    } else {
      router.push("/")
    }
    setLoading(false)
  }, [params.id, router])

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
        stock: product.stock,
      })

      setIsAdded(true)
      setTimeout(() => setIsAdded(false), 2000)
    }
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  if (loading) {
    return (
      <div className={`min-h-screen ${theme === "dark" ? "bg-gray-950 text-white" : ""}`}>
        <NavigationBar />
        <main className="container mx-auto px-4 py-12 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className={`min-h-screen ${theme === "dark" ? "bg-gray-950 text-white" : ""}`}>
        <NavigationBar />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-playfair font-bold mb-6">Product Not Found</h1>
            <p className="mb-8">Sorry, we couldn't find the product you're looking for.</p>
            <Button className="bg-secondary hover:bg-secondary/90" onClick={() => router.push("/")}>
              Back to Home
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-950 text-white" : ""}`}>
      <NavigationBar />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumbs */}
          <nav className="mb-8">
            <ol className="flex text-sm text-gray-500 dark:text-gray-400">
              <li>
                <Link href="/" className="hover:text-secondary">
                  Home
                </Link>
              </li>
              <li className="mx-2">/</li>
              <li>
                <Link href={`/category/${product.category}`} className="hover:text-secondary">
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </Link>
              </li>
              <li className="mx-2">/</li>
              <li className="text-gray-700 dark:text-gray-300 font-medium truncate">{product.name}</li>
            </ol>
          </nav>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image */}
            <div className="bg-secondary/5 dark:bg-gray-800 rounded-2xl overflow-hidden">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Product Details */}
            <div>
              <h1 className="text-3xl font-playfair font-bold mb-2">{product.name}</h1>
              <p className="text-2xl text-secondary font-semibold mb-4">Rs. {product.price}</p>

              <div className="border-t border-b dark:border-gray-700 py-4 my-6">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{product.description}</p>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Availability:</p>
                {product.stock > 0 ? (
                  <p className="text-green-600 dark:text-green-400 font-medium">In Stock ({product.stock} available)</p>
                ) : (
                  <p className="text-red-500 font-medium">Out of Stock</p>
                )}
              </div>

              {product.stock > 0 && (
                <>
                  <div className="mb-6">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Quantity:</p>
                    <div className="flex items-center border rounded-md dark:border-gray-700 w-32">
                      <button
                        onClick={decreaseQuantity}
                        className="p-2 hover:bg-secondary/10 w-10 h-10 flex items-center justify-center"
                        disabled={quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="flex-1 text-center">{quantity}</span>
                      <button
                        onClick={increaseQuantity}
                        className="p-2 hover:bg-secondary/10 w-10 h-10 flex items-center justify-center"
                        disabled={quantity >= product.stock}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <Button
                    className={`w-full py-6 text-base ${
                      isAdded
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : "bg-secondary hover:bg-secondary/90 text-white"
                    }`}
                    onClick={handleAddToCart}
                  >
                    {isAdded ? (
                      <span className="flex items-center justify-center">
                        <Check className="h-5 w-5 mr-2" /> Added to Cart
                      </span>
                    ) : (
                      "Add to Cart"
                    )}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
