const express = require('express');
const util    = require('util');
var _         = require("lodash");

'use strict';

module.exports = models => {
    const router = express.Router();
    router.post('/', (req, res) => {
        // Validate
        req.checkBody({
            'user_id': {
                notEmpty: { errorMessage: 'Required param' },
                isNumeric: true
            },
            'company': {
                notEmpty: { errorMessage: 'Required param' },
                isLength: { options: [{ max: 250 }] }
            },
            'title': {
                notEmpty: { errorMessage: 'Required param' },
                isLength: { options: [{ max: 250 }] }
            },
            'description': {
                notEmpty: { errorMessage: 'Required param' },
                isLength: { options: [{ max: 500 }]  }
            },
            'date_specificity': {
                notEmpty: { errorMessage: 'Required param' },
                isIn: { options: ['year', 'month', 'day'] }
            },
            'from_date': {
                notEmpty: { errorMessage: 'Required param' },
                isDate: true
            },
            'to_date': {
                optional: { checkFalsy: true },
                isDate: true
            }
        });

        // Report errors
        const errors = req.validationErrors();
        if (errors) {
            res.status(400).json({ errors });
            return;
        }

        // Save
        const jobSpec = _.pick(req.body, ['user_id', 'company', 'title', 'description', 'date_specificity', 'from_date', 'to_date']);
        models.jobs.create(jobSpec)
            .then(job => {
                res.json(job);
            })
            .catch(() => {
                res.status(400).end();
            });
    });
    router.get('/:job_id', (req, res) => {
        // Validate
        req.checkParams('job_id')
            .notEmpty().withMessage('Required param')
            .isNumeric();

        // Report errors
        const errors = req.validationErrors();
        if (errors) {
            res.status(400).json({ errors });
            return;
        }

        // Find
        models.jobs.findById(req.params.job_id)
            .then(job => {
                if (job !== null) {
                    res.json({ job });
                } else {
                    res.status(404).end();
                }
            })
            .catch(err => res.status(400).end());
    });
    return {
        path: '/jobs',
        router
    };
};
