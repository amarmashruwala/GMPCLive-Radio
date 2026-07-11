"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface AuroraBackgroundProps {
  className?: string;
}

export function AuroraBackground({ className }: AuroraBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]",
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,108,47,0.18),transparent_34%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_28%),radial-gradient(circle_at_bottom,rgba(120,119,198,0.2),transparent_42%)]" />
      <div className="aurora-orb aurora-orb-one absolute -left-16 top-1/3 h-72 w-72 rounded-full bg-[#ff6c2f]/20 blur-3xl" />
      <div className="aurora-orb aurora-orb-two absolute right-0 top-1/5 h-80 w-80 rounded-full bg-cyan-400/12 blur-3xl" />
      <div className="aurora-orb aurora-orb-three absolute bottom-[-4rem] left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.08),rgba(0,0,0,0.55))]" />
    </div>
  );
}
