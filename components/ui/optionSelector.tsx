"use client";

import React from "react";

interface OptionSelectorProps {
  selectedParameter: string;
  onParameterChange: (parameter: string) => void;
}

const OptionSelector: React.FC<OptionSelectorProps> = ({
  selectedParameter,
  onParameterChange,
}) => {
  const parameters = ["temperature", "humidity", "heatIndex", "airPressure"];

  return (
    <div className="w-full flex justify-center space-x-4 my-4">
      {parameters.map((param) => (
        <button
          key={param}
          className={`p-2 border-b-2 transition-colors ${
            selectedParameter === param
              ? "border-blue-500 text-blue-500"
              : "border-transparent"
          }`}
          onClick={() => onParameterChange(param)}
        >
          {param.charAt(0).toUpperCase() + param.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default OptionSelector;
