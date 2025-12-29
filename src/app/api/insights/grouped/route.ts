import { NextResponse } from "next/server";
import { insightsService } from "@/services/insights.service";
import { formatErrorResponse } from "@/lib/utils/error";

// Force dynamic rendering since we need query parameters
export const dynamic = 'force-dynamic';

/**
 * GET /api/insights/grouped?groupBy={city|organization}&groupKey={value}
 * Retrieves aggregated insights for multiple stations grouped by city or organization
 * Includes average/max values, ranges, and comparisons across all stations in the group
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const groupBy = searchParams.get("groupBy");
    const groupKey = searchParams.get("groupKey");

    // Validate required parameters
    if (!groupBy || !groupKey) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required query parameters: groupBy and groupKey",
        },
        { status: 400 }
      );
    }

    // Validate groupBy parameter
    if (groupBy !== 'city' && groupBy !== 'organization') {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid groupBy parameter. Must be 'city' or 'organization'",
        },
        { status: 400 }
      );
    }

    // Use insights service which handles caching and API calls
    const data = await insightsService.getGroupedInsights(groupBy, groupKey);

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Grouped insights API error:", error);

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
