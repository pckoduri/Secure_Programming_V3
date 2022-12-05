import React, {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "./context/AuthContext";

const Signin = () => {
    const Navigate = useNavigate();
    const {login, setCurrentUser, currentUser, getCurrentUser} = useAuth()
    const [error, setErrorState] = useState(false)
    const [errorField, setErrorField] = useState("Error")
    const signUpPageHandler = () => {
        Navigate("/");
    };

    getCurrentUser().then(res => {
        if (currentUser){
            Navigate("/dashboard")
        }
    })

    if (currentUser){
        Navigate("/dashboard")
    }

    function onSignInClicked(event) {
        event.preventDefault();
        const email = event.target[0].value;
        const password = event.target[1].value;
        login(email, password).then((res) => {
            console.log(res.data)
            setCurrentUser(res.data)
            Navigate("/dashboard")
        }).catch((err) => {
            setErrorState(true)
            setErrorField(err.response.data)
            console.log(err.response.data)
        })
    }

    return (
        <div className="min-h-screen bg-gray-200 flex justify-center items-center">
            <div className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
                <div>
                    <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
                        Sign In
                    </h1>
                    <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">
                        Welcome to sign in page...
                    </p>
                </div>

                <form onSubmit={onSignInClicked}>
                    <div className="space-y-4">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            maxLength={"12"}
                            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                        />
                    </div>
                    {error && <div className="text-center mt-6">
                        <input disabled className="error"  style={{color: "red", textAlign: "right"}} value={errorField}/>
                    </div>}
                    <div className="text-center mt-6">
                        <button type="submit"
                                className="py-3 w-64 text-xl text-white bg-blue-500 hover:bg-blue-600 rounded-2xl">
                            Sign in
                        </button>
                        <p className="mt-4 text-sm">
                            Dont Have An Account?{" "}
                            <span
                                className="underline cursor-pointer"
                                onClick={signUpPageHandler}
                            >
              Sign Up
            </span>
                        </p>
                    </div>

                </form>

            </div>
        </div>
    );
};

export default Signin;
