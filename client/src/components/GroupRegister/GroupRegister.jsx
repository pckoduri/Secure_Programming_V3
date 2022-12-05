import React from "react";
import { useNavigate } from "react-router-dom";

const GroupRegister = () => {
  const Navigate = useNavigate();

  const nextBtnHandler = (event) => {
    event.preventDefault();
    const title = event.target[0].value;
    Navigate("/inviteingroup", {state:title});
  };

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center pt-20">
      <div className="text-center">
        <h1 className="text-gray-800 text-4xl font-bold pb-4">
          Name This Group
        </h1>
        <p className="text-gray-500 text-xl pb-10 w-[40rem] ">
          Your new group needs a name so the people you invite know what it's
          all about. Suggestions: "Photos Group", "Poetry Group", "Movies Group"
          and "ApplicationPrograms Group" etc.
        </p>
        <form onSubmit={nextBtnHandler}>
        <input
          type="text"
          placeholder="name of the group"
          className="block text-sm py-3 px-4 rounded-lg w-full border outline-none mb-10"
        />
        <div className="grid grid-cols-2 gap-x-96">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
            CANCEL
          </button>
          <button type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
          >
            NEXT
          </button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default GroupRegister;
