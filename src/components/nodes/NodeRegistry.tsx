/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import type { ProcessDetailType } from "../../types/schema";
import NodeWrapper, { DetailRow } from "./NodeWrapper";
import { useClaimStore } from "../../store/useClaimStore";
import { Trash2, UploadCloud, CheckCircle2 } from "lucide-react";

const TowingNode = ({ data }: { data: Extract<ProcessDetailType, { title: "Towing Service" }> }) => (
  <NodeWrapper title={data.title} status={data.status}>
    <DetailRow label="Pickup Location" value={data.pickupLocation} />
    <DetailRow label="Towing Date" value={data.towingDate} />
  </NodeWrapper>
);

const DeductionNode = ({ data }: { data: Extract<ProcessDetailType, { title: "Deduction Reason" }> }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);

  const handleSimulateUpload = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setIsAnalyzed(true);
    }, 2000);
  };

  return (
    <NodeWrapper title={data.title} status={isAnalyzed ? "Verified by AI" : data.status}>
      <DetailRow label="Policy Deductible" value={data.policyDeductible} />
      <DetailRow label="Non-Damage Amount" value={data.nonDamageAmount} />
      <div className="col-span-full mt-4 p-4 border border-dashed border-slate-200 rounded-xl bg-slate-50 flex flex-col items-center justify-center gap-2 transition-all">
        {isAnalyzed ? (
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-[10px] animate-in zoom-in-95">
            <CheckCircle2 size={14} /> CERTIFICATE VALIDATED BY AI
          </div>
        ) : (
          <>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight text-center">{data.actionRequired}</p>
            <button 
              onClick={handleSimulateUpload}
              disabled={isAnalyzing}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-700 hover:border-indigo-400 cursor-pointer disabled:opacity-50 transition-all"
            >
              <UploadCloud size={14} className="text-indigo-500" />
              {isAnalyzing ? "AI ANALYZING..." : "UPLOAD & ANALYZE"}
            </button>
          </>
        )}
      </div>
    </NodeWrapper>
  );
};

const InformationNoteNode = ({ data }: { data: Extract<ProcessDetailType, { title: "Information Note" }> }) => {
  const removeNode = useClaimStore((state) => state.removeNode);
  return (
    <NodeWrapper title={data.title} status={data.status}>
      <div className="col-span-full flex flex-col gap-2">
        <p className="text-sm font-medium text-slate-600 italic">"{data.note}"</p>
        {data.id && (
          <button 
            onClick={(e) => { e.stopPropagation(); removeNode(data.id!); }}
            className="flex items-center gap-1.5 text-rose-500 hover:text-rose-700 text-[9px] font-bold uppercase tracking-widest cursor-pointer w-fit transition-colors"
          >
            <Trash2 size={12} /> Remove Note
          </button>
        )}
      </div>
    </NodeWrapper>
  );
};

const GenericNode = ({ data }: { data: any }) => {
  const entries = Object.entries(data).filter(([key]) => !['title', 'status', 'id'].includes(key));
  return (
    <NodeWrapper title={data.title} status={data.status}>
      {entries.map(([key, value]) => (
        <DetailRow key={key} label={key.replace(/([A-Z])/g, ' $1').trim()} value={String(value)} />
      ))}
    </NodeWrapper>
  );
};

export const NodeRegistry: Record<string, React.FC<{ data: any }>> = {
  "Towing Service": TowingNode,
  "Deduction Reason": DeductionNode,
  "Information Note": InformationNoteNode,
  "Claim Notification": GenericNode,
  "Appraisal": GenericNode,
  "Substitute Rental Vehicle": GenericNode,
  "File Review": GenericNode,
  "Payment Information": GenericNode,
  "Closed": GenericNode,
  "Additional Attachment": GenericNode,
};