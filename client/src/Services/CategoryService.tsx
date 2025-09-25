import { AddCategoryDto } from "../Components/AddCategoryModal/AddCategoryModal";
import { Category } from "../helpers/declarations";
import axios from "axios";

const apiBase = "http://localhost:8083";

export const AllCategorys = async (): Promise<Category[]> => {
  try {
    const response = await axios.get<any>(
      `${apiBase}/Api/Category/GetAllCategorys`
    );

    return response.data;
  } catch (error) {
    console.error("Error in GetAllSuppliers:", error);
    return [];
  }
};

export const CreateCategory = async (
  addCategoryDto: AddCategoryDto
): Promise<Category | null> => {
  try {
    const reponse = await axios.post<any>(
      `${apiBase}/Api/Category/CreateCategory`,
      addCategoryDto
    );

    return reponse.data;
  } catch (error) {
    console.error("Error in getAllSuppliers:", error);
    return null;
  }
};
