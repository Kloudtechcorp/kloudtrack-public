import React, { useEffect, useState } from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { Line, LineChart } from "recharts";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useParameterContext } from "@/context/parametersContext";
import { useAWSStations } from "@/context/station";

// Types for our API responses
interface WeatherData {
  recordedAt: string;
  temperature?: number;
  humidity?: number;
  pressure?: number;
  heatIndex?: number;
  light?: number;
  uvIntensity?: number;
  windDirection?: number;
  windSpeed?: number;
  precipitation?: number;
  gust?: number;
  batteryVoltage?: number;
  uvIndex?: number;
}

interface CoastalData {
  recordedAt: string;
  temperature?: number;
  humidity?: number;
  pressure?: number;
  calculatedDistance: number;
}

interface RainData {
  recordedAt: string;
  precipitation?: number;
}

interface RiverData {
  recordedAt: string;
  distance?: number;
}

interface StationData {
  name: string;
  type: "AWS" | "CLMS" | "ARG" | "RLMS";
  data: {
    current: WeatherData | CoastalData | RainData | RiverData;
    previous: (WeatherData | CoastalData | RainData | RiverData)[];
  };
}

interface ChartDataPoint {
  time: string;
  value: number;
}

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

const getWindForce = (speed: number): string => {
  if (speed < 1) return "Calm";
  if (speed < 4) return "Light Air";
  if (speed < 7) return "Light Breeze";
  if (speed < 11) return "Gentle Breeze";
  if (speed < 16) return "Moderate Breeze";
  if (speed < 22) return "Fresh Breeze";
  if (speed < 28) return "Strong Breeze";
  if (speed < 34) return "Near Gale";
  return "Gale";
};

const getUVLevel = (index: number): string => {
  if (index < 3) return "Low";
  if (index < 6) return "Moderate";
  if (index < 8) return "High";
  if (index < 11) return "Very High";
  return "Extreme";
};

const getHumidityLevel = (humidity: number): string => {
  if (humidity < 30) return "Low";
  if (humidity < 60) return "Moderate";
  return "High";
};

interface InfoCardProps {
  title: string;
  description: string;
  explanation: string;
  tooltip: string;
  unit: string;
  getValue: (data: any) => number | undefined;
  formatDescription: (value: number | undefined) => string;
  applicableTypes: string[];
}

const infoCardData: InfoCardProps[] = [
  {
    title: "Temperature",
    description: "Current Temperature",
    explanation: "Real-time temperature measurement from the station",
    tooltip:
      "Ang temperature o temperatura ay ang sukatan ng init o lamig sa paligid.",
    unit: "°C",
    getValue: (data) => data.temperature,
    formatDescription: (value) =>
      value ? `${value.toFixed(1)}°C` : "No data available",
    applicableTypes: ["AWS", "CLMS"],
  },
  {
    title: "Heat Index",
    description: "Feels Like Temperature",
    explanation: "How hot it actually feels considering humidity",
    tooltip: "Ito ang indikasyon ng kung gaano kalakas ang pakiramdam ng init.",
    unit: "°C",
    getValue: (data) => data.heatIndex,
    formatDescription: (value) =>
      value ? `Feels like ${value.toFixed(1)}°C` : "No data available",
    applicableTypes: ["AWS"],
  },
  {
    title: "UV Index",
    description: "UV Radiation Level",
    explanation: "Current ultraviolet radiation intensity",
    tooltip: "Ang sukatan ng lakas ng ultraviolet (UV) rays mula sa araw.",
    unit: "",
    getValue: (data) => data.uvIndex,
    formatDescription: (value) =>
      value
        ? `${getUVLevel(value)} (${value.toFixed(1)})`
        : "No data available",
    applicableTypes: ["AWS"],
  },
  {
    title: "Precipitation",
    description: "Rainfall Amount",
    explanation: "Current precipitation measurement",
    tooltip: "Ito ay tumutukoy sa pag-ulan na bumabagsak mula sa langit.",
    unit: "mm",
    getValue: (data) => data.precipitation,
    formatDescription: (value) =>
      value ? `${value.toFixed(1)} mm` : "No rainfall",
    applicableTypes: ["AWS", "ARG"],
  },
  {
    title: "Wind",
    description: "Wind Conditions",
    explanation: "Current wind speed and classification",
    tooltip: "Ang paggalaw ng hangin sa kapaligiran.",
    unit: "m/s",
    getValue: (data) => data.windSpeed,
    formatDescription: (value) =>
      value
        ? `${value.toFixed(1)} m/s - ${getWindForce(value)}`
        : "No data available",
    applicableTypes: ["AWS"],
  },
  {
    title: "Air Pressure",
    description: "Atmospheric Pressure",
    explanation: "Current atmospheric pressure reading",
    tooltip: "Ang puwersa na inilalapat ng hangin sa ibabaw ng lupa.",
    unit: "hPa",
    getValue: (data) => data.pressure,
    formatDescription: (value) =>
      value ? `${value.toFixed(1)} hPa` : "No data available",
    applicableTypes: ["AWS", "CLMS"],
  },
  {
    title: "Humidity",
    description: "Relative Humidity",
    explanation: "Current relative humidity level",
    tooltip: "Ang dami ng moisture sa hangin.",
    unit: "%",
    getValue: (data) => data.humidity,
    formatDescription: (value) =>
      value
        ? `${value.toFixed(1)}% - ${getHumidityLevel(value)}`
        : "No data available",
    applicableTypes: ["AWS", "CLMS"],
  },
  {
    title: "Water Level",
    description: "Current Level",
    explanation: "Current water level reading",
    tooltip: "Ang kasalukuyang taas ng tubig.",
    unit: "m",
    getValue: (data) => data.distance || data.calculatedDistance,
    formatDescription: (value) =>
      value ? `${value.toFixed(2)} m` : "No data available",
    applicableTypes: ["CLMS", "RLMS"],
  },
];

