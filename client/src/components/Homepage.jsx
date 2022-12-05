import React, {useEffect, useState} from "react";
import {useAuth} from "./context/AuthContext";
import {useNavigate} from "react-router-dom";

const Homepage = () => {
    const Navigate = useNavigate()
    const [groups, setGroups] = useState([])
    const {getGroups} = useAuth()
    useEffect(() => {
        getGroups().then(res => {
            setGroups(res.data)
        })
    }, [])
    console.log(groups)

    function openGroup(id) {
        Navigate("/grouphomepage/?id="+id)
    }

    return (
        <div className="h-screen bg-gray-200">
            <div className="flex flex-col justify-center items-center pt-10">
                <h1 className=" text-4xl font-semibold">Homepage</h1>
                <p className="mt-2 ">Here is the list all the groups your are in...</p>
            </div>
            <div >
                {groups.map((group) => <div onClick={() => openGroup(group._id)} className="bg-gray-200 flex justify-center items-center" style={{width:"100%"}}>
                    <div className="w-3/3 flex flex-col bg-white shadow-lg rounded-lg overflow-hidden mt-5 mb-5 cursor-pointer">
                        <div className="bg-white px-6 py-4 flex">
                            <div className="flex items-center pt-3">
                                <div
                                    className="bg-blue-500 w-12 h-12 flex justify-center items-center rounded-full uppercase font-bold text-white">
                                    MH
                                </div>
                                <div className="ml-4">
                                    <p className="font-bold">{group.title}</p>
                                    <p>{group.description}</p>
                                </div>
                                <div className="flex justify-items-end">
                                    <button
                                        className="ml-10 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full ">
                                        Check
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>)}
            </div>
        </div>
    );
};

export default Homepage;
