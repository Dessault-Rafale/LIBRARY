const express = require('express')
const bookRouter = express.Router()
const book = require('../Model/bookdata')
const multer = require('multer')






bookRouter.get('/view-book', (req, res) => {   //getting data from database
    book.find().then((data) => {
        console.log("data", data);
        res.render("viewbook", { data })
    })


})


bookRouter.get('/addbook', (req, res) => {
    res.render("Addbook")
})





bookRouter.get('/delete-book/:id', (req, res) => { //  : is used to get the value
    const id = req.params.id
    console.log("id", id);  // to get the id in console when the corresponding delete button of card is clicked
    book.deleteOne({ _id: id }).then((data) => {
        res.redirect('/Book/view-book')

    })
})


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })







bookRouter.post('/save-book', upload.single("image"), async (req, res) => {
    try { // try and catch used to handle  if there is a error occur by chance, if try fails then it will go to catch
        var item = {
            AuthorName: req.body.title,
            BookDescription: req.body.category,
            BookName: req.body.Book,
            Image: req.file.filename
        }
        await book(item).save()
        console.log("item", item);
        await book.find().then((data) => {
            console.log("data", data);
            res.render("viewbook", { data })
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            error: true,
            message: 'All fields are required'
        })
    }

})



bookRouter.get('/edit-book/:id', (req, res) => { //: is used to get the value
    const id = req.params.id
    console.log("id", id);  // to get the id in console when the corresponding delete button of card is clicked
    book.findOne({ _id: id }).then((data) => {
        console.log(data);

        res.render("Editbook", { data }) //{data} {} use to pass the data to the corresponding page(page is Editbook in here)

    })
})


bookRouter.post('/update-book', upload.single("image"), (req, res) => {
    var tank = {
        AuthorName: req.body.title,
        BookDescription: req.body.category,
        BookName: req.body.Book,
        Image: req.file.filename
    }
    const id = req.body.id
    console.log("ID", id);
    book.updateOne({ _id: id }, { $set: tank }).then((datas) => {
        console.log("datas", datas);
        res.redirect('/Book/view-book')
    })
})






module.exports = bookRouter