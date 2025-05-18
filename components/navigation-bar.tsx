"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, ShoppingBag, X, Sun, Moon, User } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import { CartDrawer } from "./cart-drawer"
import { SearchBar } from "./search-bar"
import { useTheme } from "next-themes"
import Image from "next/image"

export function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const { cartItems } = useCart()
  const { user } = useAuth()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // After mounting, we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded)
  }

  const closeSearch = () => {
    setIsSearchExpanded(false)
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-gray-100 dark:bg-gray-900 backdrop-blur-sm border-b border-secondary/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo-transparent.png"
                alt="Funky Fusion"
                width={240}
                height={80}
                className="h-20 w-auto my-2"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-sm font-medium hover:text-secondary dark:text-gray-200">
                Home
              </Link>
              <Link href="/category/necklaces" className="text-sm font-medium hover:text-secondary dark:text-gray-200">
                Necklaces
              </Link>
              <Link href="/category/earrings" className="text-sm font-medium hover:text-secondary dark:text-gray-200">
                Earrings
              </Link>
              <Link href="/category/bracelets" className="text-sm font-medium hover:text-secondary dark:text-gray-200">
                Bracelets
              </Link>
              <Link href="/category/rings" className="text-sm font-medium hover:text-secondary dark:text-gray-200">
                Rings
              </Link>
            </nav>

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <SearchBar isExpanded={isSearchExpanded} onToggle={toggleSearch} onClose={closeSearch} />
              </div>
              <button
                className="p-2 rounded-full hover:bg-secondary/20 relative"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                {mounted &&
                  (theme === "dark" ? <Sun className="h-5 w-5 text-gray-200" /> : <Moon className="h-5 w-5" />)}
              </button>
              <Link href={user ? "/profile" : "/login"} className="p-2 rounded-full hover:bg-secondary/20">
                <User className="h-5 w-5 dark:text-gray-200" />
                <span className="sr-only">{user ? "Profile" : "Login"}</span>
              </Link>
              <button className="p-2 rounded-full hover:bg-secondary/20 relative" onClick={() => setIsCartOpen(true)}>
                <ShoppingBag className="h-5 w-5 dark:text-gray-200" />
                <span className="sr-only">Cart</span>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-secondary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
              <button
                className="md:hidden p-2 rounded-full hover:bg-secondary/20"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5 dark:text-gray-200" />
                ) : (
                  <Menu className="h-5 w-5 dark:text-gray-200" />
                )}
                <span className="sr-only">Menu</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 border-t dark:border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary/10 dark:text-gray-200"
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link
                href="/category/necklaces"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary/10 dark:text-gray-200"
                onClick={closeMenu}
              >
                Necklaces
              </Link>
              <Link
                href="/category/earrings"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary/10 dark:text-gray-200"
                onClick={closeMenu}
              >
                Earrings
              </Link>
              <Link
                href="/category/bracelets"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary/10 dark:text-gray-200"
                onClick={closeMenu}
              >
                Bracelets
              </Link>
              <Link
                href="/category/rings"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary/10 dark:text-gray-200"
                onClick={closeMenu}
              >
                Rings
              </Link>
              <Link
                href={user ? "/profile" : "/login"}
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary/10 dark:text-gray-200"
                onClick={closeMenu}
              >
                {user ? "My Account" : "Login / Sign Up"}
              </Link>
            </div>
          </div>
        )}
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
