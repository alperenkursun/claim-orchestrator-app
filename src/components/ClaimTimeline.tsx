import type { ProcessDetailType } from "../types/schema";
import { NodeRegistry } from "./nodes/NodeRegistry";

interface ClaimTimelineProps {
  details: ProcessDetailType[];
}

export default function ClaimTimeline({ details }: ClaimTimelineProps) {
  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-8 px-4 md:px-0">Process History</h2>
      
      <div className="relative">
        <div className="hidden md:block absolute left-7 top-4 bottom-0 w-0.5 bg-slate-200" />
        
        <div className="flex flex-col gap-2">
          {details.map((step, index) => {
            const Component = NodeRegistry[step.title];

            if (!Component) {
              return <div key={index} className="text-red-500">Bilinmeyen Node Tipi: {step.title}</div>;
            }

            return (
              <div key={index} className="relative">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                <Component data={step as any} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}