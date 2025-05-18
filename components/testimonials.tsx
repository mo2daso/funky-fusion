import Image from "next/image"

const testimonials = [
  {
    id: 1,
    name: "Yashal K.",
    avatar: "/placeholder.svg?height=100&width=100&text=👩",
    text: "I absolutely love my Ribbon Rhinestone Necklace! The quality is amazing for the price, and I get compliments every time I wear it to weddings.",
    rating: 5,
  },
  {
    id: 2,
    name: "Abeeha S.",
    avatar: "/placeholder.svg?height=100&width=100&text=👩",
    text: "The Butterfly Charm earrings are so cute and dainty. Perfect for everyday wear and the customer service was excellent!",
    rating: 5,
  },
  {
    id: 3,
    name: "Suha M.",
    avatar: "/placeholder.svg?height=100&width=100&text=👩",
    text: "Fast shipping and beautiful packaging. The Mickey Mouse Studs look even better in person than in the photos!",
    rating: 4,
  },
]

export function Testimonials() {
  return (
    <section className="py-12 bg-secondary/5 dark:bg-secondary/10 rounded-3xl my-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-playfair font-bold">What Our Customers Say</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Real reviews from happy customers</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={100}
                  height={100}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h3 className="font-medium dark:text-white">{testimonial.name}</h3>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill={i < testimonial.rating ? "#f7a0c0" : "none"}
                      stroke={i < testimonial.rating ? "#f7a0c0" : "currentColor"}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-star"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 italic">&ldquo;{testimonial.text}&rdquo;</p>
          </div>
        ))}
      </div>
    </section>
  )
}
