var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var { connectToMongoAtlas, closeDB, defaultUri } = require('./connection/MongoConnection');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));



exports.promise = connectToMongoAtlas(defaultUri)
    .then(() => console.log('Connected to Atlas Cluster'))
    .then(() => {
        // Setting Endpoints
        const UsersEndpoint = require('./endpoints/UsersEndpoint')
        const AdminEndpoint = require('./endpoints/AdminEndpoint')
        app.use('/api/users', UsersEndpoint)
        app.use('/api/admin', AdminEndpoint)

        // Default error Catcher
        app.use((error, req, res, next) => {
            if (res.headersSent) {
                return next(error);
            }
            res.status(error.status || 500)
            var returnedJson = { message: error.message }
            if (process.env.STACK_TRACE == "True") {
                returnedJson.stack = error.stack
            }
            res.json(returnedJson)
        })
    })
    .then(() => { return app })
    .catch((e) => { console.log(e); closeDB(); })



