import conversationModel from "../model/conversationModel.js"
import messageModel from "../model/messageModel.js";
import userModel from "../model/userModel.js";



const getAllUserConvos = async (req, res) => {
    try {
      // Find all conversations with the user's participation
      console.log(req.userid)
      const convos = await conversationModel.find({ "participants": { "$in": req.userid } })
        .select({ message: { $slice: -1 }, participants: 1 });
  
      const participantarr = [];
      const messageids = [];
  
      // Extract participants and message IDs from conversations
      convos.forEach(convo => {
        convo.participants.forEach(participant => {
          participantarr.push(participant);
        });
        convo.message.forEach(msg => {
          messageids.push(msg);
        });
      });
    
      console.log(participantarr)

  
      // Find the messages by their IDs
      const messages = await messageModel.find({ _id: { $in: messageids } })
        .select({ message: 1, receiverId: 1 , senderId : 1}).lean();
  
      const userContacts = await Promise.all(messages.map(async (msg) => {
        // Find the user corresponding to the message's receiverId
        const id = req.userid == msg.receiverId ?  msg.senderId : msg.receiverId 
        const conversationUser = await userModel.findOne({ _id: id }).lean();
        
        if (conversationUser) {
            const userConvo  = conversationUser

            console.log(userConvo)
          // Attach the last message to the user's contact information
          userConvo['lastMessage'] = {senderId:id,message:msg.message};

          return userConvo;
        }
      }));
  
      //console.log(userContacts)
      // Filter out any undefined values (if no user was found for some messages)
      const filteredContacts = userContacts.filter(contact => contact);
  
      // Send the response with user contacts
      res.status(200).json({
        data: filteredContacts
      });
  
    } catch (err) {
      // Handle any errors during the process
      res.status(500).json({
        message: "Error retrieving conversations or users",
        error: err
      });
    }
  };


  const getAConversation = async(req,res) =>{

    console.log("Wam dey")
    const user = await userModel.find({_id:req.params.id}).lean()

    if(!user) return res.status.json({message:"This is an invalid user"});

    const conversation = await conversationModel.find({
      participants: { 
        $all: [req.userid, req.params.id], // Ensures both user IDs are present
        $size: 2                           // Ensures there are exactly 2 participants
      }
    }).lean();

    const messages = await messageModel.find({_id:{$in:conversation[0].message}}).sort({timestam:1}).lean()
 
    if(messages){
      res.json({
        message:"User conversation returned",
        data:{
            name:user[0].name,
            username:user[0].username,
            messages:messages
        }
      })
    }
    else{
      res.status(404).json({
        message:"Unable to get user conversations"
      })
    }
      //console.log(messages)

  }
  

export{getAllUserConvos, getAConversation}