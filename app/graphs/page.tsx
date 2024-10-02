"use client";

import { useRouter } from "next/navigation";
import React from "react";

const GraphsOverview = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-bold">Available Graphs</h1>
      <div className="mt-4 space-y-2">
        <button
          type="button"
          onClick={() => router.push("/graphs/temperature")}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Temperature Graph
        </button>
        <button
          type="button"
          onClick={() => router.push("/graphs/humidity")}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Humidity Graph
        </button>
      </div>
    </div>
  );
};

export default GraphsOverview;
