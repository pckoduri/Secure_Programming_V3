import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "./context/AuthContext";

const Signup = () => {
    const Navigate = useNavigate();
    const {currentUser, signup, getCurrentUser} = useAuth()
    const [error, setErrorState] = useState(false)
    const [errorField, setErrorField] = useState("Error")
    const signInPageHandler = () => {
        Navigate("login");
    };
    getCurrentUser().then(res => {
        if (currentUser){
            Navigate("/dashboard")
        }
    })

    function signupBtnClicked(e) {
        e.preventDefault()
        const username = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        signup(username, password, email).then((cred) => {
            console.log(cred)
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
                        Create An Account
                    </h1>
                    <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">
                        Create an account to enjoy all the services!
                    </p>
                </div>
                <form onSubmit={signupBtnClicked}>
                    <div className="space-y-4">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            pattern="^[\w.-]\w+" title="Must only contain alphabets or number"
                            maxLength={"18"}
                            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                        />
                        <input
                            name="Email"
                            type="email"
                            placeholder="Email Address"
                            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                        />
                        <input
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                            maxLength={"12"}
                            name="password"
                            type="password"
                            placeholder="Password"
                            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                        />
                    </div>

                    {error && <div className="text-center mt-6">
                        <input disabled className="error"  style={{color: "red", textAlign: "right"}} value={errorField}/>
                    </div>}
                    <div className="text-center mt-6">
                        <button type="submit" className="py-3 w-64 text-xl text-white bg-blue-500 rounded-2xl hover:bg-blue-600">
                            Create Account
                        </button>
                        <p className="mt-4 text-sm">
                            Already Have An Account?{" "}
                            <span
                                className="underline cursor-pointer"
                                onClick={signInPageHandler}
                            >
              {" "}
                                Sign In
            </span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
