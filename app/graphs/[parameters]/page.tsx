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
import { useParams } from "next/navigation";
import Header from "@/components/ui/header";
import OptionSelector from "@/components/ui/optionSelector";

const dummyData = [
  {
    hour: "00:00",
    temperature: 20,
    humidity: 85,
    heatIndex: 22,
    airPressure: 1010,
  },
  {
    hour: "01:00",
    temperature: 21,
    humidity: 82,
    heatIndex: 23,
    airPressure: 1011,
  },
  {
    hour: "02:00",
    temperature: 20,
    humidity: 80,
    heatIndex: 22,
    airPressure: 1012,
  },
  {
    hour: "03:00",
    temperature: 19,
    humidity: 83,
    heatIndex: 21,
    airPressure: 1013,
  },
  {
    hour: "04:00",
    temperature: 18,
    humidity: 85,
    heatIndex: 20,
    airPressure: 1014,
  },
  {
    hour: "05:00",
    temperature: 17,
    humidity: 86,
    heatIndex: 19,
    airPressure: 1015,
  },
  {
    hour: "06:00",
    temperature: 18,
    humidity: 83,
    heatIndex: 20,
    airPressure: 1016,
  },
  {
    hour: "07:00",
    temperature: 20,
    humidity: 80,
    heatIndex: 22,
    airPressure: 1017,
  },
  {
    hour: "08:00",
    temperature: 22,
    humidity: 78,
    heatIndex: 24,
    airPressure: 1018,
  },
  {
    hour: "09:00",
    temperature: 24,
    humidity: 75,
    heatIndex: 26,
    airPressure: 1019,
  },
  {
    hour: "10:00",
    temperature: 26,
    humidity: 70,
    heatIndex: 28,
    airPressure: 1020,
  },
  {
    hour: "11:00",
    temperature: 27,
    humidity: 68,
    heatIndex: 29,
    airPressure: 1021,
  },
  {
    hour: "12:00",
    temperature: 28,
    humidity: 65,
    heatIndex: 30,
    airPressure: 1022,
  },
];

const sliceDetails = (repeat: number, value: string) => {
  return value;
};

const CustomTooltip = ({ payload, label }: any) => {
  if (payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p>{`Time: ${label}`}</p>
        {payload[0] && <p>{`${payload[0].name}: ${payload[0].value}`}</p>}
      </div>
    );
  }
  return null;
};

const GraphPage = () => {
  const { parameters } = useParams();
  const [selectedParameter, setSelectedParameter] = useState(
    parameters || "temperature"
  );

  // Define which dataKey to show based on the selected parameter
  const dataKeyMap: Record<string, string> = {
    temperature: "temperature",
    humidity: "humidity",
    heatIndex: "heatIndex",
    airPressure: "airPressure",
    precipitation: "precipitation", // Example key, you can add more data if necessary
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-start">
      <Header /> {/* Header at the top */}
      <OptionSelector
        selectedParameter={selectedParameter}
        onParameterChange={setSelectedParameter}
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
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="hour"
              tickFormatter={(value) => sliceDetails(0, value)}
            />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
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
  );
};

export default GraphPage;
