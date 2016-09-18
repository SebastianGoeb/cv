#!/usr/bin/env node

const express = require('express');

'use strict';

module.exports = (router, models) => {
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
    router.route('/users/:userId')
        .get((req, res) => {
            res.json({
                username: 'username',
                email: 'example@example.com'
            });
        });
};
