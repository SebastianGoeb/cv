#!/usr/bin/env node

'use strict';

const environment = process.env.NODE_ENV || 'development'
const _           = require('lodash');
const secrets     = require('./secrets');

const config = {
    development: {
        http: {
            port: 8080
        },
        morgan: 'dev',
        validator: [],
        session: {
            secret: 'grant',
            resave: true,
            saveUninitialized: false
        },
        sequelize: {
            database: 'cv',
            username: 'cv',
            options: {
                host: 'localhost',
                dialect: 'mysql',
                define: {
                    timestamps: false
                },
                logging: false
            }
        },
        grant: {
            server: {
                protocol: 'http',
                host: 'localhost:8080',
                callback: '/connected',
                transport: 'session',
                state: true
            },
            google: {
                key: '903204294877-qtv6b50d2aioth0vkv712n10hus2l0n8.apps.googleusercontent.com',
                scope: ['profile']
            }
        }
    }
};

module.exports = _.merge(config, secrets)[environment];
