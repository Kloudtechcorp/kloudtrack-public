"use client";
import React from "react";
import type { TelemetryPublicDTO } from "@/types/telemetry";
import { Cloud, CloudSun, Navigation } from "lucide-react";
import { formatDate } from "@/lib/utils/date";

interface CurrentWeatherCardProps {
  telemetryData: TelemetryPublicDTO | null;
  loading?: boolean;
  error?: string | null;
}

const iconColor = "#fff";

const StationCurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({
  telemetryData,
  loading = false,
  error = null,
}) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-blue-400 animate-pulse">
        <Cloud size={48} color={iconColor} />
        <span className="mt-2">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-red-400">
        <Cloud size={48} color={iconColor} />
        <span className="mt-2">{error}</span>
      </div>
    );
  }

  if (!telemetryData) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-gray-400">
        <Cloud size={48} color={iconColor} />
        <span className="mt-2">Select a station</span>
      </div>
    );
  }

  const { telemetry } = telemetryData;

  // MSN Weather-inspired card layout
  return (
    <div className="flex flex-col h-full justify-between mb-4 text-white gap-2 py-8 px-6">
      <div className="flex-1 flex flex-col gap-6">
        <div>
          <p>Current Weather</p>
          <p className="text-xs opacity-70">
            {formatDate(telemetry.recordedAt).formatted} ({formatDate(telemetry.recordedAt).relative})
          </p>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4">
          <div className="flex items-center">
            <CloudSun size={64} color={iconColor} />
            <div className="ml-4 flex">
              <div className="flex">
                {telemetry.temperature != null ? (
                  <>
                    <span className="text-6xl font-bold">{Math.round(telemetry.temperature)}</span>
                    <span className="text-3xl font-bold">°C</span>
                  </>
                ) : (
                  <span className="text-6xl font-bold">N/A</span>
                )}
              </div>
              <div className="ml-6 flex flex-col items-end justify-end text-md ">
                <p>
                  <span className="opacity-70">Feels Like</span>
                  <span className="opacity-100 ml-1">
                    {telemetry.heatIndex != null ? `${Math.round(telemetry.heatIndex)}°C` : "N/A"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-between mt-6 flex-wrap gap-4">
        {/* Humidity */}
        <div className="flex flex-col">
          <span className="opacity-70 text-xs">Humidity</span>
          <span className="text-md">{telemetry.humidity != null ? `${Math.round(telemetry.humidity)}%` : "N/A"}</span>
        </div>
        {/* Pressure */}
        <div className="flex flex-col">
          <span className="opacity-70 text-xs">Pressure</span>
          <span className="text-md">
            {telemetry.pressure != null ? `${Math.round(telemetry.pressure)} hPa` : "N/A"}
          </span>
        </div>
        {/* Wind Speed and Direction */}
        <div className="flex flex-col">
          <span className="opacity-70 text-xs">Wind</span>
          <span className="flex items-center gap-1 text-sm">
            {telemetry.windSpeed != null ? `${Math.round(telemetry.windSpeed)} km/h` : "N/A"}
            {typeof telemetry.windDirection === "number" && (
              <Navigation
                size={14}
                style={{ transform: `rotate(${telemetry.windDirection - 45}deg)` }}
                className="ml-1 transition-transform duration-300"
                aria-label={`Wind direction: ${Math.round(telemetry.windDirection)}°`}
              />
            )}
          </span>
        </div>
        {/* Precipitation */}
        <div className="flex flex-col">
          <span className="opacity-70 text-xs">Precipitation</span>
          <span className="text-md">
            {telemetry.precipitation != null ? `${Math.round(telemetry.precipitation)} mm` : "N/A"}
          </span>
        </div>
        {/* UV Index */}
        <div className="flex flex-col">
          <span className="opacity-70 text-xs">UV Index</span>
          <span className="text-md">{telemetry.uvIndex != null ? `${Math.round(telemetry.uvIndex)}` : "N/A"}</span>
        </div>
        {/* Light Intensity */}
        <div className="flex flex-col">
          <span className="opacity-70 text-xs">Light Intensity</span>
          <span className="text-md">
            {telemetry.lightIntensity != null ? `${Math.round(telemetry.lightIntensity)} lx` : "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StationCurrentWeatherCard;
