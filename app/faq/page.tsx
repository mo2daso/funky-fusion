"use client"

import { NavigationBar } from "@/components/navigation-bar"
import { Footer } from "@/components/footer"
import { useTheme } from "next-themes"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"

export default function FAQPage() {
  const { theme } = useTheme()

  const faqs = [
    {
      question: "How do I place an order?",
      answer:
        "You can place an order directly through our website. Simply browse our collections, add items to your cart, and proceed to checkout. We accept cash on delivery (COD) as our payment method.",
    },
    {
      question: "What are your shipping rates and delivery times?",
      answer:
        "We offer free shipping on all orders within Pakistan. Delivery typically takes 3-5 business days, depending on your location. For remote areas, delivery may take up to 7 business days.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Currently, we only ship within Pakistan. We hope to expand our shipping options to international customers in the future.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We accept returns within 7 days of delivery if the item is unused and in its original packaging. Please contact us through our Instagram page or contact form to initiate a return.",
    },
    {
      question: "Are your products handmade?",
      answer:
        "Yes, all our products are handmade with love and care. Each piece is crafted individually, which means there might be slight variations that make each item unique.",
    },
    {
      question: "How do I care for my jewelry?",
      answer:
        "To keep your jewelry looking its best, we recommend storing it in a cool, dry place away from direct sunlight. Avoid exposing your jewelry to perfumes, lotions, and water. Clean gently with a soft cloth when needed.",
    },
    {
      question: "Do you offer custom orders?",
      answer:
        "Yes, we do accept custom orders for special occasions. Please contact us through our Instagram page or contact form with your requirements, and we'll get back to you with details.",
    },
    {
      question: "What if my order arrives damaged?",
      answer:
        "In the rare event that your order arrives damaged, please contact us within 48 hours of receiving your package. Include photos of the damaged item, and we'll arrange a replacement or refund.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order is shipped, we'll provide you with a tracking number via email or WhatsApp. You can use this number to track your package's delivery status.",
    },
    {
      question: "Do you offer gift wrapping?",
      answer:
        "Yes, we offer complimentary gift wrapping for all orders. If you'd like your purchase to be gift-wrapped, please leave a note at checkout.",
    },
  ]

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-950 text-white" : ""}`}>
      <NavigationBar />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Find answers to common questions about our products and services
            </p>
          </div>

          <Accordion type="single" collapsible className="mb-12">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b dark:border-gray-700">
                <AccordionTrigger className="text-left font-medium py-4 dark:text-white">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 dark:text-gray-300 pb-4">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center">
            <p className="mb-4 text-gray-700 dark:text-gray-300">Still have questions? We're here to help!</p>
            <Link href="/contact">
              <Button className="bg-secondary hover:bg-secondary/90 text-white">Contact Us</Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

// Import Button component for TypeScript
import { Button } from "@/components/ui/button"
