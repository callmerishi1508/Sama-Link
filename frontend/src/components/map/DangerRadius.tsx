import { useEffect, useState } from "react";

// For Leaflet we need to dynamically import Circle to avoid SSR issues
// But since this component will be rendered INSIDE MapCanvas (which is dynamically imported),
// we can safely import it here. Wait, it's better to just receive the Circle component as a prop or rely on the parent's context.
// Wait, react-leaflet hooks/components are safe IF the parent is dynamically imported with ssr: false.
import { Circle } from "react-leaflet";

interface DangerRadiusProps {
  center: [number, number];
  riskLevel: string;
}

const getRadiusForRisk = (level: string) => {
  switch (level) {
    case "CRITICAL": return 1000;
    case "HIGH": return 500;
    case "MEDIUM": return 250;
    case "LOW":
    default: return 100;
  }
};

const getColorForRisk = (level: string) => {
  switch (level) {
    case "CRITICAL": return "#f43f5e"; // rose-500
    case "HIGH": return "#f97316"; // orange-500
    case "MEDIUM": return "#f59e0b"; // amber-500
    case "LOW":
    default: return "#10b981"; // emerald-500
  }
};

export function DangerRadius({ center, riskLevel }: DangerRadiusProps) {
  const targetRadius = getRadiusForRisk(riskLevel);
  const color = getColorForRisk(riskLevel);
  const [currentRadius, setCurrentRadius] = useState(0);

  useEffect(() => {
    // Animate radius expanding
    const duration = 1000; // 1 second
    const frames = 60;
    const interval = duration / frames;
    const step = targetRadius / frames;
    
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= targetRadius) {
        setCurrentRadius(targetRadius);
        clearInterval(timer);
      } else {
        setCurrentRadius(current);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [targetRadius]);

  return (
    <Circle 
      center={center}
      radius={currentRadius}
      pathOptions={{
        color,
        fillColor: color,
        fillOpacity: 0.15,
        weight: 2,
        dashArray: "5, 10"
      }}
    />
  );
}
