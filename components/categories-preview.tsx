import Image from "next/image"
import Link from "next/link"
import { getProductsByCategory } from "@/lib/products"

const categories = [
  {
    name: "Necklaces",
    image: "/images/categories/necklaces.jpeg",
    link: "/category/necklaces",
  },
  {
    name: "Earrings",
    image: "/images/categories/earrings.jpeg",
    link: "/category/earrings",
  },
  {
    name: "Bracelets",
    image: "/images/categories/bracelets.jpeg",
    link: "/category/bracelets",
  },
  {
    name: "Rings",
    image: "/images/categories/rings.jpeg",
    link: "/category/rings",
  },
]

// Update category counts based on actual products
const categoriesWithCounts = categories.map((category) => {
  const categorySlug = category.link.split("/").pop() || ""
  const count = getProductsByCategory(categorySlug).length
  return { ...category, count }
})

export function CategoriesPreview() {
  return (
    <section className="py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-playfair font-bold">Shop by Category</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Browse our collections</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {categoriesWithCounts.map((category) => (
          <Link href={category.link} key={category.name} className="group block">
            <div className="relative overflow-hidden rounded-2xl aspect-square mb-3">
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                width={400}
                height={400}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <h3 className="text-white font-playfair font-bold text-xl md:text-2xl text-center">{category.name}</h3>
              </div>
            </div>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">{category.count} products</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
