"use client";

import DailyCards from "@/components/custom/cards/daily-card";
import InfoCards from "@/components/custom/cards/info-card";
import SelectedLocation from "@/components/shared/selected-location";
import { useAWSStations } from "@/hooks/context/station-context";
import { useWeather } from "@/hooks/context/weather-context";
import { StationData } from "@/lib/types";
import { formatDateString } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function Home() {
  const { setWeatherParams } = useWeather();
  const { selectedStation } = useAWSStations();
  const [weatherData, setWeatherData] = useState<StationData | null>(null);

  useEffect(() => {
    if (!selectedStation) return;

    const fetchWeatherData = async () => {
      try {
        const response = await fetch(`https://app.kloudtechsea.com/api/v1/get/station/${selectedStation}`, {
          headers: {
            "x-kloudtrack-key": "6LHB-G2R6-XJQI-4JN4",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }

        const stationData = await response.json();
        setWeatherData(stationData);

        if (stationData.data) {
          setWeatherParams({
            heatIndex: stationData.data.heatIndex || 0,
            recordedAt: stationData.data.recordedAt || "",
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeatherData();
    const intervalId = setInterval(fetchWeatherData, 5000);

    return () => clearInterval(intervalId);
  }, [selectedStation, setWeatherParams]);

  if (!selectedStation) {
    return <div>Loading...</div>;
  }

  if (!weatherData || !weatherData.data) {
    return <p>Weather data not available for the selected location.</p>;
  }
  return (
  
  <div className="flex flex-col container mx-auto p-4 min-h-screen">
     {/*Header */}
  <div className="top-0 z-10 bg-black/40 backdrop-blur-sm p-2 rounded-md mb-4">
    <SelectedLocation />
    <span className="font-medium text-xl text-white ml-2">
      {formatDateString(weatherData.data.recordedAt, "long") || "--"}
    </span>
    <div className="flex justify-center mb-6">
        <div className="text-center">
          <span className="font-medium text-lg text-gray-300">Feels Like</span>
          <div className="flex items-baseline justify-center">
            <span className="font-bold text-7xl text-white">{weatherData.data?.heatIndex || "--"}</span>
            <span className="font-bold text-4xl ml-1 text-white">°C</span>
          </div>
        </div>
      </div>
  </div>
  <div className="flex flex-row gap-8">
    {/* Main Weather Info (Left Column) */}
    <div className="w-full flex flex-col p-2 bg-black/30 rounded-lg shadow-lg">
      <InfoCards />
    </div>

    {/* Daily Forecast (Right Column) */}
    <div className="w-1/3 bg-black/20 p-4 rounded-lg shadow-md overflow-y-auto h-[60vh]">
      <h3 className="font-semibold text-lg text-white mb-2">Daily Forecast</h3>
      <DailyCards currentWeather={weatherData} />
    </div>
  </div>
</div>
  );
}
