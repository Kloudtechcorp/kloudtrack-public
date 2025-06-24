import { StationData } from "@/lib/types";

export const getActivityRecommendation = (activity: string, currentWeather: StationData | null) => {
  if (!currentWeather) {
    return { description: "No data", color: "gray-500" };
  }
  switch (activity) {
    case "Jogging":
      if (
        currentWeather.data.temperature >= 20 &&
        currentWeather.data.temperature <= 25
        // currentWeather.data.uvIndex <= 2 &&
        // currentWeather.data.windSpeed <= 10
      ) {
        return { description: "Perfect Conditions", color: "green-500" };
      }
      if (
        currentWeather.data.temperature >= 25 &&
        currentWeather.data.temperature <= 30
        // currentWeather.data.uvIndex <= 5 &&
        // currentWeather.data.windSpeed <= 20
      ) {
        return { description: "Good", color: "yellow-500" };
      }
      if (
        currentWeather.data.temperature >= 30 &&
        currentWeather.data.temperature <= 35
        // currentWeather.data.uvIndex <= 7 &&
        // currentWeather.data.windSpeed > 20
      ) {
        return { description: "Proceed with Caution", color: "orange-500" };
      }
      if (
        currentWeather.data.temperature >= 35 &&
        currentWeather.data.temperature <= 40
        // currentWeather.data.uvIndex >= 8 &&
        // currentWeather.data.windSpeed > 30
      ) {
        return { description: "Not Ideal", color: "red-500" };
      }
      return { description: "Avoid", color: "purple-500" };

    case "Cycling":
      if (
        currentWeather.data.temperature >= 20 &&
        currentWeather.data.temperature <= 25
        // currentWeather.data.uvIndex <= 2 &&
        // currentWeather.data.windSpeed <= 10
      ) {
        return { description: "Ideal", color: "green-500" };
      }
      if (
        currentWeather.data.temperature >= 25 &&
        currentWeather.data.temperature <= 30
        // currentWeather.data.uvIndex <= 5 &&
        // currentWeather.data.windSpeed <= 15
      ) {
        return { description: "Good", color: "yellow-500" };
      }
      if (
        currentWeather.data.temperature >= 30 &&
        currentWeather.data.temperature <= 35
        // currentWeather.data.uvIndex <= 7 &&
        // currentWeather.data.windSpeed > 15
      ) {
        return { description: "Recommended with Caution", color: "orange-500" };
      }
      if (
        currentWeather.data.temperature >= 35 &&
        currentWeather.data.temperature <= 40
        // currentWeather.data.uvIndex >= 8 &&
        // currentWeather.data.windSpeed > 25
      ) {
        return { description: "High Risk", color: "red-500" };
      }
      return { description: "Not Safe", color: "purple-500" };

    case "Swimming":
      if (
        currentWeather.data.temperature >= 25 &&
        currentWeather.data.temperature <= 30
        // currentWeather.data.uvIndex <= 2
        // &&
        // (currentWeather.data.skyCondition === "Partly Cloudy" ||
        //   currentWeather.data.skyCondition === "Clear")
      ) {
        return { description: "Perfect for Swimming", color: "green-500" };
      }

      if (
        currentWeather.data.temperature >= 30 &&
        currentWeather.data.temperature <= 35
        // currentWeather.data.uvIndex <= 5
        // &&
        // (currentWeather.data.skyCondition === "Partly Cloudy" ||
        //   currentWeather.data.skyCondition === "Clear")
      ) {
        return { description: "Good Conditions", color: "yellow-500" };
      }
      if (
        currentWeather.data.temperature >= 35 &&
        currentWeather.data.temperature <= 40
        // currentWeather.data.uvIndex <= 7
        // &&
        // currentWeather.data.skyCondition === "Mostly Cloudy"
      ) {
        return { description: "Caution", color: "orange-500" };
      }
      if (currentWeather.data.temperature > 40 && currentWeather.data.uvIndex > 8) {
        return { description: "Avoid", color: "red-500" };
      }
      return { description: "Not Ideal", color: "purple-500" };

    case "Camping":
      if (
        currentWeather.data.temperature >= 15 &&
        currentWeather.data.temperature <= 25
        // currentWeather.data.uvIndex <= 2
        // &&
        // (currentWeather.data.skyCondition === "Partly Cloudy" ||
        //   currentWeather.data.skyCondition === "Clear")
      ) {
        return { description: "Perfect Conditions", color: "green-500" };
      }
      if (
        currentWeather.data.temperature >= 25 &&
        currentWeather.data.temperature <= 30
        // currentWeather.data.uvIndex <= 5
        // &&
        // (currentWeather.data.skyCondition === "Partly Cloudy" ||
        //   currentWeather.data.skyCondition === "Clear")
      ) {
        return { description: "Good", color: "yellow-500" };
      }
      if (
        currentWeather.data.temperature >= 30 &&
        currentWeather.data.temperature <= 35
        // currentWeather.data.uvIndex <= 7
        // &&
        // currentWeather.data.skyCondition === "Mostly Cloudy"
      ) {
        return { description: "Proceed with Caution", color: "orange-500" };
      }
      if (
        currentWeather.data.temperature > 35
        // currentWeather.data.uvIndex >= 8
        // &&
        // currentWeather.data.skyCondition === "Stormy"
      ) {
        return { description: "Avoid", color: "red-500" };
      }
      return { description: "Risky", color: "purple-500" };

    case "Sports":
      if (
        currentWeather.data.temperature >= 20 &&
        currentWeather.data.temperature <= 25
        // currentWeather.data.uvIndex <= 2 &&
        // currentWeather.data.windSpeed <= 10
      ) {
        return { description: "Ideal", color: "green-500" };
      }
      if (
        currentWeather.data.temperature >= 25 &&
        currentWeather.data.temperature <= 30
        // currentWeather.data.uvIndex <= 5 &&
        // currentWeather.data.windSpeed <= 15
      ) {
        return { description: "Good", color: "yellow-500" };
      }
      if (
        currentWeather.data.temperature >= 30 &&
        currentWeather.data.temperature <= 35
        // currentWeather.data.uvIndex <= 7 &&
        // currentWeather.data.windSpeed > 15
      ) {
        return { description: "Recommended with Caution", color: "orange-500" };
      }
      if (
        currentWeather.data.temperature >= 35 &&
        currentWeather.data.temperature <= 40
        // currentWeather.data.uvIndex >= 8 &&
        // currentWeather.data.windSpeed > 25
      ) {
        return { description: "Risky", color: "red-500" };
      }
      return { description: "Avoid", color: "purple-500" };

    default:
      return { description: "No data", color: "gray-500" };
  }
};
