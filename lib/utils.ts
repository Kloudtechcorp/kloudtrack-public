import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateString(
  dateString: string,
  month: "numeric" | "2-digit" | "long" | "short" | "narrow" | undefined
) {
  const now = new Date(dateString);
  const utcPlus8Now = new Date(now.getTime() - 8 * 60 * 60 * 1000);

  const options: Intl.DateTimeFormatOptions = {
    month: month,
    day: "numeric",
  };

  if (month !== "short") {
    options.year = "numeric";
  }
  const date = new Date(utcPlus8Now);
  const formattedDate = date.toLocaleDateString("en-US", options);
  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "numeric",
  });

  return `${formattedDate} at ${time}`;
}

export const getGradientStyles = ({
  heatIndex,
  recordedAt = "2025-01-16T08:53:52.000Z",
}: {
  heatIndex: number;
  recordedAt?: string;
}): { background: string; color: string } => {
  const isNight = (() => {
    const date = new Date(recordedAt);
    const hour = date.getUTCHours();
    return hour >= 18 || hour < 6;
  })();

  const textColor = isNight ? "white" : "black";

  if (heatIndex >= 52) {
    return {
      background: isNight
        ? "linear-gradient(0deg, rgba(255,158,158,1) 0%, rgba(45,45,45,1) 100%)"
        : "linear-gradient(45deg, rgba(255,255,255,1) 0%, rgba(255,158,158,1) 50%, rgba(255,93,63,1) 100%)",
      color: textColor,
    };
  } else if (heatIndex >= 42 && heatIndex < 52) {
    return {
      background: isNight
        ? "linear-gradient(0deg, rgba(255,206,158,1) 0%, rgba(45,45,45,1) 100%)"
        : "linear-gradient(45deg, rgba(255,255,255,1) 0%, rgba(255,206,158,1) 50%, rgba(255,158,63,1) 100%)",
      color: textColor,
    };
  } else if (heatIndex > 32 && heatIndex < 42) {
    return {
      background: isNight
        ? "linear-gradient(0deg, rgba(255,236,167,1) 0%, rgba(45,45,45,1) 100%)"
        : "linear-gradient(45deg, rgba(255,255,255,1) 0%, rgba(255,236,167,1) 50%, rgba(255,214,63,1) 100%)",
      color: textColor,
    };
  } else if (heatIndex >= 27 && heatIndex <= 32) {
    return {
      background: isNight
        ? "linear-gradient(0deg, rgba(255,253,167,1) 0%, rgba(45,45,45,1) 100%)"
        : "linear-gradient(45deg, rgba(255,255,255,1) 0%, rgba(255,253,167,1) 50%, rgba(255,252,112,1) 100%)",
      color: textColor,
    };
  } else {
    return {
      background: isNight
        ? "linear-gradient(0deg, rgba(144,203,255,1) 0%, rgba(45,45,45,1) 100%)"
        : "linear-gradient(45deg, rgba(255,255,255,1) 0%, rgba(158,232,255,1) 50%, rgba(63,126,255,1) 100%)",
      color: textColor,
    };
  }
};

export const getWindDirectionLabel = (value: number) => {
  if (value >= 337.6 || value <= 22.5) {
    return `°N (${Math.round(value * 100) / 100}°)`;
  } else if (value >= 22.6 && value <= 67.5) {
    return `NE (${Math.round(value * 100) / 100}°)`;
  } else if (value >= 67.6 && value <= 112.5) {
    return `E (${Math.round(value * 100) / 100}°)`;
  } else if (value >= 112.6 && value <= 157.5) {
    return `SE (${Math.round(value * 100) / 100}°)`;
  } else if (value >= 157.6 && value <= 202.5) {
    return `S (${Math.round(value * 100) / 100}°)`;
  } else if (value >= 202.6 && value <= 247.5) {
    return `SW (${Math.round(value * 100) / 100}°)`;
  } else if (value >= 247.6 && value <= 292.5) {
    return `W (${Math.round(value * 100) / 100}°)`;
  } else if (value >= 292.6 && value <= 337.5) {
    return `NW (${Math.round(value * 100) / 100}°)`;
  } else {
    return `--`;
  }
};

export const getWindForce = (speed: number): string => {
  if (speed < 1) return "Calm";
  if (speed < 4) return "Light Air";
  if (speed < 7) return "Light Breeze";
  if (speed < 11) return "Gentle Breeze";
  if (speed < 16) return "Moderate Breeze";
  if (speed < 22) return "Fresh Breeze";
  if (speed < 28) return "Strong Breeze";
  if (speed < 34) return "Near Gale";
  return "Gale";
};

export const getUVLevel = (index: number): string => {
  if (index < 3) return "Low";
  if (index < 6) return "Moderate";
  if (index < 8) return "High";
  if (index < 11) return "Very High";
  return "Extreme";
};

export const getHumidityLevel = (humidity: number): string => {
  if (humidity < 30) return "Low";
  if (humidity < 60) return "Moderate";
  return "High";
};

export const truncateText = (
  description: string,
  maxLength: number,
  addEllipsis: boolean = true
): string => {
  if (!description) return "";
  if (description.length <= maxLength) return description;

  let truncated = description.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(" ");

  if (lastSpaceIndex !== -1 && lastSpaceIndex < maxLength - 1) {
    truncated = truncated.substring(0, lastSpaceIndex);
  }

  return addEllipsis ? `${truncated}...` : truncated;
};

export function convertTemperature(value: number, toUnit: "C" | "F"): number {
  if (toUnit === "F") {
    return (value * 9) / 5 + 32;
  }
  return value;
}
