// Product data organized by categories
export type Product = {
  id: number
  name: string
  price: number
  image: string
  category: string
  description: string
  stock: number
}

// All products data
export const allProducts: Product[] = [
  // Necklaces
  {
    id: 101,
    name: "Ribbon Rhinestone Necklace",
    price: 1200,
    image: "/images/products/ribbon-necklace.jpeg",
    category: "necklaces",
    description: "A delicate ribbon-shaped rhinestone necklace with a gold-plated chain, perfect for formal occasions.",
    stock: 15,
  },
  {
    id: 102,
    name: "Bow Rhinestone Necklace",
    price: 1100,
    image: "/images/products/bow-necklace.jpeg",
    category: "necklaces",
    description: "A stunning bow pendant adorned with sparkling rhinestones on a gold-plated chain.",
    stock: 12,
  },
  {
    id: 105,
    name: "Mountain Necklace",
    price: 1150,
    image: "/images/products/mountain-necklace.jpeg",
    category: "necklaces",
    description: "A minimalist mountain range pendant on a dainty chain.",
    stock: 7,
  },
  {
    id: 106,
    name: "Yellow Green Butterfly Necklace",
    price: 950,
    image: "/images/products/yellow-green-butterfly.jpeg",
    category: "necklaces",
    description: "A charming yellow-green butterfly pendant on a delicate chain.",
    stock: 9,
  },
  {
    id: 109,
    name: "Pink Cat Necklace",
    price: 1050,
    image: "/images/products/pink-cat-necklace.jpeg",
    category: "necklaces",
    description: "An adorable pink cat pendant that's perfect for cat lovers.",
    stock: 6,
  },
  {
    id: 111,
    name: "Blue Butterfly Necklace",
    price: 950,
    image: "/images/products/blue-butterfly.jpeg",
    category: "necklaces",
    description: "A serene blue butterfly pendant that adds elegance to any outfit.",
    stock: 10,
  },
  {
    id: 112,
    name: "Ship Anchor Necklace",
    price: 1050,
    image: "/images/products/anchor-necklace.jpeg",
    category: "necklaces",
    description: "A nautical-inspired gold anchor pendant necklace, perfect for a maritime look.",
    stock: 8,
  },

  // Earrings
  {
    id: 201,
    name: "Swan Studs",
    price: 850,
    image: "/images/products/swan-studs.jpeg",
    category: "earrings",
    description: "Elegant yellow swan stud earrings with gold detailing.",
    stock: 20,
  },
  {
    id: 202,
    name: "Black Swan Studs",
    price: 850,
    image: "/images/products/black-swan-studs.jpeg",
    category: "earrings",
    description: "Sophisticated black swan stud earrings with gold accents.",
    stock: 18,
  },
  {
    id: 203,
    name: "Mickey Mouse Studs",
    price: 900,
    image: "/images/products/mickey-mouse-studs.jpeg",
    category: "earrings",
    description: "Playful Mickey Mouse inspired stud earrings with pearl centers and rhinestone ears.",
    stock: 15,
  },
  {
    id: 204,
    name: "Daisy Studs",
    price: 750,
    image: "/images/products/daisy-studs.jpeg",
    category: "earrings",
    description: "Charming daisy flower stud earrings with white petals and yellow centers.",
    stock: 22,
  },
  {
    id: 205,
    name: "Red Petal Studs",
    price: 800,
    image: "/images/products/red-petal-studs.jpeg",
    category: "earrings",
    description: "Beautiful red flower petal stud earrings with gold centers.",
    stock: 16,
  },
  {
    id: 206,
    name: "Pink Daisy Earrings",
    price: 950,
    image: "/images/products/pink-daisy-earrings.jpeg",
    category: "earrings",
    description: "Lovely pink and white daisy dangle earrings with silver hooks.",
    stock: 12,
  },
  {
    id: 207,
    name: "Sunflower Earrings",
    price: 1000,
    image: "/images/products/sunflower-earrings.jpeg",
    category: "earrings",
    description: "Cheerful yellow sunflower dangle earrings with gold hooks.",
    stock: 14,
  },

  // Bracelets
  {
    id: 301,
    name: "Infinity Rhinestones Bracelet",
    price: 1400,
    image: "/images/products/infinity-bracelet.jpeg",
    category: "bracelets",
    description: "A stunning infinity symbol bracelet adorned with sparkling rhinestones.",
    stock: 10,
  },
  {
    id: 302,
    name: "Clover Rhinestone Bracelet",
    price: 1350,
    image: "/images/products/clover-rhinestone-bracelet.jpeg",
    category: "bracelets",
    description: "A lucky four-leaf clover bracelet embellished with rhinestones.",
    stock: 8,
  },
]

// Helper function to get products by category
export function getProductsByCategory(category: string): Product[] {
  return allProducts.filter((product) => product.category.toLowerCase() === category.toLowerCase())
}

// Helper function to get a product by ID
export function getProductById(id: number): Product | undefined {
  return allProducts.find((product) => product.id === id)
}

// Helper function to get category display name
export function getCategoryDisplayName(category: string): string {
  const displayNames: Record<string, string> = {
    necklaces: "Necklaces",
    earrings: "Earrings",
    bracelets: "Bracelets",
    rings: "Rings",
  }

  return displayNames[category.toLowerCase()] || category
}

// Helper function to search products
export function searchProducts(query: string): Product[] {
  const searchTerm = query.toLowerCase().trim()

  if (!searchTerm) return []

  return allProducts.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    )
  })
}
