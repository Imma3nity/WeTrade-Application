
import React from 'react';
import { Product } from '../types';

interface LoanDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
}

const LoanDrawer: React.FC<LoanDrawerProps> = ({ isOpen, onClose, products }) => {
  if (!isOpen) return null;

  const premiumProducts = products.filter(p => !p.condition.toLowerCase().includes('crack'));
  const budgetProducts = products.filter(p => p.condition.toLowerCase().includes('crack'));

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Drawer */}
      <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-900 text-white">
          <div>
            <h2 className="text-2xl font-black tracking-tighter">Device-Backed Loans</h2>
            <p className="text-xs text-blue-300 font-bold uppercase tracking-widest mt-1">Select collateral to begin</p>
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
                <i className="fas fa-crown text-xs"></i>
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Premium Pristine Devices</h3>
            </div>
            
            <div className="space-y-4">
              {premiumProducts.map(p => (
                <div key={p.id} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-brand-blue transition-all group">
                  <img src={p.image} className="w-16 h-16 rounded-xl object-cover" alt={p.name} />
                  <div className="flex-grow">
                    <h4 className="text-sm font-black text-slate-900">{p.name}</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">{p.condition}</p>
                  </div>
                  <a 
                    href={`https://wa.me/2348000000000?text=I want to apply for a loan using my ${p.name} as collateral.`}
                    className="bg-brand-blue text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-blue-600 transition-colors"
                  >
                    GET CASH
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Budget/Value */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                <i className="fas fa-bolt text-xs"></i>
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
                  </div>
                  <a 
                    href={`https://wa.me/2348000000000?text=I want to apply for a loan using my ${p.name} (Value Series) as collateral.`}
                    className="bg-slate-900 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-black transition-colors"
                  >
                    GET CASH
                  </a>
                </div>
              )) : (
                <p className="text-xs text-slate-400 font-medium italic p-4 text-center border-2 border-dashed border-slate-100 rounded-2xl">
                  No Budget Value devices currently listed.
                </p>
              )}
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-[2rem] border border-blue-100">
            <h4 className="text-xs font-black text-brand-blue uppercase tracking-widest mb-2">Did you know?</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              We accept most UK used gadgets as collateral. Even with minor cracks, our AI-powered valuation ensures you get up to 70% of the market value instantly.
            </p>
          </div>
        </div>

        <div className="p-8 bg-slate-50 border-t border-slate-100">
           <a 
            href="#valuation" 
            onClick={onClose}
            className="block w-full bg-brand-blue text-white text-center py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-cyan-100"
          >
            Custom Device Valuation
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoanDrawer;
