import React, { useState, useRef } from 'react'
import Header from './Header'
import { Validate } from '../utils/Validate';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { auth } from "../utils/firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import {addUser,removeUser} from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [isSignInForm, setIsSingInForm] = useState(true);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const dispatch = useDispatch();
    const navigate=useNavigate();

    const [errorMessage, setErrorMessage] = useState(null) // to set the error if any returned by Validate Funtion 


    // we use useRef to get the reference of the object i.e to get the reference of the input fields in simple words we can get the current value present in the input field
    const email = useRef(null)
    const password = useRef(null) // input fields are set to null 


    const toggleSingInForm = () => {
        setIsSingInForm(!isSignInForm);

        // To set fields to null whenever user toggle between forms
        email.current.value = null;
        password.current.value = null;

    }

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    }


    const handleValidation = () => {

        //console.log(email.current.value)// gives access to the current value in the field
        //console.log(password.current.value)//

        // As we have access to current values we can now validate them
        const message = Validate(email.current.value, password.current.value)
        setErrorMessage(message);
        if (message) return; // to make sure the function gets aborted if the username or password are not validated from Validate Function defined in utils/validate.js

        // Here goes our signIn or signUp login if the password and email are ok then move forrward
        if (!isSignInForm) {
            // this means user is currently on signup form so we have to write the signUp logic here
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    console.log(user);
                    console.log("SignUp Successfully!!!");
                    
                    //Now that singUp is successfull so we need to re-direct the user to login form 
                    setIsSingInForm(true);
                    
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(error + " " + errorMessage);
                    setErrorMessage(errorMessage);
                });

        }

        else {
            // the user is on signIn form so write signIn login here
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user);
                    console.log("Singed In Successfully!!!");

                    //Now that we know that user is signed in so we have to store his information (username,email) in Redux Store so that we can use it in our project (i.e User Name on top)
                    dispatch(addUser(
                                    { email: email.current.value,
                                     password: password.current.value 
                                    }
                                    )
                            );

                    //Now we have to redirect the user to the browse page and for that we will use useNavigate hook
                    navigate('/browse');
                    



                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(error)
                    console.log(errorCode + " " + errorMessage);
                    setErrorMessage(errorMessage);

                });
        }

    }

    return (
        <>
            <div className='text-white  '>
                <Header />

                <img className='h-[100vh] absolute w-full' src="https://assets.nflxext.com/ffe/siteui/vlv3/51c1d7f7-3179-4a55-93d9-704722898999/9695e4db-f672-4c1f-ae2d-555a579e9ced/PK-en-20240610-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="background image" />

                <div className="h-[100vh] flex flex-col items-center justify-center">
                    <form onSubmit={(e) => e.preventDefault()} className='w-[450px] z-50  rounded-lg  bg-black bg-opacity-70 px-6 py-11' action="">
                        <h1 className='font-bold text-3xl mb-6'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>

                        {!isSignInForm
                            ? (<div className="w-full bg-gray-800 my-3 py-1 rounded-sm px-1">
                                <input className='bg-transparent border-none h-full w-full p-2' type="text" placeholder='User Name' />
                            </div>)
                            : null
                        }

                        <div className="w-full bg-gray-800 my-3 py-1 rounded-sm px-1">
                            <input ref={email} className='bg-transparent border-none h-full w-full p-2' type="email" placeholder='Email' />
                        </div>

                        <div className="flex justify-around items-center w-full bg-gray-800 my-3 py-1 rounded-sm px-1">
                            <input
                                ref={password}
                                className='bg-transparent border-none h-full w-[90%] p-2'
                                type={isPasswordVisible ? 'text' : 'password'}
                                placeholder='Password'
                            />
                            {isPasswordVisible ? (
                                <FaEye onClick={togglePasswordVisibility} className='cursor-pointer' />

                            ) : (
                                <FaEyeSlash onClick={togglePasswordVisibility} className='cursor-pointer' />
                            )}
                        </div>

                        {!isSignInForm ? (
                            <div className="flex justify-around items-center w-full bg-gray-800 my-3 py-1 rounded-sm px-1">
                                <input
                                    className='bg-transparent border-none h-full w-[90%] p-2'
                                    type={isPasswordVisible ? 'text' : 'password'}
                                    placeholder='Confirm Password'
                                />
                                {isPasswordVisible ? (
                                    <FaEye onClick={togglePasswordVisibility} className='cursor-pointer' />
                                ) : (
                                    <FaEyeSlash onClick={togglePasswordVisibility} className='cursor-pointer' />

                                )}
                            </div>
                        ) : null}

                        <p className='text-red-600 font-bold p-2'>{errorMessage}</p>

                        <button onClick={handleValidation} className='w-full my-3 py-2 rounded-sm px-2 font-bold bg-red-700' >{isSignInForm ? "Sign In" : "Sign Up"}</button>
                        <p>{isSignInForm ? "Don't have an Account?" : "Already have an Account ?"} <span className='text-red-700 font-bold cursor-pointer ' onClick={toggleSingInForm}>{isSignInForm ? "SignUp" : "SignIn"}</span></p>
                        <small className='text-gray-300 '>This page is protected by google reCAPTCHA to avoid any problem.Learn what is reCAPTCHA</small>
                    </form>
                </div>
            </div>

        </>
    )
}

export default Login