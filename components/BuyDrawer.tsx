
import React from 'react';
import { Product } from '../types';

interface BuyDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
}

const BuyDrawer: React.FC<BuyDrawerProps> = ({ isOpen, onClose, products }) => {
  if (!isOpen) return null;

  const premiumProducts = products.filter(p => !p.condition.toLowerCase().includes('crack'));
  const budgetProducts = products.filter(p => p.condition.toLowerCase().includes('crack'));

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Drawer */}
      <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-brand-blue text-white">
          <div>
            <h2 className="text-2xl font-black tracking-tighter">Shop Inventory</h2>
            <p className="text-xs text-blue-100 font-bold uppercase tracking-widest mt-1">Certified UK Used Gadgets</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-8 space-y-12">
          {/* Section 1: Premium */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-brand-blue">
                <i className="fas fa-star text-xs"></i>
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Premium Pristine Selection</h3>
            </div>
            
            <div className="space-y-4">
              {premiumProducts.length > 0 ? premiumProducts.map(p => (
                <div key={p.id} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-brand-blue transition-all group">
                  <img src={p.image} className="w-16 h-16 rounded-xl object-cover" alt={p.name} />
                  <div className="flex-grow">
                    <h4 className="text-sm font-black text-slate-900">{p.name}</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">{p.condition}</p>
                    <p className="text-xs font-black text-brand-blue mt-1">₦{p.price.toLocaleString()}</p>
                  </div>
                  <a 
                    href={`https://wa.me/2348000000000?text=I am interested in buying the ${p.name}`}
                    className="bg-slate-900 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-black transition-colors"
                  >
                    BUY NOW
                  </a>
                </div>
              )) : (
                <p className="text-xs text-slate-400 font-medium italic p-4 text-center">No premium stock found.</p>
              )}
            </div>
          </div>

          {/* Section 2: Budget/Value */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                <i className="fas fa-percentage text-xs"></i>
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Budget Value (Minor Cracks)</h3>
            </div>
            
            <div className="space-y-4">
              {budgetProducts.length > 0 ? budgetProducts.map(p => (
                <div key={p.id} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-amber-400 transition-all group">
                  <img src={p.image} className="w-16 h-16 rounded-xl object-cover" alt={p.name} />
                  <div className="flex-grow">
                    <h4 className="text-sm font-black text-slate-900">{p.name}</h4>
                    <p className="text-[10px] text-amber-600 font-bold uppercase">{p.condition}</p>
                    <p className="text-xs font-black text-slate-900 mt-1">₦{p.price.toLocaleString()}</p>
                  </div>
                  <a 
                    href={`https://wa.me/2348000000000?text=I want to buy the Value Series ${p.name}`}
                    className="bg-brand-blue text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-blue-600 transition-colors"
                  >
                    BUY NOW
                  </a>
                </div>
              )) : (
                <p className="text-xs text-slate-400 font-medium italic p-4 text-center">No value stock currently.</p>
              )}
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-[2rem] text-white">
            <h4 className="text-xs font-black text-brand-blue uppercase tracking-widest mb-2">Quality Guarantee</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Every gadget in our inventory—including the Budget Value series—is tested for 100% functionality. We offer a 1-month warranty on internal hardware.
            </p>
          </div>
        </div>

        <div className="p-8 bg-slate-50 border-t border-slate-100">
           <button 
            onClick={onClose}
            className="block w-full bg-slate-200 text-slate-900 text-center py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-300 transition-all"
          >
            Close Catalog
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyDrawer;
