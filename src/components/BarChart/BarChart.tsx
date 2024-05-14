"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import styled from "@emotion/styled";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type Props = {
  peopleData: {
    FCST_TIME: string; //인구 예측시점
    FCST_CONGEST_LVL: string; //장소 예측 혼잡도 지표
    FCST_PPLTN_MIN: number; //예측 실시간 인구 지표 최소값
    FCST_PPLTN_MAX: number; //예측 실시간 인구 지표 최대값
  }[];
  congestArray: {
    name: string;
    color: string;
  }[];
};

const BarChart = ({ peopleData, congestArray }: Props) => {
  const numberToString = (num: number) => {
    if (num >= 10000) {
      return (num / 10000).toFixed(1).replace(/\.0$/, "") + "만";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "천";
    } else {
      return num.toLocaleString();
    }
  };

  const labels = peopleData.map((item) => {
    const date = new Date(item.FCST_TIME);

    return `${date.getHours()}시`;
  });

  const data = {
    labels,
    datasets: [
      {
        label: "인구 수",
        data: peopleData.map(
          (item) =>
            (Number(item.FCST_PPLTN_MIN) + Number(item.FCST_PPLTN_MAX)) / 2
        ),
        backgroundColor: peopleData.map((item) => {
          const congestData = congestArray.find(
            (congest) => item.FCST_CONGEST_LVL === congest.name
          );

          return congestData?.color;
        }),
        meta: peopleData
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, //부모의 크기에 맞춰 늘어나거나 줄어듦
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "실시간 인구 예측",
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems: any) => {
            const dataIndex = tooltipItems[0].dataIndex;
            const value = tooltipItems[0].dataset.meta[dataIndex];

            return `${tooltipItems[0].label} (${value.FCST_CONGEST_LVL})`;
          },
          label: (context: any) => {
            const dataIndex = context.dataIndex;
            const value = peopleData[dataIndex];

            return `예상 인구 수 : ${Number(
              value.FCST_PPLTN_MIN
            ).toLocaleString()} ~ ${Number(
              value.FCST_PPLTN_MAX
            ).toLocaleString()}명`;
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value: any) => {
            return numberToString(value);
          },
          maxTicksLimit: 5,
        },
      },
    },
  };

  return (
    <Container>
      <Bar options={options} data={data} />
    </Container>
  );
};

export default BarChart;

const Container = styled.div`
  flex: 1;
  width: 90%;
`;