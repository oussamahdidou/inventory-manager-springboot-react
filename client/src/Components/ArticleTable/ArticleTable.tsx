import React from "react";
import { Article } from "../../helpers/declarations";

interface Props {
  articles: Article[];
}

const ArticleTable = (props: Props) => {
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-900 uppercase bg-gradient-to-l from-[#08D6DA] to-[#9DF8FA] dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Article
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Supplier
              </th>
              <th scope="col" className="px-6 py-3">
                price
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              {/* <th scope="col" className="px-6 py-3">
                Action
              </th> */}
            </tr>
          </thead>
          <tbody>
            {props.articles.map((article) => (
              <tr
                key={article.id}
                className="bg-gradient-to-r from-[#08D6DA] to-[#9DF8FA] odd:dark:bg-gray-900 border-none  even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {article.name}
                </th>
                <td className="px-6 py-4 text-black ">{article.category?.name}</td>
                <td className="px-6 py-4 text-black ">{article.supplier?.name}</td>
                <td className="px-6 py-4 text-black ">Rs.{article.price}</td>
                <td className="px-6 py-4 text-black ">{article.quantity}</td>
                {/* <td className="px-6 py-4 text-black ">
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

export default ArticleTable;
