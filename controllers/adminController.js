
import User from '../model/User.js'
import Channel from '../model/Channel.js'
import jwt from 'jsonwebtoken'


export const adminController ={
    Admin: async (req,res) =>{
        console.log('admin request received')
        console.log(req.body)
        const users = await User.find() 
        const channels = await Channel.find()
        // const accessToken = jwt.sign({ id: user._id }, 'adminKey')
           
         const allDetails ={
            user:users,
            channel:channels,
            // token:accessToken
            
         }

         console.log(allDetails)
         res.status(200).json(allDetails)
    }
 
} 