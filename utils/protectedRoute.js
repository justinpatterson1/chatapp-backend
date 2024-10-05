import jwt from "jsonwebtoken";
import messageModel from "../model/messageModel.js";

const protectedRoute = (req,res,next)=>{
    const token = req.headers.authorization;

 console.log(token)
    try {
        if(!token) res.status(404).json({message:"User is not authorized"})

        const user = jwt.verify(token,'jwt')

        if(user){
            req.userid = user._id
            next()
        } 
    } catch (error) {
        res.status(500).json({
            message:"Unauthorized user",
            error:err
        })
    }
 



    //const decode = jwt.verify(token,'jwt');

 
}

export{protectedRoute}