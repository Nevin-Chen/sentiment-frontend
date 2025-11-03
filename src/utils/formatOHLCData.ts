import type { OHLC } from "../types/ohlc"

export const formatVolume = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2).replace(/\.0$/, '') + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(2).replace(/\.0$/, '') + 'K'
  }
  return num.toString()
}

export const mapOLHCDataToApexSeries = (results: OHLC[] | null) => {
  if (!results || !Array.isArray(results)) return []

  const mappedResults = results.map((result) => ({
    x: new Date(result.date),
    y: [result.open.toFixed(2), result.high.toFixed(2), result.low.toFixed(2), result.close.toFixed(2)],
    v: formatVolume(result.volume)
  }))

  return mappedResults
}
