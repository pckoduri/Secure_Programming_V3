import React, {Component, useEffect, useState} from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {useAuth} from "./context/AuthContext";


export default function ProtectedRoute() {
    const {currentUser, getCurrentUser} = useAuth()
    const [isLoading, setLoading] = useState(true)
    useEffect(() => {
        getCurrentUser().then(()=> {
            setLoading(false)
        }).catch(() => {
            setLoading(false)
        })
    }, [1])

    return isLoading?<div/>:currentUser ? <Outlet/> : <Navigate to="/login"/>};