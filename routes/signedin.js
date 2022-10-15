const express = require('express');
let router = express.Router();

var cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const signUp = require('../models/sigUpSchema');
const blog = require('../models/blogSchema');
const { sendMail, generateOTP } = require('../models/functions');
const sessions = require("express-session");


router.use(sessions({
    secret: "iAMAccelerator4reason",
    resave:false,
    saveUninitialized:false
}
    
))


router.use('/static', express.static('static'));

router.use(cookieParser("Rasengan1278uploaded"));
router.use(express.json());
router.use(express.urlencoded({
    extended: false
}));

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'static/img')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
});

var upload = multer({ storage: storage });




function cookieChecker(req, res, next) {

    if (req.signedCookies) {
       
        req.session.userData = req.signedCookies.userData;
        
   

        if (!req.session.userData) {
            res.clearCookie('userData');
        }
        if(req.signedCookies.temp){
            req.temp=req.signedCookies.temp;
            
        }
        if(!req.temp){
            res.clearCookie('temp');
        }
        next();

    }
    else {
        req.session.userData = null;
        req.temp = null;
        next();
    }

}





router
    .route('/')
    .get(cookieChecker, (req, res) => {



        if (req.query.username) {
            let username = req.query.username;
            signUp.find({ username }).then((items) => { res.status(201).render("profile.pug", { user: items[0] }) })

        }

        else if (req.session.userData) {
            res.status(200).send(JSON.stringify(req.session.userData));
        }
        else {
            res.status(500).send(JSON.stringify(false));
        }
    })


router
    .route('/signup')
    .get((req, res) => {
        
        res.status(200).render('signup.pug')
    })



// ______________________________GENERATING OTP__________________

router.post('/signup', upload.single('profilePic'), (req, res) => {


    let obj = {
        email: req.body.email,
        password: req.body.password,
        username: req.body.username.toLowerCase(),
        avatar: path.join('/static/img/', `${req.file.filename}`)
    }
    



    signUp.find({ "email":obj.email }).then(results => {
        if (results.length) {
            res.render('signup.pug', { msg: 'Email Alraedy Registered' })
        }
        else {
            let otp = generateOTP();
            let sent = sendMail(obj.email.trim(), otp);
            req.session.password = obj.password;
            req.session.otp = otp,
            res.cookie('temp', { "username": obj.username, "email": obj.email,"avatar":obj.avatar}, { maxAge:60 * 60 * 1000, httpOnly: true, signed: true,overwrite:true })
            res.render('otp.pug', { msg: `An otp has been sent to- ${obj.email}` });
         

        }
    })



}

)

router.post('/changemail',cookieChecker, (req, res) => {
    if (req.temp) {
        
        signUp.find({ "email": req.body.email }).then(results => {
            if (results.length) {
                res.send(JSON.stringify(false))
            }
            else {
                req.temp.email = req.body.email;
                otp = generateOTP();
                let sent = sendMail(req.temp.email.trim(), otp);
                req.session.otp = otp; 
                res.cookie('temp', req.temp, { maxAge:60 * 60 * 1000, httpOnly: true, signed: true, overwrite:true })
                res.send(JSON.stringify(true))
               
            }
    }
        )

}
})

router.get('/resend', cookieChecker,(req, res) => {
   
    if (req.temp) {

            let otp = generateOTP();
            let sent = sendMail(req.temp.email.trim(), otp);
            req.session.otp = otp
            res.cookie('temp', req.temp, { maxAge:60 * 60 * 1000, httpOnly: true, signed: true, overwrite:true })
            res.send(JSON.stringify(true))
           
        
       
    }
})

// ___________________________USE SAVE_______________________
router.get("/usersave",cookieChecker, (req, res) => {

    if (req.temp) {
        let obj = {
            email: req.temp.email.toLowerCase(),
            password: req.session.password,
            username: req.temp.username,
            avatar: req.temp.avatar
        }

        
        req.temp = null;


        user = new signUp(obj)

        user.save().then(() => {


            if (req.session.userData) {
                res.clearCookie('userData');

            }
            // avatar: item.avatar
            res.cookie('userData', { username: obj.username, email: obj.email,"avatar":obj.avatar }, { httpOnly: true, signed: true, maxAge: 365 * 24 * 12 * 60 * 60 * 1000 });

            res.clearCookie('temp');
            req.session.destroy();
            // New User Route

            router.get(`/${obj.username}`, cookieChecker, (req, res) => {

                if (req.session.userData) {
                    res.status(200).render('signuptemplate.pug', {
                        user: {
                            "username": obj.username, "email": obj.email,"avatar":obj.avatar
                        }
                    })
                }
                else {
                    res.status(500).send('Please Login First')
                }
            })
            res.redirect(`/user/${obj.username}`);

        }).catch((err) => {
             res.render('signup.pug', { msg: 'Email Alraedy Registered' })
        })
    }
})



