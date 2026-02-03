
import React from 'react';
import { Product } from '../types';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <div className="group bg-white rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-blue-100 transition-all duration-500 border border-slate-100 overflow-hidden flex flex-col p-3 h-full">
    <div className="relative overflow-hidden aspect-[4/3] rounded-[2rem]">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute top-4 left-4">
        <span className={`text-[9px] uppercase tracking-widest font-black backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-white/20 ${
          product.condition.toLowerCase().includes('crack') 
            ? 'bg-amber-500/90 text-white' 
            : 'bg-white/90 text-slate-900'
        }`}>
          {product.condition}
        </span>
      </div>
    </div>
    
    <div className="p-6 flex flex-col flex-grow">
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-2xl font-black text-slate-900 transition-colors truncate pr-4">
          {product.name}
        </h4>
        <div className="bg-blue-50 text-[#00AEEF] p-2 rounded-xl">
          <i className="far fa-heart"></i>
        </div>
      </div>
      <p className="text-slate-400 text-sm mt-1 line-clamp-2 mb-6">
        {product.description}
      </p>
      
      <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
        <div>
          <p className="text-3xl font-black text-slate-900">
            ₦{product.price.toLocaleString()}
          </p>
        </div>
        <a 
          href={`https://wa.me/2348000000000?text=Hello WeTrade, I am interested in the ${product.name}`}
          className="bg-[#00AEEF] text-white p-4 rounded-2xl hover:bg-[#0096D6] transition shadow-lg shadow-cyan-100 group/btn"
        >
          <i className="fab fa-whatsapp text-2xl"></i>
        </a>
      </div>
    </div>
  </div>
);

const ProductGrid: React.FC<ProductGridProps> = ({ products, loading }) => {
  if (loading) {
    return (
      <div className="container mx-auto py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse bg-slate-50 rounded-3xl h-96 border border-slate-100"></div>
          ))}
        </div>
      </div>
    );
  }

  const pristineProducts = products.filter(p => !p.condition.toLowerCase().includes('crack'));
  const valueProducts = products.filter(p => p.condition.toLowerCase().includes('crack'));

  return (
    <section className="container mx-auto py-24 px-4 bg-white space-y-32">
      {/* Pristine Sub-Section */}
      <div id="pristine-series">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-brand-blue">
                <i className="fas fa-gem"></i>
              </div>
              <span className="text-xs font-black text-brand-blue uppercase tracking-widest">Grade A++ Verified</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">Premium Pristine Series</h3>
            <p className="text-slate-400 mt-4 text-lg leading-relaxed">
              Exclusively UK used devices in flawless cosmetic and internal condition. Each unit undergoes a 65-point inspection with an included 1-month warranty.
            </p>
          </div>
          <div className="mt-8 md:mt-0 flex gap-4">
             <button className="bg-slate-50 text-slate-900 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition border border-slate-100">
               Filter
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {pristineProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
          {pristineProducts.length === 0 && (
            <div className="col-span-full py-20 text-center bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
               <p className="text-slate-400 font-bold">No pristine devices currently in stock.</p>
            </div>
          )}
        </div>
      </div>

      {/* Value Sub-Section */}
      <div id="value-series">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                <i className="fas fa-tag"></i>
              </div>
              <span className="text-xs font-black text-amber-600 uppercase tracking-widest">Up to 40% Off Retail</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">Budget Value Series <span className="text-amber-500 font-light">(Minor Cracks)</span></h3>
            <p className="text-slate-400 mt-4 text-lg leading-relaxed">
              Perfect for power users on a budget. These devices have 100% functional internal hardware but feature minor cosmetic glass cracks that don't hinder performance.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {valueProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
          {valueProducts.length === 0 && (
            <div className="col-span-full py-20 text-center bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
               <p className="text-slate-400 font-bold">No value series devices currently in stock.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
