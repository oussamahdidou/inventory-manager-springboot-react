import { AddSupplierDto } from "../Components/AddSupplierModal/AddSupplierModal";
import { Supplier } from "../helpers/declarations";
import axios from "axios";

const apiBase = "http://localhost:8083";

export const AllSuppliers = async (): Promise<Supplier[]> => {
  try {
    const response = await axios.get<any>(
      `${apiBase}/Api/Supplier/GetAllSuppliers`
    );

    return response.data;
  } catch (error) {
    console.error("Error in getAllSuppliers:", error);
    return [];
  }
};

export const CreateSupplier = async (
  addSupplierDto: AddSupplierDto
): Promise<Supplier | null> => {
  try {
    const reponse = await axios.post<any>(
      `${apiBase}/Api/Supplier/CreateSupplier`,
      addSupplierDto
    );

    return reponse.data;
  } catch (error) {
    console.error("Error in getAllSuppliers:", error);
    return null;
  }
};
