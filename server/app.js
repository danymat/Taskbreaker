var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var { connectToMongoAtlas, getDB, closeDB } = require('./connection/MongoConnection')
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


const { User, AUTHORITIES } = require('./model/User');
const { Task } = require('./model/Task');

connectToMongoAtlas()
    .then(() => console.log('Connected to Atlas Cluster'))
    .then(()=> {
        return require('./service/tasksService')
    })
    .then(async (tasksService) => {
        const task = new Task({
            description: 'Manger des pâtes',
            userEmail: 'd.danymat@test.com'
        })
        task.createDueDate(new Date())
        // await tasksService.createTask(task)
        const user = new User({
            username: "Hey",
            email: 'd.danymat@test.com',
            password: 'hash',
            authorities: AUTHORITIES.USER
        })
        // const userTasks = await tasksService.findAllUserTasks(user)
        // console.log(userTasks)
    })
    .then(() => { closeDB(); console.log('Closed Atlas Cluster') })
    .catch((e) => { console.log(e); closeDB() })

module.exports = app;

