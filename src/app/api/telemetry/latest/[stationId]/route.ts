import { NextRequest, NextResponse } from 'next/server';
import { telemetryService } from '@/lib/services/telemetry.service';
import { formatErrorResponse } from '@/lib/utils/error';

/**
 * GET /api/telemetry/latest/:stationId
 * Returns latest telemetry for a station with data transformation
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

    const telemetry = await telemetryService.getLatestTelemetry(stationId);

    return NextResponse.json({
      success: true,
      data: telemetry,
    });
  } catch (error) {
    console.error('Latest telemetry API error:', error);

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
