const express = require('express')
const authorRouter = express.Router()
const author = require('../Model/authordata')
const multer = require('multer')



authorRouter.get('/view-author', (req, res) => {   //getting data from database
    author.find().then((digital) => {
        res.render("viewauthor", { digital })
    })


})


authorRouter.get('/addbook/addauthor', (req, res) => {
    res.render("Addauthor")
})



authorRouter.get('/delete-author/:id',(req, res) => { //: is used to get the value
    const id = req.params.id
    console.log("id", id);  // to get the id in console when the corresponding delete button of card is clicked
    author.deleteOne({ _id: id }).then((digital) => {
        res.redirect('/Author/view-author')
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



authorRouter.post('/save-author', upload.single("image"), async(req, res) => {
    var trip = {
        AuthorName: req.body.title,
        AuthorEmailId: req.body.category, 
        AuthorPlace: req.body.Book,
        Image: req.file.filename

    }
    await author(trip).save()
    console.log("trip", trip)
    await author.find().then((digital) => {
        console.log(digital);
        res.render("viewauthor", { digital }) //{digital} {} use to pass the data to the corresponding page(page is Editbook in here)

    })


    
})


authorRouter.get('/edit-author/:id', (req, res) => { //: is used to get the value
    const id = req.params.id
    console.log("ido", id);  // to get the id in console when the corresponding delete button of card is clicked
    author.findOne({ _id: id }).then((digital) => {
        console.log("v", digital);

        res.render("Editauthor", { digital }) //{data} {} use to pass the data to the corresponding page(page is Editbook in here)

    })
})


authorRouter.post('/update-author',upload.single("image"),(req, res) => {
    var card = {
        AuthorName: req.body.title,
        AuthorEmailId: req.body.category,
        AuthorPlace: req.body.Book,
        Image: req.file.filename

    }
    const id = req.body.id
    console.log("idi", id);
    author.updateOne({ _id: id }, { $set: card }).then(() => {
        res.redirect('/Author/view-author')
    })
})






module.exports = authorRouter