"use client"

import { NavigationBar } from "@/components/navigation-bar"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { useTheme } from "next-themes"

export default function AboutPage() {
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-950 text-white" : ""}`}>
      <NavigationBar />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">About Funky Fusion</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">Handmade with love, designed with passion</p>
          </div>

          <div className="flex justify-center mb-12">
            <div className="w-40 h-40 relative">
              <Image src="/images/logo.jpeg" alt="Funky Fusion Logo" fill className="object-contain" />
            </div>
          </div>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h2 className="text-2xl font-playfair font-bold mb-4">Our Story</h2>
            <p className="mb-6">
              Funky Fusion was born out of a passion for creating beautiful, handcrafted accessories that help people
              express their unique style. What started as a small hobby in 2020 has grown into a beloved brand known for
              its quality craftsmanship and attention to detail.
            </p>

            <p className="mb-6">
              Each piece in our collection is carefully designed and handmade in Pakistan, ensuring that every customer
              receives a unique item that stands out from mass-produced accessories. We believe that jewelry and
              accessories should be as individual as the people who wear them.
            </p>

            <h2 className="text-2xl font-playfair font-bold mb-4 mt-8">Our Mission</h2>
            <p className="mb-6">
              At Funky Fusion, our mission is to create affordable, high-quality accessories that help our customers
              express their personal style. We believe that everyone deserves to feel special and confident in what they
              wear, without breaking the bank.
            </p>

            <p className="mb-6">We are committed to:</p>

            <ul className="list-disc pl-6 mb-6">
              <li>Creating unique, handcrafted pieces that stand out</li>
              <li>Using quality materials that ensure durability</li>
              <li>Providing exceptional customer service</li>
              <li>Keeping our prices affordable without compromising on quality</li>
              <li>Supporting local artisans and suppliers</li>
            </ul>

            <h2 className="text-2xl font-playfair font-bold mb-4 mt-8">Our Materials</h2>
            <p className="mb-6">
              We carefully select all our materials to ensure they meet our high standards for quality and beauty. From
              sparkling rhinestones to delicate chains, each component is chosen to create accessories that are both
              beautiful and durable.
            </p>

            <p className="mb-10">
              Thank you for supporting our small business. We hope our creations bring as much joy to you as they do to
              us when making them!
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
