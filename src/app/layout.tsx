import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AIRecommenderButton from "@/components/shared/AIRecommenderButton";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "TorontoGiftsDelivery.com | Handcrafted Gifts from Toronto Artisans",
    template: "%s | TorontoGiftsDelivery.com"
  },
  description: "Handcrafted gifts from real Toronto artisans. Same-day delivery in Toronto & GTA. Zero-waste packaging, sustainable products, Halal options. Support local with TorontoGiftsDelivery.com",
  keywords: ["Toronto gifts", "local artisans", "same day delivery", "handmade gifts", "Toronto gift delivery", "zero waste", "sustainable gifts", "Halal gifts", "Canadian gifts", "artisan marketplace"],
  authors: [{ name: "TorontoGiftsDelivery.com" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "TorontoGiftsDelivery.com | Handcrafted Gifts from Toronto Artisans",
    description: "Handcrafted gifts from real Toronto artisans. Same-day delivery in Toronto & GTA. Zero-waste packaging.",
    url: "https://torontogiftsdelivery.com",
    siteName: "TorontoGiftsDelivery.com",
    type: "website",
    locale: "en_CA",
    images: [
      {
        url: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "TorontoGiftsDelivery - Handcrafted Local Gifts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TorontoGiftsDelivery.com | Handcrafted Local Gifts",
    description: "Same-day delivery of handcrafted gifts from Toronto artisans. Zero-waste, sustainable, Halal options.",
    images: ["https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=1200&h=630&fit=crop"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <AIRecommenderButton />
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
