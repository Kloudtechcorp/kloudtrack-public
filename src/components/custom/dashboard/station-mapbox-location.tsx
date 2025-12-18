"use client";
import React, { useEffect, useRef } from "react";

interface StationMapboxLocationProps {
  location: [number, number] | null; // [lng, lat]
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

const StationMapboxLocation: React.FC<StationMapboxLocationProps> = ({
  location,
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (!location || !mapContainer.current) return;

    import("mapbox-gl").then((mapboxgl) => {
      // Access the default export
      const mapboxglDefault = mapboxgl.default || mapboxgl;
      
      mapboxglDefault.accessToken = MAPBOX_TOKEN || "";

      if (mapRef.current) {
        mapRef.current.remove();
      }

      mapRef.current = new mapboxglDefault.Map({
        container: mapContainer.current!,
        style: "mapbox://styles/mapbox/light-v11",
        center: location,
        zoom: 12,
      });

      new mapboxglDefault.Marker()
        .setLngLat(location)
        .addTo(mapRef.current);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [location]);

  return (
    <div className="relative h-full w-full">
      {!location && (
        <div className="flex h-full items-center justify-center text-gray-500">
          No location
        </div>
      )}
      <div ref={mapContainer} className="h-full w-full" />
    </div>
  );
};

export default StationMapboxLocation;