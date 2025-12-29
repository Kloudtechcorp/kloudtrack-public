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
  Lightbulb,
} from "lucide-react";

interface StationInsightsCardProps {
  stationId: string | null;
  loading?: boolean;
}

const StationInsightsCard: React.FC<StationInsightsCardProps> = ({ stationId, loading = false }) => {
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

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-50/5 text-red-200/90 border-red-200/20";
      case "warning":
        return "bg-amber-50/5 text-amber-200/90 border-amber-200/20";
      case "moderate":
        return "bg-yellow-50/5 text-yellow-200/90 border-yellow-200/20";
      case "info":
      default:
        return "bg-blue-50/5 text-blue-200/90 border-blue-200/20";
    }
  };

  const getSeverityIcon = (severity: string) => {
    const iconProps = { size: 14, strokeWidth: 1.5 };
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

  const getTrendIcon = (direction?: string) => {
    const iconProps = { size: 14, strokeWidth: 1.5 };
    switch (direction) {
      case "up":
        return <TrendingUp {...iconProps} className="text-red-300/60" />;
      case "down":
        return <TrendingDown {...iconProps} className="text-blue-300/60" />;
      case "stable":
      default:
        return <Minus {...iconProps} className="text-white/30" />;
    }
  };

  const renderInsight = (insight: MetricInsight, index: number) => {
    return (
      <div
        key={index}
        className="group relative p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]
                   hover:bg-white/[0.04] hover:border-white/10
                   transition-all duration-500 ease-out
                   hover:shadow-lg hover:shadow-black/5
                   backdrop-blur-sm"
        style={{
          animationDelay: `${index * 50}ms`,
          animation: "fadeIn 0.6s ease-out forwards",
          opacity: 0,
        }}
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex flex-col gap-2 flex-1 min-w-0">
            <h4 className="text-white/95 font-normal text-[15px] tracking-tight leading-snug">
              {insight.metric.replace(/([A-Z])/g, " $1").trim()}
            </h4>
            <div className="flex items-baseline gap-2">
              <span className="text-white/50 text-sm font-light tracking-wide">
                {insight.value}
              </span>
              <span className="text-white/30 text-xs font-light">
                {insight.unit}
              </span>
            </div>
          </div>
          <span
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-light
                       border backdrop-blur-md tracking-wide uppercase
                       transition-all duration-300 ${getSeverityColor(insight.classification.severity)}`}
          >
            {getSeverityIcon(insight.classification.severity)}
            <span className="mt-[1px]">{insight.classification.label}</span>
          </span>
        </div>

        <p className="text-white/60 text-[13px] leading-relaxed font-light tracking-wide">
          {insight.narrative}
        </p>

        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent
                        opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    );
  };

  if (loading || isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-8 py-12">
        <div className="relative">
          <div className="absolute inset-0 animate-ping">
            <Lightbulb size={32} className="text-white/5" strokeWidth={1.5} />
          </div>
          <Lightbulb size={32} className="relative text-white/20" strokeWidth={1.5} />
        </div>
        <span className="mt-6 text-white/30 text-sm font-light tracking-wide">
          Loading insights
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-8 py-12">
        <div className="p-4 rounded-full bg-red-500/5 mb-4">
          <AlertCircle size={28} className="text-red-300/60" strokeWidth={1.5} />
        </div>
        <span className="text-red-200/70 text-sm font-light tracking-wide text-center max-w-[240px]">
          {error}
        </span>
      </div>
    );
  }

  if (!insightsData) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-8 py-12">
        <div className="p-5 rounded-full bg-white/[0.02] border border-white/[0.06] mb-5">
          <Lightbulb size={28} className="text-white/20" strokeWidth={1.5} />
        </div>
        <span className="text-white/25 text-sm font-light tracking-wide text-center max-w-[200px] leading-relaxed">
          Select a station to view insights
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-8 pt-8 pb-6 border-b border-white/[0.04]">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-1.5 rounded-lg bg-amber-400/5">
            <Lightbulb size={18} className="text-amber-300/40" strokeWidth={1.5} />
          </div>
          <h3 className="text-[17px] font-normal text-white/90 tracking-tight">
            Insights
          </h3>
        </div>
        <p className="text-[11px] text-white/30 font-light tracking-wide pl-9">
          AI-POWERED ANALYSIS
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="space-y-4">
          {insightsData.insights.map((insight, index) => renderInsight(insight, index))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default StationInsightsCard;
