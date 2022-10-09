import mongoose from 'mongoose'
const UserSchema = mongoose.Schema({
    name:{
        type:String
        
    },
    email:{
        type:String
    },
    upi:{
        type:String
    },
    country:{
        type:String
    },
    state:{
        type:String
    },
    password:{
        type:String
    },
    about:{
        type:String
    },
    profilePic:{
        type:String
    }
})


export default mongoose.model("User",UserSchema)