import { useState } from "react";

interface UseDateTimeSelectionResult {
  selectedDateTime: Date;
  onDateTimeChange: (date: Date) => void;
  formatDate: (date: Date) => string;
  formatTime: (date: Date) => string;
}

export const useDateTimeSelection = (): UseDateTimeSelectionResult => {
  const [selectedDateTime, setSelectedDateTime] = useState(() => {
    const now = new Date();
    now.setHours(8, 0, 0, 0);
    return now;
  });

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    const suffix = ["th", "st", "nd", "rd"][day % 10] || "th";
    return `${day}${suffix} ${month} ${year}`;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return {
    selectedDateTime,
    onDateTimeChange: setSelectedDateTime,
    formatDate,
    formatTime,
  };
};
