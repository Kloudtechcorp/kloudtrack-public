"use client";

import DailyCards from "@/components/custom/cards/daily-card";
import InfoCards from "@/components/custom/cards/info-card";
import SelectedLocation from "@/components/shared/selected-location";
import { useAWSStations } from "@/hooks/context/station-context";
import { useWeather } from "@/hooks/context/weather-context";
import { useGetInfoData } from "@/hooks/use-get-info-data";
import { StationData } from "@/lib/types";
import { formatDateString } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function Home() {
  const { setWeatherParams } = useWeather();
  const { selectedStation, loading: stationsLoading } = useAWSStations();
  const [weatherData, setWeatherData] = useState<StationData | null>(null);
  const { error, loading, stationWeatherData } = useGetInfoData(selectedStation || "");

  useEffect(() => {
    if (!selectedStation) return;

    const fetchWeatherData = async () => {
      try {
        const response = await fetch(`https://app.kloudtechsea.com/api/v1/get/station/${selectedStation}`, {
          headers: {
            "x-kloudtrack-key": process.env.NEXT_PUBLIC_API_KEY || "",
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
  }, [selectedStation, setWeatherParams, stationsLoading]);

  if (!selectedStation || stationsLoading) {
    return <div>Loading...</div>;
  }

  if (!weatherData || !weatherData.data) {
    return <p>Weather data not available for the selected location.</p>;
  }

  return (
    <div className="flex flex-col container mx-auto">
      <div className="flex flex-row relative">
        <div className="w-full z-20 my-2">
          <SelectedLocation />
          <div>
            <div className="flex flex-col mb-2">
              <span className="font-medium text-2xl">
                {formatDateString(weatherData.data.recordedAt, "long") || "--"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-xl">Feels Like</span>
              <span className="flex items-start">
                <span className="font-bold text-9xl">{weatherData.data?.heatIndex || "--"}</span>
                <span className="font-bold text-7xl text-start">°C</span>
              </span>
            </div>
            <DailyCards currentWeather={weatherData} />
            <InfoCards error={error} loading={loading} weatherData={stationWeatherData} />
          </div>{" "}
        </div>
      </div>
    </div>
  );
}
