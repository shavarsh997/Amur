"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

import { initializeSiteMotion } from "@/lib/site-motion";
import { initializeConstructionBackdrop } from "@/lib/construction-backdrop";

/** Server-rendered children remain readable before hydration and without JS. */
export function SiteMotion({
  children,
  backdrop,
}: {
  children: ReactNode;
  backdrop: ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!root.current) return;
    const stopMotion = initializeSiteMotion(root.current);
    const stopBackdrop = initializeConstructionBackdrop(root.current);
    return () => {
      stopMotion();
      stopBackdrop();
    };
  }, [pathname]);

  return (
    <div className="site-motion-shell" ref={root}>
      {backdrop}
      <div className="site-page-content">{children}</div>
    </div>
  );
}
