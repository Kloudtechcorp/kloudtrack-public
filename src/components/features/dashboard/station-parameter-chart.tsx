"use client";
import React from "react";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { ParameterDataPoint, ParameterConfig } from "@/types/parameter";
import { Cloud } from "lucide-react";

interface StationParameterChartProps {
  data: ParameterDataPoint[];
  parameter: ParameterConfig;
  loading: boolean;
  error: string | null;
  onRetry?: () => void;
}

const StationParameterChart: React.FC<StationParameterChartProps> = ({
  data,
  parameter,
  loading,
  error,
  onRetry,
}) => {
  // Loading state
  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-md backdrop-brightness-110 border border-white/20 rounded-lg p-6">
        <div className="flex flex-col items-center justify-center h-[400px] text-white/60 animate-pulse">
          <Cloud size={48} className="mb-4" />
          <span>Loading {parameter.label} data...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white/10 backdrop-blur-md backdrop-brightness-110 border border-white/20 rounded-lg p-6">
        <div className="flex flex-col items-center justify-center h-[400px] text-red-400">
          <Cloud size={48} className="mb-4" />
          <span className="mb-4">{error}</span>
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            >
              Retry
            </button>
          )}
        </div>
      </div>
    );
  }

  // Empty state
  if (!data || data.length === 0) {
    return (
      <div className="bg-white/10 backdrop-blur-md backdrop-brightness-110 border border-white/20 rounded-lg p-6">
        <div className="flex flex-col items-center justify-center h-[400px] text-white/60">
          <Cloud size={48} className="mb-4" />
          <span>No data available for {parameter.label}</span>
        </div>
      </div>
    );
  }

  // Format data for chart
  const chartData = data.map((point) => ({
    ...point,
    displayTime: new Date(point.recordedAt).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }),
  }));

  // Calculate min/max for Y-axis domain
  const values = data.map((d) => d.value).filter((v) => v !== null && !isNaN(v));
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const padding = (maxValue - minValue) * 0.1;
  const yDomain = [Math.max(0, minValue - padding), maxValue + padding];

  return (
    <div className="bg-white/10 backdrop-blur-md backdrop-brightness-110 border border-white/20 rounded-lg p-6">
      <div className="mb-4">
        <h3 className="text-white text-lg font-semibold">
          {parameter.label} {parameter.unit && `(${parameter.unit})`}
        </h3>
        <p className="text-white/60 text-sm">Last 24 hours</p>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id={`gradient-${parameter.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={parameter.color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={parameter.color} stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />

          <XAxis
            dataKey="displayTime"
            stroke="#ffffff"
            opacity={0.6}
            tick={{ fill: '#ffffff', opacity: 0.6 }}
            tickLine={{ stroke: '#ffffff', opacity: 0.3 }}
            interval="preserveStartEnd"
            minTickGap={50}
          />

          <YAxis
            stroke="#ffffff"
            opacity={0.6}
            tick={{ fill: '#ffffff', opacity: 0.6 }}
            tickLine={{ stroke: '#ffffff', opacity: 0.3 }}
            domain={yDomain}
            tickFormatter={(value) => value.toFixed(1)}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: 'none',
              borderRadius: '8px',
              color: '#ffffff',
            }}
            labelStyle={{ color: '#ffffff', opacity: 0.8 }}
            labelFormatter={(label) => `Time: ${label}`}
            formatter={(value: number) => [
              `${value.toFixed(2)}${parameter.unit ? ` ${parameter.unit}` : ''}`,
              parameter.label,
            ]}
          />

          <Area
            type="monotone"
            dataKey="value"
            stroke={parameter.color}
            strokeWidth={2}
            fill={`url(#gradient-${parameter.key})`}
            dot={false}
            activeDot={{ r: 6, fill: parameter.color, stroke: '#ffffff', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StationParameterChart;
