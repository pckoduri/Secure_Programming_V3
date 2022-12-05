import * as React from "react";
import {Routes, Route} from "react-router-dom";
import AdminDashboard from "./components/Administrators/AdminDashboard";
import CreateGroups from "./components/GroupRegister/CreateGroups";
import GroupHomepage from "./components/GroupRegister/GroupHomepage";
import GroupIntro from "./components/GroupRegister/GroupIntro";
import GroupRegister from "./components/GroupRegister/GroupRegister";
import InviteInGroup from "./components/GroupRegister/InviteInGroup";
import Homepage from "./components/Homepage";
import Navbar from "./components/Navbar";
import PageNotFound from "./components/shared/PageNotFound";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import {AuthProvider} from "./components/context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";


const App = () => {

    return (
        <AuthProvider>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Signup/>}/>
                <Route path="/login" element={<Signin/>}/>
                <Route path="/creategroups" element={<ProtectedRoute/>}>
                    <Route path="/creategroups" element={<CreateGroups/>}/>
                </Route>
                <Route path="/groupregister" element={<ProtectedRoute/>}>
                    <Route path="/groupregister" element={<GroupRegister/>}/>
                </Route>
                <Route path="/inviteingroup" element={<ProtectedRoute/>}>
                    <Route path="/inviteingroup" element={<InviteInGroup/>}/>
                </Route>

                <Route path="/groupintro" element={<ProtectedRoute/>}>
                    <Route path="/groupintro" element={<GroupIntro/>}/>
                </Route>

                <Route path="/grouphomepage/*" element={<ProtectedRoute/>}>
                    <Route path="/grouphomepage/*" element={<GroupHomepage/>}/>
                </Route>
                <Route path="/dashboard" element={<ProtectedRoute/>}>
                    <Route exact path="/dashboard" element={<Homepage/>}/>
                </Route>
                <Route path="/admindash" element={<ProtectedRoute/>}>
                    <Route exact path="/admindash" element={<AdminDashboard/>}/>
                </Route>
                <Route path="/*" element={<PageNotFound/>}/>
            </Routes>
        </AuthProvider>
    );
};

export default App;
