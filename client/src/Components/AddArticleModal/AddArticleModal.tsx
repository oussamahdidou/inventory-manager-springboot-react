import React, { useEffect, useState } from "react";
import { Category, Supplier } from "../../helpers/declarations";
import { BarcodeScanner } from "@thewirv/react-barcode-scanner";
import { AllCategorys } from "../../Services/CategoryService";
import { AllSuppliers } from "../../Services/SupplierService";
interface ModalProps {
  isOpen: boolean;
  onClose: (data?: AddArticleDto) => void; // A function type that takes no arguments and returns void
}
export interface AddArticleDto {
  name: string;
  description?: string;
  categoryId: number;
  supplierId: number;
  price: number;
  quantity: number;
  barcode: string;
}
const AddArticleModal = (props: ModalProps) => {
  // const handleScan = (data: string) => {
  //   if (data) {
  //     console.log(data);
  //     setFormsValues((prev) => ({
  //       ...prev,
  //       barcode: data,
  //     }));
  //   }
  // };

  // const handleError = (err: string) => {
  //   console.error(err);
  // };

  const [FormsValues, setFormsValues] = useState<AddArticleDto>({
    name: "",
    description: "",
    categoryId: 0,
    supplierId: 0,
    price: 0,
    quantity: 0,
    barcode: "",
  });
  const [Categorys, setCategorys] = useState<Category[]>([]);
  const [Suppliers, setSuppliers] = useState<Supplier[]>([]);
  useEffect(() => {
    const GetEntrys = async () => {
      const categoriesReponse = await AllCategorys();
      setCategorys(categoriesReponse);
      const SuppliersReponse = await AllSuppliers();
      setSuppliers(SuppliersReponse);
    };
    GetEntrys();
  }, []);
  if (!props.isOpen) return null;
  return (
    <div
      onClick={(e) => props.onClose()}
      className="fixed left-0 top-0 z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="relative  p-4  max-w-fit max-h-full"
      >
        <div className="relative  bg-white  rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-center  p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900  dark:text-white">
              Create New Product
            </h3>
            <button
              onClick={() => props.onClose()}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="crud-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form
            onSubmit={(e) => props.onClose(FormsValues)}
            className="p-4 md:p-5"
          >
            <div className="grid gap-4 mb-4 grid-cols-12">
              <div className="col-span-12">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type product name"
                  required
                  value={FormsValues?.name || ""}
                  onChange={(e) => {
                    setFormsValues((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="col-span-6 sm:col-span-6">
                <label
                  htmlFor="quantity"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="999"
                  required
                  value={FormsValues?.quantity || ""}
                  onChange={(e) => {
                    setFormsValues((prev) => ({
                      ...prev,
                      quantity: Number(e.target.value),
                    }));
                  }}
                />
              </div>
              <div className="col-span-6 sm:col-span-6">
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Rs.2999"
                  required
                  value={FormsValues?.price || ""}
                  onChange={(e) => {
                    setFormsValues((prev) => ({
                      ...prev,
                      price: Number(e.target.value),
                    }));
                  }}
                />
              </div>
              <div className="col-span-6 sm:col-span-6">
                <label
                  htmlFor="Supplier"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Supplier
                </label>
                <select
                  value={FormsValues?.supplierId || ""}
                  onChange={(e) => {
                    setFormsValues((prev) => ({
                      ...prev,
                      supplierId: Number(e.target.value), // Convert the value to a number
                    }));
                  }}
                  id="Supplier"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option>Select Supplier</option>
                  {Suppliers.map((Supplier) => (
                    <option key={Supplier.id} value={Supplier.id}>
                      {Supplier.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-6 sm:col-span-6">
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category
                </label>
                <select
                  id="category"
                  value={FormsValues?.categoryId || ""}
                  onChange={(e) => {
                    setFormsValues((prev) => ({
                      ...prev,
                      categoryId: Number(e.target.value), // Convert the value to a number
                    }));
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option value="">Select category</option>
                  {Categorys.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-12">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Product Description
                </label>
                <textarea
                  id="description"
                  value={FormsValues.description}
                  onChange={(e) => {
                    setFormsValues((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }));
                  }}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write product description here"
                ></textarea>
              </div>
              <div className="col-span-12">
                <label
                  htmlFor="barcode"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Barcode
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type  barcode"
                  required
                  value={FormsValues?.barcode || ""}
                  onChange={(e) => {
                    setFormsValues((prev) => ({
                      ...prev,
                      barcode: e.target.value,
                    }));
                  }}
                />
              </div>
              {/* <div className="col-span-3">
                <label
                  htmlFor="barcode"
                  className="block mb-2 align-top text-sm font-medium text-gray-900 dark:text-white"
                >
                  Barcode
                </label>
                <BarcodeScanner

                  onSuccess={(text) => handleScan(text)}
                  onError={(error) => {
                    if (error) {
                      console.error(error.message);
                    }
                  }}
                  onLoad={() => console.log("Video feed has loaded!")}
                  containerStyle={{ width: "100%", height: "25%" }}
                />
              </div> */}
            </div>
            <button
              type="submit"
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="me-1 -ms-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Add new product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddArticleModal;
