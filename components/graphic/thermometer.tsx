import React, { useState, useEffect } from "react";
type Unit = "Celcius" | "Fahrenheit";

interface ThermometerProps {
  unit: Unit;
  currentTemp: number;
}

const Thermometer: React.FC<ThermometerProps> = ({ unit, currentTemp }) => {
  const [temperatureUnit, setTemperatureUnit] = useState<Unit>(unit);

  const minTemperature = 0;
  const maxTemperature = 75;

  const units: { [key in Unit]: string } = {
    Celcius: "°C",
    Fahrenheit: "°F",
  };

  useEffect(() => {
    const temperatureElement = document.getElementById("temperature");
    if (temperatureElement) {
      const height =
        ((currentTemp - minTemperature) / (maxTemperature - minTemperature)) *
        100;
      temperatureElement.style.height = `${height}%`;
      temperatureElement.dataset.value = `${currentTemp}${units[temperatureUnit]}`;
    }
  }, [currentTemp, temperatureUnit]);

  return (
    <div id="wrapper">
      <div id="termometer">
        <div
          id="temperature"
          style={{ height: "0" }}
          data-value={`${currentTemp}${units[temperatureUnit]}`}
        ></div>
        <div id="graduations"></div>
      </div>
    </div>
  );
};

export default Thermometer;
