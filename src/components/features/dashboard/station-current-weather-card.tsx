"use client";
import React from "react";
import type { TelemetryPublicDTO } from "@/types/telemetry";
import { Cloud, CloudSun, Navigation } from "lucide-react";
import { formatDate } from "@/lib/utils/date";
import { Skeleton } from "@/components/ui/skeleton";

interface CurrentWeatherCardProps {
  telemetryData: TelemetryPublicDTO | null;
  loading?: boolean;
  error?: string | null;
}

const StationCurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({
  telemetryData,
  loading = false,
  error = null,
}) => {
  if (loading) {
    return (
      // <div className="flex flex-col items-center justify-center h-full px-8 py-12">
      //   <div className="relative">
      //     <div className="absolute inset-0 animate-ping">
      //       <Cloud size={32} className="text-white/5" strokeWidth={1.5} />
      //     </div>
      //     <Cloud size={32} className="relative text-white/20" strokeWidth={1.5} />
      //   </div>
      //   <span className="mt-6 text-white/30 text-sm font-light tracking-wide">Loading</span>
      // </div>
      <Skeleton className="w-full h-full rounded-lg" />
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-8 py-12">
        <div className="p-4 rounded-full bg-red-500/5 mb-4">
          <Cloud size={28} className="text-red-300/60" strokeWidth={1.5} />
        </div>
        <span className="text-red-200/70 text-sm font-light tracking-wide text-center max-w-60">{error}</span>
      </div>
    );
  }

  if (!telemetryData || !telemetryData.telemetry) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-8 py-12">
        <div className="p-5 rounded-full bg-white/2 border border-white/6 mb-5">
          <Cloud size={28} className="text-white/20" strokeWidth={1.5} />
        </div>
        <span className="text-white/25 text-sm font-light tracking-wide text-center">No data available</span>
      </div>
    );
  }

  const { telemetry } = telemetryData;

  

  return (
    <div className="flex flex-col h-full justify-between text-white py-10 px-8">
      <div className="flex-1 flex flex-col">
        <div className="mb-8">
          <p className="text-[13px] text-white/40 font-light tracking-wide uppercase mb-1">Now</p>
          <p className="text-[11px] text-white/25 font-light tracking-wide">
            {formatDate(telemetry.recordedAt).formatted}
          </p>
        </div>

        <div className="flex items-start gap-6 mb-auto">
          <div className="p-2 rounded-2xl bg-white/2">
            <CloudSun size={52} className="text-white/30" strokeWidth={1.5} />
          </div>
          <div className="flex items-baseline gap-1 -mt-1">
            {telemetry.temperature != null ? (
              <>
                <span className="text-[72px] font-extralight leading-none tracking-tighter text-white/95">
                  {Math.round(telemetry.temperature)}
                </span>
                <span className="text-[32px] font-extralight text-white/50 mb-2">°C</span>
              </>
            ) : (
              <span className="text-[72px] font-extralight leading-none text-white/40">—</span>
            )}
          </div>
        </div>

        {telemetry.heatIndex != null && (
          <div className="mt-6 pt-6 border-t border-white/6">
            <p className="text-[12px] text-white/30 font-light tracking-wide mb-1">Feels Like</p>
            <p className="text-[20px] font-light text-white/70 tracking-tight">
              {Math.round(telemetry.heatIndex)}°C
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-x-6 gap-y-6 mt-8 pt-8 border-t border-white/6">
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] text-white/30 font-light tracking-wider uppercase">Humidity</span>
          <span className="text-[15px] font-light text-white/80 tracking-tight">
            {telemetry.humidity != null ? `${Math.round(telemetry.humidity)}%` : "—"}
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] text-white/30 font-light tracking-wider uppercase">Pressure</span>
          <span className="text-[15px] font-light text-white/80 tracking-tight">
            {telemetry.pressure != null ? `${Math.round(telemetry.pressure)}` : "—"}
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] text-white/30 font-light tracking-wider uppercase">Wind</span>
          <span className="flex items-center gap-1.5 text-[15px] font-light text-white/80 tracking-tight">
            {telemetry.windSpeed != null ? `${Math.round(telemetry.windSpeed)}` : "—"}
            {typeof telemetry.windDirection === "number" && (
              <Navigation
                size={12}
                strokeWidth={1.5}
                style={{ transform: `rotate(${telemetry.windDirection - 45}deg)` }}
                className="text-white/40 transition-transform duration-300"
                aria-label={`Wind direction: ${Math.round(telemetry.windDirection)}°`}
              />
            )}
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] text-white/30 font-light tracking-wider uppercase">Rain</span>
          <span className="text-[15px] font-light text-white/80 tracking-tight">
            {telemetry.precipitation != null ? `${Math.round(telemetry.precipitation)}` : "—"}
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] text-white/30 font-light tracking-wider uppercase">UV</span>
          <span className="text-[15px] font-light text-white/80 tracking-tight">
            {telemetry.uvIndex != null ? `${Math.round(telemetry.uvIndex)}` : "—"}
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] text-white/30 font-light tracking-wider uppercase">Light</span>
          <span className="text-[15px] font-light text-white/80 tracking-tight">
            {telemetry.lightIntensity != null ? `${Math.round(telemetry.lightIntensity)}` : "—"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StationCurrentWeatherCard;
