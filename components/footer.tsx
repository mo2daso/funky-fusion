"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import Image from "next/image"
import { Instagram, Facebook } from "lucide-react"

export function Footer() {
  const { theme } = useTheme()

  return (
    <footer className={`${theme === "dark" ? "bg-gray-900 text-gray-300" : "bg-white"} border-t dark:border-gray-800`}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="mb-4">
              <Image
                src="/images/logo-transparent.png"
                alt="Funky Fusion"
                width={240}
                height={80}
                className="h-20 w-auto"
              />
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Trendy and affordable accessories for girls who love to stand out.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-secondary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-secondary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-secondary">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 dark:text-gray-400 hover:text-secondary">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/category/necklaces" className="text-gray-600 dark:text-gray-400 hover:text-secondary">
                  Necklaces
                </Link>
              </li>
              <li>
                <Link href="/category/earrings" className="text-gray-600 dark:text-gray-400 hover:text-secondary">
                  Earrings
                </Link>
              </li>
              <li>
                <Link href="/category/bracelets" className="text-gray-600 dark:text-gray-400 hover:text-secondary">
                  Bracelets
                </Link>
              </li>
              <li>
                <Link href="/category/rings" className="text-gray-600 dark:text-gray-400 hover:text-secondary">
                  Rings
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Connect With Us</h4>
            <div className="flex space-x-4 mb-4">
              <a
                href="https://www.instagram.com/funky_fusion_s"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-secondary"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-secondary" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t dark:border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} Funky Fusion. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
