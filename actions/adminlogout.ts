"use server"

import mongoose from 'mongoose';
import { cookies } from 'next/headers';
import Token from "@/model/Token"

async function connectToMongo() {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(process.env.MONGODB_URI!,); // A Mongoose kapcsolat létrehozása
    }
    catch (error) {
      console.error('Failed to connect to MongoDB:', error);
      throw new Error('MongoDB connection failed');
    }
  }
}

async function closeConnection() {
  if (mongoose.connection.readyState !== 0) {
    try {
      await mongoose.connection.close();
    }
    catch (error) {
      console.error('Failed to close the connection:', error);
      throw new Error('Failed to close the connection');
  }
  }
}


export  const adminLogOut =  async() => {
    if(!process.env.SECRET_CODE) return{error: 'process.env.SECRET_CODE is missing'}

    try{
        await connectToMongo();

        const Cookies = cookies().get('admin-log');
        if(!Cookies) {
          await closeConnection();
          return {success: "You are logged out."}
        }

        
        await Token.deleteOne({token: Cookies.value})
        await closeConnection();
        cookies().delete('admin-log')
        return {success: "You are logged out"}
      }
      catch(error){
        console.log(error)
        return {error: "Server error"}
      }
}