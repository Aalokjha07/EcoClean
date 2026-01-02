import React, { useState } from "react";
import Navbar from "../../components/Navbar";

export default function MyReports() {
  const [filter, setFilter] = useState("All");

  const getTabClass = (name) => {
    return filter === name
      ? "bg-slate-900 text-white shadow-md"
      : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50";
  };

  return (
    <div className="flex flex-col items-center w-full">
      <Navbar title="My Reports" showBack={true} />

      <main className="p-6 w-full max-w-md space-y-6">
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {["All", "Pending", "Resolved"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`${getTabClass(
                tab
              )} px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="space-y-5">
          <div className="bento-card bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="relative h-44">
              <img
                src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=400"
                className="w-full h-full object-cover"
                alt="Report"
              />
              <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider">
                Processing
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-extrabold text-slate-800 mb-1">
                Central Market Bin
              </h3>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-3">
                Sector 4 • 2 hours ago
              </p>
              <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                <span className="text-slate-500 text-xs font-medium italic">
                  Assigning truck...
                </span>
                <button className="text-xs font-black text-slate-800 bg-slate-100 px-5 py-2.5 rounded-xl hover:bg-slate-200 transition-colors">
                  DETAILS
                </button>
              </div>
            </div>
          </div>

          <div className="bento-card bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden opacity-90">
            <div className="relative h-44">
              <img
                src="https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=400"
                className="w-full h-full object-cover grayscale-[20%]"
                alt="Report"
              />
              <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider">
                Resolved
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-extrabold text-slate-800 mb-1">
                Park Avenue Cleanup
              </h3>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-3">
                Green Park • Oct 24
              </p>
              <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                <span className="text-emerald-600 text-xs font-bold">
                  +10 Impact Points
                </span>
                <button className="text-xs font-black text-slate-800 bg-slate-100 px-5 py-2.5 rounded-xl hover:bg-slate-200 transition-colors">
                  TIMELINE
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
