import React, { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: (data?: AddSupplierDto) => void; // A function type that takes no arguments and returns void
}
export interface AddSupplierDto {
  name: string;
  contact?: string;
  address: string;
  phone: string;
}

const AddSupplierModal = (props: ModalProps) => {
  const [FormsValues, setFormsValues] = useState<AddSupplierDto>({
    name: "",
    address: "",
    phone: "",
    contact: "",
  });
  return (
    <div
      onClick={(e) => props.onClose()}
      className="fixed left-0 top-0 z-50 inset-0  bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="relative  p-4 w-180  max-h-full"
      >
        <div className="relative  bg-white  rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-center  p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900  dark:text-white">
              Create New Supplier
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
                  placeholder="Type Supplier name"
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
              <div className="col-span-12">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  phone
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type Supplier phone"
                  required
                  value={FormsValues?.phone || ""}
                  onChange={(e) => {
                    setFormsValues((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="col-span-12">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type Supplier address"
                  required
                  value={FormsValues?.address || ""}
                  onChange={(e) => {
                    setFormsValues((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="col-span-12">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Mail
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type Supplier email"
                  required
                  value={FormsValues?.contact || ""}
                  onChange={(e) => {
                    setFormsValues((prev) => ({
                      ...prev,
                      contact: e.target.value,
                    }));
                  }}
                />
              </div>
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
              Add new Supplier
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSupplierModal;
