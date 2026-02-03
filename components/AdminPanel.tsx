
import React, { useState } from 'react';
import { Product, Deal, Service } from '../types';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (p: Product) => void;
  onAddDeal: (d: Deal) => void;
  onAddService: (s: Service) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose, onAddProduct, onAddDeal, onAddService }) => {
  const [activeTab, setActiveTab] = useState<'product' | 'deal' | 'service'>('product');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black tracking-tighter">Management Console</h2>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Update Inventory & Content</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 hover:text-red-500 transition-colors">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="flex border-b border-slate-100">
          {(['product', 'deal', 'service'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'text-brand-blue border-b-2 border-brand-blue bg-blue-50/30' : 'text-slate-400 hover:text-slate-600'}`}
            >
              {tab}s
            </button>
          ))}
        </div>

        <div className="flex-grow overflow-y-auto p-8">
          {activeTab === 'product' && <ProductForm onAdd={(p) => { onAddProduct(p); onClose(); }} />}
          {activeTab === 'deal' && <DealForm onAdd={(d) => { onAddDeal(d); onClose(); }} />}
          {activeTab === 'service' && <ServiceForm onAdd={(s) => { onAddService(s); onClose(); }} />}
        </div>
      </div>
    </div>
  );
};

const ProductForm = ({ onAdd }: { onAdd: (p: Product) => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    condition: 'Grade A++',
    category: 'phone' as const,
    image: 'https://picsum.photos/seed/new/600/400'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      price: Number(formData.price)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Gadget Name</label>
        <input required type="text" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-brand-blue" placeholder="iPhone 14 Pro" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Price (₦)</label>
        <input required type="number" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-brand-blue" placeholder="450000" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Description</label>
        <textarea required className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-brand-blue h-24 resize-none" placeholder="Device specs and details..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Condition</label>
          <select className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none" value={formData.condition} onChange={e => setFormData({...formData, condition: e.target.value})}>
            <option>Pristine</option>
            <option>Grade A++</option>
            <option>Grade A</option>
            <option>Grade B</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Category</label>
          <select className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value as any})}>
            <option value="phone">Phone</option>
            <option value="laptop">Laptop</option>
            <option value="tablet">Tablet</option>
            <option value="accessory">Accessory</option>
          </select>
        </div>
      </div>
      <button type="submit" className="w-full py-5 bg-brand-blue text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-cyan-100 mt-4">Upload Gadget</button>
    </form>
  );
};

const DealForm = ({ onAdd }: { onAdd: (d: Deal) => void }) => {
  const [formData, setFormData] = useState({ title: '', description: '', badge: 'NEW DEAL' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ ...formData, id: Math.random().toString(36).substr(2, 9) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Deal Title</label>
        <input required type="text" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none" placeholder="Black Friday Flash" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Badge Text</label>
        <input required type="text" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none" placeholder="LIMIT TIME" value={formData.badge} onChange={e => setFormData({...formData, badge: e.target.value})} />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Description</label>
        <textarea required className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none h-24 resize-none" placeholder="What is the offer?" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
      </div>
      <button type="submit" className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl mt-4">Publish Deal</button>
    </form>
  );
};

const ServiceForm = ({ onAdd }: { onAdd: (s: Service) => void }) => {
  const [formData, setFormData] = useState({ title: '', description: '', icon: 'fa-star' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ ...formData, id: Math.random().toString(36).substr(2, 9) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Service Title</label>
        <input required type="text" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none" placeholder="Next-Day Shipping" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">FontAwesome Icon Class</label>
        <input required type="text" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none" placeholder="fa-truck" value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Description</label>
        <textarea required className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none h-24 resize-none" placeholder="Short service description..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
      </div>
      <button type="submit" className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl mt-4">Add Service</button>
    </form>
  );
};

export default AdminPanel;
