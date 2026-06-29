import { useIncidentStore } from '@/stores/incident-store';
import { Map, MapPin } from 'lucide-react';

export function MultiIncidentMap() {
  const incidentsObj = useIncidentStore(state => state.incidents);
  const activeIncidentId = useIncidentStore(state => state.activeIncidentId);
  const setActiveIncident = useIncidentStore(state => state.setActiveIncident);
  
  const incidents = Object.values(incidentsObj).filter(i => i.status !== 'RESOLVED');

  // Pseudo-random coordinates for mock markers based on ID string
  const getCoordinates = (id: string) => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) hash = id.charCodeAt(i) + ((hash << 5) - hash);
    const top = 20 + Math.abs((Math.sin(hash) * 60)); // 20% to 80%
    const left = 20 + Math.abs((Math.cos(hash) * 60)); // 20% to 80%
    return { top: `${top}%`, left: `${left}%` };
  };

  return (
    <div className="relative w-full h-full min-h-[400px] bg-slate-100 dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 overflow-hidden flex items-center justify-center">
      {/* Map Background Pattern (Simulated map) */}
      <div className="absolute inset-0 opacity-20 dark:opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      
      {/* City grid simulation */}
      <div className="absolute inset-0 border-[0.5px] border-slate-300 dark:border-slate-700 opacity-20 pointer-events-none" style={{ backgroundSize: '100px 100px', backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)' }}></div>
      
      {/* Title */}
      <div className="absolute top-4 left-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-3 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm z-10 flex items-center gap-2">
        <Map className="w-5 h-5 text-indigo-500" />
        <span className="font-bold text-sm text-slate-900 dark:text-white">City Operations Map</span>
      </div>

      {/* Markers */}
      {incidents.map(incident => {
        const isActive = incident.id === activeIncidentId;
        const color = incident.riskLevel === 'CRITICAL' ? 'text-rose-500' :
                      incident.riskLevel === 'HIGH' ? 'text-orange-500' :
                      incident.riskLevel === 'MEDIUM' ? 'text-amber-500' : 'text-emerald-500';
        const bg = incident.riskLevel === 'CRITICAL' ? 'bg-rose-500' :
                   incident.riskLevel === 'HIGH' ? 'bg-orange-500' :
                   incident.riskLevel === 'MEDIUM' ? 'bg-amber-500' : 'bg-emerald-500';
                   
        const pos = getCoordinates(incident.id);
        
        return (
          <div 
            key={incident.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
            style={pos}
            onClick={() => setActiveIncident(incident.id)}
          >
            {isActive && (
              <div className="absolute inset-0 animate-ping rounded-full opacity-75 bg-indigo-400"></div>
            )}
            <div className={`relative flex items-center justify-center ${isActive ? 'scale-150 z-30' : 'hover:scale-125'} transition-transform`}>
              <MapPin className={`w-8 h-8 ${color} drop-shadow-md`} fill="currentColor" />
              <div className="absolute top-2 w-2 h-2 bg-white rounded-full"></div>
            </div>

            {/* Hover Tooltip */}
            <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-white dark:bg-slate-800 rounded-lg p-3 shadow-xl border border-slate-200 dark:border-slate-700 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity ${isActive ? 'opacity-100 z-40' : ''}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className={`w-2 h-2 rounded-full ${bg}`}></span>
                <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">{incident.incidentNumber}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium truncate">{incident.title}</p>
              <div className="mt-1 text-[10px] text-slate-500">{incident.status.replace(/_/g, ' ')}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
