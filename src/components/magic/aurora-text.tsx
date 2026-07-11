"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface AuroraTextProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  speed?: number;
}

export const AuroraText = React.memo(function AuroraText({
  children,
  className,
  colors = ["#FF6C2F", "#FFD1B8", "#FFFFFF", "#7DD3FC"],
  speed = 1,
}: AuroraTextProps) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(135deg, ${colors.join(", ")}, ${colors[0]})`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animationDuration: `${10 / speed}s`,
  } as React.CSSProperties;

  return (
    <span className={cn("relative inline-block", className)}>
      <span className="sr-only">{children}</span>
      <span
        aria-hidden="true"
        className="animate-aurora relative bg-[length:200%_auto] bg-clip-text text-transparent"
        style={gradientStyle}
      >
        {children}
      </span>
    </span>
  );
});

AuroraText.displayName = "AuroraText";