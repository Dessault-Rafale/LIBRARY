const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://jinsjoseph:8943480915@cluster0.lnb8wip.mongodb.net/library?retryWrites=true&w=majority')
const Schema=mongoose.Schema  //schema definition

const LoginSchema=new Schema({
    username:String,
    password:String
})

var Logindata=mongoose.model('login_tb',LoginSchema) //model creation
module.exports=Logindata;