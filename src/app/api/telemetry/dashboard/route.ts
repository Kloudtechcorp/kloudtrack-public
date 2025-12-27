import { NextResponse } from 'next/server';
import { getDashboardDataFromKloudtrackApi } from '@/lib/services/kloudtrack-api.service';

/**
 * GET /api/telemetry/dashboard
 * Proxies request to Kloudtrack API with server-side token
 */
export async function GET() {
  try {
    // Call Kloudtrack API with secret token (server-side)
    const data = await getDashboardDataFromKloudtrackApi();

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('Dashboard API error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch dashboard data',
      },
      { status: 500 }
    );
  }
}

// Optional: Add caching headers
export const revalidate = 60; // Cache for 60 seconds
