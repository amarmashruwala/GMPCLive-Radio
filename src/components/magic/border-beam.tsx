"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  duration?: number;
  delay?: number;
}

export function BorderBeam({ className, duration = 6, delay = 0 }: BorderBeamProps) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 rounded-[inherit]", className)}>
      <motion.div
        className="absolute left-0 top-0 h-px w-[140%] origin-left bg-gradient-to-r from-transparent via-[#ff6c2f] to-transparent opacity-70 blur-[0.5px]"
        initial={{ x: "-35%", opacity: 0.25 }}
        animate={{ x: "35%", opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration, repeat: Infinity, ease: "linear", delay }}
      />
      <motion.div
        className="absolute right-0 top-0 h-[140%] w-px origin-top bg-gradient-to-b from-transparent via-white to-transparent opacity-35 blur-[0.5px]"
        initial={{ y: "-35%" }}
        animate={{ y: "35%" }}
        transition={{ duration: duration * 1.1, repeat: Infinity, ease: "linear", delay: delay + 0.75 }}
      />
      <motion.div
        className="absolute bottom-0 left-0 h-px w-[140%] origin-right bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent opacity-50 blur-[0.5px]"
        initial={{ x: "35%" }}
        animate={{ x: "-35%" }}
        transition={{ duration: duration * 1.2, repeat: Infinity, ease: "linear", delay: delay + 1.25 }}
      />
      <motion.div
        className="absolute left-0 top-0 h-[140%] w-px origin-bottom bg-gradient-to-b from-transparent via-[#ff6c2f] to-transparent opacity-45 blur-[0.5px]"
        initial={{ y: "35%" }}
        animate={{ y: "-35%" }}
        transition={{ duration: duration * 0.95, repeat: Infinity, ease: "linear", delay: delay + 1.75 }}
      />
    </div>
  );
}
