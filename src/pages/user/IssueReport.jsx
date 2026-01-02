import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../components/Navbar";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function IssueReport() {
  const [imagePreview, setImagePreview] = useState(null);
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
      // Initialize Map
      const map = L.map(mapContainer.current, { zoomControl: false }).setView(
        [20.5937, 78.9629],
        5
      );
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
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

  const triggerInput = (type) => {
    if (type === "camera") cameraInput.current.click();
    else fileInput.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!imagePreview) {
      setModal({
        active: true,
        title: "Error",
        msg: "Please provide a photo.",
        isError: true,
      });
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setModal({
        active: true,
        title: "Success!",
        msg: "Report submitted successfully.",
        isError: false,
      });
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <Navbar title="Report Issue" showBack={true} />

      <main className="p-6 w-full max-w-md space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bento-card bg-white p-5 rounded-[2.5rem] shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-emerald-100 text-emerald-600 p-2 rounded-lg text-xs font-bold uppercase tracking-tighter">
                Photo
              </span>
              <h3 className="text-sm font-bold text-slate-700 tracking-wide">
                Visual Evidence
              </h3>
            </div>

            {imagePreview && (
              <div className="mb-4 rounded-3xl overflow-hidden ring-4 ring-slate-50">
                <img
                  src={imagePreview}
                  className="w-full h-48 object-cover"
                  alt="Preview"
                />
              </div>
            )}

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => triggerInput("camera")}
                className="w-full py-3 px-5 bg-emerald-50 text-emerald-700 rounded-2xl font-bold flex items-center justify-between border border-emerald-100 hover:bg-emerald-500 hover:text-white transition-all group"
              >
                <span className="text-sm">Open Camera</span>
                {/* Icons... */}
                <div className="p-2 bg-white rounded-xl shadow-sm group-hover:bg-emerald-400 transition-colors">
                  📸
                </div>
              </button>

              <button
                type="button"
                onClick={() => triggerInput("upload")}
                className="w-full py-3 px-5 bg-slate-50 text-slate-600 rounded-2xl font-bold flex items-center justify-between border border-slate-200 hover:bg-slate-200 transition-all group"
              >
                <span className="text-sm">Upload from Gallery</span>
                <div className="p-2 bg-white rounded-xl shadow-sm group-hover:bg-slate-300 transition-colors">
                  📂
                </div>
              </button>
            </div>

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

          <div className="bento-card bg-white p-5 rounded-[2.5rem] shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-100 text-blue-600 p-2 rounded-lg text-xs font-bold uppercase tracking-tighter">
                Info
              </span>
              <h3 className="text-sm font-bold text-slate-700 tracking-wide">
                Report Details
              </h3>
            </div>
            <textarea
              rows="3"
              required
              placeholder="Describe the issue..."
              className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm transition-all"
            ></textarea>
          </div>

          <div className="bento-card bg-slate-900 p-5 rounded-[2.5rem] shadow-xl text-white">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-slate-800 text-slate-400 p-2 rounded-lg text-xs font-bold uppercase tracking-tighter">
                GPS
              </span>
              <h3 className="text-sm font-bold text-slate-300 tracking-wide">
                Issue Location
              </h3>
            </div>
            <div
              ref={mapContainer}
              style={{ height: "220px", borderRadius: "24px", zIndex: 1 }}
            ></div>
            <div className="flex gap-2 mt-4">
              <input
                type="number"
                step="any"
                placeholder="Lat"
                value={lat}
                readOnly
                className="bg-slate-800 border-none rounded-xl p-3 w-full text-xs text-emerald-400 font-mono"
              />
              <input
                type="number"
                step="any"
                placeholder="Lng"
                value={lng}
                readOnly
                className="bg-slate-800 border-none rounded-xl p-3 w-full text-xs text-emerald-400 font-mono"
              />
            </div>
            <button
              type="button"
              onClick={getLocation}
              className="mt-3 w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-bold rounded-xl transition-all shadow-lg active:scale-95"
            >
              📍 Pin My Location
            </button>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-5 bg-emerald-600 text-white font-extrabold rounded-[2rem] shadow-2xl shadow-emerald-200 hover:bg-emerald-700 active:scale-[0.97] transition-all text-lg tracking-tight"
          >
            {isSubmitting ? "Processing..." : "SUBMIT REPORT"}
          </button>
        </form>
      </main>

      {/* Modal */}
      {modal.active && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-[3rem] p-10 max-w-sm w-full relative shadow-2xl text-center">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-800 mb-2">
              {modal.title}
            </h2>
            <p className="text-slate-500 mb-8">{modal.msg}</p>
            <button
              onClick={() => setModal({ ...modal, active: false })}
              className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
