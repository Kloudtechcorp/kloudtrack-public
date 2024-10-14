"use client";

import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/ui/header";
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
    uvIndex: 0,
    cloudCover: 30,
  },
  {
    hour: "01:00",
    temperature: 21,
    humidity: 82,
    heatIndex: 23,
    precipitation: 4,
    airPressure: 1011,
    uvIndex: 5,
    wind: 4,
  },
  {
    hour: "02:00",
    humidity: 80,
    heatIndex: 22,
    precipitation: 2,
    airPressure: 1012,
    wind: 3,
    uvIndex: 0,
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
    uvIndex: 0,
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
    uvIndex: 0,
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
    uvIndex: 0,
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
    setSelectedParameter(formattedParameter);
    router.push(`/graphs/${formattedParameter}`);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-start">
      <Header />
      <div className="container">
        <OptionSelector
          selectedParameter={selectedParameter}
          onParameterChange={handleParameterChange}
        />
        <div className="w-full h-full rounded-lg p-1 border-[#545454] m-0 flex items-center justify-center">
          <div className="h-200 w-full m-0 p-0 py-2 container bg-red-200">
            <LineChart
              width={500}
              height={300}
              data={dummyData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={true} />
              <XAxis
                dataKey="hour"
                tickFormatter={(value) => sliceDetails(0, value)}
              />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Line
                dataKey={dataKeyMap[selectedParameter]}
                stroke="#8884d8"
                strokeWidth={2}
                dot={{ r: 3 }}
                name={
                  selectedParameter.charAt(0).toUpperCase() +
                  selectedParameter.slice(1)
                }
              />
            </LineChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphPage;
