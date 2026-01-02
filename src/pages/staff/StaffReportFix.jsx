import React, { useEffect, useState } from "react";
import { ChevronLeft, Camera, Sparkles, MapPin } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const StaffReportFix = () => {
  const [preImage, setPreImage] = useState(null);
  const [postImage, setPostImage] = useState(null);

  useEffect(() => {
    // Initialize Leaflet Map
    const mapContainer = document.getElementById("report-map");
    if (mapContainer && !mapContainer._leaflet_id) {
      const map = L.map("report-map", { zoomControl: false }).setView(
        [28.6139, 77.209],
        16
      );
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      ).addTo(map);
      L.circle([28.6139, 77.209], {
        color: "#3b82f6",
        fillOpacity: 0.2,
        radius: 50,
      }).addTo(map);
    }
  }, []);

  const handleImageUpload = (e, setter) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setter(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-white font-['Plus_Jakarta_Sans'] flex flex-col items-center pb-12">
      {/* Navigation */}
      <nav className="w-full bg-white/80 backdrop-blur-md border-b border-slate-50 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.history.back()}
            className="p-2 hover:bg-slate-50 rounded-full transition-colors mr-1"
          >
            <ChevronLeft className="h-5 w-5 stroke-[2.5px]" />
          </button>
          <span className="text-xl font-extrabold text-slate-900 tracking-tighter">
            EcoClean
          </span>
          <span className="bg-blue-600 text-[9px] font-black text-white px-2 py-0.5 rounded-md uppercase tracking-widest">
            Staff
          </span>
        </div>
      </nav>

      <main className="p-6 w-full max-w-md space-y-8">
        <header className="px-2">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Submit Evidence
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest">
              Task ID: #FIX-9021
            </p>
          </div>
        </header>

        {/* Image Upload Section */}
        <div className="space-y-4">
          <UploadCard
            label="Pre-Image (Before)"
            preview={preImage}
            icon={<Camera size={20} />}
            onChange={(e) => handleImageUpload(e, setPreImage)}
            placeholder="Upload Site Condition"
          />
          <UploadCard
            label="Post-Image (After)"
            preview={postImage}
            icon={<Sparkles size={20} />}
            onChange={(e) => handleImageUpload(e, setPostImage)}
            placeholder="Upload Final Fix"
          />
        </div>

        {/* Description Field */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">
            Description
          </label>
          <textarea
            rows="3"
            placeholder="Describe the fix..."
            className="w-full bg-slate-50 rounded-[2rem] p-5 text-sm font-medium border border-slate-50 focus:outline-none focus:border-blue-500 focus:bg-white transition-all resize-none placeholder:text-slate-400"
          ></textarea>
        </div>

        {/* Map Section */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">
            Location
          </label>
          <div
            id="report-map"
            className="h-40 rounded-[2rem] border border-slate-100 shadow-sm z-10"
          ></div>
        </div>

        {/* Requirements Section */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">
            Requirements
          </label>
          <div className="bg-slate-900 rounded-[2.5rem] p-6 shadow-xl">
            <textarea
              placeholder="List resources required..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-blue-100 font-medium placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 resize-none"
              rows="2"
            ></textarea>
            <div className="flex flex-wrap gap-2 mt-4">
              <RequirementTag label="Chemical Kit" />
              <RequirementTag label="Hazmat Suit" />
            </div>
          </div>
        </div>

        <button className="w-full py-5 bg-blue-600 text-white font-extrabold rounded-[2rem] shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-[0.98] transition-all text-lg tracking-tight uppercase">
          Close Task
        </button>
      </main>
    </div>
  );
};

// Helper Components
const UploadCard = ({ label, preview, icon, onChange, placeholder }) => (
  <div className="group">
    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-4">
      {label}
    </label>
    <label className="flex items-center gap-4 p-4 bg-slate-50 rounded-[2rem] cursor-pointer border-2 border-dashed border-slate-100 hover:border-blue-500 hover:bg-blue-50/30 transition-all overflow-hidden">
      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-xl shadow-sm overflow-hidden border border-slate-100">
        {preview ? (
          <img
            src={preview}
            className="w-full h-full object-cover"
            alt="Preview"
          />
        ) : (
          icon
        )}
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-bold text-slate-700">{placeholder}</span>
        <span className="text-[10px] text-slate-400 font-medium">
          Tap to open camera or gallery
        </span>
      </div>
      <input
        type="file"
        className="hidden"
        accept="image/*"
        onChange={onChange}
      />
    </label>
  </div>
);

const RequirementTag = ({ label }) => (
  <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full flex items-center gap-2">
    <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
    <span className="text-[9px] font-black text-blue-400 uppercase">
      {label}
    </span>
  </div>
);

export default StaffReportFix;
