import mongoose from "mongoose";

const { Schema } = mongoose;

const conversationSchema = new Schema({
  
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
message:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'messages',
        default:[]
    }
]

},{timestamps:true});

const conversationModel = mongoose.model("conversation",conversationSchema);
export default conversationModel;