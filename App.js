// var http = require('http');

// //create a server object:
// http.createServer(function (req, res) {
//   res.write('Hello World!'); //write a response to the client
//   res.end(); //end the response
// }).listen(8080); //the server object listens on port 8080

const express = require('express')
const app = express()
const bdata = require('./src/Model/bookdata')
const adata = require('./src/Model/authordata')
const rdata = require('./src/Model/registerdata')
app.use(express.urlencoded({ extended: true }))

const Register = require('./src/Router/RegisterRouter')
const Author = require('./src/Router/AuthorRouter')
const Book = require('./src/Router/BookRouter')


const book = require('./src/Model/bookdata')
const author = require('./src/Model/authordata')
const register = require('./src/Model/registerdata')


// const ejs = require('ejs')
app.set('view engine', 'ejs')
app.set('views', './src/views')
app.use(express.static('./public'))


app.use('/Register', Register)
app.use('/Author', Author)
app.use('/Book', Book)







app.get('/', (req, res) => {


    res.render("Library")
})




app.get('/registerlogin', (req, res) => {
    res.render("Login")
})













app.get('/register', (req, res) => {
    res.render("Register")
})











// app.get('/save-editbook', (req, res) => {
//     var item = {
//         AuthorName: req.query.title,
//         BookDescription: req.query.category,
//         BookName: req.query.Book
//     }
//     bdata(item).save()
//     console.log(item);
// })

// app.get('/save-register', (req, res) => {
//     console.log(req.query);
//     var task = {
//         Name: req.query.title,
//         Email: req.query.category,
//         Place: req.query.place,
//         Address: req.query.address,
//         Phone: req.query.phone,
//         Username: req.query.name,
//         Password: req.query.password
//     }
//     rdata(task).save()
//     console.log("task", task);
// })








// app.get('/edit-author/:id', (req, res) => { //: is used to get the value
//     const id = req.params.id
//     console.log("id", id);  // to get the id in console when the corresponding delete button of card is clicked
//     author.findOne({ _id: id }).then((digital) => {
//         console.log("v", digital);

//         res.render("Editauthor", { digital }) //{data} {} use to pass the data to the corresponding page(page is Editbook in here)

//     })
// })


// app.get('/update-author', (req, res) => {
//     var card = {
//         AuthorName: req.query.title,
//         AuthorEmailId: req.query.category,
//         AuthorPlace: req.query.Book

//     }
//     const id = req.query.id
//     console.log("id",id);
//     author.updateOne({ _id: id }, { $set: card }).then(() => {
//         res.json({
//             message: "author updated",

//         })
//     })
// })




app.get('/addregister', (req, res) => {
    res.render("Addbook")
})

// app.get('/view-register', (req, res) => {   //getting data from database
//     register.find().then((data) => {
//         res.render("viewregister", { data })
//     })

// })

// app.post('/save-register', (req, res) => {
//     var exam = {
//         Name: req.body.name,
//         Email: req.body.category,
//         Place: req.body.place,
//         Address: req.body.address,
//         Phone: req.body.phone,
//         Username: req.body.username,
//         Password: req.body.password
//     }
//     rdata(exam).save()
//     console.log("exam", exam);
//     register.find().then((data) => {
//         res.render("viewregister", { data })
//     })
// })






app.listen(8080, () => { console.log("server started at http://localhost:8080"); })