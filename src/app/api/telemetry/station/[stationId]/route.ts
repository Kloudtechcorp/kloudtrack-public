import { NextResponse } from "next/server";
import { telemetryService } from "@/services/telemetry.service";
import { formatErrorResponse } from "@/lib/utils/error";

/**
 * GET /api/telemetry/station/[stationId]
 * Returns dashboard data for a single station
 * Includes server-side caching and data transformation
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ stationId: string }> }
) {
  try {
    const { stationId } = await params;

    if (!stationId) {
      return NextResponse.json(
        {
          success: false,
          message: "Station ID is required",
        },
        { status: 400 }
      );
    }

    // Use telemetry service which handles caching and transformation
    const data = await telemetryService.getStationDashboardData(stationId);

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Station dashboard API error:", error);

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

// Cache at Next.js level (acts as a second layer of caching)
export const revalidate = 60; // Cache for 60 seconds
