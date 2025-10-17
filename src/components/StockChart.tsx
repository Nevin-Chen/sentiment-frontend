import ReactApexCharts from 'react-apexcharts'
import type { ApexOptions } from 'apexcharts';
import type { PolygonAggResult } from '../types/Polygon';
import Modal from './Modal';
import transformResults from './StockUtil';
import './StockChart.css'

const options: ApexOptions = {
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
  title: {
    text: 'AAPL',
    align: 'center',
  },
  xaxis: {
    type: 'datetime',
  },
  tooltip: {
    enabled: true,
    shared: true,
    custom: function ({_, seriesIndex, dataPointIndex, w }) {
      const open = w.globals.initialSeries[seriesIndex].data[dataPointIndex].y[0];
      const high = w.globals.initialSeries[seriesIndex].data[dataPointIndex].y[1];
      const low = w.globals.initialSeries[seriesIndex].data[dataPointIndex].y[2];
      const close = w.globals.initialSeries[seriesIndex].data[dataPointIndex].y[3];

      return <Modal open={open} high={high} low={low} close={close}/>
    },
  },
};

interface StockChartProps {
  results: PolygonAggResult[];
}

const StockChart = ({ results }: StockChartProps) => {
  const transformedResults = transformResults(results)

  return (
    <>
      <div className="chart-container">
        <ReactApexCharts options={options} series={transformedResults} type="candlestick" height="100%"/>
      </div>
    </>
  );
}

export default StockChart
