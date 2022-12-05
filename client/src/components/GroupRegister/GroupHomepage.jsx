import React, {useEffect, useState} from "react";
import {useAuth} from "../context/AuthContext";
import PageNotFound from "../shared/PageNotFound";
import {useNavigate} from "react-router";

const GroupHomepage = () => {
    const [tabsCount, setTabsCount] = useState(0);
    const query = new URLSearchParams(window.location.search)
    const groupID = query.get('id')
    const navigate = useNavigate()
    const {
        getGroup,
        addFile,
        currentUser,
        deletePostByUser,
        getAllUsers,
        addMemberToGroup,
        removeUserFromGroup,
        deleteGroup
    } = useAuth()
    const [group, setGroup] = useState(null)
    const [file, setFile] = useState()
    const [users, setUsers] = useState([])

    useEffect(() => {
            getGroup(groupID).then(res => {
                const g = res.data;
                setGroup(g)
                setTabsCount(0)
                getAllUsers().then(res => {
                    setUsers([])
                    res.data.forEach(user => {
                        const username = user.username
                        console.log(username)
                        if (username !== currentUser.username && (!g.members.some(member => member === username))) {
                            setUsers(usersList => [...usersList, username])
                        }
                    })
                }).catch(error => {
                    console.log(error)
                })

            }).catch(error => {
                setTabsCount(-2)
            })

        }
        , [])



    function uploadFile(event) {
        event.preventDefault();
        if (file == null)
            return
        console.log(event)
        const document = {
            title: event.target[1].value,
            description: event.target[2].value,
            group: groupID,
            file: file,
        }
        addFile(document).then(res => {
            console.log(res)
            window.location.reload(false);
        })
        console.log(document)
    }

    const changeFile = (event) => {
        console.log("file changed")
        setFile(event.target.files[0])
    }


    console.log(file)
    console.log(users)

    function deletePost(filename) {
        deletePostByUser(filename).then(res => {
            console.log(res)
            window.location.reload(false);
        })
    }

    function onRemoveMemberBtnClicked(member) {
        removeUserFromGroup({group: groupID, member: member}).then(res => {
            console.log(res)
            window.location.reload(false)
        })
    }

    function addMemberBtnClicked(event) {
        event.preventDefault()
        addMemberToGroup({group: groupID, member: event.target[0].value}).then(res => {
            console.log(res)
            window.location.reload(false)
        })
    }

    function onDeleteGroupBtnClicked(username) {
        deleteGroup({group: groupID, member: username}).then(res => {
            console.log(res)
            navigate("/dashboard")
        })
    }

    const tabs = <div className="bg-blue-200">
        <nav className="flex flex-col sm:flex-row">
            <button
                className={` ${
                    tabsCount === 0 ? "border-b-2 font-medium border-blue-500" : ""
                } "text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none"`}
                onClick={() => {
                    setTabsCount(0);
                }}
            >
                Feed
            </button>
            <button
                className={` ${
                    tabsCount === 2 ? "border-b-2 font-medium border-blue-500" : ""
                } "text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none"`}
                onClick={() => {
                    setTabsCount(2);
                }}
            >
                Settings
            </button>
        </nav>
    </div>

    const component = <div className="bg-gray-200 h-full">
        {/* Tabs */}
        {tabsCount === -2 && <PageNotFound/>}
        {tabsCount >= 0 && tabs}
        {tabsCount === 0 && (
            <div className=" pt-10 pb-10">
                {/* new post */}
                <div className="bg-gray-200 flex justify-center items-center mb-8">

                    <div className="w-2/3 flex flex-col bg-white shadow-lg rounded-lg overflow-hidden">
                        <form onSubmit={uploadFile}>
                            <div className="bg-gray-200 text-gray-700 text-lg px-6 py-4">
                                CREATE NEW POST
                            </div>

                            <div className="flex justify-between items-center px-6 py-4">
                                <div className="flex justify-center items-center w-full">
                                    <label
                                        htmlFor="dropzone-file"
                                        className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                    >
                                        <div className="flex flex-col justify-center items-center pt-5 pb-6">
                                            <svg
                                                aria-hidden="true"
                                                className="mb-3 w-10 h-10 text-gray-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                <span className="font-semibold">Click to upload</span>{" "}
                                                or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {file && <p><b>Selected File: {file.name} </b></p>}
                                            </p>
                                        </div>
                                        <input id="dropzone-file" type="file" className="hidden" required
                                               onChange={changeFile}/>
                                    </label>
                                </div>
                            </div>

                            <div className="px-6 py-4 border-t border-gray-200">
                                <div className="border rounded-lg p-4 bg-gray-200">
                                    <input
                                        required
                                        type="text"
                                        placeholder="Title of the post"
                                        className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                                    />
                                    <input
                                        required
                                        type="text"
                                        placeholder="Write something about your post"
                                        className="block text-sm py-3 px-4 rounded-lg w-full border outline-none mt-2"
                                    />
                                </div>
                            </div>
                            <div className="bg-gray-200 px-6 py-4">
                                <button
                                    data-dropdown-toggle="dropdown"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                    type="submit"
                                >
                                    CREATE POST
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                {/* posts */}

                {group && group.documents && group.documents.map(file => <div key={file.filename}
                                                  className="bg-gray-200 flex justify-center items-center ">
                    <div className="w-2/3 flex flex-col bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="bg-gray-200 text-gray-700 text-lg px-6 py-4">
                            {file.title}
                        </div>

                        <div className="flex justify-between items-center px-6 py-4">
                            <a
                                href={"http://54.249.182.31:4000/" + file.download} target="_blank"
                                rel='noopener,noreferrer'
                                className="bg-orange-600 text-xs uppercase px-2 py-1 rounded-full border border-gray-200 text-gray-200 font-bold">
                                {file.type}
                            </a>
                            <div className="text-sm">{group.date}</div>
                        </div>

                        <div className="px-6 py-4 border-t border-gray-200">
                            <div className="border rounded-lg p-4 bg-gray-200">
                                {file.description}
                            </div>
                        </div>

                        <div className="bg-gray-200 px-6 py-4">
                            <div className="uppercase text-xs text-gray-600 font-bold">
                                {file.owner}
                            </div>

                            <div className="flex items-center pt-3">
                                <div
                                    className="bg-blue-700 w-12 h-12 flex justify-center items-center rounded-full uppercase font-bold text-white">
                                    MH
                                </div>
                                <div className="ml-4">
                                    <p className="font-bold">{file.owner}</p>
                                    <p className="text-sm text-gray-700 mt-1">Owner</p>
                                </div>
                                {currentUser.username === file.owner && <div>
                                    <button
                                        data-dropdown-toggle="dropdown"
                                        className="ml-10 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                                        onClick={() => deletePost(file.filename)}
                                    >
                                        REMOVE POST
                                    </button>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>)}


            </div>
        )}
        {tabsCount === 1 && (
            <div className="text-gray-600 body-font pb-20">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-20">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                            List Of All The Items In The Group
                        </h1>
                    </div>
                    <div className="flex flex-wrap -m-4">
                        <div className="lg:w-1/3 sm:w-1/2 p-4">
                            <div className="flex relative">
                                <img
                                    alt="gallery"
                                    className="absolute inset-0 w-full h-full object-cover object-center"
                                    src="https://dummyimage.com/600x360"
                                />
                                <div
                                    className="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
                                    <h2 className="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">
                                        THE SUBTITLE
                                    </h2>
                                    <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                        Shooting Stars
                                    </h1>
                                    <p className="leading-relaxed">
                                        Photo booth fam kinfolk cold-pressed sriracha leggings
                                        jianbing microdosing tousled waistcoat.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/3 sm:w-1/2 p-4">
                            <div className="flex relative">
                                <img
                                    alt="gallery"
                                    className="absolute inset-0 w-full h-full object-cover object-center"
                                    src="https://dummyimage.com/601x361"
                                />
                                <div
                                    className="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
                                    <h2 className="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">
                                        THE SUBTITLE
                                    </h2>
                                    <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                        The Catalyzer
                                    </h1>
                                    <p className="leading-relaxed">
                                        Photo booth fam kinfolk cold-pressed sriracha leggings
                                        jianbing microdosing tousled waistcoat.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/3 sm:w-1/2 p-4">
                            <div className="flex relative">
                                <img
                                    alt="gallery"
                                    className="absolute inset-0 w-full h-full object-cover object-center"
                                    src="https://dummyimage.com/603x363"
                                />
                                <div
                                    className="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
                                    <h2 className="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">
                                        THE SUBTITLE
                                    </h2>
                                    <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                        The 400 Blows
                                    </h1>
                                    <p className="leading-relaxed">
                                        Photo booth fam kinfolk cold-pressed sriracha leggings
                                        jianbing microdosing tousled waistcoat.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/3 sm:w-1/2 p-4">
                            <div className="flex relative">
                                <img
                                    alt="gallery"
                                    className="absolute inset-0 w-full h-full object-cover object-center"
                                    src="https://dummyimage.com/602x362"
                                />
                                <div
                                    className="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
                                    <h2 className="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">
                                        THE SUBTITLE
                                    </h2>
                                    <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                        Neptune
                                    </h1>
                                    <p className="leading-relaxed">
                                        Photo booth fam kinfolk cold-pressed sriracha leggings
                                        jianbing microdosing tousled waistcoat.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/3 sm:w-1/2 p-4">
                            <div className="flex relative">
                                <img
                                    alt="gallery"
                                    className="absolute inset-0 w-full h-full object-cover object-center"
                                    src="https://dummyimage.com/605x365"
                                />
                                <div
                                    className="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
                                    <h2 className="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">
                                        THE SUBTITLE
                                    </h2>
                                    <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                        Holden Caulfield
                                    </h1>
                                    <p className="leading-relaxed">
                                        Photo booth fam kinfolk cold-pressed sriracha leggings
                                        jianbing microdosing tousled waistcoat.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/3 sm:w-1/2 p-4">
                            <div className="flex relative">
                                <img
                                    alt="gallery"
                                    className="absolute inset-0 w-full h-full object-cover object-center"
                                    src="https://dummyimage.com/606x366"
                                />
                                <div
                                    className="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
                                    <h2 className="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">
                                        THE SUBTITLE
                                    </h2>
                                    <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                        Alper Kamu
                                    </h1>
                                    <p className="leading-relaxed">
                                        Photo booth fam kinfolk cold-pressed sriracha leggings
                                        jianbing microdosing tousled waistcoat.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
        {tabsCount === 2 && (
            <div className="min-h-screen bg-gray-200 flex justify-center items-center">
                <div className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
                    <div>
                        <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
                            GROUP DETAILS
                        </h1>
                        <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">
                            Here you can view the inside information about the group.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <hr/>
                        <h1 className="text-blue-500">MEMBERS</h1>
                        <hr/>
                        {group.members.map(member =>
                            <div className="w-full" key={member}>
                                <div className="flex items-stretch ">
                                    <p
                                        className="block text-sm py-3 px-4 rounded-lg w-2/3 border outline-none">{member}</p>
                                    {(currentUser.role === "admin" || group.admin === currentUser.username) &&
                                    currentUser.username !== member
                                    && <button
                                        onClick={() => onRemoveMemberBtnClicked(member)}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 mx-2 rounded"> -
                                    </button>
                                    }
                                </div>
                            </div>
                        )}

                        {group.admin === currentUser.username && <div>
                            <form onSubmit={addMemberBtnClicked}>
                                <h1 className="text-blue-500">Add Members:</h1>
                                <hr/>
                                <select
                                    placeholder="Select members"
                                    className="block text-sm py-3 px-4 rounded-lg w-full border outline-none mb-4"
                                >
                                    {users.map(user => <option key={user} value={user}>{user}</option>)}
                                </select>
                                <button type="submit"
                                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full mr-4">
                                    ADD
                                </button>
                            </form>
                        </div>}

                        <hr/>
                        {(currentUser.role === "admin" || group.admin === currentUser.username)?
                            <button
                                onClick={() => onDeleteGroupBtnClicked(currentUser.username)}
                                className=" bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full">
                                DELETE GROUP
                            </button>:<button
                                onClick={() => onRemoveMemberBtnClicked(currentUser.username)}
                                className=" mx-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full">
                                LEAVE GROUP
                            </button> }
                    </div>
                </div>
            </div>
        )}
    </div>

    return (group && component);
};

export default GroupHomepage;
