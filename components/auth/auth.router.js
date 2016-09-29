'use strict';

const express = require('express');
const jwt     = require('jsonwebtoken');

module.exports = models => {
    const router = express.Router();
    router.get('/', (req, res) => {
            const decoded = jwt.decode(req.session.grant.response.raw.id_token);
            const google_sub = decoded.sub;
            models.users.findOrCreate({
                where: {
                    google_sub: google_sub
                }
            });
            res.end(JSON.stringify(decoded, null, 2));
        });
    return {
        path: '/connected',
        router
    }
};
