const express = require('express');
//const Joi = require('joi');
const cors = require('cors');
// const user = require('./user/controller.js')
const app = express();
const port = 3000;
const server = "localhost";
// access control
app.use(cors());
app.use(express.json());

// const {User} = require('./model'); 
// var user = new User();
// var

const users = [
    {name: "Faizan", exercises: "sit-ups", nickname: "jamilf", steps: 0 , reps: [3]},
    {name: "amy", exercises: "push-ups", nickname: ""},
    {name: "don", exercises: "pull-ups", nickname: ""},
];

//validate user
/*function validateUser(user) {
    const schema = {
        name: Joi.string().min(2).required(),
        exercises: Joi.string().required()
    }
    return Joi.validate(user, schema);
    
}*/

// define example routes
// if user were to go to /, would print hello world
app.get('/', (req, res) => {
    res.send('Hello world');
});
//send full list of users
app.get('/api/users', (req, res) => {
    res.send(users);
});
//creates a new user
app.post('/api/users/add', (req, res) => {
    //validate
    /*const { error } = validateUser(req.body); //result.error
    //if invalid, return 400- bad request
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }*/

    //creates data for user
    const user = {
        //id: users.length + 1,
        name: req.body.name,
        exercises: req.body.exercises,
        nickname: "",
        steps: 0,
    };
    users.push(user);
    res.send(user);
});

//lookup user with name specified
app.get('/api/users/:name', (req, res) => {
    //if not found, return 404
    let user = users.find(c => c.name === req.params.name);
    if (!user) res.status(404).send('The user with the given name was not found');
    
    //return user to client
    res.send(user);
});
//updates user with name specified
app.put('/api/users/update/:name', (req, res) => {
    //if not existing return 404
    let user = users.find(c => c.name === req.params.name);
    if (!user) res.status(404).send('The user with the given name was not found');
    
    //validate
    /*
    const { error } = validateUser(req.body); //result.error
    //if invalid, return 400- bad request
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }*/
    
    //update user
    //updates name
    //updates exercises
    //will use for other properties
    //user.name = req.body.name;
    if ((req.body.exercises !== "") && (req.body.exercises !== undefined)) {
        user.exercises = user.exercises + ", " + req.body.exercises;
    }
    if ((req.body.nickname !== "") && (req.body.nickname !== undefined)) {
        user.nickname = req.body.nickname;
    }
    if (req.body.steps > 0) {
        user.steps = req.body.steps;
    }
    //return user to client
    res.send(user);
});


//get user name corresponding to id entered
/*app.get('/api/users/:id', (req, res) => {
    let user = users.find(c => c.id === parseInt(req.params.id));
    if (!user) res.status(404).send('The user with the given id was not found');
    res.send(user);
    //res.send(req.params);
}); */

//delete user (Not Functioning)
/*app.delete('api/users/:id', (req, res) => {
    //look up user
    const user = users.find(c => c.id === parseInt(req.params.id));
    if (!user) res.status(404).send('The user with the given id was not found');
    //delete
    const index = users.indexOf(user);
    users.splice(index, 1);
    //return same user
    res.send(user);
});*/
module.exports = app;

//PORT


app.listen(port, () => console.log(`listening on: http://${server}:${port}`));
