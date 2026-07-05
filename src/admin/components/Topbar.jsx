import { memo, useState } from "react";
import { useAdmin } from "../context/AdminContext";

function Topbar() {
  const { toggleMobileSidebar, adminUser } = useAdmin();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notifications = [
    { id: 1, text: "New order #ORD-009 received", time: "2 min ago", unread: true },
    { id: 2, text: "Low stock: Ray-Ban Aviator", time: "1 hour ago", unread: true },
    { id: 3, text: "Payment of ₹7,999 confirmed", time: "3 hours ago", unread: false },
  ];

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-slate-200 bg-white px-4 shadow-sm lg:px-6">
      <button
        onClick={toggleMobileSidebar}
        className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
        aria-label="Open menu"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div className="flex flex-1 items-center gap-4">
        <div className="relative hidden sm:block flex-1 max-w-md">
          <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search in admin..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative">
          <button
            onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
            className="relative rounded-lg p-2 text-slate-600 transition-all hover:bg-slate-100"
            aria-label="Notifications"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-slate-200 bg-white shadow-xl">
              <div className="border-b border-slate-100 px-4 py-3">
                <h3 className="text-sm font-semibold text-slate-900">Notifications</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className={`px-4 py-3 text-sm ${n.unread ? "bg-blue-50/50" : ""} hover:bg-slate-50`}>
                    <p className="text-slate-900">{n.text}</p>
                    <p className="mt-0.5 text-xs text-slate-500">{n.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
            className="flex items-center gap-2 rounded-lg p-1.5 transition-all hover:bg-slate-100"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
              {adminUser.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div className="hidden text-left md:block">
              <p className="text-sm font-medium text-slate-900">{adminUser.name}</p>
              <p className="text-xs text-slate-500">{adminUser.role}</p>
            </div>
          </button>

          {showProfile && (
            <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-slate-200 bg-white shadow-xl">
              <div className="border-b border-slate-100 px-4 py-3">
                <p className="text-sm font-medium text-slate-900">{adminUser.name}</p>
                <p className="text-xs text-slate-500">{adminUser.email}</p>
              </div>
              <div className="p-2">
                <a href="/admin/profile" className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100">Profile</a>
                <a href="/admin/settings" className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100">Settings</a>
                <hr className="my-1 border-slate-100" />
                <a href="/" className="block rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50">Exit Admin</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default memo(Topbar);