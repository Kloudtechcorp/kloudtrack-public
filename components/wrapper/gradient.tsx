"use client";

import { useWeather } from "@/context/weatherContext";
import { getGradientStyles } from "@/lib/utils";
import { ReactNode } from "react";
import { motion } from "motion/react";

export default function GradientWrapper({ children }: { children: ReactNode }) {
  const { weatherParams } = useWeather();
  const gradientStyles = getGradientStyles(weatherParams);

  return (
    <motion.div
      className="flex flex-col min-h-screen relative"
      style={gradientStyles}
      initial={false}
      animate={gradientStyles}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
