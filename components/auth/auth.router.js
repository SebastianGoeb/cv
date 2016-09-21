#!/usr/bin/env node

const jwt     = require('jsonwebtoken');

'use strict';

module.exports = (router, models) => {
    router.route('/connected')
        .get((req, res) => {
            const decoded = jwt.decode(req.session.grant.response.raw.id_token);
            const google_sub = decoded.sub;
            models.users.findOrCreate({
                where: {
                    google_sub: google_sub
                }
            });
            res.end(JSON.stringify(decoded, null, 2));
        });
};
