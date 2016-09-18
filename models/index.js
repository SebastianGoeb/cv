#!/usr/bin/env node

'use strict';

const environment = process.env.NODE_ENV || 'development';

const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const config    = require('../config');
const sequelize = new Sequelize(config.sequelize.database, config.sequelize.username, config.sequelize.password, config.sequelize.options);
const db        = {};

fs.readdirSync(__dirname)
    .filter(file => (file.indexOf('.') !== 0) && (file !== 'index.js'))
    .map(file => sequelize.import(path.join(__dirname, file)))
    .forEach(model => { db[model.name] = model; });

Object.keys(db).forEach(modelName => {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
