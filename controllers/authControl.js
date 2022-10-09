
import express, { response } from 'express'
import modelName from '../model/User.js'
import User from '../model/User.js'
import Channel from '../model/Channel.js'
import jwt from 'jsonwebtoken'
import axios from 'axios'
import Videos from '../model/Videos.js'
import { dbController } from './dbController.js'



const youtubeApiKey = 'AIzaSyD6VNsx-vJFfwLH8az3ibod973-C1BlkYE'
const url = 'https://www.googleapis.com/youtube/v3'
const empty = {}



export const controller = {

    register: async (req, res) => {
        try {
            console.log("........................................", req.body)
            if (req.body.name === "" || req.body.email === "" || req.body.password == "" || req.body.password != req.body.rpass) {
                res.send('invalid credentials')
                // res.status(500).json('invalid credentials')
                console.log('invalid credentials')
            } else {
                const user = new User(req.body)
                await user.save() //user details saved in database
                console.log('user Created')
                res.send('userCreated')
            }
        } catch (error) {
            console.log('error')
        }
    },
    login: async (req, res) => {
        console.log(req.body)
        try {
            console.log("...................login details", req.body)
            //validating user details
            if (req.body.email === "") {
                res.status(401).json('Invalid Email')
                console.log('Invalid Email')
            } else {
                console.log('im here')
                const user = await User.findOne({ email: req.body.email }) //finding user if credentials are correct
                if (user) {
                    if (user.password == req.body.password) {
                        console.log("correct credentials")
                        const accessToken = jwt.sign({ id: user._id }, 'mySecretKey')
                        //sending response with user details and JWT
                        res.json({
                            id: user._id, username: user.name, email: user.email, accessToken
                        })
                    } else {
                        res.send('Invalid Password')
                    }
                } else {
                    res.send('Invalid Email')
                }
            }
        } catch (error) {
            console.log(error)
            res.send('Invalid Email')
        }
    },
    getYoutube: async (req, res) => {
        try {
            console.log("got youtube request")
            let channeldetails = await Channel.find().sort({ subscriberCount: -1 }) //getting all channel details in descending order by subscriber count
            console.log("channeldetails : ................", channeldetails)
            res.status(200).json(channeldetails)
        } catch (err) {
            res.send(err)
        }
    },
    profile: async (req, res) => {
        console.log(req.params.id)
        let profileDetails = await Channel.findOne({ userId: req.params.id }) //getting Channel profile details
        let videoDetails = await Videos.findOne({ channelId: profileDetails.channelId }) //getting channel videos
        let details = {
            profileDetails: profileDetails,
            videos: videoDetails
        }
        res.status(200).json(details)
    },
    getChannelVideos: async (req, res) => {
        let videoDetails = await Videos.findOne({ channelId: req.params.channelId })
        res.status(200).json(videoDetails)
    },
    getChats: async (req, res) => {
        console.log('chats route')
        res.send("chats")
    },
    getUser: async (req, res) => {
        if (req.params.id === "") {
            res.status(404).json("user id missing")
        } else {
            dbController.findUser(req.params.id).then((response) => {
                // console.log("database controller working", response)
                res.status(200).json(response)
            })
        }
    },
    verifyChannel: async (req, res) => {
        console.log(req.params.channelId)
        console.log(req.params.userId)
        const channel = req.params.channelId
        const userid = await User.findOne({ _id: req.params.userId })
        try {
            console.log('verifying youtube channel')
            const stats = {
                method: 'GET',
                url: 'https://youtube-v31.p.rapidapi.com/channels',
                params: { part: 'statistics', id: `${req.params.channelId}` },
                headers: {
                    'X-RapidAPI-Key': '98708987a5mshacfd574ef4cff3ap12c3c7jsn52d952a577b0',
                    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
                }
            };
            axios.request(stats).then((response) => {
                console.log(response.data.items)
                const channelDetails = {
                    userId: userid._id,
                    channelId: response.data.items[0].id,
                    channelTitle: response.data.items[0].snippet.title,
                    channelDescription: response.data.items[0].snippet.description,
                    subscriberCount: response.data.items[0].statistics.subscriberCount,
                    dp: response.data.items[0].snippet.thumbnails.high.url
                }

                dbController.saveChannel(channelDetails).then((res) => {
                    console.log('channel Saved now')
                    console.log(res)
                    // res.send(response.data.items)
                })
                const options2 = {
                    method: 'GET',
                    url: 'https://youtube-v31.p.rapidapi.com/search',
                    params: {
                        channelId: channel,
                        part: 'snippet,id',
                        order: 'date',
                        maxResults: '50'
                    },
                    headers: {
                        'X-RapidAPI-Key': '98708987a5mshacfd574ef4cff3ap12c3c7jsn52d952a577b0',
                        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
                    }
                };

                axios.request(options2).then(async function (response) {
                    console.log('_______________________', response.data.items);
                    let channelVideos = {
                        channelId: response.data.items[0].snippet.channelId,
                        videos: response.data.items
                    }
                    const video = new Videos(channelVideos) //video collection
                    await video.save()
                    console.log('video saved in collection')

                })
                res.status(200).json('channel created successfully')


            })
        } catch (error) {
            res.send("no channel id")
        }
    },
    updateUser: (req, res) => {
        console.log(req.body)
        dbController.findAndUpdate(req.params.id, req.body).then(() => {
            res.status(200).json('user updated')
        })
        console.log(".....request received.......")

    },
    saveImage: (req, res) => {

        console.log('received imageSave request')
        res.send('image saved')
    },
    savePost: async (req, res) => {
        console.log('savePost request received')
        res.status(200).json('post saved')
        dbController.savePost(req.body).then(() => {
            res.status(200).json('post Saved')
        })
    },
    getPost: async (req, res) => {
        try {
            console.log('getPost request received', req.params.userid)
            const posts = await dbController.getAllPosts(req.params.userid)
            console.log('posts', posts)
            const userDetails = await dbController.findUser(req.params.userId)
            const details = {
                post: posts,
                user: userDetails
            }
            posts ? res.status(200).json(details) : res.status(400).json('No Post')
            console.log('userDetails', userDetails)

        } catch (err) {
            res.status(400).json(err)
        }

    },
    allFeeds: async (req, res) => {
        try {
            const userId = req.params.userId
            const feed = await dbController.allFeeds()
            const userDetails = await dbController.findUser(feed.userId)
            const datas = {
                userDetails: userDetails,
                feedDetails: feed
            }
            res.status(200).json(datas)
        } catch (err) {
            res.status(404).json('feeds not found')
        }
    }


}



