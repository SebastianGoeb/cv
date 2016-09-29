const express = require('express');
const util    = require('util');

'use strict';

module.exports = models => {
    const router = express.Router();
    router.get('/:jobId', (req, res) => {
        // Validate
        req.checkBody({
            'job_id': {
                notEmpty: { errorMessage: 'Required param' },
                isNumeric: true
            }
        });

        // Report errors
        const errors = req.validationErrors();
        if (errors) {
            res.status(400).json({ errors });
            return;
        }

        // Find
        models.jobs.findById(req.params.jobId)
            .then(job => {
                if (job !== null) {
                    res.json({ job });
                } else {
                    res.status(404).end();
                }
            })
            .catch(err => res.status(400).end());
    });
    router.get('/:user_id', (req, res) => {
        // Validate
        req.checkParams('user_id')
            .notEmpty().withMessage('Required param')
            .isNumeric();

        // Report errors
        const errors = req.validationErrors();
        if (errors) {
            res.status(400).json({ errors });
            return;
        }

        // Find
        models.users.findById(req.params.user_id)
            .then(user => {
                if (user !== null) {
                    res.json({ user });
                } else {
                    res.status(404).end();
                }
            })
            .catch(err => res.status(400).end());
    });
    return {
        path: '/users',
        router
    }
};
