// page.tsx
"use client";

import React, { useState } from "react";
import CurrentWeather from "@/components/shared/currentWeather";
import DailyCards from "@/components/shared/dailyCards";
import Header from "@/components/shared/header";
import SelectedLocation from "@/components/shared/selectedLocation";
import InfoCards from "@/components/shared/infoCards";

export default function Clear() {
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  return (
    <div className="flex flex-col bg-gradient-to-b from-[#66CCFF] from-0% via-[#CCFFFF] via-75% to-[#FFFFFF] to-100% min-h-screen">
      <Header
        selectedLocations={selectedLocations}
        setSelectedLocations={setSelectedLocations}
      />
      <main className="flex flex-col container mx-auto py-2">
        <SelectedLocation locations={selectedLocations} />
        <CurrentWeather />
        <DailyCards />
        <InfoCards />
      </main>
    </div>
  );
}
