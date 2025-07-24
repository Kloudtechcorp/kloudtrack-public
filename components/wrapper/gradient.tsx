"use client";

import { useWeather } from "@/hooks/context/weather-context";
import { getGradientStyles } from "@/lib/utils";
import { ReactNode } from "react";
import { motion } from "motion/react";

export default function GradientWrapper({ children }: { children: ReactNode }) {
  const { weatherParams } = useWeather();
  const gradientStyles = getGradientStyles(weatherParams);

  return (
    <motion.div
      className="flex flex-col w-screen h-screen fixed top-0 left-0 overflow-auto"
      style={gradientStyles}
      initial={false}
      animate={gradientStyles}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
