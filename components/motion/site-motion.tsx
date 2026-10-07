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
    return initializeSiteMotion(root.current);
  }, [pathname]);

  return <div ref={root}>{children}</div>;
}
