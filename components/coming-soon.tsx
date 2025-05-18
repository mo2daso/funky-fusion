import { Button } from "@/components/ui/button"
import Link from "next/link"

interface ComingSoonProps {
  category: string
}

export function ComingSoon({ category }: ComingSoonProps) {
  return (
    <div className="py-20 px-4">
      <div className="max-w-2xl mx-auto text-center relative overflow-hidden rounded-xl p-10 backdrop-blur-sm bg-white/10 dark:bg-black/20 border border-secondary/20">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-primary/10 z-0"></div>
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-secondary to-secondary/70">
            Coming Soon
          </h2>
          <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">
            Our collection of {category.toLowerCase()} is currently being crafted with love and care. Check back soon to
            discover our newest creations!
          </p>
          <Link href="/">
            <Button className="bg-secondary hover:bg-secondary/90 text-white">Explore Other Categories</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
