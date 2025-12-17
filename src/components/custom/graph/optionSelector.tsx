"use client";

import React from "react";
import { Card } from "../../ui/card";
import { useParameterContext } from "@/hooks/context/parameters-context";
import { parametersArray } from "@/lib/objects/arrays";

const OptionSelector = () => {
  const { selectedParameter, setSelectedParameter } = useParameterContext();

  return (
    <div className="w-full flex flex-wrap gap-3 font-medium justify-start">
      {parametersArray.map((param) => (
        <Card
          key={param}
          className={`p-2 rounded-md transition-colors cursor-pointer border-transparent ${
            selectedParameter === param ? "bg-[#FBD008] font-bold" : ""
          }`}
          onClick={() => {
            setSelectedParameter(param);
          }}
        >
          {param.charAt(0).toUpperCase() + param.slice(1)}
        </Card>
      ))}
    </div>
  );
};

export default OptionSelector;
