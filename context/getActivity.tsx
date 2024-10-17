import { WeatherData } from "@/lib/types";

export const getActivityRecommendation = (
  activity: string,
  currentWeather: WeatherData | null
) => {
  if (!currentWeather) {
    return { description: "No data", color: "gray-500" };
  }
  switch (activity) {
    case "Jogging":
      if (
        currentWeather.temperature >= 20 &&
        currentWeather.temperature <= 25 &&
        currentWeather.uvIndex <= 2 &&
        currentWeather.windSpeed <= 10
      ) {
        return { description: "Perfect Conditions", color: "green-500" };
      }
      if (
        currentWeather.temperature >= 25 &&
        currentWeather.temperature <= 30 &&
        currentWeather.uvIndex <= 5 &&
        currentWeather.windSpeed <= 20
      ) {
        return { description: "Good", color: "yellow-500" };
      }
      if (
        currentWeather.temperature >= 30 &&
        currentWeather.temperature <= 35 &&
        currentWeather.uvIndex <= 7 &&
        currentWeather.windSpeed > 20
      ) {
        return { description: "Proceed with Caution", color: "orange-500" };
      }
      if (
        currentWeather.temperature >= 35 &&
        currentWeather.temperature <= 40 &&
        currentWeather.uvIndex >= 8 &&
        currentWeather.windSpeed > 30
      ) {
        return { description: "Not Ideal", color: "red-500" };
      }
      return { description: "Avoid", color: "purple-500" };

    case "Cycling":
      if (
        currentWeather.temperature >= 20 &&
        currentWeather.temperature <= 25 &&
        currentWeather.uvIndex <= 2 &&
        currentWeather.windSpeed <= 10
      ) {
        return { description: "Ideal", color: "green-500" };
      }
      if (
        currentWeather.temperature >= 25 &&
        currentWeather.temperature <= 30 &&
        currentWeather.uvIndex <= 5 &&
        currentWeather.windSpeed <= 15
      ) {
        return { description: "Good", color: "yellow-500" };
      }
      if (
        currentWeather.temperature >= 30 &&
        currentWeather.temperature <= 35 &&
        currentWeather.uvIndex <= 7 &&
        currentWeather.windSpeed > 15
      ) {
        return { description: "Recommended with Caution", color: "orange-500" };
      }
      if (
        currentWeather.temperature >= 35 &&
        currentWeather.temperature <= 40 &&
        currentWeather.uvIndex >= 8 &&
        currentWeather.windSpeed > 25
      ) {
        return { description: "High Risk", color: "red-500" };
      }
      return { description: "Not Safe", color: "purple-500" };

    case "Swimming":
      if (
        currentWeather.temperature >= 25 &&
        currentWeather.temperature <= 30 &&
        currentWeather.uvIndex <= 2 &&
        (currentWeather.skyCondition === "Partly Cloudy" ||
          currentWeather.skyCondition === "Clear")
      ) {
        return { description: "Perfect for Swimming", color: "green-500" };
      }

      if (
        currentWeather.temperature >= 30 &&
        currentWeather.temperature <= 35 &&
        currentWeather.uvIndex <= 5 &&
        (currentWeather.skyCondition === "Partly Cloudy" ||
          currentWeather.skyCondition === "Clear")
      ) {
        return { description: "Good Conditions", color: "yellow-500" };
      }
      if (
        currentWeather.temperature >= 35 &&
        currentWeather.temperature <= 40 &&
        currentWeather.uvIndex <= 7 &&
        currentWeather.skyCondition === "Mostly Cloudy"
      ) {
        return { description: "Caution", color: "orange-500" };
      }
      if (currentWeather.temperature > 40 && currentWeather.uvIndex > 8) {
        return { description: "Avoid", color: "red-500" };
      }
      return { description: "Not Ideal", color: "purple-500" };

    case "Camping":
      if (
        currentWeather.temperature >= 15 &&
        currentWeather.temperature <= 25 &&
        currentWeather.uvIndex <= 2 &&
        (currentWeather.skyCondition === "Partly Cloudy" ||
          currentWeather.skyCondition === "Clear")
      ) {
        return { description: "Perfect Conditions", color: "green-500" };
      }
      if (
        currentWeather.temperature >= 25 &&
        currentWeather.temperature <= 30 &&
        currentWeather.uvIndex <= 5 &&
        (currentWeather.skyCondition === "Partly Cloudy" ||
          currentWeather.skyCondition === "Clear")
      ) {
        return { description: "Good", color: "yellow-500" };
      }
      if (
        currentWeather.temperature >= 30 &&
        currentWeather.temperature <= 35 &&
        currentWeather.uvIndex <= 7 &&
        currentWeather.skyCondition === "Mostly Cloudy"
      ) {
        return { description: "Proceed with Caution", color: "orange-500" };
      }
      if (
        currentWeather.temperature > 35 &&
        currentWeather.uvIndex >= 8 &&
        currentWeather.skyCondition === "Stormy"
      ) {
        return { description: "Avoid", color: "red-500" };
      }
      return { description: "Risky", color: "purple-500" };

    case "Sports":
      if (
        currentWeather.temperature >= 20 &&
        currentWeather.temperature <= 25 &&
        currentWeather.uvIndex <= 2 &&
        currentWeather.windSpeed <= 10
      ) {
        return { description: "Ideal", color: "green-500" };
      }
      if (
        currentWeather.temperature >= 25 &&
        currentWeather.temperature <= 30 &&
        currentWeather.uvIndex <= 5 &&
        currentWeather.windSpeed <= 15
      ) {
        return { description: "Good", color: "yellow-500" };
      }
      if (
        currentWeather.temperature >= 30 &&
        currentWeather.temperature <= 35 &&
        currentWeather.uvIndex <= 7 &&
        currentWeather.windSpeed > 15
      ) {
        return { description: "Recommended with Caution", color: "orange-500" };
      }
      if (
        currentWeather.temperature >= 35 &&
        currentWeather.temperature <= 40 &&
        currentWeather.uvIndex >= 8 &&
        currentWeather.windSpeed > 25
      ) {
        return { description: "Risky", color: "red-500" };
      }
      return { description: "Avoid", color: "purple-500" };

    default:
      return { description: "No data", color: "gray-500" };
  }
};
