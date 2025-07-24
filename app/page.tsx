"use client";

import DailyCards from "@/components/custom/cards/daily-card";
import InfoCards from "@/components/custom/cards/info-card";
import SkeletonLoading from "@/components/custom/skeleton-loading-state";
import TempSwitch from "@/components/custom/temp-switch";
import SelectedLocation from "@/components/shared/selected-location";
import { useAWSStations } from "@/hooks/context/station-context";
import { useWeather } from "@/hooks/context/weather-context";
import { useTextColor } from "@/hooks/use-text-color";
import { StationData } from "@/lib/types";
import { convertTemperature, formatDateString } from "@/lib/utils";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const { weatherParams, setWeatherParams } = useWeather();
  const { selectedStation } = useAWSStations();
  const [weatherData, setWeatherData] = useState<StationData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const textColor = useTextColor();

  useEffect(() => {
    if (!selectedStation) return;

    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://app.kloudtechsea.com/api/v1/get/station/${selectedStation}`,
          {
            headers: {
              "x-kloudtrack-key": "6LHB-G2R6-XJQI-4JN4",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }

        const stationData = await response.json();
        setWeatherData(stationData);

        if (stationData.data) {
          setWeatherParams({
            heatIndex: stationData.data.heatIndex || 0,
            recordedAt: stationData.data.recordedAt || "",
            tempUnit: weatherParams.tempUnit,
          });
        }
      } catch (error) {
        console.error(error);
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
    const intervalId = setInterval(fetchWeatherData, 5000);

    return () => clearInterval(intervalId);
  }, [selectedStation, setWeatherParams]);

  if (loading) {
    return <SkeletonLoading />;
  }

  if (error) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline">
          Something not ideal might be happening.
        </span>
      </div>
    );
  }

  if (!weatherData || !weatherData.data) {
    return <p>Weather data not available for the selected location.</p>;
  }

  const displayedHeatIndex = convertTemperature(
    weatherData.data.heatIndex || 0,
    weatherParams.tempUnit
  ).toFixed(1);

  return (
    <div
      className="flex flex-col container max-w-5xl mx-auto w-full"
      style={{ color: textColor }}
    >
      <div className="flex flex-row relative w-full">
        <div className="w-full z-20">
          <div className="hidden md:block mb-2">
            <SelectedLocation />
          </div>
          <div>
            <div className="flex flex-col md:flex-row items-start justify-between">
              {/* data */}
              <div className="order-2 w-full">
                <div className="flex flex-col mb-2">
                  <span className="font-medium text-sm md:text-xl font-montserrat">
                    {formatDateString(weatherData.data.recordedAt, "long") ||
                      "--"}
                  </span>
                </div>
                <div className="flex flex-col mb-3">
                  <span className="font-medium text-sm md:text-xl font-poppins">
                    Feels Like
                  </span>
                  <span className="flex items-start">
                    <span className="font-bold text-5xl md:text-9xl font-poppins">
                      {displayedHeatIndex || "--"}
                    </span>
                    <span className="font-bold text-5xl md:text-7xl text-start font-montserrat">
                      °{weatherParams.tempUnit}{" "}
                    </span>
                  </span>
                </div>
                <DailyCards currentWeather={weatherData} />
              </div>
              {/* right side */}
              <div className="w-full md:order-2 flex flex-col items-end gap-10">
                <TempSwitch />
                <div className="items-center justify-center">
                  <Image
                    className="flex-1"
                    src="/icons/sunny.svg"
                    alt="sunny day"
                    width={450}
                    height={450}
                  />
                </div>
              </div>
            </div>

            <div className="w-full">
              <InfoCards />
            </div>
          </div>{" "}
        </div>
      </div>
    </div>
  );
}
