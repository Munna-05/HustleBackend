
import express from 'express'
const router=express.Router()
import controller from '../controllers/users.js'



router.post('/user',controller.register)


export default router;