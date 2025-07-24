"use client";

import GoBackButton from "@/components/shared/back-button";
import { Card } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useParameterContext } from "@/hooks/context/parameters-context";
import { dummyData, parametersArray } from "@/lib/objects/arrays";
import { TooltipProps } from "@/lib/types";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const sliceDetails = (repeat: number, value: string) => {
  return value;
};

const CustomTooltip = ({ payload, label }: TooltipProps) => {
  if (payload && payload.length) {
    return (
      <Card className="custom-tooltip p-2 rounded-md">
        <p className="font-bold">{`Time: ${label}`}</p>
        {payload[0] && (
          <p className="font-bold">{`${payload[0].name}: ${payload[0].value}`}</p>
        )}
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
  const { selectedParameter, setSelectedParameter } = useParameterContext();

  console.log(selectedParameter);

  const dataKeyMap: Record<string, string> = {
    Temperature: "temperature",
    Humidity: "humidity",
    "Heat Index": "heatIndex",
    Precipitation: "precipitation",
    "Air Pressure": "airPressure",
    Wind: "wind",
    "UV Index": "uvIndex",
    "Cloud Cover": "cloudCover",
  };

  const barChartParameters = ["UV Index", "Precipitation"];

  return (
    <main className="flex flex-col items-center min-h-screen py-5">
      <div className="mx-auto container ">
        <GoBackButton fallbackHref="/" />
        <div className="bg-[#545454] bg-opacity-5 rounded-md flex flex-col p-4 my-2 gap-3 ">
          <div className="bg-[#FFFFFF] rounded-md ">
            <ChartContainer
              config={chartConfig}
              className="min-h-[150px] justify-center items-center "
            >
              {barChartParameters.includes(selectedParameter) ? (
                <BarChart
                  data={dummyData}
                  margin={{ top: 30, right: 30, bottom: 15 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="hour"
                    tickFormatter={(value) => sliceDetails(0, value)}
                  />
                  <YAxis />
                  <Tooltip
                    content={<CustomTooltip payload={[]} label={""} />}
                  />
                  <Bar
                    dataKey={dataKeyMap[selectedParameter]}
                    fill="#FBD008"
                    name={selectedParameter}
                  />
                </BarChart>
              ) : (
                <AreaChart
                  data={dummyData}
                  margin={{ top: 30, right: 30, bottom: 15 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="hour"
                    tickFormatter={(value) => sliceDetails(0, value)}
                  />
                  <YAxis />
                  <Tooltip
                    content={<CustomTooltip payload={[]} label={""} />}
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
                    dot={{ r: 4 }}
                    name={selectedParameter}
                  />
                </AreaChart>
              )}
            </ChartContainer>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pb-10">
          {parametersArray.map((param) => (
            <div
              key={param}
              className={`border rounded-lg p-2 backdrop-blur-xl bg-[#545454] bg-opacity-5 cursor-pointer hover:shadow-lg ${
                selectedParameter === param ? "ring-2 ring-yellow-400" : ""
              }`}
              onClick={() => setSelectedParameter(param)}
            >
              <p className="text-center font-semibold text-sm mb-1">{param}</p>
              {barChartParameters.includes(param) ? (
                <BarChart width={150} height={80} data={dummyData}>
                  <Bar dataKey={dataKeyMap[param]} fill="#FBD008" />
                </BarChart>
              ) : (
                <AreaChart width={150} height={80} data={dummyData}>
                  <defs>
                    <linearGradient
                      id={`mini-${param}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="50%" stopColor="#FBD008" />
                      <stop offset="100%" stopColor="#FFFFFF" />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey={dataKeyMap[param]}
                    stroke="#545454"
                    fill={`url(#mini-${param})`}
                    strokeWidth={2}
                    dot={false}
                  />
                </AreaChart>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default GraphPage;
