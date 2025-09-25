import React, { useState, useEffect } from "react";
import { IOStock } from "../../helpers/declarations";
const apiBase = "http://localhost:8083";
interface Props {
  isOpen: boolean;
  onClose: () => void;
  stock: IOStock | null;
  onSave: (updatedStock: IOStock) => void;
}

const EditStockModal = ({ isOpen, onClose, stock, onSave }: Props) => {
  const [quantity, setQuantity] = useState<number>(0);
  const [intervenant, setIntervenant] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (stock) {
      setQuantity(stock.quantity);
      setIntervenant(stock.intervenant || "");
      const formattedDate = new Date(stock.date).toISOString().split("T")[0];
      setDate(formattedDate);
      setError(null);
    }
  }, [stock]);

  const updateStockEntry = async (stockId: number, updatedData: any) => {
    try {
      // Fixing the endpoint - it should be UpdateStockEntry not UpdateStockExit
      const response = await fetch(
        `${apiBase}/Api/StockEntry/UpdateStockEntry/${stockId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      // Check if response is actually JSON before parsing
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || `Error: ${response.status}`);
        }

        return data;
      } else {
        // Handle non-JSON responses
        const text = await response.text();
        if (!response.ok) {
          throw new Error(
            `Server error (${response.status}): ${text.substring(0, 100)}...`
          );
        }
        return { success: true };
      }
    } catch (error) {
      console.error("Error updating stock entry:", error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unknown error occurred");
    }
  };

  const updateStockExit = async (stockId: number, updatedData: any) => {
    try {
      const response = await fetch(
        `${apiBase}/Api/StockExit/UpdateStockExit/${stockId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      // Check if response is actually JSON before parsing
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || `Error: ${response.status}`);
        }

        return data;
      } else {
        // Handle non-JSON responses
        const text = await response.text();
        if (!response.ok) {
          throw new Error(
            `Server error (${response.status}): ${text.substring(0, 100)}...`
          );
        }
        return { success: true };
      }
    } catch (error) {
      console.error("Error updating stock exit:", error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unknown error occurred");
    }
  };

  const handleSubmit = async () => {
    if (stock) {
      setIsLoading(true);
      setError(null);

      try {
        // Format the date in a way that the server expects (ISO format)
        const formattedDate = new Date(date).toISOString();

        const updatedData = {
          quantity: quantity,
          date: formattedDate,
          ...(stock.type === "Exit" ? { destination: intervenant } : {}),
        };

        console.log(`Updating ${stock.type} with data:`, updatedData);

        // Call the appropriate API based on stock type
        if (stock.type === "Entry") {
          await updateStockEntry(stock.id, updatedData);
        } else if (stock.type === "Exit") {
          await updateStockExit(stock.id, updatedData);
        }

        // Update local state after successful API call
        const updatedStock: IOStock = {
          ...stock,
          quantity,
          intervenant,
          date: new Date(date),
        };

        onSave(updatedStock);
        onClose();
      } catch (err) {
        console.error("Form submission error:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (!isOpen || !stock) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100">
          Edit Stock {stock.type}
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Article
          </label>
          <input
            type="text"
            value={stock.article}
            disabled
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Quantity
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {stock.type === "Exit" ? "Destination" : "Intervenant"}
          </label>
          <input
            type="text"
            value={intervenant}
            onChange={(e) => setIntervenant(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          />
        </div>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-800 rounded-md">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-red-500 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditStockModal;
