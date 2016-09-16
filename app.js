#!/usr/bin/env node

'use strict';

const util = require('util')
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const app = express();
const router = express.Router();
const config = require('./config.js');

const session = require('express-session');
const Grant = require('grant-express')
const grant = new Grant(config.grant);

// Constants
const port = process.env.PORT || 8080;

// Configure models
const models = require('./models');

// Configure middlewares
app.use(morgan('dev'));
// app.use(session({secret: 'grant'}))
// app.use(grant);
app.use(bodyParser.json());
app.use(expressValidator([]));

// Configure routes
router.route('/users')
    .post((req, res) => {
        // Validate
        req.checkBody({
            'username': {
                notEmpty: true,
                isLength: {
                    options: [{min: 3, max: 20}],
                },
                isAlpha: true,
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
            res.status(400).send('There have been validation errors: ' + util.inspect(errors));
            return;
        }

        // Save user
        const user = {
            username: req.body.username,
            email: req.body.email,
            password_hash: 'test'
        };
        models.users.create(user);

        // Return user
        res.json(user);
    });

router.route('/tokensignin')
    .post((req, res) => {
        // Validate
        req.checkBody('idtoken', 'Invalid ID Token').notEmpty();

        // Report errors
        const errors = req.validationErrors();
        if (errors) {
            res.status(400).send('There have been validation errors: ' + util.inspect(errors));
            return;
        }

        //
    });

// Register routes
app.use('/', router);

// Start server
app.listen(port);
console.log('Server listening on port', port);
