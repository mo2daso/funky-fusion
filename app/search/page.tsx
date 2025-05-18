"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { NavigationBar } from "@/components/navigation-bar"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { searchProducts, type Product } from "@/lib/products"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (query) {
      const results = searchProducts(query)
      setProducts(results)
    } else {
      setProducts([])
    }
    setLoading(false)
  }, [query])

  return (
    <div className="min-h-screen">
      <NavigationBar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-playfair font-bold mb-4 text-center">Search Results</h1>
          {query && (
            <p className="text-center text-gray-600 mb-8">
              {products.length} {products.length === 1 ? "result" : "results"} for "{query}"
            </p>
          )}

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
            <div className="text-center py-12">
              <h2 className="text-xl font-medium mb-4">No products found</h2>
              <p className="text-gray-500 mb-8">
                We couldn't find any products matching your search. Try using different keywords or browse our
                categories.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/category/necklaces">
                  <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary/10">
                    Browse Necklaces
                  </Button>
                </Link>
                <Link href="/category/earrings">
                  <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary/10">
                    Browse Earrings
                  </Button>
                </Link>
                <Link href="/category/bracelets">
                  <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary/10">
                    Browse Bracelets
                  </Button>
                </Link>
                <Link href="/category/rings">
                  <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary/10">
                    Browse Rings
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
