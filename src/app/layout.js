import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import CartSidebar from "@/components/CartSidebar"; // Import CartSidebar
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Golden Tier Peptide | Premium Research Peptides",
  description: "High-purity peptides for laboratory research. BPC-157, TB-500, CJC-1295, and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProviderWrapper>
          <LanguageProvider>
            <CartProvider>
              <Header />
              <CartSidebar /> {/* Added CartSidebar here */}
              <main className="min-h-screen bg-background text-foreground">
                {children}
              </main>
            </CartProvider>
          </LanguageProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
