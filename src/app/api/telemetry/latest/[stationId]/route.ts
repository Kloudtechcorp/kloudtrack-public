import { NextRequest, NextResponse } from 'next/server';
import { getLatestTelemetryFromKloudtrackApi } from '@/lib/services/kloudtrack-api.service';

/**
 * GET /api/telemetry/latest/:stationId
 * Proxies request to Kloudtrack API with server-side token
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { stationId: string } }
) {
  try {
    const { stationId } = params;

    if (!stationId) {
      return NextResponse.json(
        { success: false, error: 'Station ID is required' },
        { status: 400 }
      );
    }

    const telemetry = await getLatestTelemetryFromKloudtrackApi(stationId);

    return NextResponse.json({
      success: true,
      data: telemetry,
    });
  } catch (error) {
    console.error('Latest telemetry API error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch latest telemetry',
      },
      { status: 500 }
    );
  }
}

export const revalidate = 30; // Cache for 30 seconds
