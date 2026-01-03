import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Bell, Menu, X, MapPin, LogOut } from "lucide-react";

const StaffActiveTasks = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const tasks = [
    {
      id: 1,
      priority: "high",
      label: "Urgent Fix",
      time: "2 mins ago",
      title: "Chemical Spill - Sector 9",
      description:
        "Large container leak near the main drainage inlet. Immediate containment needed.",
      location: "Block C",
    },
    {
      id: 2,
      priority: "medium",
      label: "Sanitation",
      time: "14 mins ago",
      title: "Overflowing Bin - Mall",
      description: "Garbage bins at Gate 4 are full.",
      location: "Gate 4 Entrance",
    },
  ];

  const filteredTasks =
    filter === "all" ? tasks : tasks.filter((task) => task.priority === filter);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-['Plus_Jakarta_Sans'] flex flex-col items-center pb-12">
      {/* Navigation */}
      <nav className="w-full bg-white/80 backdrop-blur-md border-b border-slate-50 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-slate-50 rounded-full transition-colors mr-1"
          >
            <ArrowLeft size={20} strokeWidth={2.5} />
          </button>
          <span className="text-xl font-extrabold text-slate-900 tracking-tighter">
            EcoClean
          </span>
          <span className="bg-blue-600 text-[9px] font-black text-white px-2 py-0.5 rounded-md uppercase tracking-widest">
            Staff
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button className="p-2.5 hover:bg-slate-50 rounded-xl relative group transition-colors">
            <div className="w-2 h-2 bg-blue-600 rounded-full absolute top-2.5 right-2.5 border-2 border-white animate-pulse"></div>
            <Bell
              size={24}
              className="text-slate-400 group-hover:text-blue-600"
            />
          </button>
          <button
            onClick={toggleMenu}
            className="p-2.5 hover:bg-slate-50 rounded-xl group transition-colors"
          >
            <Menu
              size={24}
              className="text-slate-400 group-hover:text-slate-900"
            />
          </button>
        </div>
      </nav>

      {/* Side Menu Drawer */}
      <div
        className={`fixed inset-0 z-[60] transition-all duration-300 ${
          isMenuOpen ? "visible" : "invisible"
        }`}
      >
        <div
          onClick={toggleMenu}
          className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        ></div>
        <div
          className={`absolute top-0 right-0 bottom-0 w-72 bg-white shadow-2xl p-6 flex flex-col transition-transform duration-300 transform ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-extrabold text-lg text-slate-800">Menu</h2>
            <button
              onClick={toggleMenu}
              className="text-slate-400 hover:text-slate-600"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-8 flex-grow">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 ml-2">
                Operations
              </p>
              <div className="space-y-1">
                <Link
                  to="/staff"
                  className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-50 rounded-2xl font-bold text-sm transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/staff/active-tasks"
                  className="flex items-center gap-3 p-3 bg-blue-50 text-blue-600 rounded-2xl font-bold text-sm"
                >
                  Active Tasks
                </Link>
                <Link
                  to="/staff/my-fixes"
                  className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-50 rounded-2xl font-bold text-sm transition-colors"
                >
                  My Fixes
                </Link>
                <Link
                  to="/staff/fleet-map"
                  className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-50 rounded-2xl font-bold text-sm transition-colors"
                >
                  Fleet Map
                </Link>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 ml-2">
                Management
              </p>
              <div className="space-y-1">
                <a
                  href="/staff/analytics"
                  className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-50 rounded-2xl font-bold text-sm transition-colors"
                >
                  Analytics
                </a>
                <a
                  href="/staff/settings"
                  className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-50 rounded-2xl font-bold text-sm transition-colors"
                >
                  Staff Settings
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-50 rounded-2xl font-bold text-sm transition-colors"
                >
                  Support
                </a>
              </div>
            </div>
          </div>

          <button className="mt-auto border-t border-slate-100 pt-6 flex items-center gap-3 p-3 text-red-500 font-bold text-sm hover:bg-red-50 rounded-2xl transition-colors">
            <LogOut size={20} />
            Logout System
          </button>
        </div>
      </div>

      <main className="p-6 w-full max-w-md space-y-6">
        <div className="px-2">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Active Tasks
          </h2>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">
            Found{" "}
            <span className="text-blue-600">
              {filteredTasks.length} pending
            </span>{" "}
            issues
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-2 px-1">
          {["all", "high", "medium", "low"].map((p) => (
            <button
              key={p}
              onClick={() => setFilter(p)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest border transition-all ${
                filter === p
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-slate-50 text-slate-500 border-slate-100"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm transition-all active:scale-[0.98] ${
                task.priority === "high"
                  ? "border-l-4 border-l-blue-600 shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                  : ""
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <span
                  className={`px-3 py-1 text-[9px] font-black rounded-full uppercase tracking-tighter ${
                    task.priority === "high"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {task.label}
                </span>
                <span className="text-[10px] font-bold text-slate-400">
                  {task.time}
                </span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 leading-tight">
                {task.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                {task.description}
              </p>

              <div className="mt-4 flex items-center justify-between border-t border-slate-50 pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-xs text-slate-600">
                    <MapPin size={14} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-600 uppercase">
                    {task.location}
                  </span>
                </div>
                <button
                  onClick={() => navigate("/report-fix")}
                  className="bg-slate-900 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-colors"
                >
                  Process
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default StaffActiveTasks;
