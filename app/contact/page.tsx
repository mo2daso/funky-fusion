"use client"

import type React from "react"

import { NavigationBar } from "@/components/navigation-bar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Instagram } from "lucide-react"
import { useTheme } from "next-themes"
import { useState } from "react"

export default function ContactPage() {
  const { theme } = useTheme()
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would send this data to your server
    console.log("Form submitted:", formData)
    setFormSubmitted(true)
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-950 text-white" : ""}`}>
      <NavigationBar />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">Contact Us</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">We'd love to hear from you!</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-playfair font-bold mb-6">Get in Touch</h2>
              <p className="mb-6 text-gray-700 dark:text-gray-300">
                Have questions about our products or need help with an order? We're here to help! Fill out the form or
                reach out to us through our social media channels.
              </p>

              <div className="mb-8">
                <h3 className="text-xl font-medium mb-4">Follow Us</h3>
                <a
                  href="https://www.instagram.com/funky_fusion_s"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-700 dark:text-gray-300 hover:text-secondary"
                >
                  <Instagram className="w-5 h-5 mr-2" />
                  <span>@funky_fusion_s</span>
                </a>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-4">Business Hours</h3>
                <p className="text-gray-700 dark:text-gray-300">Monday - Saturday: 10:00 AM - 7:00 PM</p>
                <p className="text-gray-700 dark:text-gray-300">Sunday: Closed</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              {formSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-green-600 dark:text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Message Sent!</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Thank you for reaching out. We'll get back to you as soon as possible.
                  </p>
                  <Button
                    className="bg-secondary hover:bg-secondary/90 text-white"
                    onClick={() => setFormSubmitted(false)}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium mb-1 dark:text-gray-300">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium mb-1 dark:text-gray-300">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50"
                    />
                  </div>

                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium mb-1 dark:text-gray-300">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50"
                    ></textarea>
                  </div>

                  <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90 text-white">
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
