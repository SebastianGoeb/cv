#!/usr/bin/env node

'use strict';

module.exports = (sequelize, DataTypes) =>
    sequelize.define('users', {
        user_id: {
            type: DataTypes.BIGINT,
            primaryKey: true
        },
        google_sub: {
            type: DataTypes.STRING
        }
    }, {
        indexes: [{
            unique: true,
            fields: ['google_sub']
        }]
    });
