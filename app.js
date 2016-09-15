#!/usr/bin/env node

"use strict";

const util = require('util')
const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const app = express();
const router = express.Router();

// Constants
const port = process.env.PORT || 8080

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

        const errors = req.validationErrors();
        if (errors) {
            res.send('There have been validation errors: ' + util.inspect(errors), 400);
            return;
        }

        res.json(req.body);
    });

// Register routes
app.use('/', router);

// Start server
app.listen(port);
console.log('Server listening on port', port);
