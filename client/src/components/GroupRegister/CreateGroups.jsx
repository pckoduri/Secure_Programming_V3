import React from "react";
import { useNavigate } from "react-router-dom";

const CreateGroups = () => {
  const Navigate = useNavigate();

  const createGroupHandler = () => {
    Navigate("/groupregister");
  };

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center pt-20">
      <div className="pt-20 text-center">
        <h1 className="text-gray-800 text-4xl font-bold pb-4">
          Welcome to Share Securely Services!
        </h1>
        <p className="text-gray-500 text-2xl pb-10">
          Private group sharing with friends and family.
        </p>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
          onClick={createGroupHandler}
        >
          Create New Group
        </button>
      </div>
    </div>
  );
};

export default CreateGroups;
