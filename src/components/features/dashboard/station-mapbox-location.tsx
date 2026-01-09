"use client";

import { useMemo } from "react";

interface StationMapboxLocationProps {
  location?: [number, number] | null;
}

const StationMapboxLocation = ({ location }: StationMapboxLocationProps) => {
  // Destructure safely with default nulls
  const lon = location?.[0] ?? null;
  const lat = location?.[1] ?? null;

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

  const styles = [
    "streets-v12",           
    "outdoors-v12",          
    "light-v11",             
    "dark-v11",             
    "satellite-v9",         
    "satellite-streets-v12", 
    "navigation-day-v1",     
    "navigation-night-v1",   
  ] as const;

  const selectedStyle = styles[3];

  // Static map image URL
  const mapImgUrl = useMemo(() => {
    if (lat === null || lon === null) return null;

    const width = 480;
    const height = 320;
    const zoom = 7;

    if (mapboxToken) {
      return `https://api.mapbox.com/styles/v1/mapbox/${encodeURIComponent(
        selectedStyle
      )}/static/${encodeURIComponent(lon)},${encodeURIComponent(
        lat
      )},${zoom},0/${width}x${height}@2x?access_token=${mapboxToken}`;
    }

    // Fallback to OpenStreetMap static image
    return `https://staticmap.openstreetmap.de/staticmap.php?center=${encodeURIComponent(
      lat
    )},${encodeURIComponent(lon)}&zoom=${zoom}&size=${width}x${height}`;
  }, [lat, lon, mapboxToken, selectedStyle]);


  return (
    <div className="relative w-full h-full bg-card border-2 border-card-border overflow-hidden">
      {mapImgUrl ? (
        <>
          <img
            src={mapImgUrl}
            alt="Map snapshot of the station location"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Overlay darken */}
          {/* <div className="absolute inset-0 bg-background/40"></div> */}

          {/* Pulsing marker */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative">
              <div className="w-4 h-4 border-2 border-main bg-main animate-pulse rounded-full"></div>
              <div className="absolute -inset-2 border border-main/40 animate-ping rounded-full"></div>
            </div>
          </div>

          {/* Top label */}
          <div className="absolute top-0 left-0 right-0 border-b-2 border-card-border bg-card px-6 py-3">
            <p className="text-foreground text-[10px] font-mono uppercase tracking-wider">
              LOCATION
            </p>
          </div>

          {/* Bottom coordinates */}
          <div className="absolute bottom-0 left-0 right-0 border-t-2 border-card-border bg-card px-6 py-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-main rounded-full"></div>
              <p className="text-muted-foreground text-[10px] font-mono">
                LAT: {lat?.toFixed(4) ?? "--"} / LON: {lon?.toFixed(4) ?? "--"}
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-muted-foreground text-xs font-mono">[MAP UNAVAILABLE]</span>
        </div>
      )}
    </div>
  );
};

export default StationMapboxLocation;
