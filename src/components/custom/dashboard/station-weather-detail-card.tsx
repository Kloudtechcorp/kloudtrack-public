import React from "react";
import { Navigation } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LabelList
} from "recharts";

interface Reading {
  recordedAt: string;
  value: number | null;
  label?: string | number;
}

interface StationWeatherDetailCardProps {
  grouped: Record<string, Reading[]>;
  stationType?: string; // Add this prop
}

const readingLabels: Record<string, string> = {
  temperature: "Temperature (°C)",
  humidity: "Humidity (%)",
  pressure: "Pressure (hPa)",
  heatIndex: "Heat Index (°C)",
  windDirection: "Wind Direction (°)",
  windSpeed: "Wind Speed (m/s)",
  precipitation: "Precipitation (mm)",
  uvIndex: "UV Index",
  distance: "Distance (cm)",
  lightIntensity: "Light Intensity (lx)"
};

const readingColors: Record<string, string> = {
  temperature: "#ef4444",      // Red
  humidity: "#3b82f6",          // Blue
  pressure: "#a855f7",          // Purple
  heatIndex: "#f97316",         // Orange
  windDirection: "#06b6d4",     // Cyan
  windSpeed: "#06b6d4",         // Cyan
  precipitation: "#3b82f6",     // Blue
  uvIndex: "#eab308",           // Yellow
  distance: "#10b981",          // Green
  lightIntensity: "#f59e0b"     // Amber
};

const WindCompass: React.FC<{ value: number | null }> = ({ value }) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const getDirection = (deg: number) => {
    const index = Math.round(deg / 45) % 8;
    return directions[index];
  };

  if (value === null) {
    return (
      <div className="flex items-center justify-center h-[180px] text-gray-500">
        No data available
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-[180px]">
      <div className="relative w-40 h-40">
        {/* Compass circle */}
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Outer circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#334155"
            strokeWidth="2"
          />
          
          {/* Cardinal directions */}
          <text x="50" y="15" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">N</text>
          <text x="85" y="53" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">E</text>
          <text x="50" y="90" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">S</text>
          <text x="15" y="53" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">W</text>
          
          {/* Tick marks every 45 degrees */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
            const rad = (angle - 90) * Math.PI / 180;
            const x1 = 50 + 40 * Math.cos(rad);
            const y1 = 50 + 40 * Math.sin(rad);
            const x2 = 50 + 45 * Math.cos(rad);
            const y2 = 50 + 45 * Math.sin(rad);
            return (
              <line
                key={angle}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#475569"
                strokeWidth="1"
              />
            );
          })}
        </svg>
        
        {/* Navigation icon in center - adjusted for 45° default skew */}
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{ transform: `rotate(${value - 45}deg)` }}
        >
          <Navigation style={{ color: readingColors.windDirection }} size={32} />
        </div>
        
        {/* Center display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-16">
          <div className="text-sm text-gray-400">
            {getDirection(value)}
          </div>
        </div>
      </div>
    </div>
  );
};

const StationWeatherDetailCard: React.FC<StationWeatherDetailCardProps> = ({ grouped, stationType }) => {
  // Filter out distance and lightIntensity for WEATHERSTATION type
  const filteredGrouped = Object.entries(grouped).filter(([key]) => {
    if (stationType === "WEATHERSTATION" && (key === "distance")) {
      return false;
    }
    return true;
  });

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {filteredGrouped.map(([key, readings]) => {
        if (!readings.length) return null;
        const latest = readings[readings.length - 1];
        const color = readingColors[key] || "#38bdf8";
        
        return (
          <div key={key} className="bg-white/10 backdrop-blur-md backdrop-brightness-110 border border-white/20 rounded-lg p-4 shadow">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-white">{readingLabels[key] || key}</span>
              <span className="text-lg font-bold" style={{ color }}>
                {latest.value !== null ? latest.value : "N/A"}
              </span>
            </div>
            
            {key === "windDirection" ? (
              <WindCompass value={latest.value} />
            ) : (
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={readings} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis
                    dataKey="recordedAt"
                    hide={true}
                  />
                  <YAxis
                    hide={true}
                    domain={['auto', 'auto']}
                  />
                  <Tooltip
                    labelFormatter={v => new Date(v).toLocaleString()}
                    contentStyle={{ background: '#1e293b', border: 'none', color: '#fff' }}
                    itemStyle={{ color }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={color}
                    strokeWidth={8}
                    dot={false}
                    activeDot={{ r: 5, fill: color, stroke: '#fff', strokeWidth: 2 }}
                    isAnimationActive={false}
                  >
                    <LabelList
                      data={readings.map((r, idx) =>
                        idx === readings.length - 1
                          ? { ...r, value: r.value === null ? undefined : r.value, label: r.value }
                          : { ...r, value: r.value === null ? undefined : r.value, label: undefined }
                      )}
                      dataKey="label"
                      position="top"
                      content={({ x, y, value }) =>
                        value !== null && value !== undefined && typeof y === "number" ? (
                          <text x={x} y={y - 8} fill={color} fontWeight="bold" fontSize={14} textAnchor="middle">
                            {value}
                          </text>
                        ) : null
                      }
                    />
                  </Line>
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StationWeatherDetailCard;