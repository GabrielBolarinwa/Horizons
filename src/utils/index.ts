export function formatFullDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

export function formatDayOfWeek(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "long",
  });
}
export function formatTime(dateString: string) {
  return new Date(dateString).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function getTempColor(temperature: number) {
  if (temperature > 25 && temperature < 40) {
    return "#f97316";
  } else if (temperature >= 15 && temperature <= 25) {
    return "#facc15";
  } else if (temperature < 15) {
    return "#60a5fa";
  } else if (temperature > 40) {
    return "#ef4444";
  }
}
