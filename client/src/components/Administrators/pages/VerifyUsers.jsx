import React from "react";

const VerifyUsers = () => {
  return (
    <div className="bg-gray-200 h-screen">
      <div className="pt-10 pl-10 ">
        <h1 className="text-2xl text-gray-800 font-bold mb-10">
          List of Unverified Users
        </h1>
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg mx-10">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Email
                </th>
                <th scope="col" className="py-3 px-6">
                  Username
                </th>
                <th scope="col" className="py-3 px-6">
                  Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Group
                </th>
                <th scope="col" className="py-3 px-6">
                  <span className="sr-only">Action</span>
                </th>
                <th scope="col" className="py-3 px-6">
                  <span className="sr-only">Action</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Hamza@gmail.com
                </th>
                <td className="py-4 px-6">hamzaMalik</td>
                <td className="py-4 px-6">Hamza Malik</td>
                <td className="py-4 px-6">Photo's Group</td>
                <td className="py-4 px-6 text-right">
                  <p className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">
                    Allow
                  </p>
                </td>
                <td className="py-4 px-6 text-right">
                  <p className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer">
                    Reject
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VerifyUsers;
