"use client";
import React, { useEffect, useState } from "react";
import type { StationInsightData, MetricInsight } from "@/types/insights";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  Info,
  AlertCircle,
  AlertOctagon,
  Lightbulb
} from "lucide-react";

interface StationInsightsCardProps {
  stationId: string | null;
  loading?: boolean;
}

const StationInsightsCard: React.FC<StationInsightsCardProps> = ({
  stationId,
  loading = false,
}) => {
  const [insightsData, setInsightsData] = useState<StationInsightData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!stationId) {
      setInsightsData(null);
      return;
    }

    const fetchInsights = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/insights/${stationId}`);
        const result = await response.json();

        if (result.success && result.data) {
          setInsightsData(result.data);
        } else {
          setError(result.message || "Failed to load insights");
        }
      } catch (err) {
        console.error("Error fetching insights:", err);
        setError("Failed to load insights");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInsights();
  }, [stationId]);

  // Get severity color
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500/20 text-red-300 border-red-500/40';
      case 'warning':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/40';
      case 'moderate':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40';
      case 'info':
      default:
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
    }
  };

  // Get severity icon
  const getSeverityIcon = (severity: string) => {
    const iconProps = { size: 16, className: "inline-block" };
    switch (severity) {
      case 'critical':
        return <AlertOctagon {...iconProps} />;
      case 'warning':
        return <AlertTriangle {...iconProps} />;
      case 'moderate':
        return <AlertCircle {...iconProps} />;
      case 'info':
      default:
        return <Info {...iconProps} />;
    }
  };

  // Get trend icon
  const getTrendIcon = (direction?: string) => {
    const iconProps = { size: 14, className: "inline-block" };
    switch (direction) {
      case 'up':
        return <TrendingUp {...iconProps} className="text-red-400" />;
      case 'down':
        return <TrendingDown {...iconProps} className="text-blue-400" />;
      case 'stable':
      default:
        return <Minus {...iconProps} className="text-gray-400" />;
    }
  };

  // Render individual insight
  const renderInsight = (insight: MetricInsight, index: number) => {
    const comparison = insight.comparison?.yesterday || insight.comparison?.oneHourAgo;

    return (
      <div
        key={index}
        className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
      >
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-white font-medium capitalize">
              {insight.metric.replace(/([A-Z])/g, ' $1').trim()}
            </span>
            <span className="text-white/60 text-sm">
              {insight.value} {insight.unit}
            </span>
          </div>
          <span className={`px-2 py-1 rounded-md text-xs border flex items-center gap-1 ${getSeverityColor(insight.classification.severity)}`}>
            {getSeverityIcon(insight.classification.severity)}
            {insight.classification.label}
          </span>
        </div>

        {comparison && (
          <div className="flex items-center gap-2 mb-2 text-sm text-white/70">
            {getTrendIcon(comparison.direction)}
            <span>{comparison.description}</span>
          </div>
        )}

        <p className="text-white/80 text-sm leading-relaxed">
          {insight.narrative}
        </p>
      </div>
    );
  };

  if (loading || isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-white/60 animate-pulse">
        <Lightbulb size={48} className="mb-2" />
        <span className="mt-2">Loading insights...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-red-400">
        <AlertCircle size={48} className="mb-2" />
        <span className="mt-2">{error}</span>
      </div>
    );
  }

  if (!insightsData) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-white/40">
        <Lightbulb size={48} className="mb-2" />
        <span className="mt-2">Select a station to view insights</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full text-white p-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Lightbulb size={20} className="text-yellow-400" />
          <h3 className="text-lg font-medium">Weather Insights</h3>
        </div>
        <p className="text-xs text-white/60">
          AI-powered analysis of current conditions
        </p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        {insightsData.insights.map((insight, index) => renderInsight(insight, index))}
      </div>
    </div>
  );
};

export default StationInsightsCard;