const InfoCards = React.memo(() => {
  const router = useRouter();
  const { setSelectedParameter } = useParameterContext();
  const [weatherData, setWeatherData] = useState<StationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { selectedStation } = useAWSStations();

  const fetchWeatherData = async (selectedStation: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://app.kloudtechsea.com/api/v1/get/station/${selectedStation}/tree`,
        {
          headers: {
            "x-kloudtrack-key":
              process.env.NEXT_PUBLIC_API_KEY || "6LHB-G2R6-XJQI-4JN4",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const data: StationData = await response.json();
      console.log(data);
      setWeatherData(data);
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
  }, []);

  const formatChartData = (
    data: any[],
    getValue: (data: any) => number | undefined
  ): ChartDataPoint[] => {
    return data
      .map((reading) => ({
        time: new Date(reading.recordedAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        value: getValue(reading) ?? 0,
      }))
      .reverse();
  };

  if (loading && !weatherData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse text-lg">Loading weather data...</div>
      </div>
    );
  }

  if (error) {
    return <div>Error loading weather data: {error}</div>;
  }

  if (!weatherData) {
    return <div>No weather data available</div>;
  }

  const relevantCards = infoCardData.filter((card) =>
    card.applicableTypes.includes(weatherData.type)
  );

  return (
    <div className="flex gap-3 px-1 py-32 flex-wrap w-full">
      {relevantCards.map((card, index) => {
        const allReadings = [
          weatherData.data.current,
          ...weatherData.data.previous,
        ];
        const chartData = formatChartData(allReadings, card.getValue);
        const currentValue = card.getValue(weatherData.data.current);

        return (
          <Card
            key={index}
            className="p-3 flex bg-[#545454] bg-opacity-5 border-transparent rounded-md w-[23%] hover:bg-opacity-10 transition-all cursor-pointer"
          >
            <div
              onClick={() => {
                setSelectedParameter(card.title);
                router.push("graphs");
              }}
            >
              <div className="flex flex-col justify-center gap-2 w-full">
                <div className="flex items-center gap-2">
                  <CardTitle>{card.title}</CardTitle>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle height={20} width={20} fill="#FDB008" />
                      </TooltipTrigger>
                      <TooltipContent className="min-w-40 max-w-64 text-wrap">
                        <p>{card.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <Card className="p-6 shadow-none bg-[#545454] bg-opacity-10 border-none">
                  <ChartContainer
                    config={chartConfig}
                    className="min-h-[150px] w-full flex justify-center items-center"
                  >
                    <LineChart
                      accessibilityLayer
                      data={chartData}
                      margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
                    >
                      <Line
                        dataKey="value"
                        type="monotone"
                        stroke="#545454"
                        strokeWidth={4}
                        dot={(dotProps) => {
                          const { index, cx, cy, payload } = dotProps;
                          const isLastDot = index === chartData.length - 1;

                          return (
                            <g key={`dot-${index}`}>
                              <circle
                                r={isLastDot ? 12 : 8}
                                fill={isLastDot ? "#fbd008" : "#545454"}
                                cx={cx}
                                cy={cy}
                              />
                              <text
                                x={cx}
                                y={isLastDot ? cy + 35 : cy + 25}
                                textAnchor="middle"
                                fontSize={isLastDot ? 26 : 12}
                                fontWeight={isLastDot ? 600 : 500}
                              >
                                {payload.value}
                                {card.unit}
                              </text>
                            </g>
                          );
                        }}
                      />
                    </LineChart>
                  </ChartContainer>
                </Card>

                <CardTitle>{card.formatDescription(currentValue)}</CardTitle>
                <CardDescription className="text-black">
                  {card.explanation}
                </CardDescription>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
});

InfoCards.displayName = "InfoCards";

export default InfoCards;
