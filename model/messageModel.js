import mongoose from "mongoose";

const { Schema } = mongoose;

const messageSchema = new Schema({
  
senderId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users"
},
receiverId:{
    type:mongoose.Schema.Types.ObjectId,
     ref:"users"
},
message:{
    type:String
}

},{timestamps:true});

const messageModel = mongoose.model("messages",messageSchema);
export default messageModel;