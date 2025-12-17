import React, { useState, useEffect, useRef, useMemo } from "react";

type Unit = "Celcius" | "Fahrenheit";

interface ThermometerProps {
  unit: Unit;
  currentTemp: number;
}

const Thermometer: React.FC<ThermometerProps> = ({ unit, currentTemp }) => {
  const [temperatureUnit] = useState<Unit>(unit);
  const temperatureRef = useRef<HTMLDivElement>(null);

  const minTemperature = 0;
  const maxTemperature = 75;

  const units = useMemo(
    () => ({
      Celcius: "°C",
      Fahrenheit: "°F",
    }),
    []
  );

  useEffect(() => {
    if (temperatureRef.current) {
      const height = ((currentTemp - minTemperature) / (maxTemperature - minTemperature)) * 100;
      temperatureRef.current.style.height = `${height}%`;
      temperatureRef.current.dataset.value = `${currentTemp}${units[temperatureUnit]}`;
    }
  }, [currentTemp, temperatureUnit, units]);

  return (
    <div id="wrapper">
      <div id="termometer">
        <div
          ref={temperatureRef}
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
