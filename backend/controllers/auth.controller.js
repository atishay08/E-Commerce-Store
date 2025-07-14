import User from "../models/user.model.js";

export const signup = async(req,res)=>{
    const {email,password,name}=req.body;
    const userExists=await User.findOne({email})
    
    try{
        if(userExists){
            return res.status(400).json({message: "User already exists."});
        }
        const user = await User.create({name,email,password});

    res.status(201).json({user, message: "User created successfully"});
    }catch(error){
        res.status(500).json(error.message);
    }
}

export const login = async(req,res)=>{
    res.send("login route called");
}

export const logout = async(req,res)=>{
    res.send("logout route called");
}