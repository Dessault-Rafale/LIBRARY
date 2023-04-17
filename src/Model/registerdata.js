const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://jinsjoseph:8943480915@cluster0.lnb8wip.mongodb.net/library?retryWrites=true&w=majority')
const Schema=mongoose.Schema  //schema definition

const RegisterSchema=new Schema({
    name:{type:String},
    email:{type:String},
    place:{type:String},
    address:{type:String},
    phone:{type:String},
    login_id:{type: Schema.Types.ObjectId, ref: "login_tb"}
})

var Registerdata=mongoose.model('registration_tb',RegisterSchema) //model creation
module.exports=Registerdata;