import { getGradientStyles } from "@/lib/utils";
import { useWeather } from "./context/weather-context";

export const useTextColor = () => {
  const { weatherParams } = useWeather();
  const { color } = getGradientStyles(weatherParams);
  return color;
};
