
import React, { useState, useMemo, useRef } from 'react';
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';
import { getGadgetValuation, ValuationWithSources } from '../services/geminiService';

const LoanSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'calculator' | 'valuation'>('calculator');
  const [loanAmount, setLoanAmount] = useState<number>(500000);
  const [duration, setDuration] = useState<number>(3);
  const [collateralDesc, setCollateralDesc] = useState('');
  const [collateralImages, setCollateralImages] = useState<string[]>([]);
  const [valuation, setValuation] = useState<ValuationWithSources | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Updated monthly interest rate to 15% per request
  const monthlyRate = 0.15;
  const MAX_LOAN = 500000;

  // Granular duration options for a better breakdown of the 500k limit
  const durationOptions = [1, 2, 3, 4, 5, 6];

  const calculations = useMemo(() => {
    const totalInterest = loanAmount * monthlyRate * duration;
    const totalRepayment = loanAmount + totalInterest;
    const monthlyRepayment = totalRepayment / duration;
    
    const chartData = [];
    for (let i = 0; i <= duration; i++) {
      chartData.push({
        month: i === 0 ? 'Start' : `M${i}`,
        balance: Math.max(0, totalRepayment - (monthlyRepayment * i))
      });
    }

    return { totalRepayment, monthlyRepayment, chartData };
  }, [loanAmount, duration]);

  // Helper to calculate monthly repayment for the labels on buttons
  const getMonthlyForDuration = (m: number) => {
    const total = loanAmount + (loanAmount * monthlyRate * m);
    return Math.round(total / m);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setCollateralImages(prev => [...prev, reader.result as string].slice(-3));
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setCollateralImages(prev => prev.filter((_, i) => i !== index));
  };

  const requestValuation = async () => {
    if (!collateralDesc.trim()) return;
    setIsEvaluating(true);
    setValuation(null);
    try {
      const result = await getGadgetValuation(collateralDesc, collateralImages[0]);
      if (result) {
        setValuation(result);
        setLoanAmount(Math.min(result.maxLoanOffer, MAX_LOAN));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <section className="container mx-auto py-24 px-4 text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        <div className="lg:sticky lg:top-32">
          <div className="w-16 h-1 bg-[#00AEEF] mb-8"></div>
          <h2 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tighter">
            Instant Cash. <br/>
            Zero <span className="brand-blue">Paperwork.</span>
          </h2>
          <p className="text-xl text-slate-300 mb-12 leading-relaxed font-light">
            Turn your devices into immediate capital. Our AI evaluates your collateral in seconds using live Nigerian market data, offering up to 70% of value.
          </p>

          <div className="space-y-8">
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#00AEEF] group-hover:text-white transition-all duration-300">
                <i className="fas fa-search-dollar text-xl"></i>
              </div>
              <div>
                <h4 className="font-black text-xl">70% Market Value</h4>
                <p className="text-slate-400">We offer the highest collateral ratios in the Nigerian market.</p>
              </div>
            </div>
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#00AEEF] group-hover:text-white transition-all duration-300">
                <i className="fas fa-hand-holding-usd text-xl"></i>
              </div>
              <div>
                <h4 className="font-black text-xl">₦500k Max Limit</h4>
                <p className="text-slate-400">Quick loans available up to ₦500,000 for verified devices.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col min-h-[700px]">
          <div className="flex bg-slate-50 border-b border-slate-100 p-2 m-4 rounded-[2rem]">
            <button 
              onClick={() => setActiveTab('calculator')}
              className={`flex-1 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'calculator' ? 'bg-white text-slate-900 shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Loan Calculator
            </button>
            <button 
              onClick={() => setActiveTab('valuation')}
              className={`flex-1 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'valuation' ? 'bg-white text-slate-900 shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Collateral Valuation
            </button>
          </div>

          <div className="p-8 md:p-12 text-slate-900 flex-grow">
            {activeTab === 'calculator' ? (
              <div className="animate-in fade-in slide-in-from-left duration-500 space-y-10">
                <div>
                  <div className="flex justify-between mb-4 items-end">
                    <div>
                      <h3 className="text-3xl font-black tracking-tighter">Quick Estimate</h3>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Select your loan amount (Max ₦500,000)</p>
                    </div>
                    <span className="text-[#00AEEF] font-black text-3xl">₦{loanAmount.toLocaleString()}</span>
                  </div>
                  <input 
                    type="range" min="20000" max={MAX_LOAN} step="5000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#00AEEF]"
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {durationOptions.map(m => (
                    <button 
                      key={m} onClick={() => setDuration(m)}
                      className={`p-4 rounded-2xl transition-all border-2 text-left flex flex-col justify-center ${
                        duration === m 
                        ? 'bg-slate-900 text-white border-slate-900 shadow-lg scale-[1.02]' 
                        : 'bg-white border-slate-100 text-slate-400 hover:border-[#00AEEF] hover:bg-blue-50/30'
                      }`}
                    >
                      <span className={`text-[10px] font-black uppercase tracking-widest ${duration === m ? 'text-blue-400' : 'text-slate-400'}`}>
                        {m} Month{m > 1 ? 's' : ''}
                      </span>
                      <span className="text-sm font-black mt-1">
                        ₦{getMonthlyForDuration(m).toLocaleString()}<small className="opacity-60 text-[10px]">/mo</small>
                      </span>
                    </button>
                  ))}
                </div>

                <div className="bg-slate-900 text-white rounded-[2rem] p-8 grid grid-cols-2 gap-8 shadow-xl">
                  <div>
                    <p className="text-[10px] text-blue-300 uppercase font-black tracking-[0.2em] mb-2">Monthly Repayment</p>
                    <p className="text-2xl md:text-3xl font-black">₦{Math.round(calculations.monthlyRepayment).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-blue-300 uppercase font-black tracking-[0.2em] mb-2">Total Payback</p>
                    <p className="text-2xl md:text-3xl font-black brand-blue">₦{Math.round(calculations.totalRepayment).toLocaleString()}</p>
                  </div>
                </div>

                <div className="h-40 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={calculations.chartData}>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #f1f5f9', borderRadius: '12px', fontSize: '10px' }}
                      />
                      <Area type="monotone" dataKey="balance" stroke="#00AEEF" strokeWidth={3} fill="#00AEEF" fillOpacity={0.05} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <button 
                  onClick={() => setActiveTab('valuation')}
                  className="w-full bg-[#00AEEF] text-white py-6 rounded-3xl font-black text-xl shadow-xl shadow-cyan-100 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                >
                  PLEDGE COLLATERAL <i className="fas fa-arrow-right text-sm"></i>
                </button>
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-right duration-500 flex flex-col h-full space-y-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-3xl font-black tracking-tighter">Collateral Vault</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">70% Value Financing</p>
                  </div>
                  <div className="bg-blue-50 text-brand-blue px-3 py-1 rounded-full text-[10px] font-black tracking-widest">
                    LIVE SEARCH
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Upload Condition Photos</label>
                  <div className="grid grid-cols-3 gap-4">
                    {collateralImages.map((img, idx) => (
                      <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border border-slate-100 group">
                        <img src={img} className="w-full h-full object-cover" alt={`Collateral ${idx}`} />
                        <button 
                          onClick={() => removeImage(idx)}
                          className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                    ))}
                    {collateralImages.length < 3 && (
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="aspect-square rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center hover:bg-blue-50 hover:border-brand-blue transition-all group"
                      >
                        <i className="fas fa-plus text-slate-300 group-hover:text-brand-blue mb-2"></i>
                        <span className="text-[9px] font-black text-slate-400">ADD PHOTO</span>
                      </button>
                    )}
                  </div>
                  <input type="file" multiple accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageUpload} />
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Describe Gadget for Search</label>
                  <textarea 
                    className="w-full h-28 p-6 bg-slate-50 border border-slate-100 rounded-[2rem] outline-none focus:border-brand-blue focus:ring-4 focus:ring-blue-50 transition-all text-sm font-medium placeholder:text-slate-300 resize-none"
                    placeholder="e.g. Samsung S23 Ultra, 256GB, Phantom Black, UK Used Grade A..."
                    value={collateralDesc}
                    onChange={(e) => setCollateralDesc(e.target.value)}
                  />
                </div>

                {!valuation && (
                  <button 
                    disabled={isEvaluating || !collateralDesc.trim()}
                    onClick={requestValuation}
                    className={`w-full py-6 rounded-3xl font-black text-lg transition-all flex items-center justify-center gap-4 ${isEvaluating ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-slate-900 text-white hover:bg-black shadow-xl shadow-slate-200'}`}
                  >
                    {isEvaluating ? (
                      <><div className="w-4 h-4 border-2 border-brand-blue border-t-transparent animate-spin rounded-full"></div> SEARCHING LIVE MARKET DATA...</>
                    ) : (
                      <><i className="fas fa-globe brand-blue"></i> RUN LIVE MARKET VALUATION</>
                    )}
                  </button>
                )}

                {valuation && (
                  <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-6">
                    <div className="bg-blue-50 border border-brand-blue/20 rounded-[2.5rem] p-8">
                       <p className="text-[10px] font-black text-brand-blue uppercase tracking-widest mb-1">Live Valuation Certificate</p>
                       <div className="flex justify-between items-baseline mb-4">
                          <h4 className="text-4xl font-black text-slate-900">₦{valuation.maxLoanOffer.toLocaleString()}</h4>
                          <span className="text-xs font-bold text-slate-400">70% Offer (Max ₦500k)</span>
                       </div>
                       <div className="h-px bg-blue-100 mb-4"></div>
                       <p className="text-xs font-medium text-slate-600 leading-relaxed italic mb-4">
                         "{valuation.analysis}"
                       </p>
                       {valuation.sources.length > 0 && (
                         <div className="space-y-2">
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Verified Sources</p>
                           <div className="flex flex-wrap gap-2">
                             {valuation.sources.slice(0, 3).map((src, i) => (
                               <a key={i} href={src.uri} target="_blank" rel="noopener noreferrer" className="bg-white border border-blue-100 px-3 py-1.5 rounded-lg text-[10px] font-bold text-brand-blue hover:bg-blue-50 hover:text-white transition-all flex items-center gap-2">
                                 <i className="fas fa-external-link-alt text-[8px]"></i> {src.title.split(' - ')[0]}
                               </a>
                             ))}
                           </div>
                         </div>
                       )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <button 
                        onClick={() => { setValuation(null); setCollateralImages([]); setCollateralDesc(''); }}
                        className="py-5 rounded-2xl border-2 border-slate-100 text-xs font-black uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition-all"
                      >
                        Reset Application
                      </button>
                      <a 
                        href={`https://wa.me/2348000000000?text=Accepting Loan Offer of ₦${valuation.maxLoanOffer.toLocaleString()} for my ${collateralDesc}. Sources: ${valuation.sources.map(s => s.uri).join(', ')}`}
                        className="bg-brand-blue text-white py-5 rounded-2xl text-xs font-black uppercase tracking-widest text-center shadow-lg shadow-cyan-100 hover:scale-[1.02] transition-all"
                      >
                        CLAIM CASH
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoanSection;
