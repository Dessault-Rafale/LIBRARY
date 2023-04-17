const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://jinsjoseph:8943480915@cluster0.lnb8wip.mongodb.net/library?retryWrites=true&w=majority')
const Schema=mongoose.Schema  //schema definition

const AuthorSchema=new Schema({
    AuthorName:String,
    AuthorEmailId:String,
    AuthorPlace:String,
    Image:String
})

var Authordata=mongoose.model('author_tb',AuthorSchema) //model creation
module.exports=Authordata;