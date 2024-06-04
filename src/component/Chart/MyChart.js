import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";

import "./Mychart.scss";

Chart.register(...registerables);

function MyChart(props) {
  const chartRef = useRef(null);
  useEffect(() => {
    let newTime = [];
    let newCount = [];
    if (props?.data[0] && props?.data[0].length > 0) {
      // Khởi tạo mảng mới để lưu dữ liệu mới

      // Lặp qua dữ liệu mới và cập nhật mảng
      props?.data[0].forEach((item) => {
        newTime.push(item.date);
        newCount.push(item.count);
      });

      // Cập nhật state với dữ liệu mới
      // setTime(newTime);
      // setCount(newCount);
    }
    const ctx = chartRef.current.getContext("2d");
    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: newTime,
        datasets: [
          {
            label: "Số lượng công việc được tạo trong ngày",
            backgroundColor: "rgba(161, 198, 247, 1)",

            borderColor: "rgb(47, 128, 237)",
            data: newCount,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          title: {
            display: true,
            text: "Bảng thống kê số lượng công việc theo ngày",
          },
        },
      },
    });

    return () => {
      myChart.destroy();
    };
  }, [props.data[0]]);

  return (
    <div className="card chart-container" style={{ padding: "2rem", minWidth: "50vw" }}>
      <canvas id="chart" ref={chartRef}></canvas>
    </div>
  );
}

export default MyChart;
