import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../components/Navbar";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function IssueReport() {
  const [imagePreview, setImagePreview] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modal, setModal] = useState({
    active: false,
    title: "",
    msg: "",
    isError: false,
  });

  const mapContainer = useRef(null);
  const mapInstance = useRef(null);
  const markerInstance = useRef(null);
  const cameraInput = useRef(null);
  const fileInput = useRef(null);

  useEffect(() => {
    if (!mapInstance.current && mapContainer.current) {
      const map = L.map(mapContainer.current, { zoomControl: false }).setView(
        [20.5937, 78.9629],
        5
      );
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      ).addTo(map);
      const marker = L.marker([20.5937, 78.9629], { draggable: true }).addTo(
        map
      );
      marker.on("dragend", () => {
        const { lat, lng } = marker.getLatLng();
        setLat(lat.toFixed(6));
        setLng(lng.toFixed(6));
      });
      mapInstance.current = map;
      markerInstance.current = marker;
    }
  }, []);

  const triggerInput = (type) =>
    type === "camera" ? cameraInput.current.click() : fileInput.current.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        if (mapInstance.current && markerInstance.current) {
          mapInstance.current.setView([latitude, longitude], 15);
          markerInstance.current.setLatLng([latitude, longitude]);
          setLat(latitude.toFixed(6));
          setLng(longitude.toFixed(6));
        }
      });
    }
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-[#F8FAFC]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; letter-spacing: -0.01em; }
        .bento-input { transition: all 0.2s ease; border: 1px solid #E2E8F0; background: #FFFFFF; }
        .bento-input:focus-within { border-color: #6366F1; box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1); }
      `}</style>

      <Navbar title="New Report" showBack={true} />

      <main className="p-6 w-full max-w-md space-y-10 pb-32">
        {/* 1. TEXT DETAILS SECTION */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <div className="w-1.5 h-6 bg-indigo-600 rounded-full" />
            <h2 className="text-xl font-extrabold text-slate-800">
              Issue Details
            </h2>
          </div>

          <div className="space-y-3">
            <div className="bento-input rounded-[1.5rem] p-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">
                Subject Title
              </label>
              <input
                type="text"
                placeholder="e.g. Broken Street Light"
                className="w-full bg-transparent outline-none text-slate-700 font-bold placeholder:text-slate-300"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="bento-input rounded-[1.5rem] p-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">
                Description
              </label>
              <textarea
                rows="3"
                placeholder="Briefly describe the situation..."
                className="w-full bg-transparent outline-none text-slate-700 font-medium text-sm placeholder:text-slate-300 resize-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* 2. LOCATION SECTION */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <div className="w-1.5 h-6 bg-rose-500 rounded-full" />
            <h2 className="text-xl font-extrabold text-slate-800">
              Incident Location
            </h2>
          </div>

          <div className="bg-white rounded-[2rem] p-3 shadow-sm border border-slate-100">
            <div
              ref={mapContainer}
              className="h-44 rounded-[1.5rem] z-0 overflow-hidden"
            />
            <div className="flex items-center justify-between mt-3 px-1">
              <div className="flex gap-4">
                <div>
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
                    Lat
                  </p>
                  <p className="text-[11px] font-mono font-bold text-slate-600">
                    {lat || "---"}
                  </p>
                </div>
                <div>
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
                    Lng
                  </p>
                  <p className="text-[11px] font-mono font-bold text-slate-600">
                    {lng || "---"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={getLocation}
                className="bg-slate-900 text-white p-2.5 rounded-xl hover:bg-indigo-600 transition-colors active:scale-90"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* 3. IMAGES SECTION */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
            <h2 className="text-xl font-extrabold text-slate-800">
              Visual Evidence
            </h2>
          </div>

          <div className="bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm">
            {imagePreview ? (
              <div className="relative rounded-[1.5rem] overflow-hidden aspect-video">
                <img
                  src={imagePreview}
                  className="w-full h-full object-cover"
                  alt="preview"
                />
                <button
                  onClick={() => setImagePreview(null)}
                  className="absolute top-2 right-2 bg-white/90 backdrop-blur text-red-500 p-2 rounded-full shadow-lg"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => triggerInput("camera")}
                  className="flex flex-col items-center justify-center py-8 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100 transition-all"
                >
                  <span className="text-2xl mb-1">📸</span>
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    Camera
                  </span>
                </button>
                <button
                  onClick={() => triggerInput("upload")}
                  className="flex flex-col items-center justify-center py-8 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-100 transition-all"
                >
                  <span className="text-2xl mb-1">📂</span>
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    Gallery
                  </span>
                </button>
              </div>
            )}
          </div>
        </section>

        {/* FLOATING SUBMIT BUTTON */}
        <div className="fixed bottom-8 left-0 right-0 px-6 max-w-md mx-auto z-[50]">
          <button className="w-full py-5 bg-slate-900 text-white rounded-[1.75rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-indigo-600 active:scale-[0.98] transition-all">
            Upload Report
          </button>
        </div>
      </main>

      <input
        type="file"
        ref={cameraInput}
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
      />
      <input
        type="file"
        ref={fileInput}
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
