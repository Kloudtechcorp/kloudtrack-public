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
  temperature,
  humidity,
  pressure,
}: {
  heatIndex: number;
  temperature: number;
  humidity: number;
  pressure: number;
}): { background: string } => {
  if (heatIndex > 40) {
    return {
      background: "linear-gradient(to top right, #dc2626, #f97316, #facc15)",
    };
  } else if (temperature > 30 && humidity > 80 && pressure < 1015) {
    return {
      background: "linear-gradient(to top right, #f94144, #f7f7f7, #90be6d)",
    };
  } else if (temperature > 30 && humidity <= 80 && pressure > 1015) {
    return {
      background: "linear-gradient(to top right, #f4a261, #f7f7f7, #d62828)",
    };
  } else if (temperature > 30 && humidity <= 80 && pressure <= 1015) {
    return {
      background: "linear-gradient(to top right, #f4a261, #f7f7f7, #2b2d42)",
    };
  } else if (temperature <= 30 && humidity > 80 && pressure > 1015) {
    return {
      background: "linear-gradient(to top right, #90be6d, #f7f7f7, #264653)",
    };
  } else if (temperature <= 30 && humidity > 80 && pressure <= 1015) {
    return {
      background: "linear-gradient(to top right, #8ecae6, #f7f7f7, #023047)",
    };
  } else if (temperature <= 30 && humidity <= 80 && pressure > 1015) {
    return {
      background: "linear-gradient(to top right, #a7c5bd, #f7f7f7, #d2b48c)",
    };
  } else if (temperature <= 30 && humidity <= 80 && pressure <= 1015) {
    return {
      background: "linear-gradient(to top right, #f7f7f7, #a2c2e6, #1e2a47)",
    };
  } else if (humidity > 80 && pressure > 1015) {
    return {
      background: "linear-gradient(to top right, #f7f7f7, #f1faee, #a8dadc)",
    };
  } else if (humidity > 80 && pressure <= 1015) {
    return {
      background: "linear-gradient(to top right, #f7f7f7, #a8dadc, #264653)",
    };
  } else if (temperature > 40) {
    return {
      background: "linear-gradient(to top right, #ffbe0b, #f7f7f7, #d9ed92)",
    };
  } else if (pressure > 1020) {
    return {
      background: "linear-gradient(to top right, #f7f7f7, #d9ed92, #264653)",
    };
  } else {
    return {
      background: "linear-gradient(to top right, #f7f7f7, #f7f7f7, #454545)",
    };
  }
};
