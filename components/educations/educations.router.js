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
            'institution': {
                notEmpty: { errorMessage: 'Required param' },
                isLength: { options: [{ max: 250 }] }
            },
            'degree': {
                notEmpty: { errorMessage: 'Required param' },
                isLength: { options: [{ max: 250 }] }
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
        const spec = _.pick(req.body, ['user_id', 'institution', 'degree', 'date_specificity', 'from_date', 'to_date']);
        models.educations.create(spec)
            .then(education => {
                res.json(education);
            })
            .catch(() => {
                res.status(400).end();
            });
    });
    router.get('/:education_id', (req, res) => {
        // Validate
        req.checkParams('education_id')
            .notEmpty().withMessage('Required param')
            .isNumeric();

        // Report errors
        const errors = req.validationErrors();
        if (errors) {
            res.status(400).json({ errors });
            return;
        }

        // Find
        models.educations.findById(req.params.education_id)
            .then(education => {
                if (education !== null) {
                    res.json({ education });
                } else {
                    res.status(404).end();
                }
            })
            .catch(err => res.status(400).end());
    });
    return {
        path: '/educations',
        router
    };
};
