const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://jinsjoseph:8943480915@cluster0.lnb8wip.mongodb.net/library?retryWrites=true&w=majority')
const Schema=mongoose.Schema  //schema definition

const BookSchema=new Schema({
    AuthorName:String,
    BookDescription:String,
    BookName:String,
    Image:String
})

var Bookdata=mongoose.model('book_tb',BookSchema) //model creation
module.exports=Bookdata;


