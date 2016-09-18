#!/usr/bin/env node

const express = require('express');

'use strict';

module.exports = (router, models) => {
    router.route('/connected')
        .get((req, res) => {
            const id_token = Buffer.from(req.session.grant.response.raw.id_token, 'base64').toString()  ;
            console.log(id_token, req.session.grant.response.raw.id_token);
            // let prom = models.users.findOrCreate({
            //     where: {
            //         google_sub: id_token.sub
            //     }
            // });
            //
            // console.log(promise);
            // promise.then(x => { console.log(x); });
            res.end(JSON.stringify(req.session.grant.response, null, 2));
        });
};
