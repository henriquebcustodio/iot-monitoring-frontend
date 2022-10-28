import ReactECharts from 'echarts-for-react';
import { Fragment } from 'react';

const getOption = (
  title: string,
  xData: any[],
  yData: any[],
  dataLabel: string,
) => {
  const dataset: [any, any][] = [];

  for (let i = 0; i < xData.length; i++) {
    dataset[i] = [xData[i], yData[i]];
  }

  return {
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'time',
    },
    yAxis: {
      type: 'value',
      splitNumber: 1,
      min: 0,
      max: 1,
    },
    grid: {
      left: 20,
      top: 10,
      right: 20,
    },
    dataZoom: [
      {
        type: 'slider',
        filterMode: 'none'
      },
      {
        type: 'inside',
      }
    ],
    series: [
      {
        name: dataLabel,
        type: 'line',
        symbol: 'none',
        animation: false,
        step: 'end',
        data: dataset
      }
    ]
  };
};

interface LineChartProps {
  xData: any[];
  yData: any[];
  title: string;
  dataLabel: string;
}

const BooleanChart = ({ xData, yData, title, dataLabel }: LineChartProps) => {
  return (
    <Fragment>
      <ReactECharts option={getOption(title, xData, yData, dataLabel)} />
    </Fragment>
  );
};

export default BooleanChart;