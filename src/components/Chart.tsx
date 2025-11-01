import { useMemo } from 'react';
import ReactApexCharts from 'react-apexcharts'
import type { ApexOptions } from 'apexcharts';
import type { OHLC } from '../types/ohlc';
import { mapOLHCDataToApexSeries } from '../utils/formatOHLCData';
import './Chart.css'

interface StockChartProps {
  olhcData: OHLC[];
}

const StockChart:React.FC<StockChartProps> = ({ olhcData }) => {
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

  const memoizedMapOLHCDataToApexSeries = useMemo(() => mapOLHCDataToApexSeries(olhcData), [olhcData])
  const series = useMemo(() => [{ data: memoizedMapOLHCDataToApexSeries }], [memoizedMapOLHCDataToApexSeries])

  return (
    <>
      <div className="chart-container">
        <ReactApexCharts options={options} series={series} type="candlestick" height="100%" />
      </div>
    </>
  );
}

export default StockChart
