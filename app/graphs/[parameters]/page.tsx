"use client";

import React, { useState } from "react";
import { XAxis, YAxis, CartesianGrid, Tooltip, Bar, Area } from "recharts";
import { useParams, useRouter } from "next/navigation";
import OptionSelector from "@/components/ui/optionSelector";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { AreaChart, BarChart } from "recharts";
import { Card } from "@/components/ui/card";

const dummyData = [
  {
    hour: "00:00",
    temperature: 20,
    humidity: 85,
    heatIndex: 22,
    precipitation: 0,
    airPressure: 1010,
    wind: 5,
    uvIndex: 2,
    cloudCover: 30,
  },
  {
    hour: "01:00",
    temperature: 21,
    humidity: 82,
    heatIndex: 23,
    precipitation: 4,
    airPressure: 1011,
    wind: 4,
    uvIndex: 3,
    cloudCover: 25,
  },
  {
    hour: "02:00",
    temperature: 20,
    humidity: 80,
    heatIndex: 22,
    precipitation: 2,
    airPressure: 1012,
    wind: 3,
    uvIndex: 5,
    cloudCover: 20,
  },
  {
    hour: "03:00",
    temperature: 19,
    humidity: 83,
    heatIndex: 21,
    precipitation: 15,
    airPressure: 1013,
    wind: 4,
    uvIndex: 2,
    cloudCover: 15,
  },
  {
    hour: "04:00",
    temperature: 18,
    humidity: 85,
    heatIndex: 20,
    precipitation: 2,
    airPressure: 1014,
    wind: 5,
    uvIndex: 3,
    cloudCover: 10,
  },
  {
    hour: "05:00",
    temperature: 17,
    humidity: 86,
    heatIndex: 19,
    precipitation: 3,
    airPressure: 1015,
    wind: 6,
    uvIndex: 5,
    cloudCover: 5,
  },
  {
    hour: "06:00",
    temperature: 18,
    humidity: 83,
    heatIndex: 20,
    precipitation: 5,
    airPressure: 1016,
    wind: 5,
    uvIndex: 1,
    cloudCover: 8,
  },
  {
    hour: "07:00",
    temperature: 20,
    humidity: 80,
    heatIndex: 22,
    precipitation: 8,
    airPressure: 1017,
    wind: 4,
    uvIndex: 2,
    cloudCover: 12,
  },
  {
    hour: "08:00",
    temperature: 22,
    humidity: 78,
    heatIndex: 24,
    precipitation: 7,
    airPressure: 1018,
    wind: 5,
    uvIndex: 3,
    cloudCover: 20,
  },
  {
    hour: "09:00",
    temperature: 24,
    humidity: 75,
    heatIndex: 26,
    precipitation: 6,
    airPressure: 1019,
    wind: 6,
    uvIndex: 5,
    cloudCover: 30,
  },
  {
    hour: "10:00",
    temperature: 26,
    humidity: 70,
    heatIndex: 28,
    precipitation: 5,
    airPressure: 1020,
    wind: 7,
    uvIndex: 7,
    cloudCover: 35,
  },
  {
    hour: "11:00",
    temperature: 27,
    humidity: 68,
    heatIndex: 29,
    precipitation: 13,
    airPressure: 1021,
    wind: 8,
    uvIndex: 8,
    cloudCover: 40,
  },
  {
    hour: "12:00",
    temperature: 28,
    humidity: 65,
    heatIndex: 30,
    precipitation: 12,
    airPressure: 1022,
    wind: 7,
    uvIndex: 9,
    cloudCover: 45,
  },
];

const sliceDetails = (repeat: number, value: string) => {
  return value;
};

interface PayloadProps {
  name: string;
  value: number | string;
}

interface TooltipProps {
  payload: PayloadProps[];
  label: string;
}

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
  const { parameters } = useParams();
  const router = useRouter();
  const [selectedParameter, setSelectedParameter] = useState(
    parameters || "temperature"
  );

  const dataKeyMap: Record<string, string> = {
    temperature: "temperature",
    humidity: "humidity",
    heatIndex: "heatIndex",
    airPressure: "airPressure",
    precipitation: "precipitation",
    wind: "wind",
    uvIndex: "uvIndex",
    cloudCover: "cloudCover",
  };

  const formatParameter = (param: string) => {
    const camelCaseMap: Record<string, string> = {
      "Heat Index": "heatIndex",
      "Air Pressure": "airPressure",
      "UV Index": "uvIndex",
      "Cloud Cover": "cloudCover",
    };

    return camelCaseMap[param] || param.toLowerCase();
  };

  const handleParameterChange = (parameter: string) => {
    const formattedParameter = formatParameter(parameter);
    // setSelectedParameter(formattedParameter);
    router.push(`/graphs/${formattedParameter}`);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mx-auto container ">
        <div className="bg-[#545454] bg-opacity-5 rounded-md flex flex-col p-4 my-2 gap-3 ">
          <OptionSelector
            selectedParameter={selectedParameter}
            onParameterChange={handleParameterChange}
          />
          <div className="bg-[#FFFFFF] rounded-md ">
            <ChartContainer
              config={chartConfig}
              className="min-h-[150px] justify-center items-center "
            >
              {selectedParameter === "uvIndex" ||
              selectedParameter === "humidity" ? (
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
                  <Bar dataKey="uvIndex" fill="#FBD008" name="UV Index" />
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
                    name={
                      selectedParameter.charAt(0).toUpperCase() +
                      selectedParameter.slice(1)
                    }
                  />
                </AreaChart>
              )}
            </ChartContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphPage;
