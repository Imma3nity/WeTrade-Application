
import React from 'react';

const Hero: React.FC = () => {
  return (
    <header className="relative bg-white text-slate-900 overflow-hidden border-b border-slate-50">
      {/* Subtle Background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#00AEEF] rounded-full filter blur-[120px]"></div>
      </div>

      <div className="container mx-auto py-24 md:py-36 px-4 relative z-10 flex flex-col items-center text-center">
        <div className="max-w-4xl">
          <span className="inline-block py-2 px-4 rounded-full bg-slate-100 text-[#00AEEF] text-[10px] font-black mb-8 tracking-[0.2em] border border-slate-200 uppercase">
            The Future of Gadget Trading
          </span>
          <h2 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tighter">
            Verified Gadgets. <br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00AEEF] to-blue-600">
              Instant Cash.
            </span>
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-slate-500 max-w-2xl mx-auto leading-relaxed font-normal">
            Buy, Sell, Swap or get a Loan against your devices. 
            All UK used gadgets are <span className="text-slate-900 font-bold underline decoration-[#00AEEF]">certified grade A++</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <a 
              href="#shop" 
              className="bg-slate-900 text-white px-12 py-5 rounded-2xl font-black hover:bg-black transition-all shadow-2xl shadow-slate-200 text-center hover:scale-105 active:scale-95"
            >
              Shop Inventory
            </a>
            <a 
              href="#loans" 
              className="bg-[#00AEEF] text-white px-12 py-5 rounded-2xl font-black hover:bg-[#0096D6] transition-all shadow-2xl shadow-cyan-100 text-center hover:scale-105 active:scale-95"
            >
              Get a Loan
            </a>
          </div>
          
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-black text-slate-900">4.9/5</span>
              <span className="text-[10px] font-bold uppercase tracking-widest mt-1">Trust Rating</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-black text-slate-900">24Hr</span>
              <span className="text-[10px] font-bold uppercase tracking-widest mt-1">Fast Delivery</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-black text-slate-900">100%</span>
              <span className="text-[10px] font-bold uppercase tracking-widest mt-1">Certified</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-black text-slate-900">5k+</span>
              <span className="text-[10px] font-bold uppercase tracking-widest mt-1">Happy Clients</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
