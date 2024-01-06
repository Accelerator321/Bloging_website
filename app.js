const express = require('express');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const { json } = require('express');
const app = express();
const nodemailer = require('nodemailer');
require('dotenv').config();

const port = 3000;


const { sendMail, generateOTP } = require('./models/functions');


var cookieParser = require('cookie-parser');

const blog = require('./models/blogSchema');
const signUp = require('./models/sigUpSchema')
const user = require('./routes/signedin')

app.use('/user', user);


// EXPRESS
app.use(cookieParser(process.env.Cookie_secret));
app.use('/static', express.static('static')); // serving static files
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
const sessions = require("express-session");
const { sign } = require('crypto');


app.use(sessions({
    secret: process.env.Session_secret ,
    resave: false,
    saveUninitialized: false,
    
}

))


// Connecting to Database

function cookieChecker(req, res, next) {


    if (req.signedCookies) {
        req.session.userData = req.signedCookies.userData;

        next();
    }
    else {
        next();
    }
}

mongoose.connect(process.env.Connection_string);

var db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("We are connected")
});




// PUG
app.set('view engine', 'pug'); // set pug engine
app.set('views', path.join(__dirname, 'views')) // set view directory


// END POINT




app.get('/', cookieChecker, (req, res) => {
    res.status(200).render('home.pug')



})


app.get('/changepass', cookieChecker, (req, res) => {

    if (!req.session.userData) {

        res.send('can not change')
    }

    else {
        
        
        res.render('changepass.pug', { msg: `An otp has been sent to- ${req.session.userData.email}` });
      
    }
})


app.get('/resend', cookieChecker, (req, res) => {

    // ______________Changing while logged in___________________

    if (req.session.userData) {
       
        let otp = generateOTP();
        let sent = sendMail(req.session.userData.email.trim(), otp);
        req.session.otp = otp;
    
        req.session.save();
        res.send(JSON.stringify(true));
    
        


    }

    // ________________changing without logged in_______________
    else if (req.query) {
        signUp.find({ "email": req.query.email.trim() }).then(items => {
            if (!items.length) {
                res.send(JSON.stringify("no"));
                return
            }
            let otp = generateOTP();
            let sent = sendMail(req.query.email.trim(), otp);
            req.session.otp = otp;
            req.session.email = req.query.email;
            res.send(JSON.stringify(true))
            
        

        })

    }
})



app.post('/validate', (req, res) => {
   
   
    if (req.session.otp === req.body.otp) {

        // ____________Changing while signed in______________
        if (req.session.userData) {
            
            signUp.updateOne({ "username": req.session.userData.username }, {$set:{ "password": req.body.pass }}).then(items => {
              
                req.session.destroy();
                res.send(JSON.stringify(true));
            }

            )


        }

        // ________________Change whithout signed in__________________
        else{
             
            signUp.updateOne({ "email": req.session.email }, {$set:{ "password": req.body.pass }}).then(() => {

                signUp.find({"email":req.session.email}).then(items=>{
                    req.session.destroy();
                
                res.cookie('userData', { username: items[0].username, email: items[0].email, avatar: items[0].avatar }, { maxAge: 365 * 24 * 12 * 60 * 60 * 1000, httpOnly: true, signed: true,overwrite:true })

                
                res.send(JSON.stringify(true));

                })
                
            })
        }
    }

    // ____________________Otp Not Match________________
    else {
        res.send(JSON.stringify(false));
    }
})


app.post('/usercheck', (req, res) => {
    let obj = {
        username: req.body.username.toLowerCase()
    }

    signUp.find(obj, (err, item) => {
        if (err) {

        }

        else if (item.length !== 0) {
            res.send(JSON.stringify(true))
        }

        else {

            res.send(JSON.stringify(false))
        }
    })

})




app.listen(port, () => {
    console.log(`Server started at ${port}`)

});


app.get("/totalpage", (req, res) => {
    blog.find().count().then(tblogs => {
        if (tblogs < 10) {
            res.send(JSON.stringify(1))
        }
        else {
            res.send(JSON.stringify(tblogs % 10 == 0 ? tblogs : parseInt(tblogs / 10) + 1))
        }
    })
})

app.get('/recentblogs', (req, res) => {
    var page = Number(req.query.page)
    blog.find({}).then(blogs => {
        res.send(JSON.stringify(blogs.reverse().slice(page * 10 - 10, page * 10)));

    })






})


// ______________________Serving Blogs__________________________
app.get('/getblogs', (req, res) => {

    let getid = `${req.query.getid}`;


    blog.find({ getid }).then((item) => {

        if (item.length) {

            signUp.find({ 'username': item[0].username }).then((user) => {
                item[0].avatar = user[0].avatar;
                blog.updateOne({"getid":item[0].getid},{"view":item[0].view+1}).then(()=>

                    res.status(201).render('blog.pug', { 'blog': item[0] })
                )
                
            })

        }
        else {
            res.status(500).send("Blog not Found")
        }
    }).catch(() => res.send("blog not found"))
})

app.get('/blogcontent', (req, res) => {
    let getid = `${req.query.getid}`;

    blog.find({ getid }).then((item) => {
        res.status(201).send(JSON.stringify(item[0]))
    })

})

app.get("/search", (req, res) => {



    blog.find({ "title": { "$regex": req.query.search.trim(), "$options": "i" } }).then(blogs => {
        if (req.query.searchbar) {


            let obj = []
            let end = 10;

            if (blogs.length < 10) {
                end = blogs.length;
            }
            for (let i = 0; i < end; i++) {
                obj.push({ "image": [blogs[i].image[0]], "title": blogs[i].title, "username": blogs[i].username, "getid": blogs[i].getid })
            }
            res.send(JSON.stringify(obj))

        }

        else {
            res.send(JSON.stringify(blogs))

        }
    }




    )
})
app.get("/results", (req, res) => {



    res.render('results.pug', { "query": req.query.search })
}


)



