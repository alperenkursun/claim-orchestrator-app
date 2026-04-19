import { CheckCircle2, Clock, AlertCircle } from "lucide-react";

interface NodeWrapperProps {
  title: string;
  status: string;
  children: React.ReactNode;
}

export default function NodeWrapper({ title, status, children }: NodeWrapperProps) {
  const isCompleted = status.includes("Completed") || status === "Closed";
  const isPending = status.includes("Pending") || status.includes("Continues");

  return (
    <div className="relative pl-8 md:pl-0">
      <div className="md:hidden absolute left-[15px] top-8 bottom-[-32px] w-[2px] bg-slate-200" />
      
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-4 mb-4 gap-3">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${isCompleted ? 'bg-green-100 text-green-600' : isPending ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>
              {isCompleted ? <CheckCircle2 size={20} /> : isPending ? <Clock size={20} /> : <AlertCircle size={20} />}
            </div>
            <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
          </div>
          <span className={`px-3 py-1 text-xs font-medium rounded-full w-fit ${isCompleted ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
            {status}
          </span>
        </div>
        
        <div className="text-sm text-slate-600 grid grid-cols-1 md:grid-cols-2 gap-4">
          {children}
        </div>
      </div>
    </div>
  );
}

export const DetailRow = ({ label, value }: { label: string; value: string | undefined }) => {
  if (!value) return null;
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">{label}</span>
      <span className="font-medium text-slate-700">{value}</span>
    </div>
  );
};