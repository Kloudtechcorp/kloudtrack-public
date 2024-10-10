import React from "react";
import { CurrentWeatherProps } from "@/lib/types";

const CurrentWeather = ({ currentWeather }: CurrentWeatherProps) => {
  if (!currentWeather) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <div className="flex flex-col">
        <span className="font-medium text-lg">Current Weather</span>
        <span className="font-medium italic text-5xl">
          {currentWeather.weather}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="font-medium text-lg">Temperature</span>
        <span className="flex items-start">
          <span className="font-bold text-9xl">
            {currentWeather.temperature.toFixed(1)}
          </span>
          <span className="font-bold text-7xl text-start ">°C</span>
        </span>
      </div>
    </div>
  );
};

export default CurrentWeather;
