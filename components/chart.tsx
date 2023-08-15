import React, { useEffect, useRef } from 'react';
import Chart from "chart.js/auto"

const LineChart = ({ data }) => {
  const chartRef = useRef(null);

  

  let config = {
    type: 'doughnut',
    data: data,
    options : {
      width : 100,
      height : 200
    }
  };

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      new Chart(ctx, config);
    }
  });

  return (
    <div style={{width:400, height:400}}>
  <canvas ref={chartRef} />
  </div>
  );
};

export default LineChart;