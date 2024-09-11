import React, { useEffect, useState } from "react";
import CategorieTable from "../../Components/CategoryTable/CategorieTable";
import { Categorie } from "../../helpers/declarations";
import { AllCategories, CreateCategory } from "../../api/api";
import AddCategoryModal, {
  AddCategorieDto,
} from "../../Components/AddCategoryModal/AddCategoryModal";
import SuccessDialog from "../../Components/SuccessDialog/SuccessDialog";
import ErrorDialog from "../../Components/ErrorDialog/ErrorDialog";

type Props = {};

const CategoriePage = (props: Props) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [categories, setCategories] = useState<Categorie[]>([]);
  useEffect(() => {
    const GetAllCategories = async () => {
      const results = await AllCategories();
      setCategories(results);
    };
    GetAllCategories();
  }, []);
  const CloseModal = async (addCategorieDto?: AddCategorieDto) => {
    setModalOpen(false);
    if (addCategorieDto) {
      console.log(addCategorieDto);
      try {
        const reponse = await CreateCategory(addCategorieDto);
        if (reponse) {
          setCategories([...categories, reponse]);
          setShowSuccess(true);
        } else {
          setShowError(true);
        }
      } catch (error) {
        setShowError(true);
      }
    } else {
      // setShowError(true);
    }
  };
  return (
    <div>
      <div>
        <div className="pt-36">
          <div className="flex justify-end py-4 container mx-auto">
            <button
              onClick={(e) => setModalOpen(true)}
              className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-2 font-medium rounded"
            >
              Ajouter Categorie
            </button>
          </div>
          <CategorieTable categories={categories}></CategorieTable>
        </div>
      </div>
      {isModalOpen && (
        <AddCategoryModal
          isOpen={isModalOpen}
          onClose={CloseModal}
        ></AddCategoryModal>
      )}
      {showSuccess && <SuccessDialog onClose={() => setShowSuccess(false)} />}
      {showError && <ErrorDialog onClose={() => setShowError(false)} />}{" "}
    </div>
  );
};

export default CategoriePage;
