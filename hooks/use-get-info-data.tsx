import { useRouter } from "next/router";
import { useParameterContext } from "./context/parameters-context";
import { InfoCardChartDataPoint, InfoCardStationData, InfoCardWeatherData } from "@/lib/objects/info-card-data";
import { useEffect, useState } from "react";
import { useAWSStations } from "./context/station-context";

export const useGetInfoData = (selectedStation: string) => {
  const [stationWeatherData, setStationWeatherData] = useState<InfoCardStationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = async (selectedStation: string) => {
    try {
      setLoading(true);
      const response = await fetch(`https://app.kloudtechsea.com/api/v1/get/station/${selectedStation}/tree`, {
        headers: {
          "x-kloudtrack-key": process.env.NEXT_PUBLIC_API_KEY || "",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const data: InfoCardStationData = await response.json();
      setStationWeatherData(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch data");
      console.error("Error fetching weather data:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!selectedStation) {
      setError("Station ID not configured");
      return;
    }

    fetchWeatherData(selectedStation);

    const interval = setInterval(() => {
      fetchWeatherData(selectedStation);
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [selectedStation]);

  return {
    stationWeatherData,
    loading,
    error,
  };
};
