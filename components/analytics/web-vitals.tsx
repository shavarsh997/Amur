"use client";

import { useReportWebVitals } from "next/web-vitals";
import { reportWebVital } from "@/lib/web-vitals";

export function WebVitals() {
  // Stable callback reference prevents duplicate subscriptions on re-renders.
  useReportWebVitals(reportWebVital);
  return null;
}
