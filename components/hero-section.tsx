"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useTheme } from "next-themes"

export function HeroSection() {
  const { theme } = useTheme()

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto text-center px-4">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-playfair font-bold leading-tight mb-6">
          Accessorize Your <span className="text-secondary">Style</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Discover trendy and affordable accessories for girls who love to stand out. From elegant rhinestone pieces to
          playful enamel charms.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/category/necklaces">
            <Button className="bg-secondary hover:bg-secondary/90 text-white px-8 py-6 text-lg">Shop Now</Button>
          </Link>
          <Link href="/category/earrings">
            <Button
              variant="outline"
              className="border-secondary text-secondary hover:bg-secondary/10 dark:text-secondary dark:border-secondary px-8 py-6 text-lg"
            >
              View Collections
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
