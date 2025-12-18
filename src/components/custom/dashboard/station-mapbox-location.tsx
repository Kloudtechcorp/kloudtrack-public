"use client";
import { useMemo } from "react";

interface StationMapboxLocationProps {
  location?: [number, number] | null;
}

const StationMapboxLocation = ({ location }: StationMapboxLocationProps) => {
  const [lon, lat] = useMemo(() => {
    if (location && Array.isArray(location) && location.length >= 2) {
      const lon = Number(location[0]);
      const lat = Number(location[1]);
      if (Number.isFinite(lon) && Number.isFinite(lat)) return [lon, lat] as const;
    }
    return [null, null] as const;
  }, [location]);

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

  const mapImgUrl = useMemo(() => {
    if (lat == null || lon == null) return null;
    const width = 480; // px
    const height = 320; // px
    const zoom = 8;
    if (mapboxToken) {
      return `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/${lon},${lat},${zoom},0/${width}x${height}@2x?access_token=${mapboxToken}`;
    }
    // Fallback to OpenStreetMap static image
    return `https://staticmap.openstreetmap.de/staticmap.php?center=${lat},${lon}&zoom=${zoom}&size=${width}x${height}`;
  }, [lat, lon, mapboxToken]);

  return (
    <div className="relative w-full h-full">
      {mapImgUrl ? (
        <>
          <img
            src={mapImgUrl}
            alt="Map snapshot of the station location"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Pulsing yellow dot */}
            <div className="relative w-2.5 h-2.5">
              <span className="absolute top-0 left-0 w-full h-full rounded-full bg-yellow-400 opacity-75 animate-ping"></span>
              <span className="absolute top-0 left-0 w-full h-full rounded-full bg-yellow-500"></span>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs text-gray-500">
          Map unavailable
        </div>
      )}
    </div>
  );
};

export default StationMapboxLocation;
