import type { PolygonAggResult } from "../types/Polygon"

const formatVolume = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2).replace(/\.0$/, '') + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(2).replace(/\.0$/, '') + 'K'
  }
  return num.toString()
}

const mapPolygonToApexSeries = (results: PolygonAggResult[] | null) => {
  if (!results || !Array.isArray(results)) return []

  let mappedResults = results.map((result) => ({
    x: result.t,
    y: [result.o.toFixed(2), result.h.toFixed(2), result.l.toFixed(2), result.c.toFixed(2)],
    v: formatVolume(result.v)
  }))

  return mappedResults
}

export default mapPolygonToApexSeries
