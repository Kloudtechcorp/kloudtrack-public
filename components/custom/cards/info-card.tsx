import React, { useEffect, useState } from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { Line, LineChart, XAxis, YAxis, Text } from "recharts";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useParameterContext } from "@/hooks/context/parameters-context";
import { useAWSStations } from "@/hooks/context/station-context";
import {
  InfoCardChartDataPoint,
  infoCardData,
  InfoCardStationData,
  InfoCardWeatherData,
} from "@/lib/objects/info-card-data";

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

const InfoCards = React.memo(() => {
  const router = useRouter();
  const { setSelectedParameter } = useParameterContext();
  const [weatherData, setWeatherData] = useState<InfoCardStationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { selectedStation } = useAWSStations();

  const fetchWeatherData = async (selectedStation: string) => {
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
      const data: InfoCardStationData = await response.json();
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
  }, [selectedStation]);

  const formatChartData = (
    data: InfoCardWeatherData[],
    getValue: (data: InfoCardWeatherData) => number | undefined
  ): InfoCardChartDataPoint[] => {
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

  const relevantCards = infoCardData.filter((card) => card.applicableTypes.includes(weatherData.type));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      {relevantCards.map((card, index) => {
        const allReadings = [weatherData.data.current, ...weatherData.data.previous];
        const chartData = formatChartData(allReadings, card.getValue);
        const currentValue = card.getValue(weatherData.data.current);

        return (
          <Card
            key={index}
            className="p-4 bg-gray-800/20 rounded-lg hover:bg-gray-700/30 transition-all cursor-pointer border-none"
            onClick={() => {
              setSelectedParameter(card.title);
              router.push("graphs");
            }}
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg font-semibold">{card.title}</CardTitle>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle height={18} width={18} fill="#FDB008" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-64 text-wrap">
                      <p>{card.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Card className="p-3 bg-gray-800/10 border-none shadow-none">
                <ChartContainer
                  config={chartConfig}
                  className="min-h-[150px] w-full max-w-[250px] flex justify-center items-center"
                >
                  <LineChart
                    accessibilityLayer
                    data={chartData}
                    margin={{ top: 10, right: 10, bottom: 20, left: 10 }}
                  >
                    <Line
                      dataKey="value"
                      type="monotone"
                      stroke="#FDB008"
                      strokeWidth={3}
                      dot={(dotProps) => {
                        const { index, cx, cy, payload } = dotProps;
                        const isLastDot = index === chartData.length - 1;

                        return (
                          <g key={`dot-${index}`}>
                            <circle r={isLastDot ? 10 : 5} fill={isLastDot ? "#FDB008" : "#888"} cx={cx} cy={cy} />
                            <Text
                              x={cx}
                              y={isLastDot ? cy + 25 : cy + 15}
                              textAnchor="middle"
                              fontSize={isLastDot ? 18 : 12}
                              fontWeight={isLastDot ? 600 : 400}
                              fill="#FDB008"
                            >
                              {`${payload.value}${card.unit}`}
                            </Text>
                          </g>
                        );
                      }}
                    />
                    <XAxis dataKey="time" hide={true} />
                    <YAxis hide={true} />
                  </LineChart>
                </ChartContainer>
              </Card>
              <CardTitle className="text-md">{card.formatDescription(currentValue)}</CardTitle>
              <CardDescription className="text-sm text-gray-300">{card.explanation}</CardDescription>
            </div>
          </Card>
        );
      })}
    </div>
  );
});

export default InfoCards;