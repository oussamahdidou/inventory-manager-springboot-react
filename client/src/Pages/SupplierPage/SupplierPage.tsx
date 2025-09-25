import React, { useEffect, useState } from "react";
import SupplierTable from "../../Components/SupplierTable/SupplierTable";
import { Supplier } from "../../helpers/declarations";
import SuccessDialog from "../../Components/SuccessDialog/SuccessDialog";
import ErrorDialog from "../../Components/ErrorDialog/ErrorDialog";
import AddSupplierModal, {
  AddSupplierDto,
} from "../../Components/AddSupplierModal/AddSupplierModal";
import TableSkeleton from "../../Components/TableSkeleton/TableSkeleton";
import { CreateSupplier, AllSuppliers } from "../../Services/SupplierService";
import { showErrorModal, showSuccessModal } from "../../helpers/handlers";
import NavBar from "../../Components/NavBar/NavBar";
import SideNav from "../../Components/SideNav/SideNav";
import { useAuth } from "../../Contexts/useAuth";

type Props = {};

const SupplierPage = (props: Props) => {
  const [Suppliers, setSuppliers] = useState<Supplier[]>([]);

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);
  const { isLoggedIn } = useAuth();
  const CloseModal = async (addSupplierDto?: AddSupplierDto) => {
    setModalOpen(false);
    if (addSupplierDto) {
      console.log(addSupplierDto);
      try {
        const reponse = await CreateSupplier(addSupplierDto);
        if (reponse) {
          setSuppliers([...Suppliers, reponse]);
          showSuccessModal();
        } else {
          showErrorModal();
        }
      } catch (error) {
        showErrorModal();
      }
    } else {
    }
  };
  useEffect(() => {
    const GetAllSuppliers = async () => {
      setLoading(true);
      const results = await AllSuppliers();
      setSuppliers(results);
      setLoading(false);
    };
    GetAllSuppliers();
  }, []);

  return (
    <div className={`w-full m-0 bg-[#171717] ${isLoggedIn() ? "ps-0" : "p-0"}`}>
      {isLoggedIn() ? <SideNav></SideNav> : <></>}
      <NavBar></NavBar>
      <div className="pt-36 px-2">
        <div className="flex justify-end py-4 container mx-auto">
          <button
            onClick={(e) => {
              setModalOpen(true);
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-2 font-medium rounded"
          >
            Add Supplier
          </button>
        </div>
        {isLoading ? (
          <TableSkeleton isLoading={isLoading}></TableSkeleton>
        ) : (
          <SupplierTable Suppliers={Suppliers}></SupplierTable>
        )}
      </div>
      {isModalOpen && (
        <AddSupplierModal
          isOpen={isModalOpen}
          onClose={CloseModal}
        ></AddSupplierModal>
      )}
      {/* {showSuccess && <SuccessDialog onClose={() => setShowSuccess(false)} />}
      {showError && <ErrorDialog onClose={() => setShowError(false)} />} */}
    </div>
  );
};

export default SupplierPage;
