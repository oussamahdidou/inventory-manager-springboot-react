import { AddArticleDto } from "../Components/AddArticleModal/AddArticleModal";
import { Article } from "../helpers/declarations";
import axios from "axios";

const apiBase = "http://localhost:8083";
export const AllArticles = async (): Promise<Article[]> => {
  try {
    const response = await axios.get<any>(
      `${apiBase}/Api/Article/GetAllArticles`
    );
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("Error in GetAllArticles:", error);
    return [];
  }
};
export const CreateArticle = async (
  addArticleDto: AddArticleDto
): Promise<Article | null> => {
  try {
    const reponse = await axios.post<any>(
      `${apiBase}/Api/Article/CreateArticle`,
      addArticleDto
    );

    return reponse.data;
  } catch (error) {
    console.error("Error in getAllSuppliers:", error);
    return null;
  }
};
