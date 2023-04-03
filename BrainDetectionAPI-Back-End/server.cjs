const express  = require("express");
const bcrypt   = require("bcrypt-nodejs");
const cors     = require("cors");
const register = require("./controllers/register");
const signin   = require("./controllers/signin");
const image     = require('./controllers/image');
const profile  = require("./controllers/profile");
const PORT     = process.env.PORT; //bash -> PORT=3050 node server.cjs

const db = require('knex')({
    client: 'pg',
    connection: {
                host: '127.0.0.1',
                user: 'postgres',
                port: 5432,
                password: 'myselfmyself11',
                database: 'smart-brain'
                }
  }); 

const app = express();
      app.use(express.urlencoded({extended: false}));
      app.use(express.json());
      app.use(cors());

//ROOT
app.get('/', (req, res) => { res.send("root link")});
//SING IN
app.post("/signin", (req, res) =>{signin.handleSignIn(req, res, db, bcrypt)});
//REGISTER
app.post("/register",(req, res) =>{register.handleRegister(req, res, db, bcrypt)});
//PROFILE/:ID
app.get("/profile/:id", (req, res) =>{profile.handleRegister(req, res, db, bcrypt)});
///IMAGE
app.put("/image", (req, res) =>{image.handleImage(req, res, db, bcrypt)});
// app.post("/imageurl", (req, res) =>{image.handleApiCall(req, res)});
//port 3050 is being used
app.listen(PORT, ()=>{console.log(`app is running in port ${PORT}`)});
