import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
    userId:{
        type:String
    },
    img:{
        type:String
    },
    description:{
        type:String
    },
    time:{
        type:String
    },
    comments:{
        type:Array
    },
    likes:{
        type:Array
    }
    // userDetails:{
    //     type:Object
    // },
    // post:{
    //     type:Object
    // }

})
export default mongoose.model("Post",postSchema)  