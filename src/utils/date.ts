export const formatToLocalAmPm = (isoDate: string): string => {
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
