/**
 * Type definitions for Telemetry Insights API
 * Based on Kloudtrack Insights API v1.0.0
 */

/**
 * Classification level for a metric value
 */
interface InsightClassification {
  level: string
  label: string
  severity: 'info' | 'moderate' | 'warning' | 'critical'
  description: string
}

/**
 * Comparison data with historical values
 */
interface InsightComparison {
  yesterday?: {
    difference: number
    percentChange: number
    direction: 'up' | 'down' | 'stable'
    description: string
  }
  oneHourAgo?: {
    difference: number
    percentChange: number
    direction: 'up' | 'down' | 'stable'
    description: string
  }
}

/**
 * Range information for grouped insights
 */
interface InsightRange {
  min: number
  max: number
  variance: number
}

/**
 * Individual metric insight
 */
interface MetricInsight {
  metric: string
  value: number
  unit: string
  classification: InsightClassification
  comparison?: InsightComparison
  narrative: string
  // For grouped insights only
  aggregatedValue?: number
  aggregationMethod?: 'mean' | 'max' | 'min'
  range?: InsightRange
}

/**
 * Station insights response data
 */
interface StationInsightData {
  stationId: number
  stationName: string
  location: string
  timestamp: string
  insights: MetricInsight[]
}

/**
 * Grouped insights response data
 */
interface GroupedInsightData {
  groupBy: 'city' | 'organization'
  groupKey: string
  timestamp: string
  stationCount: number
  insights: MetricInsight[]
}

/**
 * Kloudtrack Insights API response wrapper
 */
interface KloudtrackInsightsResponse<T> {
  status: 'success' | 'error'
  message: string
  data?: T
  error?: {
    code: number
    message: string
  }
}

/**
 * API response for station insights
 */
type StationInsightsResponse = KloudtrackInsightsResponse<StationInsightData>

/**
 * API response for grouped insights
 */
type GroupedInsightsResponse = KloudtrackInsightsResponse<GroupedInsightData>

export type {
  InsightClassification,
  InsightComparison,
  InsightRange,
  MetricInsight,
  StationInsightData,
  GroupedInsightData,
  KloudtrackInsightsResponse,
  StationInsightsResponse,
  GroupedInsightsResponse,
}
