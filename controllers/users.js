
import express from 'express'

export default {

    register:async (req,res)=>{
        console.log(req.body)
        res.send('hello ')
    }
}