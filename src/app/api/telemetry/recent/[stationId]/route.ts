import { NextRequest, NextResponse } from 'next/server';
import { telemetryService } from '@/lib/services/telemetry.service';
import { formatErrorResponse } from '@/lib/utils/error';

/**
 * GET /api/telemetry/recent/:stationId
 * Returns recent telemetry history for a station with data transformation
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { stationId: string } }
) {
  try {
    const { stationId } = params;

    if (!stationId) {
      return NextResponse.json(
        { success: false, message: 'Station ID is required' },
        { status: 400 }
      );
    }

    const telemetry = await telemetryService.getStationHistoryWithInfo(stationId);

    return NextResponse.json({
      success: true,
      data: telemetry,
    });
  } catch (error) {
    console.error('Recent telemetry API error:', error);

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

export const revalidate = 30; // Cache for 30 seconds
