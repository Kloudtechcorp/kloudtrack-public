import { NextResponse } from 'next/server';
import { telemetryService } from '@/lib/services/telemetry.service';
import { formatErrorResponse } from '@/lib/utils/error';

/**
 * GET /api/telemetry/stations
 * Returns list of all stations with server-side caching
 */
export async function GET() {
  try {
    const stations = await telemetryService.getAllStations();

    return NextResponse.json({
      success: true,
      data: stations,
    });
  } catch (error) {
    console.error('Stations API error:', error);

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

export const revalidate = 300; // Cache for 5 minutes
