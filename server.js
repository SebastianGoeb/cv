#!/usr/bin/env node

'use strict';

// Require lodash first to merge config and secrets
const _ = require('lodash');

// Configuration
const environment = process.env.NODE_ENV || 'development';
const config      = require('./config');

// External dependencies
const fs         = require('fs');
const path       = require('path');
const glob       = require('glob');
const util       = require('util')
const http       = require('http');
const https      = require('https');
const express    = require('express');
const bodyParser = require('body-parser');
const morgan     = require('morgan')(config.morgan);
const validator  = require('express-validator')(config.validator);
const session    = require('express-session')(config.session);
const grant      = require('grant-express')(config.grant);
const Sequelize  = require('sequelize');

// Load models
const sequelize = new Sequelize(config.sequelize.database, config.sequelize.username, config.sequelize.password, config.sequelize.options);
sequelize.authenticate();
const models = _(glob.sync(__dirname + '/components/*/*.model.js'))
    .map(modelPath => sequelize.import(modelPath))
    .map(model => [model.name, model])
    .fromPairs()
    .value();

// Associate models
_(models)
    .values()
    .filter(model => 'associate' in model)
    .forEach(model => model.associate(models));

// Create express app
const app = express();

// Configure middlewares
app.use(morgan);
app.use(session);
app.use(bodyParser.json());
app.use(grant);
app.use(validator);

// Configure routes
const router = express.Router();

require('./components/auth/auth.router')(router, models);

// Register routes
app.use('/', router);

// Serve static files
app.use(express.static('static'));

// Start server(s)
if (config.http) {
    http.createServer(app).listen(config.http.port);
    console.log('HTTP   server listening on port', config.http.port);
}
if (config.https) {
    https.createServer(config.https.options, app).listen(config.https.port);
    console.log('HTTPS  server listening on port', config.https.port);
}
