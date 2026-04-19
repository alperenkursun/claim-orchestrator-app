import { useState } from "react";
import { CheckCircle2, Clock, AlertCircle, Sparkles, X } from "lucide-react";

interface NodeWrapperProps {
  title: string;
  status: string;
  children: React.ReactNode;
}

export default function NodeWrapper({ title, status, children }: NodeWrapperProps) {
  const [isAIExplaining, setIsAIExplaining] = useState(false);
  
  const isCompleted = status.includes("Completed") || status === "Closed" || status.includes("Verified");
  const isPending = status.includes("In Progress") || status.includes("Pending");

  return (
    <div className="group relative pl-10 pb-8 last:pb-0">
      <div className="absolute left-2.75 top-2 bottom-0 w-0.5 bg-slate-100 group-last:hidden" />
      
      <div className={`absolute left-0 top-1.5 w-6 h-6 rounded-full border-[3px] border-white shadow-sm flex items-center justify-center z-10 transition-colors duration-500
        ${isCompleted ? 'bg-emerald-500' : isPending ? 'bg-amber-500' : 'bg-slate-300'}`}>
        {isCompleted ? <CheckCircle2 className="text-white w-2.5 h-2.5" /> : 
         isPending ? <Clock className="text-white w-2.5 h-2.5" /> : 
         <AlertCircle className="text-white w-2.5 h-2.5" />}
      </div>

      <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm hover:shadow-md cursor-pointer transition-all duration-300">
        <div className="flex items-center justify-between gap-3 mb-5">
          <h3 className="text-sm font-bold text-slate-800 tracking-tight">{title}</h3>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={(e) => { e.stopPropagation(); setIsAIExplaining(!isAIExplaining); }}
              className={`p-1.5 rounded-md transition-all cursor-pointer ${isAIExplaining ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-300 hover:text-indigo-500 hover:bg-indigo-50'}`}
              title="Explain with AI"
            >
              <Sparkles size={14} />
            </button>

            <span className={`px-2.5 py-1 text-[9px] font-black uppercase tracking-wider rounded-lg border transition-colors
              ${isCompleted ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                isPending ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                'bg-slate-50 text-slate-400 border-slate-100'}`}>
              {status}
            </span>
          </div>
        </div>

        {isAIExplaining && (
          <div className="mb-6 p-4 bg-linear-to-br from-indigo-50 to-violet-50 rounded-lg border border-indigo-100 relative animate-in fade-in slide-in-from-top-2 duration-300">
            <button onClick={() => setIsAIExplaining(false)} className="absolute top-2 right-2 text-indigo-400 hover:text-indigo-600 cursor-pointer">
              <X size={12} />
            </button>
            <div className="flex gap-2 items-start">
              <Sparkles size={14} className="text-indigo-600 mt-1 shrink-0" />
              <p className="text-[11px] text-indigo-900 leading-relaxed italic">
                <strong className="font-bold">Miox AI Assistant:</strong> "{title}" aşaması, sigorta poliçeniz kapsamındaki yasal süreçlerin doğrulandığı bir adımdır. Güncel verilerinizde herhangi bir tutarsızlık tespit edilmemiştir.
              </p>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
          {children}
        </div>
      </div>
    </div>
  );
}

export const DetailRow = ({ label, value }: { label: string; value: string | undefined }) => {
  if (!value) return null;
  return (
    <div className="flex flex-col">
      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tight mb-0.5">{label}</span>
      <span className="text-sm font-semibold text-slate-600 leading-tight">{value}</span>
    </div>
  );
}