import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { CartProvider } from '@/context/CartContext';
import CartLink from '@/components/CartLink';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Foodie - Order Delicious Food Online',
  description: 'Order your favorite meals from the best restaurants in town and get them delivered to your doorstep.',
  applicationName: 'Foodie',
  keywords: ['food', 'delivery', 'restaurant', 'online order', 'takeaway'],
  authors: [{ name: 'Foodie Team' }],
  creator: 'Foodie',
  publisher: 'Foodie',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Foodie - Order Food Online',
    description: 'Order your favorite food online with fast delivery',
    url: 'https://foodie.example.com',
    siteName: 'Foodie',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Foodie - Order Food Online',
    description: 'Order your favorite food online with fast delivery',
    creator: '@foodie',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} antialiased`}>
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            {/* Skip to main content link for keyboard users */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:rounded-md"
            >
              Skip to main content
            </a>

            <header className="bg-white shadow-sm sticky top-0 z-10">
              <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:rounded-md p-1 -m-1">
                  <h1 className="text-2xl font-bold text-primary">Foodie</h1>
                </Link>
                <nav aria-label="Main navigation">
                  <ul className="flex items-center space-x-4">
                    <li>
                      <Link 
                        href="/menu" 
                        className="text-gray-700 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:rounded-md p-2 -m-2"
                      >
                        Menu
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/cart" 
                        className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white"
                        aria-label="View cart"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-gray-700"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                          />
                        </svg>
                        <span 
                          className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                          aria-live="polite"
                          aria-atomic="true"
                        >
                          0
                        </span>
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </header>

            <main id="main-content" className="flex-grow focus:outline-none" tabIndex={-1}>
              {children}
            </main>

            <footer className="bg-gray-50 py-6">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <h2 className="text-lg font-semibold mb-4">About Foodie</h2>
                    <p className="text-gray-600">Delicious food delivered to your doorstep.</p>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
                    <ul className="space-y-2">
                      <li><Link href="/about" className="text-gray-600 hover:text-primary">About Us</Link></li>
                      <li><Link href="/contact" className="text-gray-600 hover:text-primary">Contact</Link></li>
                      <li><Link href="/terms" className="text-gray-600 hover:text-primary">Terms & Conditions</Link></li>
                      <li><Link href="/privacy" className="text-gray-600 hover:text-primary">Privacy Policy</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
                    <address className="not-italic text-gray-600">
                      <p>123 Food Street</p>
                      <p>New York, NY 10001</p>
                      <p>Phone: (555) 123-4567</p>
                      <p>Email: info@foodie.com</p>
                    </address>
                  </div>
                </div>
                <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-500 text-sm">
                  <p> 2024 Foodie. All rights reserved.</p>
                </div>
              </div>
            </footer>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
