"use client";

import React, { useState } from "react";
import { XAxis, YAxis, CartesianGrid, Tooltip, Area, Bar } from "recharts";
import { useParams } from "next/navigation";
import OptionSelector from "@/components/ui/optionSelector";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { AreaChart, BarChart } from "recharts";
import { Card } from "@/components/ui/card";
import { TooltipProps } from "@/lib/types";
import { dummyData } from "@/lib/objects/arrays";

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
  const { parameters } = useParams();

  const initialParameter = Array.isArray(parameters)
    ? parameters[0]
    : parameters || "temperature";

  const [selectedParameter, setSelectedParameter] = useState(initialParameter);

  const dataKeyMap: Record<string, string> = {
    temperature: "temperature",
    humidity: "humidity",
    heatIndex: "heatIndex",
    airPressure: "airPressure",
    precipitation: "precipitation",
    uvIndex: "uvIndex",
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mx-auto container ">
        <div className="bg-[#545454] bg-opacity-5 rounded-md flex flex-col p-4 my-2 gap-3 ">
          <OptionSelector
            selectedParameter={selectedParameter}
            onParameterChange={setSelectedParameter}
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
