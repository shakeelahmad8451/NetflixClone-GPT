import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();



  const handleSignOut=()=>{
    dispatch(removeUser());
    console.log('Signed Out Succesfully')
     
    //Now we need to redirect the user to the Login page or root
    navigate('/');

  }


  return (
    <div className="  z-50  absolute  flex items-center justify-between bg-gradient-to-b from-black font-bold   w-full">
      <div className='uppercase  text-red-700'>
        <Link to={"/"}>
          <img className='w-[180px]' src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt="NETFLIX" />
        </Link>

      </div>
      <div className="mr-5 bg-red-700 rounded p-2 font-bold cursor-pointer text-white"
        onClick={handleSignOut}
      >
        Logout
      </div>
    </div>
  )
}

export default Header