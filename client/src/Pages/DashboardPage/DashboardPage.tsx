import React, { useEffect, useState } from "react";
import AreaCharts from "../../Components/AreaCharts/AreaCharts";
import PieCharts from "../../Components/PieCharts/PieCharts";
import RadialBar from "../../Components/RadialBar/RadialBar";
import { Stats } from "../../helpers/declarations";
import ItemSkeleton from "../../Components/ItemSkeleton/ItemSkeleton";
import { GetDashboardStats } from "../../Services/ChartService";
import NavBar from "../../Components/NavBar/NavBar";
import { useAuth } from "../../Contexts/useAuth";
import SideNav from "../../Components/SideNav/SideNav";

type Props = {};

const DashboardPage = (props: Props) => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const getStats = async () => {
      setLoading(true);
      const response = await GetDashboardStats();
      setStats(response);
      setLoading(false);
    };
    getStats();
  }, []);

  return (
    // <div className="relative min-h-screen">
    
    <div className={`w-full bg-[#171717] m-0 ${isLoggedIn() ? "ps-0" : "p-0"}`}>
      {isLoggedIn() && <SideNav />}
      <NavBar />
      <div className="container contain-content mx-auto max-w-full grid grid-cols-12 justify-center bg-[#171717]">
        {/* Articles */}
        <div className="p-3 col-span-3">
          {isLoading ? (
            <ItemSkeleton isLoading={isLoading} />
          ) : (
            <StatCard
              color="bg-yellow-400"
              icon={
                <svg
                  className="w-12 h-12 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 7h-4v3a1 1 0 0 1-2 0V7H6a1 1 0 0 0-.997.923l-.917 11.924A2 2 0 0 0 6.08 22h11.84a2 2 0 0 0 1.994-2.153l-.917-11.924A1 1 0 0 0 18 7h-2v3a1 1 0 1 1-2 0V7Zm-2-3a2 2 0 0 0-2 2v1H8V6a4 4 0 0 1 8 0v1h-2V6a2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
              }
              value={stats?.numberOfArticles}
              label="Articles"
            />
          )}
        </div>

        {/* Suppliers */}
        <div className="p-3 col-span-3">
          {isLoading ? (
            <ItemSkeleton isLoading={isLoading} />
          ) : (
            <StatCard
              color="bg-blue-400"
              icon={
                <svg
                  className="w-16 h-16 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 0 0-2 2v9a1 1 0 0 0 1 1h.535a3.5 3.5 0 1 0 6.93 0h3.07a3.5 3.5 0 1 0 6.93 0H21a1 1 0 0 0 1-1v-4a.999.999 0 0 0-.106-.447l-2-4A1 1 0 0 0 19 6h-5a2 2 0 0 0-2-2H4Z"
                    clipRule="evenodd"
                  />
                </svg>
              }
              value={stats?.numberOfSuppliers}
              label="Suppliers"
            />
          )}
        </div>

        {/* Out of Stock */}
        <div className="p-3 col-span-3">
          {isLoading ? (
            <ItemSkeleton isLoading={isLoading} />
          ) : (
            <StatCard
              color="bg-red-400"
              icon={
                <svg
                  className="w-12 h-12 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 6l12 12M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
                  />
                </svg>
              }
              value={stats?.outOfStock}
              label="Out of Stock"
            />
          )}
        </div>

        {/* Categories */}
        <div className="p-3 col-span-3">
          {isLoading ? (
            <ItemSkeleton isLoading={isLoading} />
          ) : (
            <StatCard
              color="bg-green-400"
              icon={
                <svg
                  className="w-12 h-12 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 4a2 2 0 0 0-2 2v1h10.968l-1.9-2.28A2 2 0 0 0 10.532 4H5ZM3 19V9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm11.707-7.707a1 1 0 0 0-1.414 1.414l.293.293H8a1 1 0 1 0 0 2h5.586l-.293.293a1 1 0 0 0 1.414 1.414l2-2a1 1 0 0 0 0-1.414l-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
              }
              value={stats?.numberOfCategorys}
              label="Categorys"
            />
          )}
        </div>

        {/* Charts */}
        <div className="px-3 col-span-8">
          <div className="bg-white px-3 py-2 rounded-lg">
            <AreaCharts />
          </div>
        </div>
        <div className="px-3 col-span-4 flex justify-center flex-col gap-3 aspect-video">
          <div className=" px-3 py-2 rounded-lg flex items-center">
            <PieCharts />
          </div>
          <div className=" px-3 rounded-lg flex items-start h-max">
            <RadialBar />
          </div>
        </div>
      </div>
      </div>
      // </div>  
     
  );
};

// Reusable stat card component
const StatCard = ({
  color,
  icon,
  value,
  label,
}: {
  color: string;
  icon: React.ReactNode;
  value?: number;
  label: string;
}) => (
  <div
    className={`${color} px-3 py-2 rounded-lg flex justify-start gap-4 items-center`}
  >
    <div>{icon}</div>
    <div>
      <h1 className="font-sans text-5xl text-white">{value ?? 0}</h1>
      <p className="font-sans text-xl text-white">{label}</p>
    </div>
  </div>
);

export default DashboardPage;
