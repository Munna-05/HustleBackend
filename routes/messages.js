import express from 'express'
const router=express.Router()
import { convoController } from '../controllers/conversationController.js'


router.post('/',convoController.newMessage)


export default router;
