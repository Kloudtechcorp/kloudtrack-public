import React from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { Line, LineChart } from "recharts";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useParameterContext } from "@/hooks/context/parameters-context";
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

interface InfoCardsProps {
  error: string | null;
  loading: boolean;
  weatherData: InfoCardStationData | null;
}

const InfoCards = ({ error, loading, weatherData }: InfoCardsProps) => {
  const router = useRouter();
  const { setSelectedParameter } = useParameterContext();

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

  const relevantCards = infoCardData.filter((card) => card.applicableTypes.includes(weatherData.type));

  return (
    <div className="flex gap-3 px-1 py-32 flex-wrap w-full">
      {relevantCards.map((card, index) => {
        const allReadings = [weatherData.data.current, ...weatherData.data.previous];
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
                              <circle r={isLastDot ? 12 : 8} fill={isLastDot ? "#fbd008" : "#545454"} cx={cx} cy={cy} />
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
                <CardDescription className="text-black">{card.explanation}</CardDescription>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default InfoCards;
