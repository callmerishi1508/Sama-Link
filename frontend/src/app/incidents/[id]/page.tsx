"use client";

import { useIncidentStore } from "@/stores/incident-store";
import { IncidentWorkspace } from "@/components/analysis/IncidentWorkspace";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function IncidentDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const { incidents, setActiveIncident } = useIncidentStore();
  const router = useRouter();

  const incident = incidents[id];

  useEffect(() => {
    if (!incident) {
      router.push("/incidents");
    } else if (useIncidentStore.getState().activeIncidentId !== id) {
      setActiveIncident(id);
    }
  }, [id, incident, router, setActiveIncident]);


  if (!incident) return null;

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800/60 bg-white/50 dark:bg-[#0a0a0a]/50 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Link 
            href="/incidents"
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">{incident.incidentNumber}</h1>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                incident.status === 'UNDERSTANDING' || incident.status === 'ASSESSMENT' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400' :
                incident.status === 'AWAITING_APPROVAL' || incident.status === 'NEW' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400' :
                incident.status === 'RESPONDING' || incident.status === 'RESOURCES_ASSIGNED' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400' :
                'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300'
              }`}>
                {incident.status.replace(/_/g, ' ')}
              </span>
            </div>
            <p className="text-sm text-slate-500">{incident.title}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/resources" className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 rounded-lg transition-colors">Resources</Link>
          <Link href="/communications" className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 rounded-lg transition-colors">Communications</Link>
          <Link href="/history" className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 rounded-lg transition-colors">History</Link>
        </div>
      </div>

      {/* Workspace Area */}
      <div className="flex-1 overflow-y-auto">
        <IncidentWorkspace incidentId={id} />
      </div>
    </div>
  );
}
