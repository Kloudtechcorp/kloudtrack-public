import { NextResponse } from "next/server";
import { telemetryService } from "@/services/telemetry.service";
import { formatErrorResponse } from "@/lib/utils/error";

/**
 * GET /api/telemetry/station/[stationId]/parameter/[parameter]
 * Returns parameter-specific history for a station
 * Includes server-side caching and data transformation
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ stationId: string; parameter: string }> }
) {
  try {
    const { stationId, parameter } = await params;

    if (!stationId) {
      return NextResponse.json(
        {
          success: false,
          message: "Station ID is required",
        },
        { status: 400 }
      );
    }

    if (!parameter) {
      return NextResponse.json(
        {
          success: false,
          message: "Parameter is required",
        },
        { status: 400 }
      );
    }

    // Use telemetry service which handles caching and transformation
    const data = await telemetryService.getStationParameterHistory(stationId, parameter);

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Parameter history API error:", error);

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
