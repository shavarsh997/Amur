"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

import { initializeSiteMotion } from "@/lib/site-motion";

/** Server-rendered children remain readable before hydration and without JS. */
export function SiteMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!root.current) return;
    const stopMotion = initializeSiteMotion(root.current);
    return () => {
      stopMotion();
    };
  }, [pathname]);

  return (
    <div className="site-page-content" ref={root}>
      {children}
    </div>
  );
}
