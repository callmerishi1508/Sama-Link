"use client";

import { useUIStore } from "@/stores/ui-store";
import { ReactNode } from "react";

export function SpotlightContainer({ children }: { children: ReactNode }) {
  const { demoMode } = useUIStore();
  
  return (
    <div className={`relative w-full ${demoMode ? 'spotlight-mode' : ''}`}>
      {children}
    </div>
  );
}
