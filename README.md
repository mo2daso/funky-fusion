### Funky Fusion Frontend

A modern, responsive e-commerce frontend for Funky Fusion, a Karachi-based small business specializing in accessories for girls. Built with Next.js, React, and Tailwind CSS.

## 🌟 Features

- **Responsive Design**: Fully responsive UI that works seamlessly across mobile, tablet, and desktop devices
- **Dark/Light Mode**: Toggle between light and dark themes for comfortable browsing
- **Product Catalog**: Browse products by categories (necklaces, earrings, bracelets, rings)
- **Product Search**: Search functionality to quickly find products
- **Shopping Cart**: Add, update, and remove items with persistent cart storage
- **User Authentication**: Register, login, and manage your account
- **User Profile**: Update personal information and view order history
- **Checkout Flow**: Streamlined checkout process with form validation
- **Order Management**: View and track your orders


## 🛠️ Technologies Used

- **Next.js 14**: React framework with App Router for efficient page routing and server components
- **React 18**: For building the user interface
- **Tailwind CSS**: For styling and responsive design
- **shadcn/ui**: High-quality UI components built with Radix UI and Tailwind
- **Lucide React**: Beautiful, consistent icons
- **next-themes**: For dark/light mode implementation
- **React Context API**: For state management (cart, authentication)


## 📋 Prerequisites

- Node.js 18.x or later
- npm or yarn


## 🚀 Getting Started

1. **Clone the repository**


```shellscript
git clone https://github.com/yourusername/funky-fusion-frontend.git
cd funky-fusion-frontend
```

2. **Install dependencies**


```shellscript
npm install
# or
yarn install
```

3. **Run the development server**


```shellscript
npm run dev
# or
yarn dev
```

4. **Open your browser**


Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```plaintext
funky-fusion-frontend/
├── app/                    # Next.js App Router pages
│   ├── about/              # About page
│   ├── category/           # Product category pages
│   ├── checkout/           # Checkout flow
│   ├── contact/            # Contact page
│   ├── faq/                # FAQ page
│   ├── login/              # Login page
│   ├── order/              # Order details
│   ├── product/            # Product details
│   ├── profile/            # User profile
│   ├── search/             # Search results
│   ├── signup/             # Signup page
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   └── globals.css         # Global styles
├── components/             # Reusable React components
│   ├── ui/                 # shadcn/ui components
│   ├── about-section.tsx
│   ├── best-sellers.tsx
│   ├── cart-drawer.tsx
│   ├── categories-preview.tsx
│   ├── coming-soon.tsx
│   ├── footer.tsx
│   ├── hero-section.tsx
│   ├── navigation-bar.tsx
│   ├── product-card.tsx
│   ├── search-bar.tsx
│   ├── testimonials.tsx
│   └── theme-provider.tsx
├── lib/                    # Utility functions and context providers
│   ├── auth-context.tsx    # Authentication context
│   ├── cart-context.tsx    # Shopping cart context
│   ├── products.ts         # Product data and functions
│   ├── utils.ts            # Utility functions
│   └── validation.ts       # Form validation functions
├── public/                 # Static assets
│   ├── images/             # Product and site images
│   └── favicon.ico
├── next.config.js          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── package.json
└── README.md
```

## 🖥️ Key Components

### Navigation and Layout

- **NavigationBar**: Main navigation with search, cart, and user menu
- **Footer**: Site footer with links and social media
- **ThemeProvider**: Manages light/dark mode


### Product Display

- **ProductCard**: Displays individual product with image, name, and price
- **CategoriesPreview**: Shows product categories on homepage
- **BestSellers**: Displays featured products


### Shopping Experience

- **CartDrawer**: Slide-in cart view with product list and checkout button
- **SearchBar**: Search functionality for products


### User Interface

- **HeroSection**: Main homepage banner
- **Testimonials**: Customer reviews section
- **AboutSection**: Company information


## 🔒 Authentication and User Management

The frontend implements a complete authentication flow:

- User registration with validation
- Login with secure credential handling
- Profile management
- Order history viewing


## 🛒 Shopping Cart

The cart system provides:

- Add to cart functionality
- Quantity adjustment
- Item removal
- Persistent storage between sessions
- Total calculation with delivery costs


## 📱 Responsive Design

The UI is fully responsive with:

- Mobile-first approach
- Tailored layouts for different screen sizes
- Touch-friendly interface elements
- Optimized images for different devices


## 🎨 Customization

The design uses a consistent color scheme:

- Primary: Off-white (`#f8f7f3`)
- Secondary: Pink (`#f7a0c0`)
- Custom fonts: Playfair Display and Poppins


## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

For any questions or feedback, please reach out to the Funky Fusion team.

---

Made with ❤️ for Funky Fusion
