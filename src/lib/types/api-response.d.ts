// In your types file (e.g., types/api.ts or types/telemetry.ts)
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}