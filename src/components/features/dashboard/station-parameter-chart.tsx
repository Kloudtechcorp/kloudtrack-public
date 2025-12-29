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
      <div className="bg-card-bg border-2 border-card-border p-8">
        <div className="flex flex-col items-center justify-center h-[400px]">
          <div className="w-8 h-8 border-2 border-card-border border-t-muted animate-spin mb-4"></div>
          <span className="text-muted text-xs font-mono uppercase tracking-wider">
            LOADING {parameter.label.toUpperCase()}
          </span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-card-bg border-2 border-card-border p-8">
        <div className="flex flex-col items-center justify-center h-[400px]">
          <div className="border-2 border-red-500 bg-red-500/10 p-4 mb-4">
            <Cloud size={28} className="text-red-500" strokeWidth={2} />
          </div>
          <span className="text-red-400 text-xs font-mono text-center max-w-[300px] mb-6">
            [ERROR] {error}
          </span>
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-6 py-2 border-2 border-input-border bg-secondary hover:bg-secondary-hover
                         text-muted hover:text-foreground text-xs font-mono uppercase tracking-wider"
            >
              RETRY
            </button>
          )}
        </div>
      </div>
    );
  }

  // Empty state
  if (!data || data.length === 0) {
    return (
      <div className="bg-card-bg border-2 border-card-border p-8">
        <div className="flex flex-col items-center justify-center h-[400px]">
          <div className="border-2 border-card-border p-4 mb-4">
            <Cloud size={28} className="text-muted" strokeWidth={2} />
          </div>
          <span className="text-muted text-xs font-mono uppercase tracking-wider">
            [NO DATA AVAILABLE]
          </span>
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
    <div className="bg-card-bg border-2 border-card-border">
      <div className="border-b-2 border-card-border px-6 py-3 flex items-center justify-between">
        <div>
          <h3 className="text-foreground text-sm font-mono font-bold uppercase tracking-wider">
            {parameter.label}
          </h3>
          <p className="text-muted text-[10px] font-mono uppercase tracking-wider mt-0.5">
            24H TIMELINE
          </p>
        </div>
        <div className="text-muted text-xs font-mono">
          {parameter.unit && `[${parameter.unit}]`}
        </div>
      </div>

      <div className="p-6">
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id={`gradient-${parameter.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={parameter.color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={parameter.color} stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="0"
              stroke="var(--color-card-border)"
              strokeWidth={1}
            />

            <XAxis
              dataKey="displayTime"
              stroke="var(--color-muted)"
              tick={{ fill: 'var(--color-muted)', fontSize: 10, fontFamily: 'monospace' }}
              tickLine={{ stroke: 'var(--color-muted)' }}
              interval="preserveStartEnd"
              minTickGap={50}
            />

            <YAxis
              stroke="var(--color-muted)"
              tick={{ fill: 'var(--color-muted)', fontSize: 10, fontFamily: 'monospace' }}
              tickLine={{ stroke: 'var(--color-muted)' }}
              domain={yDomain}
              tickFormatter={(value) => value.toFixed(1)}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-background)',
                border: '2px solid var(--color-card-border)',
                borderRadius: '0',
                color: 'var(--color-foreground)',
                padding: '8px 12px',
                fontSize: '11px',
                fontFamily: 'monospace',
              }}
              labelStyle={{
                color: 'var(--color-muted)',
                fontSize: 10,
                marginBottom: 4,
                fontFamily: 'monospace'
              }}
              labelFormatter={(label) => `TIME: ${label}`}
              formatter={(value: number) => [
                `${value.toFixed(2)}${parameter.unit ? ` ${parameter.unit}` : ''}`,
                '',
              ]}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke={parameter.color}
              strokeWidth={2}
              fill={`url(#gradient-${parameter.key})`}
              dot={false}
              activeDot={{ r: 4, fill: parameter.color, stroke: 'var(--color-background)', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StationParameterChart;
