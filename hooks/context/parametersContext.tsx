"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { parametersArray } from "@/lib/objects/arrays";
import { ParameterContextType } from "@/lib/types";

const ParameterContext = createContext<ParameterContextType | undefined>(
  undefined
);

export const ParameterProvider = ({ children }: { children: ReactNode }) => {
  // Store the parameters array
  const [parameters] = useState(parametersArray);

  const [selectedParameter, setSelectedParameter] = useState(
    parameters.length > 0 ? parameters[0] : "temperature"
  );

  useEffect(() => {
    if (!selectedParameter && parameters.length > 0) {
      setSelectedParameter(parameters[0]);
    }
  }, [parameters, selectedParameter]);

  return (
    <ParameterContext.Provider
      value={{
        parameters,
        selectedParameter,
        setSelectedParameter,
      }}
    >
      {children}
    </ParameterContext.Provider>
  );
};

export const useParameterContext = () => {
  const context = useContext(ParameterContext);
  if (!context) {
    throw new Error(
      "useParameterContext must be used within a ParameterProvider"
    );
  }
  return context;
};
