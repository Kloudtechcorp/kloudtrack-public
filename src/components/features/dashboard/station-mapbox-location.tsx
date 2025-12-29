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
    <div className="relative w-full h-full bg-card-bg border-2 border-card-border">
      {mapImgUrl ? (
        <>
          <img
            src={mapImgUrl}
            alt="Map snapshot of the station location"
            className="w-full h-full object-cover grayscale opacity-60"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-background/40"></div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative">
              <div className="w-4 h-4 border-2 border-accent bg-accent/20 animate-pulse"></div>
              <div className="absolute -inset-2 border border-accent/40 animate-ping"></div>
            </div>
          </div>
          <div className="absolute top-0 left-0 right-0 border-b-2 border-card-border bg-background/90 px-4 py-2">
            <p className="text-muted text-[10px] font-mono uppercase tracking-wider">LOCATION</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 border-t-2 border-card-border bg-background/90 px-4 py-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent"></div>
              <p className="text-muted text-[10px] font-mono">
                LAT: {lat?.toFixed(4) || "--"} / LON: {lon?.toFixed(4) || "--"}
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-muted text-xs font-mono">[MAP UNAVAILABLE]</span>
        </div>
      )}
    </div>
  );
};

export default StationMapboxLocation;
