const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const session = require('express-session')
const passport = require('./config/ppConfig.js')
const flash = require('connect-flash')
const isLoggedIn = require('./middleware/isLoggedIn')


//setup ejs and ejs layouts
app.set('view engine', 'ejs')
app.use(ejsLayouts) 

//body parser midleware  (this makes req.body work)
app.use(express.urlencoded({extended:false}))

//session middleware 
app.use(session({
    secret: 'keyboard cat', //
    resave: false, 
    saveUninitialized: true
}))

//middleware for passport
app.use(passport.initialize())
app.use(passport.session())

//passport middleare
app.use(flash())

//custom middleware

app.use((req, res, next)=>{
    //before every route, attach the flash messages and current user to res.locals 
    //this will give us acess to these values in all our ejs pages 
    res.locals.alerts = req.flash()
    res.locals.currentUser = req.user
    next() //move on to the next piece 
})

//controllers midware. This is what allows us to use the controllers routes
app.use('/auth', require('./controllers/auth.js'))
app.get('/', (req, res)=>{
    res.render('home')
    // if(req.user){
    //     res.send(`current user: ${req.user.name}`)
    // } else{
    //     res.send('No user currently logged in!')
    //}
})
app.get('/profile', isLoggedIn, (req,res)=>{
    res.render('profile')
})


app.listen(8003, ()=>{
    console.log('youre now in port 1111')
})








