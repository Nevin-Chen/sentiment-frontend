import { useMemo } from 'react';
import ReactApexCharts from 'react-apexcharts'
import type { ApexOptions } from 'apexcharts';
import type { PolygonAggResult } from '../types/Polygon';
import mapPolygonToApexSeries from '../utils/formatPolygonData';
import './Chart.css'

interface StockChartProps {
  results: PolygonAggResult[];
}

const StockChart = ({ results }: StockChartProps) => {
  const options: ApexOptions = useMemo(() => ({
    chart: {
      toolbar: {
        show: true,
        tools: {
          download: false,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
      },
    },
    grid: {
      padding: {
        top: 15,
      },
    },
    xaxis: {
      type: 'datetime',
    },
    tooltip: {
      enabled: true,
      shared: false,
      intersect: false,
      custom: function ({ seriesIndex, dataPointIndex, w }) {
        const data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
        if (!data || !data.y) return '';

        const [open, high, low, close] = data.y;
        const volume = data.v;

        return `
          <div class="custom-apex-tooltip">
            <div><strong>Open:</strong> $${open}</div>
            <div><strong>High:</strong> $${high}</div>
            <div><strong>Low:</strong> $${low}</div>
            <div><strong>Close:</strong> $${close}</div>
            <div><strong>Volume:</strong> ${volume}</div>
          </div>
        `;
      }
    }
  }), [])

  const memoizedMapPolygonToApexSeries = useMemo(() => mapPolygonToApexSeries(results), [results])
  const series = useMemo(() => [{ data: memoizedMapPolygonToApexSeries }], [memoizedMapPolygonToApexSeries])

  return (
    <>
      <div className="chart-container">
        <ReactApexCharts options={options} series={series} type="candlestick" height="100%"/>
      </div>
    </>
  );
}

export default StockChart
