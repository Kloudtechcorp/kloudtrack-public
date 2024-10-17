import { WeatherData } from "@/lib/types";

export const getSuggestion = (
  title: string,
  currentWeather: WeatherData | null
) => {
  if (!currentWeather) {
    return { description: "No data", color: "gray-500" };
  }

  switch (title) {
    case "Umbrellas":
      if (currentWeather.skyCondition === "Clear")
        return { description: "No need", color: "green-500" };
      if (currentWeather.skyCondition === "Partly Cloudy")
        return { description: "Optional", color: "yellow-500" };
      if (currentWeather.skyCondition === "Mostly Cloudy")
        return { description: "Highly Encouraged", color: "red-500" };
      if (
        currentWeather.skyCondition === "Overcast" ||
        currentWeather.skyCondition === "Rainy"
      )
        return { description: "Essential", color: "red-500" };
      return { description: "Essential", color: "red-500" };

    case "Refreshments":
      if (
        currentWeather.temperature < 20 &&
        currentWeather.feelsLike < 25 &&
        currentWeather.uvIndex === 0
      )
        return { description: "Not Necessary", color: "green-500" };
      if (
        currentWeather.temperature >= 20 &&
        currentWeather.temperature <= 25 &&
        currentWeather.feelsLike >= 25 &&
        currentWeather.feelsLike <= 30 &&
        currentWeather.uvIndex <= 2
      )
        return { description: "Nice to Have", color: "yellow-500" };
      if (
        currentWeather.temperature >= 25 &&
        currentWeather.temperature <= 30 &&
        currentWeather.feelsLike >= 30 &&
        currentWeather.feelsLike <= 35 &&
        currentWeather.uvIndex >= 3 &&
        currentWeather.uvIndex <= 5
      )
        return { description: "Suggested", color: "orange-500" };
      if (
        currentWeather.temperature >= 30 &&
        currentWeather.temperature <= 35 &&
        currentWeather.feelsLike >= 35 &&
        currentWeather.feelsLike <= 40 &&
        currentWeather.uvIndex >= 6 &&
        currentWeather.uvIndex <= 7
      )
        return { description: "Highly Suggested", color: "red-500" };
      if (
        currentWeather.temperature > 35 &&
        currentWeather.feelsLike > 40 &&
        currentWeather.uvIndex >= 8
      )
        return { description: "Crucial", color: "purple-500" };
      return { description: "Suggested", color: "orange-500" };

    case "Sunscreen":
      if (currentWeather.uvIndex === 0 && currentWeather.feelsLike < 25)
        return { description: "Not Required", color: "green-500" };
      if (
        currentWeather.uvIndex <= 2 &&
        currentWeather.feelsLike >= 25 &&
        currentWeather.feelsLike <= 30
      )
        return { description: "Optional", color: "yellow-500" };
      if (
        currentWeather.uvIndex <= 5 &&
        currentWeather.feelsLike >= 30 &&
        currentWeather.feelsLike <= 35
      )
        return { description: "Recommended", color: "orange-500" };
      if (
        currentWeather.uvIndex <= 7 &&
        currentWeather.feelsLike >= 35 &&
        currentWeather.feelsLike <= 40
      )
        return { description: "Highly Recommended", color: "red-500" };
      if (currentWeather.uvIndex >= 8 && currentWeather.feelsLike > 40)
        return { description: "Mandatory", color: "purple-500" };
      return { description: "Optional", color: "yellow-500" };

    case "Clothing":
      if (
        currentWeather.uvIndex <= 2 &&
        currentWeather.feelsLike < 25 &&
        currentWeather.temperature < 20
      )
        return { description: "Light Clothing", color: "green-500" };
      if (
        currentWeather.uvIndex <= 5 &&
        currentWeather.feelsLike >= 25 &&
        currentWeather.feelsLike <= 30 &&
        currentWeather.temperature >= 20 &&
        currentWeather.temperature <= 25
      )
        return { description: "Comfortable Clothing", color: "yellow-500" };
      if (
        currentWeather.uvIndex <= 7 &&
        currentWeather.feelsLike >= 30 &&
        currentWeather.feelsLike <= 35 &&
        currentWeather.temperature >= 25 &&
        currentWeather.temperature <= 30
      )
        return {
          description: "Appropriate Sun Protection",
          color: "orange-500",
        };
      if (
        currentWeather.uvIndex >= 8 &&
        currentWeather.feelsLike >= 35 &&
        currentWeather.feelsLike <= 40 &&
        currentWeather.temperature >= 30 &&
        currentWeather.temperature <= 35
      )
        return {
          description: "Sun Protective Clothing Needed",
          color: "red-500",
        };
      if (
        currentWeather.uvIndex >= 10 &&
        currentWeather.feelsLike > 40 &&
        currentWeather.temperature > 35
      )
        return { description: "Full Sun Gear Required", color: "purple-500" };
      return { description: "Comfortable Clothing", color: "yellow-500" };

    case "Driving Conditions":
      if (
        currentWeather.skyCondition === "Clear" &&
        currentWeather.temperature >= 20 &&
        currentWeather.temperature <= 30 &&
        currentWeather.windSpeed <= 10 &&
        currentWeather.visibility > 10
      )
        return { description: "Ideal", color: "green-500" };
      if (
        currentWeather.skyCondition === "Partly Cloudy" &&
        currentWeather.temperature >= 30 &&
        currentWeather.temperature <= 35 &&
        currentWeather.windSpeed <= 20 &&
        currentWeather.visibility >= 8
      )
        return { description: "Manageable", color: "yellow-500" };
      if (
        currentWeather.skyCondition === "Mostly Cloudy" &&
        currentWeather.temperature >= 35 &&
        currentWeather.temperature <= 40 &&
        currentWeather.windSpeed > 20 &&
        currentWeather.visibility >= 5
      )
        return { description: "Caution", color: "orange-500" };
      if (
        currentWeather.skyCondition === "Cloudy" &&
        currentWeather.windSpeed > 30 &&
        currentWeather.visibility < 5
      )
        return { description: "Risky", color: "red-500" };
      if (
        currentWeather.skyCondition === "Stormy" &&
        currentWeather.windSpeed > 40 &&
        currentWeather.visibility < 3
      )
        return { description: "Dangerous", color: "purple-500" };
      return { description: "Manageable", color: "yellow-500" };

    case "Heat Stroke":
      if (currentWeather.temperature < 25 && currentWeather.humidity < 50)
        return { description: "Unlikely", color: "green-500" };
      if (
        currentWeather.temperature >= 25 &&
        currentWeather.temperature <= 30 &&
        currentWeather.humidity >= 50 &&
        currentWeather.humidity <= 60
      )
        return { description: "Low Risk", color: "yellow-500" };
      if (
        currentWeather.temperature >= 30 &&
        currentWeather.temperature <= 35 &&
        currentWeather.humidity >= 60 &&
        currentWeather.humidity <= 70
      )
        return { description: "Moderate Risk", color: "orange-500" };
      if (
        currentWeather.temperature >= 35 &&
        currentWeather.temperature <= 40 &&
        currentWeather.humidity >= 70 &&
        currentWeather.humidity <= 80
      )
        return { description: "High Risk", color: "red-500" };
      if (currentWeather.temperature > 40 && currentWeather.humidity > 80)
        return { description: "Severe Risk", color: "purple-500" };
      return { description: "Low Risk", color: "yellow-500" };

    default:
      return { description: "No data", color: "gray-500" };
  }
};
