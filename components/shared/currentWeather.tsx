import { useLocationContext } from "@/app/context/locationContext";

const CurrentWeather = () => {
  const { selectedLocation, locationData } = useLocationContext();

  if (!selectedLocation) {
    return <div>Loading...</div>;
  }

  const locationWeather = locationData.find(
    (loc) => loc.location === selectedLocation.location
  );

  if (!locationWeather) {
    return <p>Weather data not available for the selected location.</p>;
  }

  return (
    <div className="">
      {/* <h2>{locationWeather.location}</h2>
      <p>Area: {locationWeather.area}</p> */}

      <div className="flex flex-col">
        <span className="font-medium text-lg">Current Weather</span>
        <span className="font-medium italic text-5xl">
          {locationWeather.weather}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="font-medium text-lg">Temperature</span>
        <span className="flex items-start">
          <span className="font-bold text-9xl">
            {locationWeather.temperature.toFixed(1)}
          </span>
          <span className="font-bold text-7xl text-start ">°C</span>
        </span>
      </div>
    </div>
  );
};

export default CurrentWeather;
