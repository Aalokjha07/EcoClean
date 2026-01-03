import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Bell,
  Menu,
  X,
  MapPin,
  LogOut,
  ChevronRight,
  Eye,
  Info,
} from "lucide-react";

const StaffActiveTasks = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [selectedTask, setSelectedTask] = useState(null); // State for Detail Modal

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const tasks = [
    {
      id: 1,
      priority: "high",
      label: "Urgent Fix",
      time: "2 mins ago",
      title: "Chemical Spill - Sector 9",
      description:
        "Large container leak near the main drainage inlet. Immediate containment needed. Avoid direct contact without Level 3 PPE.",
      location: "Block C - Main Entrance",
      reportedBy: "Sensor Unit 04",
    },
    {
      id: 2,
      priority: "medium",
      label: "Sanitation",
      time: "14 mins ago",
      title: "Overflowing Bin - Mall",
      description:
        "Garbage bins at Gate 4 are full. Residents reporting odor issues. Requires standard waste disposal unit.",
      location: "Gate 4 Entrance",
      reportedBy: "Citizen App",
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
            className="p-2 hover:bg-slate-50 rounded-full mr-1 transition-colors"
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

      {/* Detail Modal Overlay */}
      {selectedTask && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-start mb-6">
              <div className="bg-blue-50 p-3 rounded-2xl text-blue-600">
                <Info size={24} />
              </div>
              <button
                onClick={() => setSelectedTask(null)}
                className="p-2 bg-slate-100 rounded-full text-slate-400"
              >
                <X size={20} />
              </button>
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">
              {selectedTask.title}
            </h3>
            <div className="flex gap-2 mb-6">
              <span className="text-[10px] font-black uppercase bg-slate-100 px-3 py-1 rounded-full text-slate-500">
                {selectedTask.location}
              </span>
              <span className="text-[10px] font-black uppercase bg-blue-50 px-3 py-1 rounded-full text-blue-600">
                {selectedTask.priority} Priority
              </span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed mb-8">
              {selectedTask.description}
            </p>
            <button
              onClick={() => navigate("/staff/report-fix")}
              className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-blue-100"
            >
              View Detail
            </button>
          </div>
        </div>
      )}

      {/* Side Menu Drawer Logic... */}

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
              className={`bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm transition-all ${
                task.priority === "high"
                  ? "border-l-4 border-l-blue-600 shadow-[0_4px_20px_rgba(59,130,246,0.08)]"
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
              <p className="text-xs text-slate-500 mt-1 font-medium truncate">
                {task.description}
              </p>

              <div className="mt-4 flex flex-col gap-4 border-t border-slate-50 pt-4">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-slate-400" />
                  <span className="text-[10px] font-bold text-slate-600 uppercase">
                    {task.location}
                  </span>
                </div>

                <div className="flex gap-2">
                  {/* NEW VIEW DETAIL BUTTON */}
                  <button
                    onClick={() => setSelectedTask(task)}
                    className="flex-1 flex items-center justify-center gap-2 bg-slate-50 text-slate-600 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all border border-slate-100"
                  >
                    <Eye size={14} />
                    View Detail
                  </button>

                  <button
                    onClick={() => navigate("/staff/report-fix")}
                    className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 active:scale-95 transition-all shadow-md"
                  >
                    Process
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default StaffActiveTasks;
