"use client";

import React, { createContext, useContext, useState } from "react";

interface WeatherParams {
  heatIndex: number;
  temperature: number;
  humidity: number;
  pressure: number;
}

interface WeatherContextProps {
  weatherParams: WeatherParams;
  setWeatherParams: React.Dispatch<React.SetStateAction<WeatherParams>>;
}

const WeatherContext = createContext<WeatherContextProps | undefined>(
  undefined
);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [weatherParams, setWeatherParams] = useState<WeatherParams>({
    heatIndex: 0,
    temperature: 0,
    humidity: 0,
    pressure: 0,
  });
  return (
    <WeatherContext.Provider value={{ weatherParams, setWeatherParams }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = (): WeatherContextProps => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
};
