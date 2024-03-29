const express = require('express')
const app = express()


const path = require('path')
console.log(path.join(__dirname, 'public'))

require('dotenv').config()

//working with json......
app.use(express.json());

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const session = require('express-session')
app.use(session({secret:"Nothing is secrate here."}))

app.use('/static', express.static(path.join(__dirname, 'public')))

//Configuring Template engine..............
//app.set("view engine","ejs")
//app.set('views','views')

//Importing DBCongifuration and do config here.........
const conntionDB = require('./config/DBConfig')
conntionDB(process.env.DB_URL)


//configuring routes..................................
const userRouter = require('./routes/userroutes')
app.use('/bookreviewsystem/user/', userRouter)
const bookRouter = require('./routes/bookroutes')
app.use('/bookreviewsystem/books/', bookRouter)

const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`)
})