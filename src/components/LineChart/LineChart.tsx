import ReactECharts from 'echarts-for-react';

const getOption = (title: string, xData: any[], yData: any[], dataLabel: string) => {
  return {
    tooltip: {
      trigger: 'axis',
    },
    title: {
      left: 'center',
      text: title
    },
    xAxis: {
      type: 'category',
      data: xData
    },
    yAxis: {
      type: 'value',
    },
    dataZoom: [
      {
        type: 'slider',
      },
      {
        type: 'inside',
      }
    ],
    series: [
      {
        name: dataLabel,
        type: 'line',
        animation: false,
        data: yData,
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