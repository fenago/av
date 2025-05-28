"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, Variant } from "framer-motion";

import { cn } from "@/lib/utils";

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  variant?: {
    hidden: Variant;
    visible: Variant;
  };
  duration?: number;
  delay?: number;
  yOffset?: number;
  inView?: boolean;
  inViewMargin?: string;
  blur?: string;
}

export default function BlurFade({
  children,
  className,
  variant,
  duration = 0.4,
  delay = 0,
  yOffset = 6,
  inView = false,
  inViewMargin = "-50px",
  blur = "6px",
}: BlurFadeProps) {
  const ref = useRef(null);
  const inViewResult = useInView(ref, { 
    once: true, 
    margin: inViewMargin as any // Type assertion to handle margin type
  });
  const isInView = !inView || inViewResult;
  const defaultVariants: {
    hidden: Variant;
    visible: Variant;
  } = {
    hidden: {
      y: yOffset,
      opacity: 0,
      filter: `blur(${blur})`,
    },
    visible: {
      y: -yOffset,
      opacity: 1,
      filter: `blur(0px)`,
    },
  };
  const combinedVariants = variant || defaultVariants;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      exit="hidden"
      variants={combinedVariants}
      transition={{
        delay: 0.04 + delay,
        duration,
        ease: "easeOut",
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
