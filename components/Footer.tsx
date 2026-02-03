
import React from 'react';

// Fix: Using a direct default export on the function to ensure compatibility and resolve import errors in App.tsx
export default function Footer() {
  return (
    <footer id="contact" className="bg-white text-slate-900 pt-24 pb-12 border-t border-slate-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="md:col-span-1">
             <div className="flex flex-col mb-8">
              <div className="flex items-center">
                <h1 className="text-3xl font-bold logo-font flex items-center">
                  <span className="brand-blue">WeT</span>
                  <span className="text-slate-900">rade</span>
                  <div className="ml-1 w-3 h-8 border-r-4 border-brand-blue rounded-r-full rotate-12"></div>
                </h1>
              </div>
              <div className="text-[8px] font-bold tracking-[0.3em] text-slate-400 mt-[-4px] ml-1">
                BUY • SELL • SWAP • LOAN
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-10">
              Nigeria's premier ecosystem for certified gadget trading and instant device-backed finance.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 hover:text-[#00AEEF] hover:bg-blue-50 transition-all">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 hover:text-[#00AEEF] hover:bg-blue-50 transition-all">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 hover:text-[#00AEEF] hover:bg-blue-50 transition-all">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-8 text-slate-900">Ecosystem</h4>
            <ul className="space-y-4 text-sm text-slate-400 font-bold">
              <li><a href="#shop" className="hover:text-[#00AEEF] transition">Shop Inventory</a></li>
              <li><a href="#loans" className="hover:text-[#00AEEF] transition">Device Loans</a></li>
              <li><a href="#valuation" className="hover:text-[#00AEEF] transition">AI Advisor</a></li>
              <li><a href="#" className="hover:text-[#00AEEF] transition">Trade-In Swap</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-8 text-slate-900">Safety</h4>
            <ul className="space-y-4 text-sm text-slate-400 font-bold">
              <li><a href="#" className="hover:text-[#00AEEF] transition">1-Month Warranty</a></li>
              <li><a href="#" className="hover:text-[#00AEEF] transition">Verification Center</a></li>
              <li><a href="#" className="hover:text-[#00AEEF] transition">Loan Terms</a></li>
              <li><a href="#" className="hover:text-[#00AEEF] transition">Privacy Shield</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-8 text-slate-900">Hub Location</h4>
            <p className="text-sm text-slate-400 font-bold leading-relaxed mb-6">
              Main Hub: Suit 45, Computer Village, Ikeja, Lagos.
            </p>
            <div className="space-y-3">
              <p className="text-sm font-black text-slate-900 flex items-center gap-3">
                <i className="fas fa-phone-alt text-[#00AEEF]"></i> +234 800 000 0000
              </p>
              <p className="text-sm font-black text-slate-900 flex items-center gap-3">
                <i className="fas fa-envelope text-[#00AEEF]"></i> hello@wetrade.ng
              </p>
            </div>
            <div className="mt-8">
              <span className="inline-block py-2 px-4 rounded-xl bg-green-50 text-green-600 text-[10px] font-black border border-green-100">
                <i className="fas fa-clock mr-2"></i> ONLINE SUPPORT ACTIVE
              </span>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center text-slate-400 text-[10px] font-black uppercase tracking-widest">
          <p>© {new Date().getFullYear()} WETRADE TECHNOLOGIES LIMITED.</p>
          <p className="mt-4 md:mt-0">MADE WITH PRIDE IN NIGERIA</p>
        </div>
      </div>
    </footer>
  );
}
