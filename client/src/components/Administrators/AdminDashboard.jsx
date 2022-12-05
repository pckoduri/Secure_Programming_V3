import React, { useState } from "react";
import Home from "./pages/Home";
import VerifyGroups from "./pages/VerifyGroups";
import VerifyUsers from "./pages/VerifyUsers";

const AdminDashboard = () => {
  const [pageSelector, setPageSelector] = useState(1);
  const [drawer, setDrawer] = useState(false);

  const drawerHandler = () => {
    setDrawer(!drawer);
  };

  const data = [
    { id: 1, name: "home" },
    { id: 2, name: "Verify Users" },
    { id: 3, name: "Verify Groups" },
  ];

  return (
    <div className="grid grid-cols-12">
      <div
        onClick={drawerHandler}
        className={`${
          drawer === true ? "col-span-12" : "col-span-1"
        } 2xl:col-span-2`}
      >
        <div
          className="w-full sticky bottom-0 top-0 left-0 "
          aria-label="Sidebar"
        >
          <div className="h-screen  py-4 px-3 bg-gradient-to-t from-cyan-500 to-blue-500 ">
            <h1 className="pt-4 text-xl font-semibold whitespace-nowrap text-center text-white">
              Admin Dashboard
            </h1>
            <ul className="space-y-2 mt-10">
              {data.map((item) => (
                <li
                  key={item.id}
                  className="cursor-pointer flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => {
                    setPageSelector(item.id);
                  }}
                >
                  <span
                    className={`${
                      drawer === true ? "block" : "hidden"
                    } 2xl:ml-3 2xl:block capitalize`}
                  >
                    {item.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="col-span-11 2xl:col-span-10">
        <div>
          {pageSelector === 1 && <Home />}
          {pageSelector === 2 && <VerifyUsers />}
          {pageSelector === 3 && <VerifyGroups />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;