import React from "react";

const CurrentWeather = () => {
  return (
    <div className="">
      <div className="flex flex-col py-2">
        <span className="font-medium text-lg">Current Weather</span>
        <span className="font-medium italic text-5xl">Clear Skies</span>
      </div>
      <div className="flex flex-col">
        <span className="font-medium text-lg">Temperature</span>
        <span className="flex items-start">
          <span className="font-bold text-9xl">27.8</span>
          <span className="font-bold text-7xl text-start ">°C</span>
        </span>
      </div>
    </div>
  );
};

export default CurrentWeather;
