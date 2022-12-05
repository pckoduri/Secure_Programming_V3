import React from "react";
import {useNavigate} from "react-router-dom";
import {useLocation} from "react-router";
import {useAuth} from "../context/AuthContext";

const GroupIntro = () => {
    const {createGroup} = useAuth();
    const Navigate = useNavigate();
    const location = useLocation();
    const state = location.state;
    console.log(state)

    const nextBtnHandler = (event) => {
        event.preventDefault()
        const description = event.target[0].value
        const group = {
            title: state.title,
            members: state.users,
            description: description
        }
        createGroup(group).then(res => {
            console.log(res)
            Navigate("/dashboard");
        }).catch(error => {
            alert("error")
            console.log(error)
        })
    };
    return (
        <div className="min-h-screen bg-gray-200 flex justify-center pt-20">
            <div className="text-center">
                <h1 className="text-gray-800 text-4xl font-bold pb-4">
                    Introduce the Group
                </h1>
                <p className="text-gray-500 text-xl pb-10 w-[40rem] ">
                    Write a note so people know what this group is about.
                </p>
                <form onSubmit={nextBtnHandler}>
                <textarea
                    id="message"
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                    placeholder="This private group on Secure Services is for photos, videos or notes!"
                />
                    <div className="grid grid-cols-2 gap-x-96 mt-8">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
                            CANCEL
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
                        >
                            CREATE GROUP
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GroupIntro;
