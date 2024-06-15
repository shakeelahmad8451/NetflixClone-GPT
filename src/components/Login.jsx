import React, { useState,useRef } from 'react'
import Header from './Header'
import { Validate } from '../utils/Validate';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";


const Login = () => {

    const [isSignInForm, setIsSingInForm] = useState(true);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const [errorMessage,setErrorMessage]=useState(null) // to set the error if any returned by Validate Funtion 
    

    // we use useRef to get the reference of the object i.e to get the reference of the input fields in simple words we can get the current value present in the input field
    const email=useRef(null)
    const password=useRef(null) // input fields are set to null 


    const toggleSingInForm = () => {
        setIsSingInForm(!isSignInForm);

    }

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible)
    }


    const handleValidation=()=>{

        //console.log(email.current.value)// gives access to the current value in the field
        //console.log(password.current.value)//
        
        // As we have access to current values we can now validate them
        const message=Validate(email.current.value,password.current.value)
        setErrorMessage(message)

    }

    return (
        <>
            <div className='text-white'>
                <Header />

                <img className='h-[100vh] w-full' src="https://assets.nflxext.com/ffe/siteui/vlv3/51c1d7f7-3179-4a55-93d9-704722898999/9695e4db-f672-4c1f-ae2d-555a579e9ced/PK-en-20240610-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="background image" />

                <form onSubmit={(e)=>e.preventDefault()} className='w-[450px] z-50 absolute rounded-lg top-40 left-[550px] bg-black bg-opacity-70 px-6 py-11' action="">
                    <h1 className='font-bold text-3xl mb-6'>{isSignInForm ? "Sign In" : "SingUp"}</h1>

                    {!isSignInForm
                        ?(<div className="w-full bg-gray-800 my-3 py-2 rounded-sm px-2">
                            <input  className='bg-transparent border-none h-full w-full p-2' type="text" placeholder='User Name' />
                        </div>)
                        :null
                    }

                    <div className="w-full bg-gray-800 my-3 py-2 rounded-sm px-2">
                        <input ref={email} className='bg-transparent border-none h-full w-full p-2' type="email" placeholder='Email' />
                    </div>

                    <div className="flex justify-around items-center w-full bg-gray-800 my-3 py-2 rounded-sm px-2">
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
                        <div className="flex justify-around items-center w-full bg-gray-800 my-3 py-2 rounded-sm px-2">
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

                    <button onClick={handleValidation} className='w-full my-3 py-2 rounded-sm px-2 font-bold bg-red-700' >{isSignInForm ? "Sign In" : "Sing Up"}</button>
                    <p>{isSignInForm ? "Don't have an Account?" : "Already have an Account ?"} <span className='text-red-700 font-bold cursor-pointer ' onClick={toggleSingInForm}>{isSignInForm ? "SingUp" : "SingIn"}</span></p>
                    <small className='text-gray-300 '>This page is protected by google reCAPTCHA to avoid any problem.Learn what is reCAPTCHA</small>
                </form>
            </div>

        </>
    )
}

export default Login