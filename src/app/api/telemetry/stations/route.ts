import { NextResponse } from 'next/server';
import { getStationsFromKloudtrackApi } from '@/lib/services/kloudtrack-api.service';

/**
 * GET /api/telemetry/stations
 * Proxies request to Kloudtrack API with server-side token
 */
export async function GET() {
  try {
    const stations = await getStationsFromKloudtrackApi();

    return NextResponse.json({
      success: true,
      data: stations,
    });
  } catch (error) {
    console.error('Stations API error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch stations',
      },
      { status: 500 }
    );
  }
}

export const revalidate = 300; // Cache for 5 minutes
