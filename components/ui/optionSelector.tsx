"use client";

import React from "react";
import { Card } from "./card";

interface OptionSelectorProps {
  selectedParameter: string;
  onParameterChange: (parameter: string) => void;
}

const OptionSelector: React.FC<OptionSelectorProps> = ({
  selectedParameter,
  onParameterChange,
}) => {
  const parameters = [
    "temperature",
    "humidity",
    "heatIndex",
    "airPressure",
    "uvIndex",
  ];

  return (
    <div className="w-full flex flex-wrap  gap-3 font-medium justify-start">
      {parameters.map((param) => (
        <Card
          key={param}
          className={`p-2 rounded-md transition-colors cursor-pointer ${
            selectedParameter === param
              ? "bg-[#FBD008] font-bold"
              : "border-transparent"
          }`}
          onClick={() => onParameterChange(param)}
        >
          {param.charAt(0).toUpperCase() + param.slice(1)}
        </Card>
      ))}
    </div>
  );
};

export default OptionSelector;
