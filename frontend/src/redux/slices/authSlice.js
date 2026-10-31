import {createSlice} from '@reduxjs/toolkit';
const slice=createSlice({name:'auth',initialState:{user:null,loading:true},reducers:{setUser:(s,a)=>{s.user=a.payload;s.loading=false;},clearUser:s=>{s.user=null;s.loading=false;},startLoading:s=>{s.loading=true;}}});
export const {setUser,clearUser,startLoading}=slice.actions;export default slice.reducer;
