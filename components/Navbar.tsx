
import React from 'react';

interface NavbarProps {
  onAdminClick: () => void;
  onLoansClick: () => void;
  onBuyClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onAdminClick, onLoansClick, onBuyClick }) => {
  return (
    <nav className="glass-morphism text-slate-900 p-4 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex flex-col">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold logo-font flex items-center">
              <span className="brand-blue">WeT</span>
              <span className="text-slate-900">rade</span>
              <div className="ml-1 w-3 h-8 border-r-4 border-brand-blue rounded-r-full rotate-12"></div>
            </h1>
          </div>
          <div className="text-[8px] font-bold tracking-[0.3em] text-slate-600 mt-[-4px] ml-1">
            BUY • SELL • SWAP • LOAN
          </div>
        </div>
        
        <div className="hidden lg:flex space-x-10 text-xs font-black uppercase tracking-[0.2em] text-slate-500">
          <button onClick={onBuyClick} className="hover:text-[#00AEEF] transition-colors uppercase font-black tracking-[0.2em]">
            Buy
          </button>
          <a href="#valuation" className="hover:text-[#00AEEF] transition-colors">Sell</a>
          <a href="#valuation" className="hover:text-[#00AEEF] transition-colors">Swap</a>
          <button onClick={onLoansClick} className="hover:text-[#00AEEF] transition-colors uppercase font-black tracking-[0.2em]">
            Loan
          </button>
          <button onClick={onAdminClick} className="text-slate-900 hover:text-[#00AEEF] transition-colors flex items-center gap-1 uppercase font-black tracking-[0.2em]">
            <i className="fas fa-cog text-[10px]"></i> Admin
          </button>
        </div>

        <div className="flex items-center gap-3">
          <a 
            href="https://whatsapp.com/dl/" 
            className="bg-[#00AEEF] text-white px-6 py-2.5 rounded-lg text-xs font-black flex items-center shadow-lg hover:shadow-cyan-200/50 transition-all active:scale-95"
          >
            <i className="fab fa-whatsapp text-lg mr-2"></i>
            <span className="hidden sm:inline uppercase">Contact</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
