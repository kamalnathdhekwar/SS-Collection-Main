import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-neutral-200 bg-neutral-50 font-sans text-neutral-600 mt-auto">
      
      {/* Main Link Directory Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-10">
        
        {/* Company & Operational Scale Overview */}
        <div className="col-span-2 lg:col-span-2 space-y-4 pr-0 lg:pr-8">
          <h2 className="text-lg font-bold text-neutral-900 tracking-tight uppercase">
            SS Collection
          </h2>
          <p className="text-xs leading-relaxed text-neutral-500 max-w-sm">
            Multi-mart consumer retail network and e-commerce platform. Managing integrated inventory pipelines across distributed regional fulfillment centers.
          </p>
          <div className="pt-1">
            <span className="inline-flex items-center text-[11px] font-bold tracking-wider text-neutral-700 uppercase bg-neutral-200/60 border border-neutral-300 px-2.5 py-1 rounded">
              Verified Channel • 100K+ Community Tracking
            </span>
          </div>
        </div>

        {/* Physical Mart Locations Directory */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
            Our Hubs
          </h3>
          <ul className="space-y-2 text-xs font-medium">
            <li><a href="#" className="hover:underline hover:text-neutral-900 block text-neutral-500">Flagship Marts (6+ Locations)</a></li>
            <li><a href="#" className="hover:underline hover:text-neutral-900 block text-neutral-500">Store Locator Network</a></li>
            <li><a href="#" className="hover:underline hover:text-neutral-900 block text-neutral-500">Regional Warehouses</a></li>
            <li><a href="#" className="hover:underline hover:text-neutral-900 block text-neutral-500">B2B Supply Procurement</a></li>
          </ul>
        </div>

        {/* Core Customer Service Logistics */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
            Customer Care
          </h3>
          <ul className="space-y-2 text-xs font-medium">
            <li><a href="#" className="hover:underline hover:text-neutral-900 block text-neutral-500">Track Consignment Status</a></li>
            <li><a href="#" className="hover:underline hover:text-neutral-900 block text-neutral-500">Returns & Exchange Framework</a></li>
            <li><a href="#" className="hover:underline hover:text-neutral-900 block text-neutral-500">Consumer Protection Registry</a></li>
            <li><a href="#" className="hover:underline hover:text-neutral-900 block text-neutral-500">Help Escalation Desk</a></li>
          </ul>
        </div>

        {/* Subscription / Retention Node */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
            Stay Updated
          </h3>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Subscribe to acquire automated stock alerts, catalog adjustments, and market data notifications.
          </p>
          <div className="flex flex-col space-y-1.5 pt-1">
            <input 
              type="email" 
              placeholder="Enter your email address"
              className="w-full px-3 py-2 text-xs bg-white border border-neutral-300 rounded focus:outline-none focus:border-neutral-900 transition-colors"
            />
            <button className="w-full py-2 text-xs bg-neutral-900 hover:bg-neutral-800 text-white font-medium rounded tracking-wide transition-colors cursor-pointer text-center">
              Subscribe
            </button>
          </div>
        </div>

      </div>

      {/* Institutional Legal Bottom Strip */}
      <div className="border-t border-neutral-200 bg-neutral-100/50 py-6">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500 font-medium">
          <div>
            &copy; {new Date().getFullYear()} SS Collection Enterprises Private Limited. All rights reserved.
          </div>

          {/* Core Trust Signposts */}
          <div className="flex items-center space-x-2 text-[10px] font-mono text-neutral-400">
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