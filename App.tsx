
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import LoanSection from './components/LoanSection';
import AdvisorWidget from './components/AdvisorWidget';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import LoanDrawer from './components/LoanDrawer';
import BuyDrawer from './components/BuyDrawer';
import { Product, Deal, Service } from './types';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLoansDrawerOpen, setIsLoansDrawerOpen] = useState(false);
  const [isBuyDrawerOpen, setIsBuyDrawerOpen] = useState(false);

  useEffect(() => {
    // Initial data fetch simulation
    const initData = () => {
      const mockProducts: Product[] = [
        {
          id: '1',
          name: 'iPhone 13 Pro (UK Used)',
          description: '128GB, Sierra Blue, Face ID Working, 92% Battery Health.',
          price: 450000,
          condition: 'Grade A++',
          category: 'phone',
          image: 'https://images.unsplash.com/photo-1632661672312-a87d31726c59?q=80&w=600&h=400&auto=format&fit=crop'
        },
        {
          id: '2',
          name: 'MacBook Pro M1 (UK Used)',
          description: '8GB RAM, 256GB SSD, Silver, Cycle Count 45.',
          price: 680000,
          condition: 'Pristine',
          category: 'laptop',
          image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&h=400&auto=format&fit=crop'
        },
        {
          id: '3',
          name: 'iPhone 14 Pro (Cracked Back)',
          description: '256GB, Deep Purple. 100% Internal Performance. Minor crack on back glass (doesn\'t affect use).',
          price: 520000,
          condition: 'Cracked Glass',
          category: 'phone',
          image: 'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?q=80&w=600&h=400&auto=format&fit=crop'
        },
        {
          id: '4',
          name: 'Samsung S23 Ultra (Screen Crack)',
          description: '512GB, Phantom Black. Single hairline crack at the bottom. S-Pen and Touch work 100%.',
          price: 410000,
          condition: 'Minor Crack',
          category: 'phone',
          image: 'https://images.unsplash.com/photo-1678911820864-e2c567c655d7?q=80&w=600&h=400&auto=format&fit=crop'
        },
        {
          id: '5',
          name: 'iPad Pro 11" M2 (Pristine)',
          description: 'Wi-Fi + Cellular, Space Gray. Original accessories included.',
          price: 750000,
          condition: 'Pristine',
          category: 'tablet',
          image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=600&h=400&auto=format&fit=crop'
        }
      ];

      const mockDeals: Deal[] = [
        {
          id: 'd1',
          title: 'Value Week Promo',
          description: 'Get an extra 5% off on all items in the Cracked Screen value series.',
          badge: 'SAVINGS'
        }
      ];

      const mockServices: Service[] = [
        { id: 's1', title: 'Device Swap', description: 'Trade in your old device for a newer model.', icon: 'fa-sync' },
        { id: 's2', title: '1-Month Warranty', description: 'All UK used gadgets come with a solid warranty.', icon: 'fa-shield-alt' },
        { id: 's3', title: 'Quick Loans', description: 'Instant cash collateralized by your device.', icon: 'fa-hand-holding-usd' }
      ];
      
      setProducts(mockProducts);
      setDeals(mockDeals);
      setServices(mockServices);
      setLoading(false);
    };

    initData();
  }, []);

  const addProduct = (p: Product) => setProducts([p, ...products]);
  const addDeal = (d: Deal) => setDeals([d, ...deals]);
  const addService = (s: Service) => setServices([s, ...services]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar 
        onAdminClick={() => setIsAdminOpen(true)} 
        onLoansClick={() => setIsLoansDrawerOpen(true)} 
        onBuyClick={() => setIsBuyDrawerOpen(true)}
      />
      
      <main className="flex-grow">
        <Hero />

        {/* Dynamic Deals Section */}
        {deals.length > 0 && (
          <section className="bg-brand-black py-4">
            <div className="container mx-auto px-4 overflow-hidden">
              <div className="flex animate-marquee whitespace-nowrap gap-12 text-white font-bold uppercase tracking-widest text-xs py-2">
                {deals.map(deal => (
                  <div key={deal.id} className="flex items-center gap-4">
                    <span className="bg-brand-blue px-2 py-0.5 rounded text-[10px]">{deal.badge}</span>
                    <span>{deal.title}: {deal.description}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Dynamic Services Section */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map(service => (
                <div key={service.id} className="bg-white p-8 rounded-[2rem] border border-slate-100 hover:shadow-xl transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-brand-blue flex items-center justify-center text-2xl mb-6 group-hover:bg-brand-blue group-hover:text-white transition-all">
                    <i className={`fas ${service.icon}`}></i>
                  </div>
                  <h4 className="text-xl font-black mb-2">{service.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <div id="shop" className="scroll-mt-20">
          <ProductGrid products={products} loading={loading} />
        </div>

        <div id="loans" className="scroll-mt-20 bg-brand-black">
          <LoanSection />
        </div>

        <section id="valuation" className="py-24 bg-white">
          <div className="container mx-auto px-4 text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              AI Market Advisor
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Wondering how much your device is worth? Describe it to our Gemini-powered advisor for an instant resale or loan valuation.
            </p>
          </div>
          <div className="container mx-auto px-4">
            <AdvisorWidget />
          </div>
        </section>
      </main>

      <Footer />

      {/* Pop-up Modals / Drawers */}
      <AdminPanel 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
        onAddProduct={addProduct}
        onAddDeal={addDeal}
        onAddService={addService}
      />

      <LoanDrawer 
        isOpen={isLoansDrawerOpen}
        onClose={() => setIsLoansDrawerOpen(false)}
        products={products}
      />

      <BuyDrawer 
        isOpen={isBuyDrawerOpen}
        onClose={() => setIsBuyDrawerOpen(false)}
        products={products}
      />
    </div>
  );
};

export default App;
