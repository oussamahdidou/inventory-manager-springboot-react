import React, { useState } from "react";
import { IOStock } from "../../helpers/declarations";
import { formatDate } from "../../helpers/formatters";
import EditStockModal from "../EditStockModal/EditStockModal";

interface Props {
  iOStock: IOStock[];
}

const FluxTable = ({ iOStock }: Props) => {
  const [selectedStock, setSelectedStock] = useState<IOStock | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stocks, setStocks] = useState<IOStock[]>(iOStock);

  const handleEditClick = (stock: IOStock) => {
    setSelectedStock(stock);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedStock(null);
  };

  const handleSave = (updatedStock: IOStock) => {
    const updatedList = stocks.map((s) =>
      s.id === updatedStock.id ? updatedStock : s
    );
    setStocks(updatedList);
  };

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gradient-to-l from-[#08D6DA] to-[#9DF8FA] dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3 text-black">I/O</th>
              <th className="px-6 py-3 text-black">Date</th>
              <th className="px-6 py-3 text-black">Article</th>
              <th className="px-6 py-3 text-black">
                {/* Change header based on most common type */}
                {stocks.filter(s => s.type === "Exit").length > 
                 stocks.filter(s => s.type === "Entry").length 
                 ? "Destination" : "Intervenant"}
              </th>
              <th className="px-6 py-3">Quantity</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((operation) => (
              <tr key={operation.id} className="bg-gradient-to-r from-[#08D6DA] to-[#9DF8FA] border-none dark:bg-gray-900 dark:border-gray-700">
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${operation.type === "Entry" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    {operation.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-black">{formatDate(operation.date.toString())}</td>
                <td className="px-6 py-4 text-black">{operation.article}</td>
                <td className="px-6 py-4 text-black">{operation.intervenant || "N/A"}</td>
                <td className="px-6 py-4 text-black">{operation.quantity}</td>
                <td className="px-6 py-4 text-black">
                  <span
                    onClick={() => handleEditClick(operation)}
                    className="text-blue-600 hover:underline cursor-pointer"
                  >
                    Edit
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <EditStockModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        stock={selectedStock}
        onSave={handleSave}
      />
    </div>
  );
};

export default FluxTable;