"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function ShimmerButton({ className, children, ...props }: ShimmerButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/10 bg-black px-8 py-4 font-mono text-[11px] font-bold uppercase tracking-widest text-white transition-transform duration-300 active:scale-[0.98]",
        "before:absolute before:inset-0 before:bg-[linear-gradient(110deg,transparent_20%,rgba(255,255,255,0.12)_35%,rgba(255,108,47,0.28)_50%,rgba(255,255,255,0.12)_65%,transparent_80%)] before:bg-[length:200%_100%] before:animate-shimmer before:opacity-80",
        "after:absolute after:inset-px after:rounded-full after:bg-black after:transition-colors group-hover:after:bg-zinc-950",
        className
      )}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}
