import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { AllArticles } from "../../Services/ArticleService";

type Props = {};

const PieCharts = (props: Props) => {
  const [series, setSeries] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const options: ApexCharts.ApexOptions = {
    chart: {
      height: 200,
      type: "pie",
    },

    labels: labels,
    legend: {
      show: false, // Hide the legend
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };
  useEffect(() => {
    const GetArticles = async () => {
      const reponse = await AllArticles();
      setSeries(reponse.map((item) => item.quantity));
      setLabels(reponse.map((item) => item.name));
      setLoading(false);
    };
    GetArticles();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading chart...</p>
      ) : (
        <div id="chart">
          <Chart options={options} series={series} type="pie" height={200} className=" bg-gradient-to-r from-[#08D6DA] to-[#9DF8FA] text-black rounded-lg" />
        </div>
      )}
      <div id="html-dist"></div>
    </div>
  );
};

export default PieCharts;
