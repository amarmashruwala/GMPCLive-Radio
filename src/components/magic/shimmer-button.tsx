"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  ({ className, children, type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        {...props}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full bg-[#ff6c2f] px-8 py-4 font-mono text-[11px] font-bold uppercase tracking-widest text-white transition-colors duration-200 hover:bg-[#ff804a] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60",
          className
        )}
      >
        {children}
      </button>
    );
  }
);

ShimmerButton.displayName = "ShimmerButton";