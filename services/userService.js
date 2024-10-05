import mongoose from "mongoose";
import userModel from "../model/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const getAllUsers = (req,res) =>{
    console.log(req.cookies)
    userModel.find()
       .then((user)=>{
        res.json({
            message:"All users have been returned",
            data:user,
            length:user.length
        })
    })
    .catch((err) =>{
        res.status(400).json({
            message:"Error occured while fetching users",
            error:err
    })
})
    
}


const getAllUserConnections = (req,res) =>{
    userModel.find({_id:{"$in" : req.body.connections}})
       .then((user)=>{
        res.json({
            message:"All users have been returned",
            data:user,
            length:user.length
        })
    })
    .catch((err) =>{
        res.status(400).json({
            message:"Error occured while fetching users",
            error:err
    })
})
    
}




const getOneUser = (req,res)=>{

    userModel.findById(req.params.id)
        .then((user)=>{
            res.json({
                message:`User ${req.params.id} found`,
                data:user
            })
        })
        .catch(err=>{
            res.status(404).json({
                message:"User not found",
                error:err
            })
        })
}

const createAUser = (req,res)=>{
    const body = req.body;
        userModel.findOne()
        .where('email').equals(req.body.email)
            .then((user)=>{
                if(user){
                    res.json({
                        message:"This email already exists"
                    })
                } else {
                    const newUser = new userModel(req.body)
                    
                    bcrypt.genSalt(10)
                        .then((salt)=>{
                            bcrypt.hash(newUser.password,salt)
                                .then((hash)=>{
                                    newUser.password=hash

                                    newUser.save()
                                        .then(newUser=>{
                                            res.json({
                                                message:"New user has been successfully added ",
                                                data:newUser
                                            })
                                        })
                                        .catch(err=>{
                                            res.status(400).json({
                                                message:"Error occured when creating a new user",
                                            error:err
                                            })
                                            
                                        })
                                })
                                .catch(err=>{
                                    res.json({
                                        message:"Error occured while hashing password",
                                        error:err
                                    })
                                })
                        })
                        .catch(err=>{
                            res.json({
                                message:"Error occured while generating hash",
                                error:err
                            })
                        })


                }
            })
            .catch(err=>{
                res.json({
                    message:"Error occured during email verification "
                })
            })
    
}

const loginUser =(req,res)=>{
    
    userModel.findOne()
        .where('email')
        .equals(req.body.email)
        .then((user)=>{
            if(user){
                console.log("hi")
                bcrypt.compare(req.body.password,user.password)
                    .then((auth)=>{
                        if(auth){
                            let token = jwt.sign({
                                _id:user._id,
                                name:user.name,
                                username:user.username,
                                connections:user.connections
                            },'jwt')

                            res.json({
                            message:"User is authenticated",
                            data:token
                            })
                        }
                    })
                    .catch(err=>{
                        res.status(400).json({
                            message:"User could not be Authenticated",
                            error:err
                        })
                    })
               

                
            } else {
               res.json({
                message:"Incorrect user credentials"
               })
            }
        })
}

const userSearch = (req,res) =>{
    console.log("test")
    userModel.find({name:{$regex:req.body.name}})
    .then((user)=>{
        res.json({
            message:"Search item found",
            data:user
        })
    })
    .catch(err=>{
        res.status(400).json({
            message:"Error occured during search",
            error:err
        })
    })
}

const updateAUser =(req,res)=>{
    console.log(req.params.id)
    userModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
        .then((user)=>{
            res.json({
                message:"Update was successful",
                data:user
            })
        })  
        .catch(err=>{
            res.status(400).json({
                message:"Update was unsuccessful",
                error:err
        })
        })
}

export{getAllUsers,getOneUser,createAUser,loginUser,userSearch,updateAUser,getAllUserConnections}