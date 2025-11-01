export const truncateByWords = (text: string, maxLength: number = 350): string => {
  if (text.length <= maxLength) return text;

  const truncated = text.slice(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  if (lastSpaceIndex === -1) return truncated;

  return truncated.slice(0, lastSpaceIndex);
}
