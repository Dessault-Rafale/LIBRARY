const bcrypt = require('bcrypt')
const express = require('express')
const RegisterRouter = express.Router()
const login = require('../Model/logindata')
const register = require('../Model/registerdata')


RegisterRouter.post('/save-register', async(req, res) => {
    console.log("request=====>",req.body);
    try { // try and catch used to handle  if there is a error occur by chance, if try fails then it will go to catch
        bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    error: true,
                    message: 'password hashing error'
                })
            }
    
            let logindata = {
                username: req.body.username,
                password: hashedPass,
            }
            console.log("logindata",logindata);
    
            login.findOne({ username: req.body.username })
                .then(username => {
                    if (username) {
                        return res.status(400).json({
                            success: false,
                            error: true,
                            message: 'username already exist!'
                        })
                    }
    
    
                    else {
                        var item = login(logindata)
                        item.save()
                        .then((loginvalue) => {
                                console.log("loginvalue====>",loginvalue);
                                        var id = loginvalue._id
                                        let registerdata = {
                                            name: req.body.name,
                                            email: req.body.email,
                                            place:req.body.place,
                                            address: req.body.address,
                                            phone: req.body.phone,
                                            login_id: id
    
                                        }
    
                                        register.findOne({ phone: registerdata.phone })
                                            .then((mobile) => {
                                                console.log("mobile",mobile);
                                                if (!mobile) {
                                                    var register_item = register(registerdata)
                                                    register_item.save()
                                                        .then(() => {
                                                            register.find().then((data) => {
                                                                console.log("dataooooo",data);
                                                                res.render("viewregister", { data })
                                                            })                                                        // res.status(200).json({
                                                            //     success: true,
                                                            //     error: false,
                                                            //     message: 'registration success!'
                                                            // })
                                                        })
                                                }
                                                else {
                                                    console.log("id",id)
                                                    login.deleteOne({ _id: id })
                                                        .then(() => {
                                                            res.status(401).json({
                                                                success: false,
                                                                error: true,
                                                                message: 'mobile number is already registered with us!'
                                                            })
                                                        })
                                                }
                                            })
                                    
                            })
                    }
    
    
    
    
    
                })
    
    
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: true,
            message: 'password hashing error'
        })
    }
    
})

RegisterRouter.get('/view-register', (req, res) => {   //getting data from database
    register.find().then((data) => {
        console.log("dataooooo",data);
         res.render("viewregister", { data })
    })

})



RegisterRouter.get('/delete-register/:id', (req, res) => { //  : is used to get the value
    const id = req.params.id
    console.log("id", id);  // to get the id in console when the corresponding delete button of card is clicked
    register.deleteOne({ _id: id }).then((data) => {
        res.redirect('/Register/view-register')
  
    })
})
module.exports = RegisterRouter


