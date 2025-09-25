import React from "react";
import { Category } from "../../helpers/declarations";
import { truncateText } from "../../helpers/formatters";

interface Props {
  categories: Category[];
}

const CategoryTable = (props: Props) => {
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-900 dark:text-gray-900">
          <thead className="text-xs text-gray-700 uppercase bg-gradient-to-l from-[#08D6DA] to-[#9DF8FA] dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              {/* <th scope="col" className="px-6 py-3">
                Action
              </th> */}
            </tr>
          </thead>
          <tbody>
            {props.categories.map((category) => (
              <tr
                key={category.id}
                className="bg-gradient-to-r from-[#08D6DA] to-[#9DF8FA] odd:dark:bg-gray-900 border-none  even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {category.name}
                </th>
                <td className="px-6 py-4">
                  {truncateText(category.description, 100)}
                </td>
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

export default CategoryTable;
