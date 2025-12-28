import { NextResponse } from "next/server";
import { telemetryService } from "@/services/telemetry.service";
import { formatErrorResponse } from "@/lib/utils/error";

/**
 * GET /api/telemetry/dashboard
 * Orchestrates and returns dashboard data for all stations
 * Includes server-side caching and data transformation
 */
export async function GET() {
  try {
    // Use telemetry service which handles caching and transformation
    const data = await telemetryService.getAllStationsDashboardData();

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Dashboard API error:", error);

    const errorResponse = formatErrorResponse(error);
    return NextResponse.json(
      {
        success: false,
        message: errorResponse.message,
      },
      { status: errorResponse.statusCode }
    );
  }
}

// Cache at Next.js level as well (acts as a second layer of caching)
export const revalidate = 60; // Cache for 60 seconds
