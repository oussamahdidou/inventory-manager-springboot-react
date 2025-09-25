import { IOStockCharts, Stats } from "../helpers/declarations";
import axios from "axios";
const apiBase = "http://localhost:8083";

export const GetDashboardStats = async (): Promise<Stats | null> => {
  try {
    const reponse = await axios.get<any>(
      `${apiBase}/Api/Dashboard/GetDashboardStats`
    );
    console.log(reponse);
    return reponse.data;
  } catch (error) {
    console.error("Error in GetAllStockExits:", error);
    return null;
  }
};
export const GetExitProgress = async (): Promise<IOStockCharts[]> => {
  try {
    const reponse = await axios.get<any>(
      `${apiBase}/Api/Dashboard/GetExitProgress`
    );

    return reponse.data;
  } catch (error: any) {
    throw new Error(error.response);
  }
};

export const GetEntryProgress = async (): Promise<IOStockCharts[]> => {
  try {
    const reponse = await axios.get<any>(
      `${apiBase}/Api/Dashboard/GetEntriesProgress`
    );

    return reponse.data;
  } catch (error: any) {
    throw new Error(error.response);
  }
};
