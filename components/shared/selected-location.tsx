import { Button } from "@/components/ui/button";
import { useAWSStations } from "@/hooks/context/station-context";
import { BookOpen, MapPin, Star, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import React from "react";
import { Card } from "../ui/card";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SelectedLocation = ({ onClose }: { onClose?: any }) => {
  const router = useRouter();
  const {
    stations,
    loading,
    error,
    selectedStation,
    setSelectedStation,
    favoriteLocations,
    removeFavoriteLocation,
  } = useAWSStations();

  if (loading || !stations) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8 text-red-500">
        <p>Error loading locations: {error}</p>
      </div>
    );
  }

  const handleSelect = (currentValue: string) => {
    setSelectedStation(currentValue);
    onClose?.();
  };

  const handleTerminologiesClick = () => {
    router.push("/terminologies");
    onClose?.();
  };

  const handleRemoveFavorite = (e: React.MouseEvent, locationId: string) => {
    e.stopPropagation();
    removeFavoriteLocation(locationId);
  };

  return (
    <div>
      <div className="mb-6">
        <Button
          onClick={handleTerminologiesClick}
          className="w-full md:hidden bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
        >
          <BookOpen className="w-4 h-4 mr-2" />
          Weather Terminologies
        </Button>
      </div>

      <div className="md:hidden flex items-center gap-2 mb-4">
        <Star className="w-5 h-5 text-yellow-500 fill-current" />
        <h3 className="text-sm font-semibold text-gray-800">
          Favorite Locations
        </h3>
        <span className="text-sm text-gray-500">
          ({favoriteLocations.length})
        </span>
      </div>

      <div className="grid md:hidden grid-cols-1 sm:grid-cols-2 gap-3">
        <AnimatePresence>
          {favoriteLocations.map((favLocationId) => {
            const favStation = stations.find(
              (station) => station.id === favLocationId
            );

            return favStation ? (
              <motion.div
                key={favLocationId}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                }}
                className="relative group"
              >
                <Card
                  className={`
                    relative overflow-hidden cursor-pointer border-2 transition-all duration-200
                    hover:shadow-lg hover:shadow-yellow-500/20
                    ${
                      favLocationId === selectedStation
                        ? "border-yellow-500 bg-gradient-to-br from-yellow-50 to-yellow-100 shadow-md"
                        : "border-gray-200 bg-white hover:border-yellow-300"
                    }
                  `}
                  onClick={() => handleSelect(favLocationId)}
                >
                  {favLocationId === selectedStation && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-yellow-600" />
                  )}

                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1 min-w-0 me-2">
                        <div
                          className={`
                          p-2 rounded-full transition-colors duration-200
                          ${
                            favLocationId === selectedStation
                              ? "bg-yellow-500 text-white"
                              : "bg-gray-100 text-gray-600 group-hover:bg-yellow-100 group-hover:text-yellow-600"
                          }
                        `}
                        >
                          <MapPin className="w-4 h-4" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4
                            className={`
                            font-medium text-sm leading-tight truncate
                            ${
                              favLocationId === selectedStation
                                ? "text-yellow-800"
                                : "text-gray-800"
                            }
                          `}
                          >
                            {favStation.name}
                          </h4>
                          {favLocationId === selectedStation && (
                            <p className="text-xs text-yellow-600 mt-1">
                              Currently selected
                            </p>
                          )}
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        className={`
                          opacity-0 group-hover:opacity-100 transition-opacity duration-200
                          h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600
                          ${
                            favLocationId === selectedStation
                              ? "opacity-100"
                              : ""
                          }
                        `}
                        onClick={(e) => handleRemoveFavorite(e, favLocationId)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ) : null;
          })}
        </AnimatePresence>
      </div>

      <ScrollArea className="hidden md:block w-full whitespace-nowrap">
        <div className="flex items-center gap-3">
          <AnimatePresence>
            {favoriteLocations.map((favLocationId) => {
              const favStation = stations.find(
                (station) => station.id === favLocationId
              );

              return favStation ? (
                <motion.div
                  key={favLocationId}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                  }}
                  className="relative group"
                >
                  <Card
                    className={`
                    relative overflow-hidden cursor-pointer border-2 transition-all duration-200
                    hover:shadow-lg hover:shadow-yellow-500/20
                    ${
                      favLocationId === selectedStation
                        ? "border-yellow-500 bg-gradient-to-br from-yellow-50 to-yellow-100 shadow-md"
                        : "border-gray-200 bg-white hover:border-yellow-300"
                    }
                  `}
                    onClick={() => handleSelect(favLocationId)}
                  >
                    {favLocationId === selectedStation && (
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-yellow-600" />
                    )}

                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1 min-w-0 me-2">
                          <div
                            className={`
                          p-2 rounded-full transition-colors duration-200
                          ${
                            favLocationId === selectedStation
                              ? "bg-yellow-500 text-white"
                              : "bg-gray-100 text-gray-600 group-hover:bg-yellow-100 group-hover:text-yellow-600"
                          }
                        `}
                          >
                            <MapPin className="w-4 h-4" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h4
                              className={`
                            font-medium text-sm leading-tight truncate
                            ${
                              favLocationId === selectedStation
                                ? "text-yellow-800"
                                : "text-gray-800"
                            }
                          `}
                            >
                              {favStation.name}
                            </h4>
                            {favLocationId === selectedStation && (
                              <p className="text-xs text-yellow-600 mt-1">
                                Currently selected
                              </p>
                            )}
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          className={`
                          opacity-0 group-hover:opacity-100 transition-opacity duration-200
                          h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600
                          ${
                            favLocationId === selectedStation
                              ? "opacity-100"
                              : ""
                          }
                        `}
                          onClick={(e) =>
                            handleRemoveFavorite(e, favLocationId)
                          }
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ) : null;
            })}
          </AnimatePresence>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default SelectedLocation;
