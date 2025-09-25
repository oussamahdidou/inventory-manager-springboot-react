import { StockEntry, IOStock, StockExit } from "./declarations";

// utils/truncate.ts
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};
export const IOMapper = (
  StockEntry: StockEntry[],
  StockExit: StockExit[]
): IOStock[] => {
  const ioStock: IOStock[] = [
    ...StockEntry.map((entry) => ({
      id: entry.id,
      type: "Entry",
      intervenant: entry.supplier.name,
      article: entry.article.name,
      quantity: entry.quantity,
      date: new Date(entry.date), // Convert string to Date
    })),
    ...StockExit.map((exit) => ({
      id: exit.id,
      type: "Exit",
      intervenant: exit.destination,
      article: exit.article.name,
      quantity: exit.quantity,
      date: new Date(exit.date), // Convert string to Date
    })),
  ].sort((a, b) => b.date.getTime() - a.date.getTime());

  return ioStock;
};
export const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};
