const mongoose=require("mongoose");
const newUserSchema= new mongoose.Schema(
    {
        FirstName:String,
        MiddleName:String,
        LastName:String,
        age:Number
    }
)

module.exports=mongoose.model("newUsers",newUserSchema)