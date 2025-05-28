"use client";

import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  anchor?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

export const BorderBeam = ({
  className,
  size = 200,
  duration = 15,
  anchor = 90,
  borderWidth = 1.5,
  colorFrom = "#3B82F6",
  colorTo = "#8B5CF6", 
  delay = 0,
}: BorderBeamProps) => {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent bg-gradient-to-r from-blue-500 to-purple-500 opacity-75",
        "before:absolute before:inset-0 before:rounded-[inherit] before:bg-white before:content-['']",
        "after:absolute after:inset-[1px] after:rounded-[inherit] after:bg-current after:content-['']",
        className,
      )}
      style={
        {
          "--size": size,
          "--duration": duration,
          "--anchor": anchor,
          "--border-width": borderWidth,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--delay": `-${delay}s`,
        } as React.CSSProperties
      }
    />
  );
};
