import { useState, useEffect } from "react";
import { useAWSStations } from "@/hooks/context/station";
import { StationData } from "@/lib/types";
import DailyCards from "./dailyCard";
import { formatDateString } from "@/lib/utils";
import InfoCards from "./infoCard";

const CurrentWeather = ({
  onWeatherUpdate,
}: {
  onWeatherUpdate: (data: { heatIndex: number; recordedAt: string }) => void;
}) => {
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
          onWeatherUpdate({
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
  }, [selectedStation, onWeatherUpdate]);

  if (!selectedStation) {
    return <div>Loading...</div>;
  }

  if (!weatherData || !weatherData.data) {
    return <p>Weather data not available for the selected location.</p>;
  }
  return (
    <div>
      <div className="flex flex-col mb-2">
        <span className="font-medium text-2xl">{formatDateString(weatherData.data.recordedAt, "long") || "--"}</span>
      </div>
      <div className="flex flex-col">
        <span className="font-medium text-xl">Feels Like</span>
        <span className="flex items-start">
          <span className="font-bold text-9xl">{weatherData.data?.heatIndex || "--"}</span>
          <span className="font-bold text-7xl text-start">°C</span>
        </span>
      </div>
      <DailyCards currentWeather={weatherData} />
      <InfoCards />
    </div>
  );
};

export default CurrentWeather;
