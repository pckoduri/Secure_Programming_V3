import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useLocation} from "react-router";
import {useAuth} from "../context/AuthContext";

const InviteInGroup = (props) => {
    const {getAllUsers, currentUser} = useAuth()
    const Navigate = useNavigate();
    const location = useLocation();
    const title = location.state;
    if (!title){
        Navigate("groupregister")
    }
    console.log(title)
    const [users, setUsers] = useState([])
    const [invited, setInvited] = useState([])
    useEffect(() => {
        getAllUsers().then(res => {
            setUsers([])
            res.data.forEach(user => {
                const username = user.username
                if (username!==currentUser.username){
                    setUsers(usersList => [...usersList, username])
                }
            })
        })
    }, [1])
    console.log(users)

    const nextBtnHandler = (props) => {

        Navigate("/groupintro", {state: {title:title, users:invited}});
    };

    function add(event){
        event.preventDefault();
        console.log(event)
        const user = event.target[0].value
        setUsers(users.filter(u => u!==user))
        setInvited(usersList => [...usersList, user])
    }

    const remove = (user) => {
        console.log(user)
        setUsers(users => [...users, user])
        setInvited(invited.filter(u => u !== user))
    }

    return (
        <div className="min-h-screen bg-gray-200 flex justify-center pt-20">
            <div className="text-center">
                <h1 className="text-gray-800 text-4xl font-bold pb-4">
                    Choose Who to Invite
                </h1>
                <p className="text-gray-500 text-xl pb-10 w-[40rem] ">
                    Once you’re finished press next.
                </p>
                <form onSubmit={add}>
                    <select
                        placeholder="Select members"
                        className="block text-sm py-3 px-4 rounded-lg w-full border outline-none mb-4"
                    >
                        {users.map(user => <option value={user}>{user}</option>)}
                    </select>
                    <button type="submit"
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full mr-4">
                        ADD
                    </button>
                </form>


                {invited.map(user => <div
                    className="block bg-green-500 text-white font-bold text-xl py-3 px-4 rounded-lg w-full border outline-none  mt-8 mb-2"
                    style={{width: "100%", textAlign: "center", margin: "10px"}}>
                    <p style={{display: "inline-block", width: "10%"}} className="row-span-1">{user}</p>
                    <button onClick={() => remove(user)} style={{display: "inline-block"}}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full">
                        REMOVE
                    </button>
                </div>)}


                <div className="grid grid-cols-2 gap-x-96">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
                        CANCEL
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
                        onClick={nextBtnHandler}
                    >
                        NEXT
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InviteInGroup;
