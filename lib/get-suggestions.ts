import { StationData } from "@/lib/types";

export const getSuggestion = (title: string, currentWeather: StationData | null) => {
  if (!currentWeather) {
    return { description: "No data", color: "gray-500" };
  }

  switch (title) {
    case "Umbrellas":
      // if (currentWeather.data.skyCondition === "Clear")
      //   return { description: "No need", color: "green-500" };
      // if (currentWeather.data.skyCondition === "Partly Cloudy")
      //   return { description: "Optional", color: "yellow-500" };
      // if (currentWeather.data.skyCondition === "Mostly Cloudy")
      //   return { description: "Highly Encouraged", color: "red-500" };
      // if (
      //   currentWeather.data.skyCondition === "Overcast" ||
      //   currentWeather.data.skyCondition === "Rainy"
      // )
      return { description: "Essential", color: "red-500" };

    case "Refreshments":
      if (
        currentWeather.data.temperature < 20 &&
        currentWeather.data.heatIndex < 25 &&
        currentWeather.data.uvIndex === 0
      )
        return { description: "Not Necessary", color: "green-500" };
      if (
        currentWeather.data.temperature >= 20 &&
        currentWeather.data.temperature <= 25 &&
        currentWeather.data.heatIndex >= 25 &&
        currentWeather.data.heatIndex <= 30 &&
        currentWeather.data.uvIndex <= 2
      )
        return { description: "Nice to Have", color: "yellow-500" };
      if (
        currentWeather.data.temperature >= 25 &&
        currentWeather.data.temperature <= 30 &&
        currentWeather.data.heatIndex >= 30 &&
        currentWeather.data.heatIndex <= 35 &&
        currentWeather.data.uvIndex >= 3 &&
        currentWeather.data.uvIndex <= 5
      )
        return { description: "Suggested", color: "orange-500" };
      if (
        currentWeather.data.temperature >= 30 &&
        currentWeather.data.temperature <= 35 &&
        currentWeather.data.heatIndex >= 35 &&
        currentWeather.data.heatIndex <= 40 &&
        currentWeather.data.uvIndex >= 6 &&
        currentWeather.data.uvIndex <= 7
      )
        return { description: "Highly Suggested", color: "red-500" };
      if (
        currentWeather.data.temperature > 35 &&
        currentWeather.data.heatIndex > 40 &&
        currentWeather.data.uvIndex >= 8
      )
        return { description: "Crucial", color: "purple-500" };
      return { description: "Suggested", color: "orange-500" };

    case "Sunscreen":
      if (currentWeather.data.uvIndex === 0 && currentWeather.data.heatIndex < 25)
        return { description: "Not Required", color: "green-500" };
      if (
        currentWeather.data.uvIndex <= 2 &&
        currentWeather.data.heatIndex >= 25 &&
        currentWeather.data.heatIndex <= 30
      )
        return { description: "Optional", color: "yellow-500" };
      if (
        currentWeather.data.uvIndex <= 5 &&
        currentWeather.data.heatIndex >= 30 &&
        currentWeather.data.heatIndex <= 35
      )
        return { description: "Recommended", color: "orange-500" };
      if (
        currentWeather.data.uvIndex <= 7 &&
        currentWeather.data.heatIndex >= 35 &&
        currentWeather.data.heatIndex <= 40
      )
        return { description: "Highly Recommended", color: "red-500" };
      if (currentWeather.data.uvIndex >= 8 && currentWeather.data.heatIndex > 40)
        return { description: "Mandatory", color: "purple-500" };
      return { description: "Optional", color: "yellow-500" };

    case "Clothing":
      if (
        currentWeather.data.uvIndex <= 2 &&
        currentWeather.data.heatIndex < 25 &&
        currentWeather.data.temperature < 20
      )
        return { description: "Light Clothing", color: "green-500" };
      if (
        currentWeather.data.uvIndex <= 5 &&
        currentWeather.data.heatIndex >= 25 &&
        currentWeather.data.heatIndex <= 30 &&
        currentWeather.data.temperature >= 20 &&
        currentWeather.data.temperature <= 25
      )
        return { description: "Comfortable Clothing", color: "yellow-500" };
      if (
        currentWeather.data.uvIndex <= 7 &&
        currentWeather.data.heatIndex >= 30 &&
        currentWeather.data.heatIndex <= 35 &&
        currentWeather.data.temperature >= 25 &&
        currentWeather.data.temperature <= 30
      )
        return {
          description: "Appropriate Sun Protection",
          color: "orange-500",
        };
      if (
        currentWeather.data.uvIndex >= 8 &&
        currentWeather.data.heatIndex >= 35 &&
        currentWeather.data.heatIndex <= 40 &&
        currentWeather.data.temperature >= 30 &&
        currentWeather.data.temperature <= 35
      )
        return {
          description: "Sun Protective Clothing Needed",
          color: "red-500",
        };
      if (
        currentWeather.data.uvIndex >= 10 &&
        currentWeather.data.heatIndex > 40 &&
        currentWeather.data.temperature > 35
      )
        return { description: "Full Sun Gear Required", color: "purple-500" };
      return { description: "Comfortable Clothing", color: "yellow-500" };

    case "Driving Conditions":
      if (
        // currentWeather.data.skyCondition === "Clear" &&
        currentWeather.data.temperature >= 20 &&
        currentWeather.data.temperature <= 30 &&
        currentWeather.data.windSpeed <= 10
        // && currentWeather.data.visibility > 10
      )
        return { description: "Ideal", color: "green-500" };
      if (
        // currentWeather.data.skyCondition === "Partly Cloudy" &&
        currentWeather.data.temperature >= 30 &&
        currentWeather.data.temperature <= 35 &&
        currentWeather.data.windSpeed <= 20
        //  && currentWeather.data.visibility >= 8
      )
        return { description: "Manageable", color: "yellow-500" };
      if (
        // currentWeather.data.skyCondition === "Mostly Cloudy" &&
        currentWeather.data.temperature >= 35 &&
        currentWeather.data.temperature <= 40 &&
        currentWeather.data.windSpeed > 20
        //  && currentWeather.data.visibility >= 5
      )
        return { description: "Caution", color: "orange-500" };
      if (
        // currentWeather.data.skyCondition === "Cloudy" &&
        currentWeather.data.windSpeed > 30
        //  && currentWeather.data.visibility < 5
      )
        return { description: "Risky", color: "red-500" };
      if (
        // currentWeather.data.skyCondition === "Stormy" &&
        currentWeather.data.windSpeed > 40
        //  && currentWeather.data.visibility < 3
      )
        return { description: "Dangerous", color: "purple-500" };
      return { description: "Manageable", color: "yellow-500" };

    case "Heat Stroke":
      if (currentWeather.data.temperature < 25 && currentWeather.data.humidity < 50)
        return { description: "Unlikely", color: "green-500" };
      if (
        currentWeather.data.temperature >= 25 &&
        currentWeather.data.temperature <= 30 &&
        currentWeather.data.humidity >= 50 &&
        currentWeather.data.humidity <= 60
      )
        return { description: "Low Risk", color: "yellow-500" };
      if (
        currentWeather.data.temperature >= 30 &&
        currentWeather.data.temperature <= 35 &&
        currentWeather.data.humidity >= 60 &&
        currentWeather.data.humidity <= 70
      )
        return { description: "Moderate Risk", color: "orange-500" };
      if (
        currentWeather.data.temperature >= 35 &&
        currentWeather.data.temperature <= 40 &&
        currentWeather.data.humidity >= 70 &&
        currentWeather.data.humidity <= 80
      )
        return { description: "High Risk", color: "red-500" };
      if (currentWeather.data.temperature > 40 && currentWeather.data.humidity > 80)
        return { description: "Severe Risk", color: "purple-500" };
      return { description: "Low Risk", color: "yellow-500" };

    default:
      return { description: "No data", color: "gray-500" };
  }
};
