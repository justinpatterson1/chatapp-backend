import conversationModel from "../model/conversationModel.js"
import messageModel from "../model/messageModel.js"


const sendMessage =async(req,res)=>{
    const {message} = req.body
    const {id} = req.params

    console.log(req.userid)

    console.log(id)

        let conversation = await conversationModel.findOne({
            participants: { $all: [id, req.userid] },
        })


        if(!conversation){
             conversation = await conversationModel.create({
                participants:[id, req.userid] 

               
            })
            
        }
        const newMessage = new messageModel({
            receiverId:id,
            senderId:req.userid,
            message:message
        })

      
        if(newMessage) conversation.message.push(newMessage._id)
            console.log(conversation.message)
         Promise.all([conversation.save(), newMessage.save()])
            .then(msg=>{
                res.json({
                    message:"Message was successfully sent",
                    data:msg
                })
            })
            .catch(err=>{
                res.status(500).json({
                    message:"Error sending message",
                    error:err
                })
            })
      
  
}

export {sendMessage}