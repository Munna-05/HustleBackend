import mongoose from "mongoose"



const channelSchema = mongoose.Schema({
    userId:{
        type:String
    },
    channelId:{
        type:String
    },
    channelTitle:{
        type:String
    },
    channelDescription:{
        type:String
    },
    subscriberCount:{
        type:Number
    },
    dp:{
        type:String
    }
})

export default mongoose.model("Channel",channelSchema)
