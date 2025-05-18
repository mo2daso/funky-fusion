import { ProductCard } from "@/components/product-card"
import { allProducts } from "@/lib/products"

// Get specific products for best sellers
const bestSellerIds = [101, 109, 206, 301] // IDs for Ribbon Rhinestone, Pink Cat, Pink Daisy, Infinity Bracelet
const bestSellers = allProducts.filter((product) => bestSellerIds.includes(product.id))

export function BestSellers() {
  return (
    <section className="py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-playfair font-bold">Best Sellers</h2>
        <p className="mt-2 text-gray-600">Our most popular pieces loved by customers</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {bestSellers.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
