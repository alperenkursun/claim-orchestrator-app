import { useEffect } from "react";
import { useClaimStore } from "./store/useClaimStore";
import { mockClaimData } from "./data/mockData";
import ClaimTimeline from "./components/ClaimTimeline";
import Sidebar from "./components/Sidebar";


function App() {
  const { claimData, isLoading, setClaimData, addNode } = useClaimStore();

  useEffect(() => {
    const timer = setTimeout(() => setClaimData(mockClaimData), 1000);
    return () => clearTimeout(timer);
  }, [setClaimData]);

  const handleAddNote = () => {
    addNode(4, {
      title: "Information Note" as const,
      status: "Added Locally",
      note: "This is a dynamically added note using Zustand store.",
      id: Math.random().toString(36).substr(2, 9)
    });
  };

  if (isLoading || !claimData) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-slate-100 border-t-indigo-600 rounded-full animate-spin" />
        <p className="mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest animate-pulse">Synchronizing Data</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 selection:bg-indigo-100">
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-100 h-14">
        <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-indigo-600 rounded-md flex items-center justify-center shadow-sm">
              <span className="text-white font-black text-xs italic">M</span>
            </div>
            <h1 className="font-black text-xs tracking-tighter text-slate-800 uppercase">Orchestrator</h1>
          </div>
          <img src="https://picsum.photos/seed/miox/32/32" className="w-8 h-8 rounded-full border border-slate-200 shadow-sm cursor-pointer" />
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <aside className="lg:col-span-4 order-1">
            <Sidebar data={claimData} />
          </aside>

          <section className="lg:col-span-8 order-2">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-black text-slate-800 tracking-tighter">Process History</h2>
              <button onClick={handleAddNote} className="text-[10px] font-bold text-white bg-slate-900 px-4 py-2 rounded-lg hover:bg-indigo-600 cursor-pointer transition-all shadow-sm tracking-widest">
                + ADD NOTE
              </button>
            </div>
            <div className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm">
              <ClaimTimeline details={claimData.processDetails} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;