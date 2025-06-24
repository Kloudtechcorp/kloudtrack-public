"use client";

import CurrentWeather from "@/components/shared/currentWeather";
import SelectedLocation from "@/components/shared/selectedLocation";
import { useWeather } from "@/hooks/context/weatherContext";

export default function Home() {
  const { setWeatherParams } = useWeather();
  return (
    <div className="flex flex-col container mx-auto">
      <div className="flex flex-row relative">
        <div className="w-full z-20 my-2">
          <SelectedLocation />
          <CurrentWeather onWeatherUpdate={setWeatherParams} />
        </div>
      </div>
    </div>
  );
}
