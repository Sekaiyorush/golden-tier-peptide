import Hero from '@/components/Hero';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />

      {/* Featured Products Section */}
      <section className="py-12 md:py-24 lg:py-32 bg-surface-alt">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-surface px-3 py-1 text-sm shadow-sm text-primary font-medium">
                Best Sellers
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary-dark">
                Research Essentials
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Our most requested compounds for advanced laboratory study. Purity guaranteed.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            {[
              { name: "BPC-157", desc: "Pentadecapeptide", price: "$49.99" },
              { name: "TB-500", desc: "Thymosin Beta-4", price: "$54.99" },
              { name: "CJC-1295", desc: "GHRH Analogue", price: "$44.99" }
            ].map((product, i) => (
              <div key={i} className="group relative overflow-hidden rounded-xl bg-background border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                <div className="aspect-square bg-surface-alt/50 flex items-center justify-center p-6 group-hover:bg-surface-alt/80 transition-colors">
                  {/* Placeholder for Product Image */}
                  <svg className="h-24 w-24 text-gray-300 group-hover:text-primary transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  </svg>
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="font-bold text-xl text-foreground">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.desc}</p>
                  <div className="flex items-center justify-between pt-4">
                    <span className="font-bold text-lg text-primary">{product.price}</span>
                    <button className="h-9 items-center justify-center rounded-md bg-white border border-input px-4 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-primary">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <Link
              className="inline-flex h-10 items-center justify-center rounded-md bg-transparent border border-primary text-primary px-8 text-sm font-medium shadow-sm transition-colors hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              href="/products"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Trust/Features Section */}
      <section className="py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-xl bg-surface-alt/30">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              </div>
              <h3 className="font-bold text-lg">99% Purity Guaranteed</h3>
              <p className="text-sm text-gray-500">Every batch is third-party tested (HPLC/MS) to ensure highest research standards.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-xl bg-surface-alt/30">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              </div>
              <h3 className="font-bold text-lg">Fast & Secure Shipping</h3>
              <p className="text-sm text-gray-500">Discreet packaging with same-day shipping on orders placed before 2PM EST.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-xl bg-surface-alt/30">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" /></svg>
              </div>
              <h3 className="font-bold text-lg">Review Loyalty Program</h3>
              <p className="text-sm text-gray-500">Earn points for every purchase and review to use on future research supplies.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
