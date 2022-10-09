import express from 'express' 
const router=express.Router()
import {controller} from '../controllers/authControl.js'
import { adminController } from '../controllers/adminController.js'
import {auth} from '../middleware/middle.js'
import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/images')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})
const upload = multer({storage})
const images = (req,res) =>{
    console.log(req.params.param)
    express.static('public/images')
}



router.post('/signup',controller.register)
router.post('/login',controller.login)
router.get('/youtube',controller.getYoutube)
router.get('/profile/:id',controller.profile)
router.get('/channelVideos/:channelId',controller.getChannelVideos)
router.get('/getchats',controller.getChats)
router.post('/verifyChannel/:channelId/:userId',controller.verifyChannel)
router.get('/userDetails/:id',controller.getUser)
router.post('/userUpdate/:id',controller.updateUser)

//post and chat

router.post('/saveImage',upload.single('file') ,controller.saveImage)
router.post('/savePost',controller.savePost)
router.get('/getPosts/:userid',controller.getPost)
router.get('/getAllPost/:userId',controller.allFeeds) 

//conversation and messages




router.get('/adminDash',adminController.Admin)


export default router