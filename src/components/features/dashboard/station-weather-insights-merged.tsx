"use client";
import React, { useEffect, useState } from "react";
import type { TelemetryPublicDTO } from "@/types/telemetry";
import type { StationInsightData, MetricInsight } from "@/types/insights";
import { CloudSun, Navigation, AlertTriangle, Info, AlertCircle, AlertOctagon } from "lucide-react";
import { formatDate } from "@/lib/utils/date";
import { Skeleton } from "@/components/ui/skeleton";

interface StationWeatherInsightsMergedProps {
  telemetryData: TelemetryPublicDTO | null;
  stationId: string | null;
  loading?: boolean;
}

const StationWeatherInsightsMerged: React.FC<StationWeatherInsightsMergedProps> = ({
  telemetryData,
  stationId,
  loading = false,
}) => {
  const [insightsData, setInsightsData] = useState<StationInsightData | null>(null);
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);

  useEffect(() => {
    if (!stationId) {
      setInsightsData(null);
      return;
    }

    const fetchInsights = async () => {
      setIsLoadingInsights(true);
      try {
        const response = await fetch(`/api/insights/${stationId}`);
        const result = await response.json();

        if (result.success && result.data) {
          setInsightsData(result.data);
        }
      } catch (err) {
        console.error("Error fetching insights:", err);
      } finally {
        setIsLoadingInsights(false);
      }
    };

    fetchInsights();
  }, [stationId]);

  const getSeverityIcon = (severity: string) => {
    const iconProps = { size: 14, strokeWidth: 2 };
    switch (severity) {
      case "critical":
        return <AlertOctagon {...iconProps} />;
      case "warning":
        return <AlertTriangle {...iconProps} />;
      case "moderate":
        return <AlertCircle {...iconProps} />;
      case "info":
      default:
        return <Info {...iconProps} />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "border-red-500 bg-red-500/10 text-red-400";
      case "warning":
        return "border-yellow-500 bg-yellow-500/10 text-yellow-400";
      case "moderate":
        return "border-orange-500 bg-orange-500/10 text-orange-400";
      case "info":
      default:
        return "border-blue-500 bg-blue-500/10 text-blue-400";
    }
  };

  if (loading || isLoadingInsights) {
    return (
      // <div className="h-full flex items-center justify-center border-2 border-card-border">
      //   <div className="text-center font-mono">
      //     <div className="text-foreground text-sm mb-2">[LOADING]</div>
      //     <div className="text-foreground text-xs">FETCHING DATA...</div>
      //   </div>
      // </div>
      <Skeleton className="w-full h-full rounded-lg" />
    );
  }

  if (!telemetryData || !telemetryData.telemetry) {
    return (
      <div className="h-full flex items-center justify-center bg-card border-2 border-card-border">
        <div className="text-center font-mono text-foreground text-sm">
          [NO DATA AVAILABLE]
        </div>
      </div>
    );
  }

  const { telemetry } = telemetryData;

  return (
    <div className="h-full flex flex-col bg-card border-2 border-card-border">
      {/* Current Weather Section */}
      <div className="border-b-2 border-card-border p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="text-foreground text-xs font-mono uppercase tracking-wider mb-1">
              CURRENT CONDITIONS
            </div>
            <div className="text-foreground/70 text-[10px] font-mono">
              {formatDate(telemetry.recordedAt).formatted}
            </div>
          </div>
          <CloudSun size={32} className="text-foreground/50" strokeWidth={2} />
        </div>

        {/* Temperature Display */}
        <div className="mb-6 flex items-start gap-2">
          {telemetry.temperature != null ? (
            <>
              <span className="text-6xl font-bold text-foreground tabular-nums tracking-tight">
                {Math.round(telemetry.temperature)}
              </span>
              <span className="text-3xl text-muted-foreground font-bold">°C</span>
            </>
          ) : (
            <span className="text-6xl font-bold text-foreground/70">--</span>
          )}
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-4 border-t-2 border-card-border pt-4">
          <div className="space-y-1">
            <div className="text-muted-foreground text-[10px] font-mono uppercase tracking-wider">HUMIDITY</div>
            <div className="text-foreground text-lg font-bold tabular-nums">
              {telemetry.humidity != null ? `${Math.round(telemetry.humidity)}%` : "--"}
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-muted-foreground text-[10px] font-mono uppercase tracking-wider">PRESSURE</div>
            <div className="text-foreground text-lg font-bold tabular-nums">
              {telemetry.pressure != null ? Math.round(telemetry.pressure) : "--"}
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-muted-foreground text-[10px] font-mono uppercase tracking-wider">WIND</div>
            <div className="flex items-center gap-1">
              <span className="text-foreground text-lg font-bold tabular-nums">
                {telemetry.windSpeed != null ? Math.round(telemetry.windSpeed) : "--"}
              </span>
              {typeof telemetry.windDirection === "number" && (
                <Navigation
                  size={12}
                  strokeWidth={2}
                  style={{ transform: `rotate(${telemetry.windDirection - 45}deg)` }}
                  className="text-muted-foreground"
                />
              )}
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-muted-foreground text-[10px] font-mono uppercase tracking-wider">RAIN</div>
            <div className="text-foreground text-lg font-bold tabular-nums">
              {telemetry.precipitation != null ? Math.round(telemetry.precipitation) : "--"}
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-muted-foreground text-[10px] font-mono uppercase tracking-wider">UV INDEX</div>
            <div className="text-foreground text-lg font-bold tabular-nums">
              {telemetry.uvIndex != null ? Math.round(telemetry.uvIndex) : "--"}
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-muted-foreground text-[10px] font-mono uppercase tracking-wider">LIGHT</div>
            <div className="text-foreground text-lg font-bold tabular-nums">
              {telemetry.lightIntensity != null ? Math.round(telemetry.lightIntensity) : "--"}
            </div>
          </div>

          {telemetry.heatIndex != null && (
            <div className="space-y-1">
              <div className="text-muted-foreground text-[10px] font-mono uppercase tracking-wider">FEELS LIKE</div>
              <div className="text-foreground text-lg font-bold tabular-nums">
                {Math.round(telemetry.heatIndex)}°C
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AI Insights Section */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="text-foreground text-xs font-mono uppercase tracking-wider mb-4 border-b border-card-border pb-2">
          AI ANALYSIS
        </div>

        {insightsData?.insights && insightsData.insights.length > 0 ? (
          <div className="space-y-3">
            {insightsData.insights.map((insight: MetricInsight, index: number) => (
              <div
                key={index}
                className="border border-card-border bg-secondary/50 p-3 hover:border-primary"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="text-foreground text-sm font-mono font-semibold mb-0.5">
                      {insight.metric.replace(/([A-Z])/g, " $1").trim().toUpperCase()}
                    </div>
                    <div className="text-muted-foreground text-xs font-mono">
                      {insight.value} {insight.unit}
                    </div>
                  </div>
                  <div
                    className={`flex items-center gap-1 px-2 py-1 border text-[10px] font-mono font-bold uppercase ${getSeverityColor(
                      insight.classification.level
                    )}`}
                  >
                    {getSeverityIcon(insight.classification.level)}
                    {insight.classification.category.toUpperCase()}
                  </div>
                </div>
                <p className="text-muted-foreground text-xs leading-relaxed">{insight.narrative}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted text-xs font-mono">
            [NO INSIGHTS AVAILABLE]
          </div>
        )}
      </div>
    </div>
  );
};

export default StationWeatherInsightsMerged;
