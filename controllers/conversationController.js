import Conversation from "../model/Conversation.js"
import Message from "../model/Message.js"


export const convoController = {
    newConversation: async (req,res)=>{
        const newConversation = new Conversation({
            members:[req.body.userId,req.body.receiver]
        })
        try{
            const savedConversation = await newConversation.save()
            res.status(200).json(savedConversation)
        }catch(err){
            res.status(500).json(err)
        }
        console.log(req.body)
    }
    ,
    newMessage:async(req,res) =>{
        console.log(req.body)
        const newMessage = new Message({
            converstionId:req.body.receiver,
            sender:req.body.userId,
            text:req.body.message

        })
        try{

        }catch(err){
            res.status(500).json(err)
        }
        res.send(req.body)
    }

}
 


