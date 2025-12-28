import { NextResponse } from "next/server";
import { insightsService } from "@/services/insights.service";
import { formatErrorResponse } from "@/lib/utils/error";

/**
 * GET /api/insights/:stationId
 * Retrieves contextual insights for a single weather station
 * Includes classifications, comparisons, and natural language narratives
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

    // Use insights service which handles caching and API calls
    const data = await insightsService.getStationInsights(stationId);

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Station insights API error:", error);

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
