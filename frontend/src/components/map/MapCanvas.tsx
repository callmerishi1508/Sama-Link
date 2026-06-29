"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import { geocodeLocation, Coordinates } from "@/lib/geocoding";
import { MapPlaceholder } from "./MapPlaceholder";
import { IncidentMarker } from "./IncidentMarker";
import { DangerRadius } from "./DangerRadius";
import { Loader2 } from "lucide-react";
import "leaflet/dist/leaflet.css";
import { useUIStore } from "@/stores/ui-store";

interface MapCanvasProps {
  locations: string[];
  riskLevel: string;
  summary: string;
  hazards: string[];
  requiresConfirmation: boolean;
  recommendedAction: string;
}

// Responder Routes Overlay
const ResponderRoutes = ({ target }: { target: [number, number] }) => {
  const responders = [
    { type: 'Ambulance' as const, latOffset: -0.005, lonOffset: 0.008, color: '#10b981' },
    { type: 'Police' as const, latOffset: 0.006, lonOffset: -0.004, color: '#3b82f6' },
    { type: 'Volunteer' as const, latOffset: -0.003, lonOffset: -0.007, color: '#a855f7' }
  ];

  return (
    <>
      {responders.map((r, i) => {
        const source: [number, number] = [target[0] + r.latOffset, target[1] + r.lonOffset];
        return (
          <div key={i}>
            <IncidentMarker position={source} type={r.type} />
            <Polyline 
              positions={[source, target]} 
              pathOptions={{ color: r.color, weight: 3, dashArray: '10, 10', className: 'animate-route-dash' }} 
            />
          </div>
        );
      })}
    </>
  );
};

// Custom bounds adjuster
const BoundsAdjuster = ({ coordsList }: { coordsList: Coordinates[] }) => {
  const map = useMap();
  
  useEffect(() => {
    if (coordsList.length === 1) {
      map.setView([coordsList[0].lat, coordsList[0].lon], 15, { animate: true });
    } else if (coordsList.length > 1) {
      const bounds = L.latLngBounds(coordsList.map(c => [c.lat, c.lon]));
      map.fitBounds(bounds, { padding: [50, 50], animate: true });
    }
  }, [coordsList, map]);
  
  return null;
};

export function MapCanvas({ 
  locations, 
  riskLevel, 
  summary, 
  hazards, 
  requiresConfirmation, 
  recommendedAction 
}: MapCanvasProps) {
  const [coordsList, setCoordsList] = useState<Coordinates[]>([]);
  const [loading, setLoading] = useState(true);
  const { demoMode, revealStage } = useUIStore();

  useEffect(() => {
    if (!locations || locations.length === 0) {
      return;
    }

    const fetchCoords = async () => {
      const results: Coordinates[] = [];
      for (const loc of locations) {
        const coords = await geocodeLocation(loc);
        if (coords) results.push(coords);
      }
      setCoordsList(results);
      setLoading(false);
    };

    fetchCoords();
  }, [locations]);

  // Prevent Leaflet initialization until Judge Mode allows it (if demoMode is on)
  const isRevealed = !demoMode || revealStage >= 5;

  if (loading) {
    return (
      <div className="w-full h-full min-h-[400px] rounded-2xl glass-panel border border-slate-200/50 dark:border-slate-800/50 flex flex-col items-center justify-center bg-white/40 dark:bg-black/40 backdrop-blur-xl">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-4" />
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 tracking-wide animate-pulse">Initializing geospatial intelligence...</p>
      </div>
    );
  }

  if (!isRevealed) {
    return <div className="w-full h-full min-h-[400px] rounded-2xl" />;
  }

  if (coordsList.length === 0) {
    return <MapPlaceholder />;
  }

  // Determine overall confidence
  const avgConfidence = coordsList.reduce((acc, c) => acc + (c.confidence_score || 0), 0) / coordsList.length;

  return (
    <div className="w-full h-[400px] lg:h-[500px] relative rounded-2xl overflow-hidden border border-slate-200/50 dark:border-slate-800/50 shadow-xl bg-slate-100 dark:bg-slate-900">
      
      <div className="absolute top-4 left-4 z-[400] flex flex-col gap-2 pointer-events-none">
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 flex items-center gap-2 w-max">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold tracking-wider uppercase text-slate-700 dark:text-slate-300">Live Telemetry</span>
        </div>
        
        {/* Location Confidence Indicator */}
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 flex items-center gap-2 w-max group pointer-events-auto cursor-help">
          <div className="relative w-4 h-4">
            <svg viewBox="0 0 36 36" className="w-4 h-4 circular-chart text-indigo-500">
              <path className="circle-bg text-slate-200 dark:text-slate-700"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" strokeWidth="4" stroke="currentColor" fill="none"
              />
              <path className="circle text-current"
                strokeDasharray={`${avgConfidence * 100}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" strokeWidth="4" stroke="currentColor" fill="none"
              />
            </svg>
          </div>
          <span className="text-xs font-semibold tracking-wider uppercase text-slate-700 dark:text-slate-300">
            {Math.round(avgConfidence * 100)}% Confidence
          </span>
          <div className="absolute top-full left-0 mt-2 p-3 w-48 bg-slate-900 text-white text-[10px] rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
            Based on address specificity and multi-location consistency.
          </div>
        </div>
      </div>

      <MapContainer 
        center={[coordsList[0].lat, coordsList[0].lon]} 
        zoom={14} 
        scrollWheelZoom={false}
        className="w-full h-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="map-tiles"
        />
        
        {coordsList.map((coords, i) => (
          <div key={i}>
            {/* Primary Incident Marker (the first one) */}
            <IncidentMarker 
              position={[coords.lat, coords.lon]} 
              type="Incident"
              locationString={locations[i]}
              displayName={coords.display_name}
              riskLevel={riskLevel}
              summary={summary}
              hazards={hazards}
              requiresConfirmation={requiresConfirmation}
              recommendedAction={recommendedAction}
            />
            {i === 0 && (
              <>
                <DangerRadius center={[coords.lat, coords.lon]} riskLevel={riskLevel} />
                <ResponderRoutes target={[coords.lat, coords.lon]} />
              </>
            )}
          </div>
        ))}

        <BoundsAdjuster coordsList={coordsList} />
      </MapContainer>
    </div>
  );
}
