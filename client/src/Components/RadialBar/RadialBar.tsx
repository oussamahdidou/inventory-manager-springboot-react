import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import { AllArticles } from "../../Services/ArticleService";

type Props = {};

const RadialBar = (props: Props) => {
  const [Chart, setChart] = useState<number[]>([0]); // The percentage for the radial bar

  useEffect(() => {
    const GetArticles = async () => {
      const reponse = await AllArticles();
      let charts: number = 0;
      reponse.forEach((element) => {
        charts += element.quantity;
      });
      console.log(charts)
      setChart([(charts / 500) ]);
    };
    GetArticles();
  }, []);

  const options: ApexCharts.ApexOptions = {
    chart: {
      height: 150, // Reduced height
      type: "radialBar",
      offsetY: -5, // Reduced offset
    },
    plotOptions: {
      radialBar: {
        startAngle: -130,
        endAngle: 130,
        dataLabels: {
          name: {
            fontSize: "18px", // Reduced font size for the label name
            color: undefined,
            offsetY: 70, // Further adjusted for smaller height
          },
          value: {
            offsetY: 0, // Reduced offset for the value
            fontSize: "24px", // Reduced font size for the value
            color: undefined,
            formatter: (val) => `${val}%`,
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        shadeIntensity: 0.15,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 65, 91],
      },
    },
    stroke: {
      dashArray: 4,
    },
    labels: [`capacity filling ${Chart[0] * 5} k / 500 k`], // Split into two lines
  };

  return (
    <div>
      <div id="chart">
        <ApexCharts
          options={options}
          series={Chart}
          type="radialBar"
          height={250} className=" bg-gradient-to-r from-[#08D6DA] to-[#9DF8FA] text-black rounded-lg"
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default RadialBar;
