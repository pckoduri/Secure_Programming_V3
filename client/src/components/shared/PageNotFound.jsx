import React from "react";
import Emoji from "../images/emoji.png";

const PageNotFound = () => {
    return (
        <div className="grid justify-center pt-20 bg-gray-200 h-screen">
            <img src={Emoji} alt="emoji" className="w-64 ml-24"/>
            <h1 className="grid justify-center text-4xl font-bold text-blue-500 -mt-[5rem]">
                Site Not Found
            </h1>
            <p className="font-bold grid justify-center -mt-[8rem]">
                Well this is awkward. The site you are looking for is not here.
            </p>
            <h1 className="grid justify-center -mt-[10rem] text-blue-500 font-bold">
                Share Securely Services
            </h1>
        </div>
    );
};

export default PageNotFound;
