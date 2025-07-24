import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useParameterContext } from "@/hooks/context/parameters-context";
import { useAWSStations } from "@/hooks/context/station-context";
import { useTextColor } from "@/hooks/use-text-color";
import {
  InfoCardChartDataPoint,
  infoCardData,
  InfoCardStationData,
  InfoCardWeatherData,
} from "@/lib/objects/info-card-data";
import { HelpCircle, Minus, TrendingDown, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Bar, BarChart, Line, LineChart } from "recharts";

const chartConfig = {
  value: {
    label: "Value",
    color: "#3B82F6",
  },
} satisfies ChartConfig;

interface CircularIndicatorProps {
  value: number;
  max?: number;
  unit?: string;
}

const InfoCards: React.FC = React.memo(function InfoCards() {
  const router = useRouter();
  const { setSelectedParameter } = useParameterContext();
  const [weatherData, setWeatherData] = useState<InfoCardStationData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { selectedStation } = useAWSStations();
  const textColor = useTextColor();

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
      const data: InfoCardStationData = await response.json();
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
      .map((reading, index) => ({
        time: index.toString(),
        value: getValue(reading) ?? 0,
      }))
      .slice(-5);
  };

  const getTrendDirection = (data: InfoCardChartDataPoint[]) => {
    if (data.length < 2) return "stable";
    const recent = data[data.length - 1].value;
    const previous = data[data.length - 2].value;
    if (recent > previous) return "up";
    if (recent < previous) return "down";
    return "stable";
  };

  const getStatusColor = (card: any, currentValue: number | undefined) => {
    if (currentValue === undefined) return "gray";

    if (card.title === "Temperature") {
      if (currentValue > 35) return "red";
      if (currentValue > 25) return "yellow";
      return "green";
    }

    return "green";
  };

  const StatusDot = ({ color }: { color: string }) => {
    const colorMap = {
      red: "bg-red-500",
      yellow: "bg-yellow-500",
      green: "bg-green-500",
      gray: "bg-gray-500",
    };

    return (
      <div
        className={`w-2 h-2 rounded-full ${
          colorMap[color as keyof typeof colorMap] || colorMap.gray
        }`}
      />
    );
  };

  const TrendIcon = ({ direction }: { direction: string }) => {
    switch (direction) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-red-500" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-blue-500" />;
      default:
        return <Minus className="w-4 h-4 text-yellow-500" />;
    }
  };

  const CircularIndicator = ({
    value,
    max = 100,
    unit = "",
  }: CircularIndicatorProps) => {
    const percentage = (value / max) * 100;
    const circumference = 2 * Math.PI * 45;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-gray-200"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="text-blue-500"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-semibold">
            {value}
            {unit}
          </span>
        </div>
      </div>
    );
  };

  // dko na alam
  const renderChart = (
    card: { chartType?: string; maxValue?: number; unit?: string },
    chartData: InfoCardChartDataPoint[],
    currentValue: number | undefined
  ) => {
    const chartType = card.chartType || "line";

    switch (chartType) {
      case "circular":
        return (
          <div className="flex justify-center">
            <CircularIndicator
              value={currentValue || 0}
              max={card.maxValue || 100}
              unit={card.unit}
            />
          </div>
        );

      case "bar":
        return (
          <ChartContainer config={chartConfig} className="h-24 w-full">
            <BarChart
              data={chartData.slice(-3)}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <Bar dataKey="value" fill="#eab308" radius={2} />
            </BarChart>
          </ChartContainer>
        );

      default:
        return (
          <ChartContainer config={chartConfig} className="h-24 w-full">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <Line
                dataKey="value"
                type="monotone"
                stroke="#eab308"
                strokeWidth={2}
                dot={{ fill: "#eab308", r: 3 }}
                activeDot={{ r: 4, fill: "#eab308" }}
              />
            </LineChart>
          </ChartContainer>
        );
    }
  };

  if (loading && !weatherData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse text-lg">Loading weather data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4">
        Error loading weather data: {error}
      </div>
    );
  }

  if (!weatherData) {
    return <div className="p-4">No weather data available</div>;
  }

  const relevantCards = infoCardData.filter((card) =>
    card.applicableTypes.includes(weatherData.type)
  );

  console.log(textColor);

  let blur = "rgba(0, 0, 0, 0.25)";
  if (textColor === "black") blur = "rgba(255, 255, 255, 0.25)";

  return (
    <div className="py-10">
      <div className="block md:hidden">
        <Carousel className="w-full">
          <div
            className="text-center font-poppins text-sm font-medium mb-2"
            style={{ color: textColor }}
          >
            Swipe to view more weather cards
          </div>
          <CarouselContent>
            {relevantCards.map((card, index) => {
              const allReadings = [
                weatherData.data.current,
                ...weatherData.data.previous,
              ];

              const chartData = formatChartData(allReadings, card.getValue);
              const currentValue = card.getValue(weatherData.data.current);
              const trend = getTrendDirection(chartData);
              const statusColor = getStatusColor(card, currentValue);

              return (
                <CarouselItem key={index} className="basis-full">
                  <Card
                    key={index}
                    className="md:p-6 p-3 backdrop-blur-xl rounded-lg shadow-sm hover:shadow-md  cursor-pointer "
                    style={{
                      backgroundColor: blur,
                    }}
                    onClick={() => {
                      setSelectedParameter(card.title);
                      router.push("graphs");
                    }}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CardTitle
                            className="text-sm font-medium "
                            style={{
                              color: textColor,
                            }}
                          >
                            {card.title}
                          </CardTitle>
                          <StatusDot color={statusColor} />
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendIcon direction={trend} />
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <HelpCircle
                                  className="w-4 h-4"
                                  style={{
                                    color: textColor,
                                  }}
                                />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-64">
                                <p
                                  className="text-sm"
                                  style={{
                                    color: textColor,
                                    backgroundColor: blur,
                                  }}
                                >
                                  {card.tooltip}
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>

                      <div className="h-20">
                        {renderChart(card, chartData, currentValue)}
                      </div>

                      <div className="text-center">
                        <div
                          className="text-lg font-semibold "
                          style={{
                            color: textColor,
                          }}
                        >
                          {currentValue !== undefined
                            ? `${currentValue}${card.unit}`
                            : "N/A"}
                        </div>
                      </div>

                      <div className="text-center">
                        <div
                          className="text-xs font-medium mb-1"
                          style={{
                            color: textColor,
                          }}
                        >
                          {card.formatDescription
                            ? card.formatDescription(currentValue)
                            : "Normal"}
                        </div>
                        <CardDescription
                          className="text-xs leading-tight"
                          style={{
                            color: textColor,
                          }}
                        >
                          {card.explanation}
                        </CardDescription>
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4  mx-auto">
        {relevantCards.map((card, index) => {
          const allReadings = [
            weatherData.data.current,
            ...weatherData.data.previous,
          ];

          const chartData = formatChartData(allReadings, card.getValue);
          const currentValue = card.getValue(weatherData.data.current);
          const trend = getTrendDirection(chartData);
          const statusColor = getStatusColor(card, currentValue);

          return (
            <Card
              key={index}
              className="md:p-6 p-3 backdrop-blur-xl rounded-lg shadow-sm hover:shadow-md  cursor-pointer "
              style={{
                backgroundColor: blur,
              }}
              onClick={() => {
                setSelectedParameter(card.title);
                router.push("graphs");
              }}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CardTitle
                      className="text-sm font-medium "
                      style={{
                        color: textColor,
                      }}
                    >
                      {card.title}
                    </CardTitle>
                    <StatusDot color={statusColor} />
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendIcon direction={trend} />
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle
                            className="w-4 h-4"
                            style={{
                              color: textColor,
                            }}
                          />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-64">
                          <p
                            className="text-sm"
                            style={{
                              color: textColor,
                              backgroundColor: blur,
                            }}
                          >
                            {card.tooltip}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>

                <div className="h-20">
                  {renderChart(card, chartData, currentValue)}
                </div>

                <div className="text-center">
                  <div
                    className="text-lg font-semibold "
                    style={{
                      color: textColor,
                    }}
                  >
                    {currentValue !== undefined
                      ? `${currentValue}${card.unit}`
                      : "N/A"}
                  </div>
                </div>

                <div className="text-center">
                  <div
                    className="text-xs font-medium mb-1"
                    style={{
                      color: textColor,
                    }}
                  >
                    {card.formatDescription
                      ? card.formatDescription(currentValue)
                      : "Normal"}
                  </div>
                  <CardDescription
                    className="text-xs leading-tight"
                    style={{
                      color: textColor,
                    }}
                  >
                    {card.explanation}
                  </CardDescription>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
});

export default InfoCards;
