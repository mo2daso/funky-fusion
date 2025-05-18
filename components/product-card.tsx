"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { useState } from "react"
import { Check } from "lucide-react"
import { useTheme } from "next-themes"

type Product = {
  id: number
  name: string
  price: number
  image: string
  category: string
  stock: number
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const [isAdded, setIsAdded] = useState(false)
  const { theme } = useTheme()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      stock: product.stock,
    })

    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 1500)
  }

  return (
    <div className="group">
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden rounded-2xl bg-secondary/5 dark:bg-gray-800 aspect-square mb-3">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={300}
            height={300}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
          <Button
            className={`absolute bottom-3 left-1/2 -translate-x-1/2 ${
              isAdded
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-white text-gray-800 hover:bg-secondary hover:text-white dark:bg-gray-800 dark:text-white dark:hover:bg-secondary"
            } opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm`}
            size="sm"
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
          >
            {isAdded ? (
              <span className="flex items-center">
                <Check className="h-4 w-4 mr-1" /> Added
              </span>
            ) : product.stock > 0 ? (
              "Add to Cart"
            ) : (
              "Out of Stock"
            )}
          </Button>
        </div>
        <h3 className="font-medium text-sm md:text-base truncate dark:text-gray-200">{product.name}</h3>
        <div className="flex justify-between items-center mt-1">
          <p className="text-secondary font-semibold dark:text-secondary">Rs. {product.price}</p>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
          </span>
        </div>
      </Link>
    </div>
  )
}
