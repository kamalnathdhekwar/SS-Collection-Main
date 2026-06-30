import React, { useState } from 'react';
import { FaEnvelope, FaHeadset, FaStore, FaShieldAlt } from 'react-icons/fa';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '', email: '', topic: 'Product Query', orderId: '', message: ''
  });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    setIsSent(true);
    setTimeout(() => setIsSent(false), 5000);
  };

  return (

      <div className="w-full bg-neutral-50 py-12 px-4 font-sans text-neutral-800">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Support Deck Info */}
        <div className="md:col-span-1 space-y-4">
          <div className="bg-white p-5 rounded-lg border border-neutral-200 shadow-xs">
            <h2 className="text-lg font-bold text-neutral-900 mb-1 flex items-center gap-2">
              <FaHeadset className="text-blue-600" /> Customer Desk
            </h2>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Our centralized support framework manages multi-store fulfillment network queries across all regional hubs.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg border border-neutral-200 shadow-xs space-y-3">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Institutional Channels</h3>
            <div className="flex items-start gap-3 text-xs">
              <FaStore className="text-neutral-400 mt-0.5" />
              <div>
                <p className="font-bold text-neutral-900">Corporate Headquarters</p>
                <p className="text-neutral-500">6+ Flagship Mart Mega Complex</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-xs">
              <FaEnvelope className="text-neutral-400 mt-0.5" />
              <div>
                <p className="font-bold text-neutral-900">Direct Resolution Node</p>
                <p className="text-neutral-500 text-[11px]">aryan.karande2006@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Card Section */}
        <div className="md:col-span-2 bg-white p-5 md:p-8 rounded-lg border border-neutral-300 shadow-sm space-y-6">
          <div>
            <h1 className="text-xl md:text-2xl font-light text-neutral-900">Submit Customer Query</h1>
            <p className="text-xs text-neutral-500 mt-1">Please provide accurate transaction identifiers to escalate ticket routing speed.</p>
          </div>

          {isSent && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-medium rounded">
              ✓ Resolution Ticket compiled successfully. Submitting transaction nodes directly to corporate endpoint routing matrices.
            </div>
          )}

          <form 
            action="https://formsubmit.co/aryan.karande2006@gmail.com" 
            method="POST"
            onSubmit={handleSubmit}
            className="space-y-4 text-xs font-medium"
          >
            <input type="hidden" name="_next" value={window.location.href} />
            <input type="hidden" name="_subject" value={`SS Collection Customer Query: ${formData.topic}`} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-neutral-700 font-bold">Your Name</label>
                <input 
                  type="text" name="name" required placeholder="First and last name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 bg-white border border-neutral-400 rounded focus:outline-none focus:ring-1 focus:ring-neutral-900 text-neutral-900"
                />
              </div>
              <div className="space-y-1">
                <label className="text-neutral-700 font-bold">Email Address</label>
                <input 
                  type="email" name="email" required placeholder="name@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 bg-white border border-neutral-400 rounded focus:outline-none focus:ring-1 focus:ring-neutral-900 text-neutral-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-neutral-700 font-bold">Query Classification Category</label>
                <select 
                  name="category" value={formData.topic}
                  onChange={(e) => setFormData({...formData, topic: e.target.value})}
                  className="w-full px-3 py-2 bg-white border border-neutral-400 rounded focus:outline-none focus:ring-1 focus:ring-neutral-900 text-neutral-900"
                >
                  <option>Product Inventory Query</option>
                  <option>Store Logistical Issue</option>
                  <option>Payment / Secure Escrow Check</option>
                  <option>Others / General Feedback</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-neutral-700 font-bold">Order ID Reference</label>
                <input 
                  type="text" name="orderId" placeholder="e.g. SS-9827361"
                  value={formData.orderId}
                  onChange={(e) => setFormData({...formData, orderId: e.target.value})}
                  className="w-full px-3 py-2 bg-white border border-neutral-400 rounded focus:outline-none focus:ring-1 focus:ring-neutral-900 text-neutral-900"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-neutral-700 font-bold">Detailed Message / Complaint Directive</label>
              <textarea 
                name="message" required rows="4" placeholder="Elaborate details cleanly here..."
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full px-3 py-2 bg-white border border-neutral-400 rounded focus:outline-none focus:ring-1 focus:ring-neutral-900 text-neutral-900 resize-none"
              ></textarea>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-neutral-500 text-[10px] font-normal">
                <FaShieldAlt className="text-neutral-400 text-xs flex-shrink-0" />
                <span>Protected by decentralized enterprise validation matrix standards.</span>
              </div>
              <button 
                type="submit"
                className="w-full sm:w-auto px-5 py-2 bg-neutral-900 hover:bg-neutral-800 text-white font-medium rounded shadow-xs transition-colors cursor-pointer text-center"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}