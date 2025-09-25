import React, { useEffect, useState } from "react";
import ArticleTable from "../../Components/ArticleTable/ArticleTable";
import { Article } from "../../helpers/declarations";
import AddArticleModal, {
  AddArticleDto,
} from "../../Components/AddArticleModal/AddArticleModal";
import SuccessDialog from "../../Components/SuccessDialog/SuccessDialog";
import ErrorDialog from "../../Components/ErrorDialog/ErrorDialog";
import TableSkeleton from "../../Components/TableSkeleton/TableSkeleton";
import { AllArticles, CreateArticle } from "../../Services/ArticleService";
import { showErrorModal, showSuccessModal } from "../../helpers/handlers";
import { useAuth } from "../../Contexts/useAuth";
import SideNav from "../../Components/SideNav/SideNav";
import NavBar from "../../Components/NavBar/NavBar";

type Props = {};

const StockPage = (props: Props) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const { isLoggedIn } = useAuth();
  useEffect(() => {
    const GetAllArticles = async () => {
      setLoading(true);
      const results = await AllArticles();
      console.log(results);
      setArticles(results);
      setLoading(false);
    };
    GetAllArticles();
  }, []);
  const CloseModal = async (addArticleDto?: AddArticleDto) => {
    setModalOpen(false);
    if (addArticleDto) {
      console.log(addArticleDto);
      try {
        const reponse = await CreateArticle(addArticleDto);
        if (reponse) {
          setArticles([...articles, reponse]);
          showSuccessModal();
        } else {
          showErrorModal();
        }
      } catch (error) {
        console.log(error);
        showErrorModal();
      }
    } else {
      console.log("no article data");
    }
  };
  return (
    <div className={`w-full m-0 bg-[#171717] ${isLoggedIn() ? "ps-0" : "p-0"}`}>
      {isLoggedIn() ? <SideNav/>: <></>}
      <NavBar/>
      <div className="pt-36 px-2">
        <div className="flex justify-end py-4 container mx-auto">
          <button
            onClick={(e) => {
              setModalOpen(true);
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-2 font-medium rounded"
          >
            Add Article
          </button>
        </div>
        {isLoading ? (
          <TableSkeleton isLoading={isLoading}></TableSkeleton>
        ) : (
          <ArticleTable articles={articles}></ArticleTable>
        )}
      </div>
      <AddArticleModal
        isOpen={isModalOpen}
        onClose={CloseModal}
      ></AddArticleModal>
      {/* {showSuccess && <SuccessDialog onClose={() => setShowSuccess(false)} />}
      {showError && <ErrorDialog onClose={() => setShowError(false)} />} */}
    </div>
  );
};

export default StockPage;
