import ReactECharts from 'echarts-for-react';

const getOption = (title: string, xData: any[], yData: any[], dataLabel: string) => {
  const dataset = [];

  for (let i = 0; i < xData.length; i++) {
    dataset[i] = [xData[i], yData[i]];
  }

  return {
    tooltip: {
      trigger: 'axis',
    },
    title: {
      left: 'center',
      text: title
    },
    xAxis: {
      type: 'time',
    },
    yAxis: {
      type: 'value',
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

const LineChart = ({ xData, yData, title, dataLabel }: LineChartProps) => {
  return (<ReactECharts option={getOption(title, xData, yData, dataLabel)} />);
};

export default LineChart;