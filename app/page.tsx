"use client"

import { HeroSection } from "@/components/hero-section"
import { BestSellers } from "@/components/best-sellers"
import { CategoriesPreview } from "@/components/categories-preview"
import { Testimonials } from "@/components/testimonials"
import { AboutSection } from "@/components/about-section"
import { Footer } from "@/components/footer"
import { NavigationBar } from "@/components/navigation-bar"
import { useTheme } from "next-themes"

export default function Home() {
  const { theme } = useTheme()

  return (
    <div className={theme === "dark" ? "bg-gray-950 text-white" : ""}>
      <NavigationBar />
      <main>
        <div className="container mx-auto px-4 pb-16">
          <HeroSection />
          <BestSellers />
          <CategoriesPreview />
          <Testimonials />
          <AboutSection />
        </div>
        <Footer />
      </main>
    </div>
  )
}
