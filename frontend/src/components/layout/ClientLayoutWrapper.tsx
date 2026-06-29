"use client";

import { useUIStore } from "@/stores/ui-store";
import { useEffect } from "react";

export function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const { sidebarExpanded, isMobile, setIsMobile, setSidebarExpanded } = useUIStore();

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      if (mobile !== useUIStore.getState().isMobile) {
        setIsMobile(mobile);
        if (mobile) {
          setSidebarExpanded(false);
        }
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [setIsMobile, setSidebarExpanded]);

  return (
    <div 
      className={`transition-all duration-300 ease-in-out flex flex-col min-h-screen ${
        isMobile ? 'pl-0' : (sidebarExpanded ? 'pl-64' : 'pl-20')
      }`}
    >
      {children}
    </div>
  );
}
