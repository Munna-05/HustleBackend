import mongoose from 'mongoose'
const VideoSchema = mongoose.Schema({
    channelId:{
        type:String
        
    },
    videos:{
        type:Object
    }
})


export default mongoose.model("Video",VideoSchema)