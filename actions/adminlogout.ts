"use server"

import mongoose from 'mongoose';
import { cookies } from 'next/headers';
import Token from "@/model/Token"



export  const adminLogOut =  async() => {
    if(!process.env.SECRET_CODE) return{error: 'process.env.SECRET_CODE is missing'}

    try{
        const Cookies = cookies().get('admin-log');
        if(!Cookies) {
          
          return {success: "You are logged out."}
        }

        
        await Token.deleteOne({token: Cookies.value})
        
        cookies().delete('admin-log')
        return {success: "You are logged out"}
      }
      catch(error){
        console.log(error)
        return {error: "Server error"}
      }
}