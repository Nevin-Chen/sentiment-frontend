export function formatToLocalTimeFromGMT(dateString: string): string {
  const utcString = dateString.replace(" ", "T") + "Z";
  const date = new Date(utcString);

  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function formatToLocalAmPm(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}
