/**
 * Type definitions for weather parameter data
 */

export type ParameterType = 'temperature' | 'humidity' | 'pressure' | 'windSpeed' | 'precipitation' | 'uvIndex';

export interface ParameterDataPoint {
  id: number;
  recordedAt: string;
  value: number;
}

export interface ParameterConfig {
  key: ParameterType;
  apiKey: string; // API endpoint parameter name
  label: string;
  color: string;
  unit: string;
}
