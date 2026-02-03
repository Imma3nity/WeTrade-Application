
import React, { useState } from 'react';
import { getGadgetValuation, ValuationWithSources } from '../services/geminiService';

const AdvisorWidget: React.FC = () => {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ValuationWithSources | null>(null);
  const [error, setError] = useState('');

  const handleValuation = async () => {
    if (!description.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await getGadgetValuation(description);
      if (data) {
        setResult(data);
      } else {
        setError('Could not process the valuation. Please try again with more details.');
      }
    } catch (err) {
      setError('An error occurred while analyzing your gadget.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white border border-slate-100 rounded-[3rem] overflow-hidden shadow-2xl shadow-blue-50">
        <div className="p-10">
          <div className="flex flex-col md:flex-row md:items-center gap-8 mb-10">
            <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center text-[#00AEEF] relative overflow-hidden">
              <i className="fas fa-brain text-4xl"></i>
              {loading && <div className="absolute inset-0 bg-brand-blue/10 animate-pulse"></div>}
            </div>
            <div>
              <h3 className="text-4xl font-black text-slate-900 tracking-tighter">Live Market Advisor</h3>
              <p className="text-lg text-slate-400">Our AI scans major Nigerian retailers for up-to-the-minute pricing data.</p>
            </div>
          </div>

          <div className="space-y-6">
            <textarea
              className="w-full h-40 p-8 bg-slate-50 border border-slate-100 rounded-[2rem] focus:ring-4 focus:ring-blue-100 focus:border-[#00AEEF] outline-none transition-all resize-none text-slate-700 text-lg placeholder:text-slate-300"
              placeholder="e.g. PlayStation 5 Disc Edition, 2 Controllers, used for 3 months..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            
            <button
              onClick={handleValuation}
              disabled={loading || !description.trim()}
              className={`w-full py-6 rounded-3xl font-black text-xl text-white shadow-xl transition-all flex items-center justify-center gap-4 ${loading ? 'bg-slate-200 cursor-not-allowed' : 'bg-slate-900 hover:bg-black hover:scale-[1.01] active:scale-95 shadow-slate-200'}`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-brand-blue border-t-transparent animate-spin rounded-full"></div>
                  <span>SCANNING NIGERIAN MARKET...</span>
                </>
              ) : (
                <>
                  <i className="fas fa-globe brand-blue"></i>
                  <span>FETCH LIVE QUOTE</span>
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="mt-8 p-6 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm flex items-center gap-4">
              <i className="fas fa-exclamation-triangle text-xl"></i>
              <span className="font-bold">{error}</span>
            </div>
          )}

          {result && (
            <div className="mt-12 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-10 bg-slate-900 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
                  <div className="absolute -right-8 -bottom-8 opacity-5 group-hover:scale-110 transition-transform duration-1000">
                    <i className="fas fa-store text-[12rem]"></i>
                  </div>
                  <p className="text-xs uppercase font-black tracking-[0.3em] opacity-40 mb-3 text-[#00AEEF]">Verified Resale Price</p>
                  <p className="text-5xl font-black">₦{result.estimatedMarketValue.toLocaleString()}</p>
                </div>
                
                <div className="p-10 bg-[#00AEEF] rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
                  <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                    <i className="fas fa-coins text-[12rem]"></i>
                  </div>
                  <p className="text-xs uppercase font-black tracking-[0.3em] opacity-40 mb-3 text-slate-900">Recommended Loan (Max 500k)</p>
                  <p className="text-5xl font-black">₦{Math.min(result.maxLoanOffer, 500000).toLocaleString()}</p>
                </div>
              </div>

              <div className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                  <h4 className="text-xl font-black text-slate-900 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                      <i className="fas fa-search-dollar text-[#00AEEF]"></i>
                    </div>
                    Market Insights
                  </h4>
                  {result.sources.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                       {result.sources.slice(0, 2).map((s, i) => (
                         <a key={i} href={s.uri} target="_blank" rel="noopener noreferrer" className="text-[10px] font-black text-brand-blue bg-white px-3 py-1.5 rounded-lg border border-blue-50 hover:bg-blue-50">
                           <i className="fas fa-link mr-1"></i> {s.title.substring(0, 15)}...
                         </a>
                       ))}
                    </div>
                  )}
                </div>
                <p className="text-slate-500 text-lg leading-relaxed italic border-l-4 border-slate-200 pl-8">
                  "{result.analysis}"
                </p>
                
                <div className="mt-12 flex flex-col sm:flex-row gap-6">
                  <a 
                    href={`https://wa.me/2348000000000?text=I am selling my gadget. AI Market Quote: ₦${result.estimatedMarketValue.toLocaleString()}`}
                    className="flex-1 bg-slate-900 text-white text-center py-5 rounded-[1.5rem] font-black hover:bg-black transition-all shadow-xl shadow-slate-200"
                  >
                    Sell Now
                  </a>
                  <a 
                    href={`https://wa.me/2348000000000?text=I need a loan. AI Market Quote: ₦${Math.min(result.maxLoanOffer, 500000).toLocaleString()}`}
                    className="flex-1 bg-[#00AEEF] text-white text-center py-5 rounded-[1.5rem] font-black hover:bg-[#0096D6] transition-all shadow-xl shadow-cyan-100"
                  >
                    Get Loan
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdvisorWidget;
