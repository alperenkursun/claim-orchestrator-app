import { AlertCircle, Clock, FileText, ChevronRight } from "lucide-react";
import type { ClaimDataType, ProcessDetailType } from "../types/schema";

export default function Sidebar({ data }: { data: ClaimDataType }) {
  const actionNode = data.processDetails.find(d => d.title === "Deduction Reason") as Extract<ProcessDetailType, { title: "Deduction Reason" }> | undefined;
  const actionText = actionNode?.actionRequired;

  return (
    <div className="space-y-4 lg:sticky lg:top-20">
      <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 group">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-white/15 rounded-lg backdrop-blur-md">
            <FileText size={18} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Claim File</span>
        </div>
        <h2 className="text-2xl font-extrabold tracking-tight mb-4 group-hover:translate-x-1 transition-transform">{data.fileNo}</h2>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-md border border-white/10 w-fit">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[9px] font-bold uppercase tracking-wider">{data.currentStatus}</span>
        </div>
      </div>

      <div className="flex flex-row lg:flex-col gap-3">
        <div className="flex-1 bg-white border border-slate-200/60 p-4 rounded-xl shadow-sm hover:shadow-md cursor-pointer transition-all flex items-center gap-3 min-w-35">
          <div className="shrink-0 p-2.5 bg-amber-50 text-amber-600 rounded-lg">
            <Clock size={18} />
          </div>
          <div className="overflow-hidden">
            <p className="text-[9px] font-bold text-slate-400 uppercase leading-none mb-1">Estimated</p>
            <p className="text-sm font-bold text-slate-800 truncate">{data.estimatedRemainingTime}</p>
          </div>
        </div>

        <div className={`flex-1 p-4 rounded-xl border shadow-sm hover:shadow-md cursor-pointer transition-all flex items-center gap-3 min-w-35
          ${actionText ? 'bg-rose-50/50 border-rose-100' : 'bg-emerald-50/50 border-emerald-100'}`}>
          <div className="shrink-0 p-2.5 bg-white rounded-lg shadow-xs">
            <AlertCircle size={18} className={actionText ? 'text-rose-500' : 'text-emerald-500'} />
          </div>
          <div className="overflow-hidden">
            <p className="text-[9px] font-bold text-slate-400 uppercase leading-none mb-1">Action</p>
            <p className={`text-sm font-bold truncate ${actionText ? 'text-rose-700' : 'text-emerald-700'}`}>
              {actionText ? "Required" : "Clear"}
            </p>
          </div>
        </div>
      </div>

      {actionText && (
        <button className="w-full bg-slate-900 text-white p-4 rounded-xl font-bold text-[11px] flex items-center justify-between hover:bg-indigo-600 cursor-pointer shadow-sm hover:shadow-md transition-all tracking-wide">
          COMPLETE REQUIREMENTS
          <ChevronRight size={16} />
        </button>
      )}
    </div>
  );
}