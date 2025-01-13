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
