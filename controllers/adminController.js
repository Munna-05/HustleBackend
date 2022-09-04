
import express, { response } from 'express'
import modelName from '../model/User.js'
import User from '../model/User.js'
import Channel from '../model/Channel.js'
import jwt from 'jsonwebtoken'
import fetch from 'node-fetch'
import axios from 'axios'

export const adminController ={
    Admin: async (req,res) =>{
        console.log('admin request received')
        const users = await User.find() 
        const channels = await Channel.find()
           
         const allDetails ={
            user:users,
            channel:channels
         }
         console.log(allDetails)
         res.status(200).json(allDetails)
    }

}