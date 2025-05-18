"use client"

import { useEffect, useState } from "react"
import { NavigationBar } from "@/components/navigation-bar"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { getProductsByCategory, getCategoryDisplayName, type Product } from "@/lib/products"
import { ComingSoon } from "@/components/coming-soon"
import { useTheme } from "next-themes"

export default function CategoryPage({ params }: { params: { category: string } }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const categoryName = getCategoryDisplayName(params.category)
  const { theme } = useTheme()

  useEffect(() => {
    // Fetch products for this category
    const categoryProducts = getProductsByCategory(params.category)
    setProducts(categoryProducts)
    setLoading(false)
  }, [params.category])

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-950 text-white" : ""}`}>
      <NavigationBar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-playfair font-bold mb-4 text-center">{categoryName}</h1>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
            Discover our collection of beautiful {categoryName.toLowerCase()}
          </p>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <ComingSoon category={categoryName} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
