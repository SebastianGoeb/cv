#!/usr/bin/env node

"use strict";

const util = require('util')
const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const Sequelize = require('sequelize');

const app = express();
const router = express.Router();

const passwords = require('./passwords.json');

// Constants
const port = process.env.PORT || 8080

// Configure db access
const sequelize = new Sequelize('cv', 'cv', passwords.cv, {
    host: 'localhost',
    dialect: 'mariadb'
});

const User = require('./models/user')(sequelize);
User.create({
    user_name: "name",
    email: "email",
    password_hash: "hash"
})

// Configure middlewares
router.use((req, res, next) => {
    console.log('Something is happening');
    next();
});
app.use(bodyParser.json());
app.use(expressValidator([]));

// Configure routes
router.route('/users')
    .post((req, res) => {
        // Validate
        req.checkBody({
            'user_name': {
                notEmpty: true,
                isLength: {
                    options: [{min: 3, max: 20}],
                },
                errorMessage: 'Invalid username'
            },
            'email': {
                notEmpty: true,
                isEmail: {
                    errorMessage: 'Invalid email'
                }
            },
            'password': {
                notEmpty: true,
                isLength: {
                    options: [{min: 8}],
                },
                errorMessage: 'Invalid Password'
            }
        });

        // Report errors
        const errors = req.validationErrors();
        if (errors) {
            res.send('There have been validation errors: ' + util.inspect(errors), 400);
            return;
        }

        const user = req.body;

        // TODO save user
        res.json(user);
    });

// Register routes
app.use('/', router);

// Start server
app.listen(port);
console.log('Server listening on port', port);
