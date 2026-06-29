import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { renderToString } from "react-dom/server";
import { AlertCircle, PlusCircle, HeartPulse, Shield } from "lucide-react";
import { LocationPopup } from "./LocationPopup";
import { ReactNode } from "react";

export type MarkerType = "Incident" | "Reporter" | "Volunteer" | "Hospital" | "SafeZone" | "Police" | "Fire" | "Ambulance" | "NGO";

interface IncidentMarkerProps {
  position: [number, number];
  type?: MarkerType;
  // Popup Data
  locationString?: string;
  displayName?: string;
  riskLevel?: string;
  summary?: string;
  hazards?: string[];
  requiresConfirmation?: boolean;
  recommendedAction?: string;
}

// React component that acts as the marker HTML
const MarkerHTML = ({ type }: { type: MarkerType }) => {
  let icon: ReactNode;
  let colorClass = "";

  switch (type) {
    case "Incident":
      icon = <AlertCircle className="w-5 h-5 text-white drop-shadow-md" />;
      colorClass = "bg-rose-500";
      break;
    case "Reporter":
      icon = <UserIcon />;
      colorClass = "bg-blue-500";
      break;
    case "Hospital":
      icon = <HeartPulse className="w-5 h-5 text-white" />;
      colorClass = "bg-emerald-500";
      break;
    case "Volunteer":
    case "NGO":
      icon = <PlusCircle className="w-5 h-5 text-white" />;
      colorClass = "bg-purple-500";
      break;
    case "SafeZone":
      icon = <Shield className="w-5 h-5 text-white" />;
      colorClass = "bg-indigo-500";
      break;
    case "Police":
      icon = <Shield className="w-5 h-5 text-white" />;
      colorClass = "bg-blue-500";
      break;
    case "Fire":
      icon = <AlertCircle className="w-5 h-5 text-white" />;
      colorClass = "bg-red-500";
      break;
    case "Ambulance":
      icon = <HeartPulse className="w-5 h-5 text-white" />;
      colorClass = "bg-emerald-500";
      break;
  }

  // The CSS animations 'animate-marker-drop', 'animate-marker-bounce', etc. 
  // need to be defined in globals.css
  return (
    <div className="relative flex items-center justify-center w-10 h-10 -ml-5 -mt-10 animate-marker-drop">
      {/* Pulse ring behind */}
      <div className={`absolute inset-0 rounded-full opacity-50 animate-ping ${colorClass}`} />
      
      {/* Main marker pin (teardrop shape) */}
      <div className={`relative flex items-center justify-center w-10 h-10 rounded-full rounded-br-none -rotate-45 shadow-xl border-2 border-white dark:border-slate-900 ${colorClass}`}>
        {/* Rotate the icon back so it stands upright */}
        <div className="rotate-45">
          {icon}
        </div>
      </div>
    </div>
  );
};

// Fallback icon component for Reporter since we didn't import User
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

export function IncidentMarker({ 
  position, 
  type = "Incident",
  locationString,
  displayName,
  riskLevel,
  summary,
  hazards,
  requiresConfirmation,
  recommendedAction
}: IncidentMarkerProps) {
  
  // Create a custom Leaflet DivIcon
  const html = renderToString(<MarkerHTML type={type} />);
  const customIcon = L.divIcon({
    html,
    className: 'custom-leaflet-marker', // removing default background
    iconSize: [0, 0], // The size is handled by our HTML
    iconAnchor: [0, 0], // The anchor is handled by margin inside the HTML
    popupAnchor: [0, -40] // Pop up above the teardrop
  });

  return (
    <Marker position={position} icon={customIcon}>
      {locationString && displayName && riskLevel && summary && hazards && recommendedAction && (
        <Popup>
          <LocationPopup 
            locationString={locationString}
            displayName={displayName}
            riskLevel={riskLevel}
            summary={summary}
            hazards={hazards}
            requiresConfirmation={!!requiresConfirmation}
            recommendedAction={recommendedAction}
          />
        </Popup>
      )}
    </Marker>
  );
}
