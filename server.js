const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors")
const newuser=require("./models/newuser")

const MyApp=express();
const port=5001;

mongoose.connect("mongodb://localhost:27017/test")

MyApp.use(express.json())
MyApp.use(cors())

MyApp.get("/getNewUsers",async(req,res)=>{
    const newUsersData=await newuser.find()
    res.status(201).send({"message":"UserRetrived...!","result":newUsersData});
})



MyApp.get("/getServerResponce",(req,res)=>{
    res.send("Server is Execute Sucessfully...!")
})


  
MyApp.listen(port,()=>{
    console.log(`This Server is Listening on the port: ${port}`); 
})