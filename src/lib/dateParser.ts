export function parseAppointmentText(
  text: string,
): { dateStr: string; timeStr: string } | null {
  if (!text) return null;

  const lowerText = text.toLowerCase();

  // Try to find a time (e.g., 2pm, 2:30pm, 14:00, 10am)
  const timeRegex = /([0-1]?[0-9]|2[0-3])(:[0-5][0-9])?\s*(am|pm)?/i;
  const timeMatch = lowerText.match(timeRegex);

  // Try to find a date (e.g., 15th oct, 12/10, tuesday, tomorrow)
  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
    "mon",
    "tue",
    "wed",
    "thu",
    "fri",
    "sat",
    "sun",
  ];
  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];

  let dateStr = "Unknown Date";
  let timeStr = timeMatch ? timeMatch[0].trim() : "Unknown Time";

  // Check for explicit dates like DD/MM or DD/MM/YYYY
  const explicitDateRegex = /(\d{1,2})[\/\-\.](\d{1,2})(?:[\/\-\.](\d{2,4}))?/;
  const explicitMatch = text.match(explicitDateRegex);

  if (explicitMatch) {
    dateStr = explicitMatch[0];
  } else {
    // Check for "15th Oct" format
    const ordinalDateRegex = new RegExp(
      `(\\d{1,2})(?:st|nd|rd|th)?\\s+(${months.join("|")})`,
      "i",
    );
    const ordinalMatch = lowerText.match(ordinalDateRegex);

    if (ordinalMatch) {
      dateStr = ordinalMatch[0];
    } else {
      // Check for days of week
      const dayRegex = new RegExp(`\\b(${days.join("|")})\\b`, "i");
      const dayMatch = lowerText.match(dayRegex);

      if (dayMatch) {
        dateStr = dayMatch[0];
        // Capitalize first letter
        dateStr = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
      } else if (lowerText.includes("tomorrow")) {
        dateStr = "Tomorrow";
      } else if (lowerText.includes("today")) {
        dateStr = "Today";
      }
    }
  }

  if (dateStr === "Unknown Date" && timeStr === "Unknown Time") {
    return null;
  }

  return { dateStr, timeStr };
}
