import express from 'express'
const router = express.Router()
import { convoController } from '../controllers/conversationController.js'

router.post('/',convoController.newConversation)

export default router;