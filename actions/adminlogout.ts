"use server"

import mongoose from 'mongoose';
import { cookies } from 'next/headers';
import Token from "@/model/Token"

async function connectToMongo() {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGODB_URI!); // A Mongoose kapcsolat létrehozása
    }
}

export  const adminLogOut =  async() => {
    if(!process.env.SECRET_CODE) return{error: 'process.env.SECRET_CODE is missing'}

    try{
        await connectToMongo();

        const Cookies = cookies().get('admin-log');
        if(!Cookies) return {success: "You are logged out."}

        
        await Token.deleteOne({token: Cookies.value})
        cookies().delete('admin-log')
        return {success: "You are logged in"}
      }
      catch(error){
        console.log(error)
        return {error: "Server error"}
      }
}