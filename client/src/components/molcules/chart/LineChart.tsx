import { memo } from "react";
import { Box } from "@chakra-ui/react";
import { Line } from "react-chartjs-2";

type Props = {
  week: number[];
  myWeek?: number[];
};

export const LineChart = memo((props: Props) => {
  const { week, myWeek } = props;

  const data = {
    labels: ["月", "火", "水", "木", "金", "土", "日"],
    datasets: [
      {
        label: "勉強時間",
        data: week,
        backgroundColor: "orange",
        borderColor: "orange",
        borderWidth: 1,
      },
      {
        label: "自分の勉強時間",
        data: myWeek,
        backgroundColor: "#d5d5d5",
        borderColor: "#d5d5d5",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    type: "line",
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: false,
      },
    },
    scales: {
      xAxis: {
        grid: {
          color: "#636363",
        },
        ticks: {
          color: "#e9e4e4",
        },
      },
      yAxis: {
        min: 0,
        grid: {
          color: "#636363",
        },
        ticks: {
          color: "#e9e4e4",
          display: true,
        },
      },
    },
  };

  return (
    <Box border="1px solid #e9e4e4" py={3} px={5}>
      <Line data={data} options={options} />
    </Box>
  );
});
