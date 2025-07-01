"use client";

import React, { useEffect, useState } from "react";
import { XAxis, YAxis, CartesianGrid, Tooltip, Area, Bar } from "recharts";
import OptionSelector from "@/components/ui/optionSelector";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { AreaChart, BarChart } from "recharts";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { TooltipProps, StationData } from "@/lib/types";
import { useParameterContext } from "@/hooks/context/parameters-context";
import { useAWSStations } from "@/hooks/context/station-context";

const sliceDetails = (repeat: number, value: string) => {
  return value;
};

const CustomTooltip = ({ payload, label }: TooltipProps) => {
  if (payload && payload.length) {
    const { name, value } = payload[0];
    return (
      <Card className="custom-tooltip p-3 rounded-lg shadow-lg bg-white border border-gray-200">
        <p className="font-bold text-gray-800">{`Time: ${label}`}</p>
        <p className="font-medium text-gray-600">{`${name}: ${value}`}</p>
      </Card>
    );
  }
  return null;
};

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

const GraphPage = () => {
  const { selectedParameter } = useParameterContext();
  const { selectedStation } = useAWSStations();
  const [weatherData, setWeatherData] = useState<StationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedStation) {
      setError("Station ID not configured");
      setLoading(false);
      return;
    }

    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://app.kloudtechsea.com/api/v1/get/station/${selectedStation}/tree`, {
          headers: {
            "x-kloudtrack-key": process.env.NEXT_PUBLIC_API_KEY || "6LHB-G2R6-XJQI-4JN4",
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data: StationData = await response.json();
        setWeatherData(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
        console.error("Error fetching weather data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
    const intervalId = setInterval(fetchWeatherData, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [selectedStation]);

  const dataKeyMap: Record<string, string> = {
    Temperature: "temperature",
    Humidity: "humidity",
    "Heat Index": "heatIndex",
    Precipitation: "precipitation",
    "Air Pressure": "pressure",
    Wind: "windSpeed",
    "UV Index": "uvIndex",
    "Cloud Cover": "light",
  };

  const barChartParameters = ["UV Index", "Precipitation", "Humidity"];

  const getUnit = (parameter: string) => {
    switch (parameter) {
      case "Temperature":
      case "Heat Index":
        return "°C";
      case "Humidity":
        return "%";
      case "Air Pressure":
        return "hPa";
      case "UV Index":
        return "";
      default:
        return "";
    }
  };

  const formatChartData = () => {
    if (!weatherData || !weatherData.data) {
      console.log("No weather data available");
      return [];
    }

    // Type assertion to match the actual data structure
    const stationData = weatherData.data as {
      current?: {
        recordedAt: string;
        temperature: number;
        humidity: number;
        heatIndex: number;
        precipitation: number;
        pressure: number;
        windSpeed: number;
        uvIndex: number;
        light: number;
      };
      previous?: Array<{
        recordedAt: string;
        temperature: number;
        humidity: number;
        heatIndex: number;
        precipitation: number;
        pressure: number;
        windSpeed: number;
        uvIndex: number;
        light: number;
      }>;
    };

    const allReadings = [
      ...(stationData.current ? [stationData.current] : []),
      ...(stationData.previous || []),
    ].filter(reading => reading && reading.recordedAt);
    console.log("Raw Station Readings:", allReadings); // Log raw readings

    return allReadings
      .map((reading) => ({
        hour: new Date(reading.recordedAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        temperature: reading.temperature,
        humidity: reading.humidity,
        heatIndex: reading.heatIndex,
        precipitation: reading.precipitation,
        pressure: reading.pressure,
        windSpeed: reading.windSpeed,
        uvIndex: reading.uvIndex,
        light: reading.light,
      }))
      .reverse();
  };

  const chartData = formatChartData();
  console.log("Formatted Chart Data:", chartData); // Log formatted chart data

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse text-lg">Loading weather data...</div>
      </div>
    );
  }

  if (error) {
    return <div>Error loading weather data: {error}</div>;
  }

  if (!chartData.length) {
    return <div>No weather data available</div>;
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-7xl">
        <Card className="bg-[#545454] bg-opacity-5 rounded-lg p-6 my-4">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800">
              {selectedParameter} Over Time
            </CardTitle>
          </CardHeader>
          <OptionSelector />
          <div className="bg-[#FFFFFF] rounded-lg mt-4">
            <ChartContainer 
              config={chartConfig} 
              className="w-full h-[400px] sm:h-[500px] md:h-[600px]"
            >
              {barChartParameters.includes(selectedParameter) ? (
                <BarChart 
                  data={chartData} 
                  margin={{ top: 40, right: 30, bottom: 30, left: 30 }}
                >
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke="#e5e7eb" 
                    strokeOpacity={0.5}
                  />
                  <XAxis 
                    dataKey="hour" 
                    tickFormatter={(value) => sliceDetails(0, value)}
                    label={{
                      value: "Time (Hour)",
                      position: "bottom",
                      offset: 10,
                      fill: "#545454"
                    }}
                    tick={{ fill: "#545454", fontSize: 12 }}
                  />
                  <YAxis 
                    label={{
                      value: `${selectedParameter} ${getUnit(selectedParameter)}`,
                      angle: -90,
                      position: "insideLeft",
                      offset: 10,
                      fill: "#545454"
                    }}
                    tick={{ fill: "#545454", fontSize: 12 }}
                  />
                  <Tooltip 
                    content={<CustomTooltip payload={[]} label={""} />}
                    cursor={{ fill: "#FBD008", fillOpacity: 0.1 }}
                  />
                  <Bar 
                    dataKey={dataKeyMap[selectedParameter]} 
                    fill="#FBD008" 
                    name={selectedParameter}
                    radius={[4, 4, 0, 0]}
                    animationDuration={1000}
                  />
                </BarChart>
              ) : (
                <AreaChart 
                  data={chartData} 
                  margin={{ top: 40, right: 30, bottom: 30, left: 30 }}
                >
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke="#e5e7eb" 
                    strokeOpacity={0.5}
                  />
                  <XAxis 
                    dataKey="hour" 
                    tickFormatter={(value) => sliceDetails(0, value)}
                    label={{
                      value: "Time (Hour)",
                      position: "bottom",
                      offset: 10,
                      fill: "#545454"
                    }}
                    tick={{ fill: "#545454", fontSize: 12 }}
                  />
                  <YAxis 
                    label={{
                      value: `${selectedParameter} ${getUnit(selectedParameter)}`,
                      angle: -90,
                      position: "insideLeft",
                      offset: 10,
                      fill: "#545454"
                    }}
                    tick={{ fill: "#545454", fontSize: 12 }}
                  />
                  <Tooltip 
                    content={<CustomTooltip payload={[]} label={""} />}
                    cursor={{ fill: "#FBD008", fillOpacity: 0.1 }}
                  />
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="50%" stopColor="#FBD008" />
                      <stop offset="100%" stopColor="#FFFFFF" />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey={dataKeyMap[selectedParameter]}
                    stroke="#545454"
                    fill="url(#colorUv)"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "#FBD008", stroke: "#545454" }}
                    name={selectedParameter}
                    animationDuration={1000}
                    activeDot={{ r: 6, fill: "#FBD008", stroke: "#545454" }}
                  />
                </AreaChart>
              )}
            </ChartContainer>
          </div>
        </Card>
      </div>
    </main>
  );
};

export default GraphPage;