import mongoose from 'mongoose'

const conversationSchema = mongoose.Schema(
    {
        members:{
            type:Array
        }
    },
    {timestamp:true}
)

export default mongoose.model('Conversation',conversationSchema)
