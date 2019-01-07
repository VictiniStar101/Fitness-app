const express = require('express');
const Joi = require('joi');
// const user = require('./user/controller.js')
const app = express();
const port = 3000;
const server = "localhost";
app.use(express.json());

// const {User} = require('./model'); 
// var user = new User();
// var

const users = [
    {id: 1, name: 'faizan', exercises: 'sit-ups'},
    {id: 2, name: 'amy', exercises: 'push-ups'},
    {id: 3, name: 'don', exercises: 'pull-ups'},
];

//validate user
function validateUser(user) {
    const schema = {
        name: Joi.string().min(2).required(),
        exercises: Joi.string().required()
    }
    return Joi.validate(user, schema);
    
}
// access control

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
        id: users.length + 1,
        name: req.body.name,
        exercises: req.body.exercises
    };
    users.push(user);
    res.send(user);
});
//updates user with id specified
app.put('/api/users/update/:id', (req, res) => {
    //if not existing return 404
    let user = users.find(c => c.id === parseInt(req.params.id));
    if (!user) res.status(404).send('The user with the given id was not found');
    
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
    user.name = req.body.name;
    user.exercises = req.body.exercises;
    //return user to client
    res.send(user);
});


//get user name corresponding to id entered
app.get('/api/users/:id', (req, res) => {
    let user = users.find(c => c.id === parseInt(req.params.id));
    if (!user) res.status(404).send('The user with the given id was not found');
    res.send(user);
    //res.send(req.params);
});

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
