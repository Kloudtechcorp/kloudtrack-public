// Date formatting utilities
export const formatDate = (dateString?: string): { formatted: string; relative: string } => {
  if (!dateString) return { formatted: "No recent data", relative: "Unknown" };

  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor(diffMs / (1000 * 60));

    let relative = "";
    if (diffMins < 1) relative = "Just now";
    else if (diffMins < 60) relative = `${diffMins}m ago`;
    else if (diffHours < 24) relative = `${diffHours}h ago`;
    else relative = `${Math.floor(diffHours / 24)}d ago`;

    // Use toLocaleString to include both date and time; ensure short month and 12-hour clock
    const formatted = date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return { formatted, relative };
  } catch {
    return { formatted: "Invalid date", relative: "Unknown" };
  }
};