import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:'userSlice',
    initialState:{
        email:'',
        password:''
    },
    reducers:{
        addUser: (state,action)=> action.payload,
        removeUser: ()=>null,
            
        }
    }
)


export const {addUser,removeUser}=userSlice.actions;

export default userSlice.reducer;