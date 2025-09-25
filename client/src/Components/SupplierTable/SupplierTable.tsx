import React from "react";
import { Supplier } from "../../helpers/declarations";

interface Props {
  Suppliers: Supplier[];
}

const SupplierTable = (props: Props) => {
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-900 dark:text-gray-900 bg-gradient-to-l from-[#08D6DA] to-[#9DF8FA]">
          <thead className="text-xs text-gray-700 uppercase  dark:bg-gray-700 dark:text-gray-900">
            <tr>
              <th scope="col" className="px-6 py-3">
                Supplier
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                phone
              </th>
              {/* <th scope="col" className="px-6 py-3">
                Action
              </th> */}
            </tr>
          </thead>
          <tbody>
            {props.Suppliers.map((Supplier) => (
              <tr
                key={Supplier.id}
                className="bg-gradient-to-r from-[#08D6DA] to-[#9DF8FA] odd:dark:bg-gray-900 border-none  even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  {Supplier.name}
                </th>
                <td className="px-6 py-4"> {Supplier.address}</td>
                <td className="px-6 py-4"> {Supplier.phone}</td>
                {/* <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupplierTable;
