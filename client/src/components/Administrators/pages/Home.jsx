import React from "react";

const Home = () => {
  return (
    <div className="h-screen bg-gray-200">
      <div className="flex flex-col justify-center items-center pt-10">
        <h1 className=" text-4xl font-semibold">Admin Dashboard</h1>
        <p className="mt-2 ">Welcome back...</p>
      </div>
      <div className="bg-gray-200 flex justify-center items-center ">
        <div className="w-3/3 flex flex-col bg-white shadow-lg rounded-lg overflow-hidden mt-20 mb-20 cursor-pointer">
          <div className="bg-white px-6 py-4 flex">
            <div className="flex items-center pt-3">
              <div className="bg-blue-500 w-12 h-12 flex justify-center items-center rounded-full uppercase font-bold text-white">
                MH
              </div>
              <div className="ml-4">
                <p className="font-bold">Group Name</p>
                <p>Group Description/message</p>
              </div>
              <div className="flex justify-items-end">
                <button className="ml-10 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full ">
                  Notification
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
