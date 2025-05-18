"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, X } from "lucide-react"
import { useTheme } from "next-themes"

interface SearchBarProps {
  isExpanded: boolean
  onToggle: () => void
  onClose: () => void
}

export function SearchBar({ isExpanded, onToggle, onClose }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const { theme } = useTheme()

  // Focus input when expanded
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isExpanded])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`)
      onClose()
      setSearchTerm("")
    }
  }

  if (!isExpanded) {
    return (
      <button className="p-2 rounded-full hover:bg-secondary/20" onClick={onToggle} aria-label="Search">
        <Search className="h-5 w-5 dark:text-gray-200" />
      </button>
    )
  }

  return (
    <div
      className={`absolute inset-x-0 top-0 z-10 ${theme === "dark" ? "bg-gray-800" : "bg-white"} md:bg-transparent md:backdrop-blur-sm p-4 md:relative md:inset-auto md:p-0 md:w-64 lg:w-80`}
    >
      <form onSubmit={handleSearch} className="flex items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-10 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-secondary/50 ${
              theme === "dark" ? "bg-gray-700 text-white border-gray-600" : ""
            }`}
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2"
              aria-label="Clear search"
            >
              <X className="h-4 w-4 text-gray-400" />
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="ml-2 p-2 rounded-full hover:bg-secondary/20 md:hidden"
          aria-label="Close search"
        >
          <X className="h-5 w-5 dark:text-gray-200" />
        </button>
      </form>
    </div>
  )
}
