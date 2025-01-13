"use client";

import { useState } from "react";
import CurrentWeather from "@/components/shared/currentWeather";
import InfoCards from "@/components/shared/infoCard";
import SelectedLocation from "@/components/shared/selectedLocation";

const getGradientClasses = ({
  heatIndex,
  temperature,
  humidity,
  pressure,
}: {
  heatIndex: number;
  temperature: number;
  humidity: number;
  pressure: number;
}): string => {
  if (heatIndex > 40) {
    return "bg-gradient-to-tr from-red-600 via-orange-500 to-yellow-400";
  } else if (temperature > 30 && humidity > 80 && pressure < 1015) {
    return "bg-gradient-to-tr from-[#f94144] via-[#f7f7f7] to-[#90be6d]"; // Hot, Humid, Low Pressure
  } else if (temperature > 30 && humidity <= 80 && pressure > 1015) {
    return "bg-gradient-to-tr from-[#f4a261] via-[#f7f7f7] to-[#d62828]"; // Hot, Dry, High Pressure
  } else if (temperature > 30 && humidity <= 80 && pressure <= 1015) {
    return "bg-gradient-to-tr from-[#f4a261] via-[#f7f7f7] to-[#2b2d42]"; // Hot, Dry, Low Pressure
  } else if (temperature <= 30 && humidity > 80 && pressure > 1015) {
    return "bg-gradient-to-tr from-[#90be6d] via-[#f7f7f7] to-[#264653]"; // Cool, Humid, High Pressure
  } else if (temperature <= 30 && humidity > 80 && pressure <= 1015) {
    return "bg-gradient-to-tr from-[#8ecae6] via-[#f7f7f7] to-[#023047]"; // Cool, Humid, Low Pressure
  } else if (temperature <= 30 && humidity <= 80 && pressure > 1015) {
    return "bg-gradient-to-tr from-[#a7c5bd] via-[#f7f7f7] to-[#d2b48c]"; // Cool, Dry, High Pressure
  } else if (temperature <= 30 && humidity <= 80 && pressure <= 1015) {
    return "bg-gradient-to-tr from-[#f7f7f7] via-[#a2c2e6] to-[#1e2a47]"; // Cool, Dry, Low Pressure
  } else if (humidity > 80 && pressure > 1015) {
    return "bg-gradient-to-tr from-[#f7f7f7] via-[#f1faee] to-[#a8dadc]"; // Humid, High Pressure
  } else if (humidity > 80 && pressure <= 1015) {
    return "bg-gradient-to-tr from-[#f7f7f7] via-[#a8dadc] to-[#264653]"; // Humid, Low Pressure
  } else if (temperature > 40) {
    return "bg-gradient-to-tr from-[#ffbe0b] via-[#f7f7f7] to-[#d9ed92]"; // Very Hot
  } else if (pressure > 1020) {
    return "bg-gradient-to-tr from-[#f7f7f7] via-[#d9ed92] to-[#264653]"; // High Pressure
  } else {
    return "bg-gradient-to-tr from-[#f7f7f7] via-[#f7f7f7] via-10% to-[#454545]"; // Default
  }
};

export default function Home() {
  const [weatherParams, setWeatherParams] = useState({
    heatIndex: 0,
    temperature: 0,
    humidity: 0,
    pressure: 0,
  });

  const gradientClasses = getGradientClasses(weatherParams);
  return (
    <div
      className={`flex flex-col ${gradientClasses} min-h-screen overflow-hidden relative`}
    >
      <div className="flex flex-col container mx-auto">
        <div className="flex flex-row relative overflow-hidden">
          <div className="w-full z-50 my-2">
            <SelectedLocation />
            <CurrentWeather onWeatherUpdate={setWeatherParams} />
          </div>
        </div>
        <InfoCards />
      </div>
    </div>
  );
}
