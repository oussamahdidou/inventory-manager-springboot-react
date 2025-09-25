import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import axios from "axios";
import {
  GetEntryProgress,
  GetExitProgress,
} from "../../Services/ChartService";

type Props = {};

const AreaCharts = (props: Props) => {
  const [exitData, setExitData] = useState<number[]>([]);
  const [entryData, setEntryData] = useState<number[]>([]);
  const [categories, setCategorys] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const exitProgress = await GetExitProgress();
        const entryProgress = await GetEntryProgress();

        // Extracting the data and month (assuming month format is consistent with categories)
        const exitQuantities = exitProgress.map(
          (item) => item.totalQuantity
        );
        const entryQuantities = entryProgress.map(
          (item) => item.totalQuantity
        );
        const months = exitProgress.map((item) => item.month); // Assuming both responses have the same months

        setExitData(exitQuantities);
        setEntryData(entryQuantities);
        setCategorys(months);
      } catch (error) {
        console.error("Error fetching stock progress", error);
      }
    };

    fetchData();
  }, []);

  const series = [
    {
      name: "Entry Stock",
      data: entryData,
    },
    {
      name: "Exit Stock",
      data: exitData,
    },
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      height: 350,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: categories,
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };

  return (
    <div>
      <div id="chart">
        <ApexCharts
          options={options}
          series={series}
          type="area"
          height={350}
         
          className=" bg-gradient-to-r from-[#08D6DA] to-[#9DF8FA] text-black rounded-lg"
        />
      </div>
    </div>
  );
};

export default AreaCharts;
