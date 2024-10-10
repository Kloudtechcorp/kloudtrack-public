// page.tsx
"use client";

import React, { useState } from "react";
import CurrentWeather from "@/components/shared/currentWeather";
import DailyCard from "@/components/shared/dailyCard";
import Header from "@/components/shared/header";
import SelectedLocation from "@/components/shared/selectedLocation";
import InfoCard from "@/components/shared/infoCard";
import { WeatherDataProps } from "@/lib/types";
import { locationArray } from "@/lib/objects/arrays";

export default function Clear() {
  const defaultLocation = locationArray[0];
  const [selectedLocations, setSelectedLocations] = useState<string[]>([
    defaultLocation.location,
  ]);
  const [weatherData, setWeatherData] = useState<WeatherDataProps | null>(
    defaultLocation
  );

  return (
    <div className="flex flex-col bg-gradient-to-b from-[#66CCFF] from-0% via-[#CCFFFF] via-75% to-[#FFFFFF] to-100% min-h-screen">
      <Header
        selectedLocations={selectedLocations}
        setSelectedLocations={setSelectedLocations}
        setCurrentWeather={setWeatherData}
      />
      <div className="flex flex-col container mx-auto">
        <SelectedLocation
          locations={selectedLocations}
          setCurrentWeather={setWeatherData}
          currentWeather={weatherData}
        />
        <CurrentWeather currentWeather={weatherData} />
        <DailyCard />
        <InfoCard />
      </div>
    </div>
  );
}
