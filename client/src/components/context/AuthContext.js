import React, {useContext, useState, useEffect} from "react"
import axios from "axios";

const AuthContext = React.createContext()
const host = "http://54.249.182.31:4000"

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()


    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axios({
            method: "get",
            withCredentials: true,
            url: host + "/user",
        }).then((res) => {
            console.log(res)
            setLoading(false)
            setCurrentUser(res.data.user)
        })
    }, [1])

    function signup(username, password, email) {
        return axios({
            method: "POST",
            data: {
                username: username,
                password: password,
                email: email,
            },
            withCredentials: true,
            url: host + "/register",
        })
    }

    function getAllUsers() {
        return axios({
            method: "GET",
            withCredentials: true,
            url: host + "/users"
        })
    }


    function login(username, password) {
        return axios({
            method: "POST",
            data: {
                username: username,
                password: password,
            },
            withCredentials: true,
            url: host + "/login",
        })
    }


    function getCurrentUser() {
        return new Promise((resolve, reject) => {
            axios({
                method: "get",
                withCredentials: true,
                url: host + "/user",
            }).then((res) => {
                console.log(res)
                setCurrentUser(res.data.user)
                resolve()
            })
        })
    }

    function createGroup(group) {
        return axios({
            method: "POST",
            data: group,
            withCredentials: true,
            url: host + "/create_group",
        })
    }

    function getGroup(id) {
        return axios({
            method: "GET",
            withCredentials: true,
            url: host + "/group/" + id
        })
    }

    function deletePostByUser(filename) {
        return axios({
            method: "POST",
            data: {filename: filename},
            withCredentials: true,
            url: host + "/delete",
        })
    }


    function addFile(file) {
        let data = new FormData();
        data.append('title', file.title)
        data.append('description', file.description)
        data.append('groupId', file.group)
        data.append('documentFile', file.file, file.file.name);
        console.log(data)
        return axios({
            method: "post",
            withCredentials: true,
            url: host + "/upload",
            data: data,
        })
    }


    function getGroups() {
        return axios({
            method: "GET",
            withCredentials: true,
            url: host + "/groups"
        })
    }

    function removeUserFromGroup(data) {
        return axios({
            method: "POST",
            data: data,
            withCredentials: true,
            url: host + "/delete_member",
        })
    }

    function deleteGroup(data) {
        return axios({
            method: "POST",
            data: data,
            withCredentials: true,
            url: host + "/delete_group",
        })
    }


    function addMemberToGroup(data) {
        return axios({
            method: "POST",
            data: data,
            withCredentials: true,
            url: host + "/add_member",
        })
    }


    function logout() {
        return new Promise((resolve, reject) => {
            axios({
                method: "post",
                withCredentials: true,
                url: host + "/logout",
            }).then((res) => {
                resolve()
            }).catch((err) => reject(err))
        })
    }

    function resetPassword(email) {

    }


    const value = {
        currentUser,
        setCurrentUser,
        getCurrentUser,
        login,
        signup,
        logout,
        resetPassword,
        getAllUsers,
        createGroup,
        getGroups,
        getGroup,
        addFile,
        deletePostByUser,
        removeUserFromGroup,
        addMemberToGroup,
        deleteGroup,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}