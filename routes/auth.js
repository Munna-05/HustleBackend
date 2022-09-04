import express from 'express' 
const router=express.Router()
import {controller} from '../controllers/authControl.js'
import { adminController } from '../controllers/adminController.js'
import {auth} from '../middleware/middle.js'



router.post('/signup',controller.register)
router.post('/login',controller.login)
router.get('/youtube',controller.getYoutube)
router.get('/profile/:id',controller.profile)
router.get('/channelVideos/:channelId',controller.getChannelVideos)

router.get('/adminDash',adminController.Admin)


export default router