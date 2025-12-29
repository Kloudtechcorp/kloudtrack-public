/**
 * Weather parameter configuration for Today Graph tabs
 */

import { ParameterConfig } from '@/types/parameter';

export const PARAMETERS: ParameterConfig[] = [
  {
    key: 'temperature',
    apiKey: 'temperature',
    label: 'Temperature',
    color: '#ef4444',
    unit: '°C',
  },
  {
    key: 'humidity',
    apiKey: 'humidity',
    label: 'Humidity',
    color: '#3b82f6',
    unit: '%',
  },
  {
    key: 'pressure',
    apiKey: 'pressure',
    label: 'Pressure',
    color: '#a855f7',
    unit: 'hPa',
  },
  {
    key: 'windSpeed',
    apiKey: 'wind-speed',
    label: 'Wind Speed',
    color: '#06b6d4',
    unit: 'km/h',
  },
  {
    key: 'precipitation',
    apiKey: 'precipitation',
    label: 'Precipitation',
    color: '#3b82f6',
    unit: 'mm',
  },
  {
    key: 'uvIndex',
    apiKey: 'uv-index',
    label: 'UV Index',
    color: '#eab308',
    unit: '',
  },
];
