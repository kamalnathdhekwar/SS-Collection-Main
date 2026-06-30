import React from 'react';
import { FaInstagram, FaChevronUp } from 'react-icons/fa';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-neutral-200 bg-neutral-50 font-sans text-neutral-600 mt-auto">
      
      {/* Back to Top bar like Amazon */}
      <button 
        onClick={scrollToTop}
        className="w-full py-3 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 transition-colors duration-200 cursor-pointer border-b border-neutral-700 focus:outline-none"
      >
        <FaChevronUp className="text-[10px]" /> Back to top
      </button>

      {/* Main Link Directory Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-10">
        
        {/* Company & Operational Scale Overview */}
        <div className="col-span-2 lg:col-span-2 space-y-5 pr-0 lg:pr-8">
          <div className="space-y-2">
            <h2 className="text-xl font-black text-neutral-900 tracking-tight uppercase transition-transform duration-300 hover:translate-x-1 inline-block select-none">
              SS <span className="font-light text-neutral-500">Collection</span>
            </h2>
            <p className="text-xs leading-relaxed text-neutral-500 max-w-sm">
              Multi-mart consumer retail network and e-commerce platform. Managing integrated inventory pipelines across distributed regional fulfillment centers.
            </p>
          </div>

          {/* Premium 100K+ Follower Tracking Badge */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-1">
            <span className="inline-flex items-center text-[10px] font-bold tracking-wider text-neutral-700 bg-neutral-200/60 border border-neutral-300 px-2.5 py-1 rounded select-none">
              Verified Channel
            </span>

            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-[11px] font-bold tracking-wider text-white bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 px-3 py-1 rounded shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 cursor-pointer animate-pulse"
            >
              <FaInstagram className="text-sm transition-transform duration-300 group-hover:rotate-12" />
              <span>100K+ COMMUNITY INSIGHTS</span>
            </a>
          </div>
        </div>

        {/* Physical Mart Locations Directory */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider select-none">
            Our Hubs
          </h3>
          <ul className="space-y-2 text-xs font-medium">
            <li><a href="#" className="hover:underline hover:text-blue-600 hover:translate-x-1 block text-neutral-500 transition-all duration-200">Flagship Marts (6+ Locations)</a></li>
            <li><a href="#" className="hover:underline hover:text-blue-600 hover:translate-x-1 block text-neutral-500 transition-all duration-200">Store Locator Network</a></li>
            <li><a href="#" className="hover:underline hover:text-blue-600 hover:translate-x-1 block text-neutral-500 transition-all duration-200">Regional Warehouses</a></li>
            <li><a href="#" className="hover:underline hover:text-blue-600 hover:translate-x-1 block text-neutral-500 transition-all duration-200">B2B Supply Procurement</a></li>
          </ul>
        </div>

        {/* Core Customer Service Logistics */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider select-none">
            Customer Care
          </h3>
          <ul className="space-y-2 text-xs font-medium">
            <li><a href="#" className="hover:underline hover:text-blue-600 hover:translate-x-1 block text-neutral-500 transition-all duration-200">Track Consignment Status</a></li>
            <li><a href="#" className="hover:underline hover:text-blue-600 hover:translate-x-1 block text-neutral-500 transition-all duration-200">Returns & Exchange Framework</a></li>
            <li><a href="#" className="hover:underline hover:text-blue-600 hover:translate-x-1 block text-neutral-500 transition-all duration-200">Consumer Protection Registry</a></li>
            <li><a href="#" className="hover:underline hover:text-blue-600 hover:translate-x-1 block text-neutral-500 transition-all duration-200">Help Escalation Desk</a></li>
          </ul>
        </div>

        {/* Subscription Node */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider select-none">
            Stay Updated
          </h3>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Subscribe to acquire automated stock alerts, catalog adjustments, and market data notifications.
          </p>
          <div className="flex flex-col space-y-1.5 pt-1">
            <input 
              type="email" 
              placeholder="Enter your email address"
              className="w-full px-3 py-2 text-xs bg-white border border-neutral-300 rounded focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all text-neutral-900"
            />
            <button className="w-full py-2 text-xs bg-neutral-900 hover:bg-neutral-800 text-white font-bold rounded tracking-wide transition-all duration-200 cursor-pointer text-center border border-neutral-950 shadow-xs">
              Subscribe
            </button>
          </div>
        </div>

      </div>

      {/* Legal Footer Bottom Strip */}
      <div className="border-t border-neutral-200 bg-neutral-100/50 py-6">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500 font-medium">
          <div className="select-none">
            &copy; {new Date().getFullYear()} SS Collection Enterprises Private Limited. All rights reserved.
          </div>

          <div className="flex items-center space-x-2 text-[10px] font-mono text-neutral-400 select-none">
            <span className="border border-neutral-300 px-1.5 py-0.5 bg-white rounded">VISA</span>
            <span className="border border-neutral-300 px-1.5 py-0.5 bg-white rounded">MASTERCARD</span>
            <span className="border border-neutral-300 px-1.5 py-0.5 bg-white rounded">UPI SECURE</span>
            <span className="border border-neutral-300 px-1.5 py-0.5 bg-white rounded">NET BANKING</span>
          </div>
        </div>
      </div>

    </footer>
  );
}