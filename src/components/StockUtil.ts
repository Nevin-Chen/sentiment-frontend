import type { PolygonAggResult } from "../types/Polygon"

const transformResults = (results: PolygonAggResult[] | null) => {
  if (!results || !Array.isArray(results)) return []

  let mappedResults = results.map((result) => ({
    x: result.t,
    y: [result.o, result.h, result.l, result.c],
  }))

  return [{ data: mappedResults }]
}

export default transformResults
