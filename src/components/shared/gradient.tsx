"use client";

import { ReactNode } from "react";
import { motion } from "motion/react";

// MSN Weather-inspired gradient: blue to purple to pink
const msnGradient = {
  background: "linear-gradient(180deg, #204C84 60px, #162544 300px, #14203D 600px)",
  minHeight: "100vh",
  width: "100%",
};

export default function GradientWrapper({ children }: { children: ReactNode }) {
  return (
    <motion.div
      className="flex flex-col min-h-screen relative"
      style={msnGradient}
      initial={false}
      animate={msnGradient}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
