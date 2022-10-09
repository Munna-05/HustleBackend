
import express from 'express'
const router=express.Router()
import controller from '../controllers/users.js'



router.post('/user',(req,res)=>{
    console.log('hai user')
})


export default router;