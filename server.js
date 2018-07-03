const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session')
require('dotenv').config(); 

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(session({
    name: 'houser-app',
    secret: process.env.SECRET, 
    cookie: {
        expires:  5 * 24 * 60 * 60 *1000,
    },
    saveUninitialized: false,
    rolling: true,
    resave: false,
}));
 

massive(process.env.CONNECTION_STRING)
    .then((db)=>{
        app.set('db', db);
    }) 
    .catch((err)=>{
        console.error(`db error ${err}`)
    })
 
app.use(checkDb())

//middleware functions

function checkDb() {
    return (req, res, next) => {
        const db = app.get('db');
        
        if (db) {
            req.db = db;
            next();
        }
        else {
            res.status(500).send({ message: 'database not connected' });
        }
    };
}

function checkLoggedIn(){
    return (req, res, next) => {
        const user = req.session.user_id

        if(user){
            next()
        }
        else{
            res.status(401).send({message: 'You need to log in to do this.'})
        }
    }

}

//Logging in and registering--------------------

app.post('/api/register',  (req, res) => {

    const { username, password } = req.body;

    req.db.users.findOne({username})
        .then(user=>{
            if(user){
                res.send({success:false, message: 'An account with this username already exists. Please login.'})
            }
            else{
                req.db.users.insert({ username, password })
                .then(user => {
                    req.session.user_id = user.id;
                    res.status(200).send({success:true, message: 'Registered successfully' });
                })
            }
        })
        .catch(err=>{
            console.error(err)
        })
});


app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    
    req.db.users.findOne({ username, password })
        .then(user => {
            if (user) {
                req.session.user_id = user.id;
                req.session.save();
                res.status(200).send({success:true, message: 'Logged in successfully' })
            }
            else {
                res.send({success:false, message: 'Invalid username or password' });
            }
        })
        .catch(err=>{
            console.error(err)
        })
});



//ENDPOINTS----------------------

app.get(`/api/properties`, checkLoggedIn(), (req, res)=>{
    req.db.properties.find({user_id: req.session.user_id})
        .then(response =>{
            res.status(200).send(response)
        })
        .catch(err=>{
            console.log(err)
        })
})

app.get(`/api/allProperties`, checkLoggedIn(), (req, res)=>{
    req.db.properties.find()
        .then(response =>{
            res.status(200).send(response)
        })
        .catch(err=>{
            console.log(err)
        })
})
    

app.get(`/api/properties/:rent`, checkLoggedIn(), (req, res)=>{
    req.db.FILTER([req.session.user_id, req.params.rent])
        .then(response =>{
          
            res.status(200).send(response)
        })
        .catch(err=>{
            console.log(err)
        })
})

app.post(`/api/property`, checkLoggedIn(), (req, res)=>{
    req.db.properties.insert({...req.body, user_id: req.session.user_id})
        .then(response =>{
            res.status(200).send(response)
        })
        .catch(err=>{
            console.log(err)
        })
})

app.delete(`/api/property/:id`, checkLoggedIn(), (req,res)=>{
    req.db.properties.destroy({id: req.params.id})
        .then(response=>{
            res.status(200).send(response)
        })
        .catch(err=>{
            console.error(err)
        })
})

app.delete(`/api/logout`, (req, res)=>{
    req.session.destroy()
    res.status(200).send({message: 'session destroyed'})
})
    


const port = process.env.PORT  || 5000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
});