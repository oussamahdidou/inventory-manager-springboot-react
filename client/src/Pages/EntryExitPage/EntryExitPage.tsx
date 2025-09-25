import React, { useEffect, useState } from "react";
import FluxTable from "../../Components/FluxTable/FluxTable";
import { StockEntry, IOStock, StockExit } from "../../helpers/declarations";

import SuccessDialog from "../../Components/SuccessDialog/SuccessDialog";
import ErrorDialog from "../../Components/ErrorDialog/ErrorDialog";
import AddStockEntryModal, {
  AddStockEntryDto,
} from "../../Components/AddStockEntryModal/AddStockEntryModal";

import AddStockExitModal, {
  AddStockExitDto,
} from "../../Components/AddStockExitModal/AddStockExitModal";
import TableSkeleton from "../../Components/TableSkeleton/TableSkeleton";
import {
  CreateStockEntry,
  CreateStockExit,
  GetAllIOStock,
} from "../../Services/IOService";
import { showErrorModal, showSuccessModal } from "../../helpers/handlers";
import NavBar from "../../Components/NavBar/NavBar";
import SideNav from "../../Components/SideNav/SideNav";
import { useAuth } from "../../Contexts/useAuth";

type Props = {};

const EntryExitPage = (props: Props) => {
  const EntryToStock = (source: StockEntry): IOStock => {
    return {
      article: source.article.name,
      date: source.date,
      id: source.id,
      type: "Entry",
      intervenant: source.supplier.name,
      quantity: source.quantity,
    };
  };
  const ExitToStock = (source: StockExit): IOStock => {
    return {
      article: source.article.name,
      date: source.date,
      id: source.id,
      type: "Exit",
      intervenant: source.destination,
      quantity: source.quantity,
    };
  };
  const [ioStock, setIoStock] = useState<IOStock[]>([]);
  const { isLoggedIn } = useAuth();
  const [isEntryModalOpen, setEntryModalOpen] = useState<boolean>(false);
  const [isExitModalOpen, setExitModalOpen] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const GetAllIoOperations = async () => {
      setLoading(true);
      const response = await GetAllIOStock();
      setIoStock(response);
      setLoading(false);
    };

    GetAllIoOperations();
  }, []);
  const CloseEntry = async (data?: AddStockEntryDto) => {
    try {
      setEntryModalOpen(false);
      console.log("Data:", data); // Log data to verify its content
      if (data) {
        const reponse = await CreateStockEntry(data);

        console.log("Response:", reponse); // Log response to ensure it's valid

        if (reponse != null) {
          setIoStock(
            [...ioStock, EntryToStock(reponse)].sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            )
          );
          showSuccessModal();
        } else {
          throw new Error("Invalid response from CreateStockEntry"); // Handle unexpected response
        }
      } else {
      }
    } catch (error) {
      console.error("Error:", error); // Log error to debug
      setEntryModalOpen(false);
      showErrorModal();
    }
  };
  const CloseExit = async (data?: AddStockExitDto) => {
    try {
      setExitModalOpen(false);
      console.log("Data:", data); // Log data to verify its content
      if (data) {
        const reponse = await CreateStockExit(data);

        console.log("Response:", reponse); // Log response to ensure it's valid

        if (reponse != null) {
          setIoStock(
            [...ioStock, ExitToStock(reponse)].sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            )
          );
          showSuccessModal();
        } else {
          throw new Error("Invalid response from CreateStockExit"); // Handle unexpected response
        }
      } else {
      }
    } catch (error) {
      console.error("Error:", error); // Log error to debug
      setExitModalOpen(false);
      showErrorModal();
    }
  };
  return (
    <div className={`w-full m-0 bg-[#171717] ${isLoggedIn() ? "ps-0" : "p-0"}`}>
      {isLoggedIn() ? <SideNav></SideNav> : <></>}
      <NavBar></NavBar>
      <div>
        <div className="pt-36 px-2">
          <div className="flex justify-end gap-5 items-center py-4 container mx-auto">
            <button
              onClick={(e) => {
                setEntryModalOpen(true);
              }}
              className="bg-green-500 hover:bg-green-700 text-white px-3 py-2 font-medium rounded"
            >
              report Entry
            </button>
            <button
              onClick={(e) => {
                setExitModalOpen(true);
              }}
              className="bg-red-500 hover:bg-red-700 text-white px-3 py-2 font-medium rounded"
            >
              report Exit
            </button>
          </div>
          {isLoading ? (
            <TableSkeleton isLoading={isLoading}></TableSkeleton>
          ) : (
            <FluxTable iOStock={ioStock}></FluxTable>
          )}
        </div>
      </div>
      {/* {showSuccess && (
        <SuccessDialog onClose={() => setShowSuccess(false)}></SuccessDialog>
      )}
      {showError && (
        <ErrorDialog onClose={() => setShowError(false)}></ErrorDialog>
      )} */}
      {isEntryModalOpen && (
        <AddStockEntryModal
          isOpen={isEntryModalOpen}
          onClose={CloseEntry}
        ></AddStockEntryModal>
      )}
      {isExitModalOpen && (
        <AddStockExitModal
          isOpen={isExitModalOpen}
          onClose={CloseExit}
        ></AddStockExitModal>
      )}
    </div>
  );
};

export default EntryExitPage;
