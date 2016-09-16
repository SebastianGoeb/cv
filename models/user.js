#!/usr/bin/env node

'use strict';

module.exports = (sequelize, DataTypes) =>
    sequelize.define('users', {
        username: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING
        },
        password_hash: {
            type: DataTypes.STRING
        },

    }, {
        timestamps: false
    });