// ______________________________VALIDATING OTP___________________

router.post('/signup/validate', cookieChecker,(req, res) => {
 
    if (req.session.otp === req.body.otp) {
        res.send(JSON.stringify(true));

    }
    else {
        res.send(JSON.stringify(false));
    }
})


// ___________________________SINGN IN ROUTE__________________
router
    .route('/signin')

    .get(cookieChecker, (req, res) => {


        if (req.session.userData) {
            res.status(200).redirect(`/user/${req.session.userData.username}`)

        }

        else if(req.query.forgot){
            res.render('forgot.pug')
        }

        else {
            res.status(200).render('signin.pug')
        }
    })
    .post((req, res) => {


        let userData = {
            email: req.body.email,
            password: req.body.password,
        }
        signUp.find({ 'email': userData.email}).then((items) => {
            if (items.length !== 0) {
                if(items[0].password ===userData.password ){
                res.cookie('userData', { username: items[0].username, email: items[0].email, avatar: items[0].avatar }, { maxAge: 365 * 24 * 12 * 60 * 60 * 1000, httpOnly: true, signed: true,overwrite:true })
                res.status(200).redirect(`/user/${items[0].username}`)}

                else{
                    res.send("worng password")
                }


            }
            else {
                res.send('user not found')

            }
        })

    })


router
    .route('/logout')
    .get((req, res) => {
        res.clearCookie('userData')
        res.redirect('/')
    })



// ___________________Creat Blog End Point_______________

router
    .route(`/newblog`)
    .get(cookieChecker, (req, res) => {

        if (req.session.userData) {
            res.status(200).render('newblog.pug')
        }
        else {
            res.status(500).send('Please Login First')
        }
    })



    .post(cookieChecker, upload.array('image'), (req, res) => {
        let images = []

        for (item of req.files) {
            images.push(path.join('static/img/', `${item.filename}`))
        }
        let obj = {
            "username": req.session.userData.username.toLowerCase(),
            "title": req.body.title,
            "heading": req.body.heading,
            "image": images,
            "text": req.body.text,
            "pattern": req.body.pattern,
            "getid": `${req.body.title.split("-").join("").split(/\s+/).join("-")}-${req.session.userData.username}${Date.now()}`,
            "view":0
        }

        if (req.session.userData) {
            let blogData = new blog(obj)

            blogData.save().then(() => {
                res.redirect(`/user/${req.session.userData.username}`)
            }
            )

        }
    })


router
    .route('/blogs')
    .get(cookieChecker, (req, res) => {

        if (req.query.username) {
          
            blog.find({ username: req.query.username }).then(items => {

                res.send(JSON.stringify({ blogs: items }))
            })
        }
        else if (req.session.userData) {
            blog.find({ username: req.session.userData.username }).then(items => {
             

                res.send(JSON.stringify({ blogs: items }))
            })
        }

    }
    )


router
    .route('/deleteblog')
    .delete(cookieChecker, (req, res) => {


        if (req.session.userData) {
            blog.find({ "getid": req.body.getid }).then((blogs) => {

                if (blogs[0].username === req.session.userData.username) {
                    blog.deleteOne({ getid: req.body.getid }).then(() => res.send('success'))


                }
            })
        }
    })




signUp.find({}).then(items => {
    for (let item of items) {
        router
            .route(`/${item.username}`)
            .get(cookieChecker, (req, res) => {
                if (req.session.userData) {
                    if (req.session.userData.username === item.username) {
                        res.status(200).render('signuptemplate.pug', { user: item })
                    } else { res.redirect('/') }
                }
                else { res.redirect('/') }
            })
    }
}
)


router
    .route("/myblogs")
    .get(cookieChecker, (req, res) => {

        if (req.session.userData) {
            res.render("userblogs.pug")
        }
        else {
            res.redirect("/")
        }
    })

    .post(cookieChecker, (req, res) => {
        if (req.session.userData) {
            blog.find({ "username": req.session.userData.username }).then(blogs => res.send(JSON.stringify(blogs)));
        }
    })
module.exports = router;
